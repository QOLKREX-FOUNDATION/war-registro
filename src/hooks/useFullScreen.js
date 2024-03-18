import { useRef, useState } from "react";

export const useFullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const refScreen = useRef(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      refScreen.current.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  return {
    fullScreen,
    toggleFullScreen,
    refScreen,
  };
};
