import { useEffect } from "react";

export default function useChainAudioNodes(firstNode, ...nodes) {
  useEffect(() => {
    firstNode.chain(...nodes);
  });

  return true;
}
