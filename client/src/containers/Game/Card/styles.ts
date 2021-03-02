import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../../constants/COLOR";
import { BorderColors, centerizeStyle, pixelBorderStyle } from "../../../styles";
import { shadeColor, tintColor } from "../../../utils/color";
import ContentFrameSprite from "../../../assets/sprites/card_content_frame.png";
import styled from "@emotion/styled";

const contentBorderWidth = 12;

const cardChosenStyle = css`
  transform: translateY(-30px);
  transition: transform 0.2s;
`;

export const cardStyle = (isChosen = false): SerializedStyles => css`
  ${pixelBorderStyle(2, [COLOR.Coal], [
    COLOR.White,
    ...new Array<string>(3).fill(shadeColor(COLOR.Paper, 20)),
  ] as BorderColors)}
  position: relative;
  box-sizing: border-box;
  background-color: ${COLOR.Paper};
  width: 4rem;
  height: 6rem;
  user-select: none;
  ${isChosen && cardChosenStyle}
`;

export const CardContent = styled.div`
  ${centerizeStyle}
  border: ${contentBorderWidth}px solid transparent;
  border-image: url(${ContentFrameSprite}) ${contentBorderWidth} round;
  width: 1rem;
  height: 3rem;
`;

const cardInfoStyle = css`
  position: absolute;
  display: inline-block;
  background-color: ${COLOR.Paper};
  color: ${tintColor(COLOR.Coal, 20)};
  font-family: "Dogica Pixel";
  font-size: 10px;
  font-weight: bold;
  left: 50%;
`;

export const CardPower = styled.div`
  ${cardInfoStyle};
  top: ${-contentBorderWidth};
  transform: translate(-50%, -25%);
`;

export const CardAction = styled.div`
  ${cardInfoStyle};
  bottom: ${-contentBorderWidth};
  transform: translate(-50%, 25%);
`;
