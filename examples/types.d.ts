declare global {
  const api: {
    onLoad: (cb: () => void) => void;
  };
}

export {};
