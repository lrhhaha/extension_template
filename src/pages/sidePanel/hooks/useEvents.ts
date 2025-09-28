import { useEffect } from "react";
import emitter from "../utils/eventEmitter";

const useEvents = () => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const { to, type, data } = message;
      if (to === "sidePanel") {
        emitter.emit(type, data);
      }
    });
  }, []);
};

export default useEvents;
