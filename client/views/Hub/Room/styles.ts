import { css } from "@emotion/react";
import { gridStyle, slotStyle } from "../../../styles";

export const roomStyle = css`
  ${gridStyle}
  position: absolute;
  bottom: 8px;
`;

export const memberListStyle = css`
  ${gridStyle}
  grid-template-columns: repeat(4, 48px);
`;

export const memberStyle = css`
  ${slotStyle()}
  ${gridStyle}
  justify-items: center;
  padding: 4px;
`;

export const keyStyle = css`
  transform: rotate(90deg);
  background-color: white;
  top: -12px;
  right: -2px;
`;