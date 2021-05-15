import { RoomInfo } from "../../shared/@types";
import { MAX_PLAYERS_PER_GAME, SERVER_EVENT_NAME } from "../../shared/constants";
import generateUniqueId from "../../shared/utils/generateUniqueId";
import Client from "./Client";
import IdleState from "./Client/State/IdleState";
import InRoomState from "./Client/State/InRoomState";
import RoomOwnerState from "./Client/State/RoomOwnerState";
import Server from "./Server";

class Room {
  public readonly id = generateUniqueId();
  private members: Client[] = [];
  private ownerId: string;

  constructor(owner: Client) {
    this.members.push(owner);
    this.ownerId = owner.getId();
    owner.changeState(new RoomOwnerState(owner, this), true);
  }

  public getMembers(): Client[] {
    return this.members;
  }

  public getInfo(): RoomInfo {
    return {
      id: this.id,
      owner: this.ownerId,
      members: this.members.map((g) => g.getInfo()),
    };
  }

  public getSize(): number {
    return this.members.length;
  }

  private getOwner(): Client {
    const owner = this.members.find((m) => m.getId() === this.ownerId);

    if (owner) return owner;
    throw new Error("Room has no owner");
  }

  public changeOwner(id: string): void {
    const owner = this.getOwner();
    const newOwner = this.members.find((m) => m.getId() === id);

    if (newOwner) {
      owner.changeState(new InRoomState(owner, this), true);
      newOwner.changeState(new RoomOwnerState(newOwner, this), true);
      this.ownerId = newOwner.getId();
      this.members.forEach((m) => m.getSocket().emit(SERVER_EVENT_NAME.OwnerChanged, this.ownerId));
      return;
    }

    throw new Error("Invalid client id!");
  }

  public add(client: Client): void {
    if (this.members.length >= MAX_PLAYERS_PER_GAME - 1) throw Error("Room is full!");
    if (this.members.includes(client)) throw Error("You are already in room!");

    this.members.forEach((m) => m.getSocket().emit(SERVER_EVENT_NAME.FriendJoined, client.getInfo()));
    this.members.push(client);
    client.changeState(new InRoomState(client, this), true);
  }

  public remove(client: Client): void {
    if (client.getId() === this.ownerId) {
      const nextOwner = this.members.find((m) => m.getId() !== this.ownerId);

      if (nextOwner) this.changeOwner(nextOwner.getId());
      else Server.getInstance().removeRoom(this);
    }

    client.changeState(new IdleState(client));
    this.members = this.members.filter((g) => g !== client);
    this.members.forEach((m) => m.getSocket().emit(SERVER_EVENT_NAME.FriendLeft, client.getId()));
  }

  public back(client: Client): void {
    client.changeState(
      client.getId() === this.ownerId ? new RoomOwnerState(client, this) : new InRoomState(client, this),
      true
    );
  }
}

export default Room;