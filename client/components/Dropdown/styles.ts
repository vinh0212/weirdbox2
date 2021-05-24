import { css, SerializedStyles } from "@emotion/react";
import { COLOR } from "../../constants";
import { pixelBorderStyle } from "../../styles";

export const dropDownIconStyle = css`
  position: relative;
  margin-left: 10px;
`;

export const dropDownContentStyle = (top: boolean, background: string): SerializedStyles => css`
  ${pixelBorderStyle(2, [COLOR.Coal])}
  padding: 4px;
  display: grid;
  gap: 2px;
  position: absolute;
  grid-area: ${top ? "top" : "bottom"};
  background-color: ${background};
  ${top
    ? css`
        top: 0;
        transform: translateY(calc(-100% - 8px));
      `
    : css`
        margin-top: 8px;
      `};
`;
