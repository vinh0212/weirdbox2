import produce from "immer";
import create from "zustand/vanilla";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import generateUniqueId from "../../../shared/src/utils/generateUniqueId";
import { NotificationProps, StyleVariant } from "../@types";
import ROUTE from "../constants/ROUTE";
import socket from "../services/socket";

type FindingStatus = "finding" | "found" | "canceled";

type AppState = {
  route: ROUTE;
  changeRoute: (route: ROUTE) => void;
  playerName: string;
  changeName: (playerName: string) => void;
  notifications: NotificationProps[];
  notify: (variant: StyleVariant) => (message: string) => void;
  findingStatus: FindingStatus;
  setFindingStatus: (status: FindingStatus) => void;
};

const appState = create<AppState>((set, get) => ({
  route: ROUTE.Hub,
  changeRoute: (route: ROUTE) => set({ route }),
  playerName: "player",
  changeName: (playerName: string) => set({ playerName }),
  notifications: [],
  notify: (variant: StyleVariant) => (message: string) => {
    const id = generateUniqueId();
    const notifications = produce(get().notifications, (draft) => {
      if (draft.length >= 3) draft.shift();
      draft.push({ id, message, variant });
    });

    set({ notifications });
  },
  findingStatus: "canceled",
  setFindingStatus: (findingStatus) => set({ findingStatus }),
}));

const { setState, getState, subscribe } = appState;

subscribe(
  () =>
    setTimeout(
      () =>
        setState({
          notifications: getState().notifications.slice(0, -1),
        }),
      2000
    ),
  (state) => state.notifications
);

socket.on(SOCKET_EVENT.UpdateFindGameStatus, (findingStatus: FindingStatus) => setState({ findingStatus }));
socket.on(SOCKET_EVENT.NewGame, () => setState({ route: ROUTE.InGame, findingStatus: "canceled" }));
socket.on(SOCKET_EVENT.Error, getState().notify("Danger"));
socket.on(SOCKET_EVENT.Info, getState().notify("Info"));

export default appState;
