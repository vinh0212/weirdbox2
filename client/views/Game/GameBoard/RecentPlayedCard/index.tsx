import { useAtom } from "jotai";
import { useState } from "react";
import { CardInfo } from "../../../../../shared/@types";
import { SERVER_EVENT_NAME, SPELL_NAME } from "../../../../../shared/constants";
import { soundAtom } from "../../../../atoms";
import { useListenServerEvent } from "../../../../hooks";
import { centerizeStyle } from "../../../../styles";
import Card from "../../Card";
import { cardPlayedAnimation, recentPlayedCard } from "./styles";

const RecentPlayedCard = (): JSX.Element => {
  const [sound] = useAtom(soundAtom);
  const [shouldAnimate, animate] = useState(false);
  const [card, setCard] = useState<CardInfo>({
    id: "",
    power: 0,
    spell: SPELL_NAME.Void,
  });

  //const stopAnimation = () => setCard(undefined);

  useListenServerEvent(SERVER_EVENT_NAME.CardPlayed, (card: CardInfo) => {
    setCard(card);
    animate(true);
    sound?.play("play_card");
  });

  useListenServerEvent(SERVER_EVENT_NAME.NewTurn, () => animate(false));

  return (
    <>
      {shouldAnimate && (
        <div css={[cardPlayedAnimation, centerizeStyle]}>
          <Card card={card} />
        </div>
      )}
      <Card small css={recentPlayedCard} card={card} />
    </>
  );
};

export default RecentPlayedCard;
