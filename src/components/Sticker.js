import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

// Ovals
import Sticker0 from "../images/stickers/sticker0.svg";
import Sticker10 from "../images/stickers/sticker10.svg";
import Sticker11 from "../images/stickers/sticker11.svg";

// Squres
import Sticker1 from "../images/stickers/sticker1.svg";
import Sticker2 from "../images/stickers/sticker2.svg";
import Sticker3 from "../images/stickers/sticker3.svg";
import Sticker4 from "../images/stickers/sticker4.svg";
import Sticker5 from "../images/stickers/sticker5.svg";
import Sticker6 from "../images/stickers/sticker6.svg";

// Rectangles
import Sticker7 from "../images/stickers/sticker7.svg";
import Sticker8 from "../images/stickers/sticker8.svg";
import Sticker9 from "../images/stickers/sticker9.svg";

import sample from "lodash/sample";
import { useState } from "react";
import { useEffect } from "react";
import random from "lodash/random";

const Sticker = ({
  isFirstSticker,
  coordinates,
  rotation,
  scale,
  variants,
}) => {
  const [design, setDesign] = useState();

  useEffect(() => {
    setDesign(isFirstSticker ? 0 : random(1, 11));
  }, [isFirstSticker]);

  return (
    <StyledSticker
      design={design}
      as={motion.div}
      animate={{ scale: scale, rotate: rotation }}
      transition={{
        type: "spring",
        damping: 16,
        stiffness: 400,
      }}
      style={{
        top: coordinates.y * 100 + "%",
        left: coordinates.x * 100 + "%",
      }}
    />
  );
};

const handleWidth = (design) => {
  switch (design) {
    case 0:
    case 10:
    case 11:
      return 12;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return 10;
    case 7:
    case 8:
    case 9:
      return 15;
    default:
      return 0;
  }
};

const handleHeight = (design) => {
  switch (design) {
    case 0:
    case 10:
    case 11:
      return 8;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return 10;
    case 7:
    case 8:
    case 9:
      return 5;
    default:
      return 0;
  }
};

const handleDesign = (design) => {
  switch (design) {
    case 0:
      return Sticker0;
    case 1:
      return Sticker1;
    case 2:
      return Sticker2;
    case 3:
      return Sticker3;
    case 4:
      return Sticker4;
    case 5:
      return Sticker5;
    case 6:
      return Sticker6;
    case 7:
      return Sticker7;
    case 8:
      return Sticker8;
    case 9:
      return Sticker9;
    case 10:
      return Sticker10;
    case 11:
      return Sticker11;
    default:
      return null;
  }
};

const StyledSticker = styled.div`
  pointer-events: none;
  position: absolute;
  filter: drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.2));
  &::before {
    content: "";
    width: ${({ design }) => handleWidth(design)}vw;
    height: ${({ design }) => handleHeight(design)}vw;
    background-image: url(${({ design }) => handleDesign(design)});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    transform: translateX(-50%) translateY(-50%) scale(50%);
  }
`;

export default Sticker;
