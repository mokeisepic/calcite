export const getAssetUrl = (path: string): Promise<string> => {
  return new Promise((resolve) => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "RECEIVE_ASSET" && event.data.path === path) {
        window.removeEventListener("message", handler);
        resolve(event.data.url);
      }
    };
    window.addEventListener("message", handler);
    window.postMessage({ type: "GET_ASSET", path }, "*");
  });
};
