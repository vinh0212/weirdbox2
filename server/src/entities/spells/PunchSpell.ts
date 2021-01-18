import SPELL_NAME from "../../../../shared/src/SpellName";
import Player from "../Player";
import Spell from "./Spell";

class PunchSpell extends Spell {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Punch, target, caster);
    this.power = chargePoint;
  }

  public trigger(): void {
    this.target.changeHitPoint(-this.power);
  }
}

export default PunchSpell;