import Spell from ".";
import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import Player from "../Player";

class PoisonSpell extends Spell {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Poison, target, caster, 3);
    this.power = chargePoint;
  }

  public trigger(): void {
    this.target.changeHitPoint(-this.power);
    this.duration--;
  }
}

export default PoisonSpell;
