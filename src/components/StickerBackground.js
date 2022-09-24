import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import Sticker from "./Sticker";
import { useImmer } from "use-immer";
import last from "lodash/last";
import random from "lodash/random";

const StickerBackground = () => {
  const ref = useRef();

  const chooseStartCoordinates = (side) => {
    const x = side === 0 ? random(0.1, 0.3) : random(0.7, 0.9);
    const y = random(0.1, 0.9);
    return { x, y };
  };

  const [initialStickers] = useState([
    {
      coordinates: chooseStartCoordinates(0),
      rotation: random(-20, 20),
      scale: random(2, 2.5, true),
      isVisible: true,
      isFirstSticker: false,
    },
    {
      coordinates: chooseStartCoordinates(0),
      rotation: random(-20, 20),
      scale: random(2, 2.5, true),
      isVisible: true,
      isFirstSticker: false,
    },
    {
      coordinates: chooseStartCoordinates(1),
      rotation: random(-20, 20),
      scale: random(2, 2.5, true),
      isVisible: true,
      isFirstSticker: false,
    },
    {
      coordinates: chooseStartCoordinates(1),
      rotation: random(-20, 20),
      scale: random(2, 2.5, true),
      isVisible: true,
      isFirstSticker: false,
    },
  ]);
  const [stickers, setStickers] = useImmer([
    {
      coordinates: { x: 0.5, y: 0.5 },
      rotation: random(-20, 20),
      scale: random(2, 2.5, true),
      isVisible: false,
      isFirstSticker: true,
    },
  ]);

  const handleMouseMove = (e) => {
    setStickers((draft) => {
      const currentSticker = last(draft);
      currentSticker.isVisible = true;
      currentSticker.coordinates.x =
        (e.clientX - ref.current.getBoundingClientRect().x) /
        ref.current.offsetWidth;
      currentSticker.coordinates.y =
        (e.clientY - ref.current.getBoundingClientRect().y) /
        ref.current.offsetHeight;
    });
  };

  const handleMouseDown = (e) => {
    console.log(e);
    setStickers((draft) => {
      const currentSticker = last(draft);
      draft.push({
        coordinates: {
          x: currentSticker.coordinates.x,
          y: currentSticker.coordinates.y,
        },
        rotation: random(-20, 20),
        isVisible: true,
        scale: random(2, 2.5, true),
        isFirstSticker: false,
      });
    });
  };

  const handleMouseOut = () => {
    setStickers((draft) => {
      const currentSticker = last(draft);
      currentSticker.isVisible = false;
    });
  };

  return (
    <>
      <StyledStickerBackground
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseOut}
        onMouseDown={handleMouseDown}
      >
        {initialStickers.map(
          (sticker, index) =>
            sticker.isVisible && (
              <Sticker
                key={index}
                isFirstSticker={sticker.isFirstSticker}
                coordinates={sticker.coordinates}
                rotation={sticker.rotation}
                scale={sticker.scale}
              />
            )
        )}
        {stickers.map((sticker, index) => {
          return (
            sticker.isVisible && (
              <Sticker
                key={index}
                isFirstSticker={sticker.isFirstSticker}
                coordinates={sticker.coordinates}
                rotation={sticker.rotation}
                scale={sticker.scale}
              />
            )
          );
        })}
        <p style={{ position: "relative", pointerEvents: "none" }}>
          Stride Micro Design Career Fair
        </p>
      </StyledStickerBackground>{" "}
    </>
  );
};

export default StickerBackground;

const StyledStickerBackground = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 512px;
  background: #fbf4ec;
  display: flex;
  justify-content: center;
  align-items: center;
`;
