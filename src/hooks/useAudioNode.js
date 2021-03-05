import { useRef } from "react";

export default function useAudioNode(node) {
  const result = useRef(node);
  return result;
}
