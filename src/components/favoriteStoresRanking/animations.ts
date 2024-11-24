import { keyframes } from "@emotion/react";

export const sparkle = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; filter: brightness(1); }
  50% { transform: scale(1.2); opacity: 1; filter: brightness(1.5); }
`;

export const titleAnimation = keyframes`
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.3); }
  100% { transform: scale(1); filter: brightness(1); }
`;

export const gradientText = keyframes`
  0% { background-position: 0%; }
  100% { background-position: 200%; }
`;
