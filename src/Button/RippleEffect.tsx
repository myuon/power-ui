import React, { useState, useCallback, MouseEvent } from "react";
import { css } from "@emotion/core";

const RippleEffect = ({
  top,
  left,
  radius,
  opacity,
  transition,
  scale,
  color,
}: {
  top: number;
  left: number;
  radius: number;
  opacity: number;
  transition: number;
  scale: number;
  color: string;
}) => css`
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    display: block;
    background: ${color};
    border-radius: 50%;
    pointer-events: none;

    top: ${top}px;
    left: ${left}px;
    width: ${radius}px;
    height: ${radius}px;
    opacity: ${opacity};
    transition: all ${transition}ms linear;
    transform: translate(-50%, -50%) scale(${scale});
    transform-origin: center;
  }
`;

export interface RippleEffectProps {
  color: string;

  /** @default 500 */
  duration?: number;
}

export const useRippleEffect = ({ color, duration }: RippleEffectProps) => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0);
  const [radius, setRadius] = useState(0);
  const [position, setPosition] = useState([0, 0]);
  const [transition, setTransition] = useState(0);
  const handleStart = useCallback(
    (event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setTransition(0);

      setRadius(
        Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 2
      );
      setPosition([event.clientX - rect.left, event.clientY - rect.top]);
      setOpacity(1);
      setScale(0);
      setTimeout(() => {
        setTransition(duration ?? 500);
        setOpacity(0);
        setScale(1);
      }, 0);
    },
    [duration]
  );

  return {
    RippleEffect: RippleEffect({
      top: position[1],
      left: position[0],
      radius,
      opacity,
      scale,
      transition,
      color,
    }),
    onStart: handleStart,
  };
};
