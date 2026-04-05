export interface ModData {
  id: string;
  code: string;
  name: string;
}

export const parseMod = (fileName: string, code: string): ModData => {
  const nameMatch = code.match(/@name\s+(.+)/);

  return {
    id: fileName.split(".").slice(0, -1).join("."),
    code,
    name: nameMatch && nameMatch[1] ? nameMatch[1].trim() : "Untitled Mod",
  };
};

export const getMods = (): Promise<ModData[]> => {
  return new Promise((resolve) => {
    const handler = (e: MessageEvent) => {
      if (e.data.type === "RECEIVE_MODS") {
        window.removeEventListener("message", handler);
        resolve(e.data.mods);
      }
    };
    window.addEventListener("message", handler);
    window.postMessage({ type: "FETCH_MODS" }, "*");
  });
};

export const saveMod = (mod: ModData): Promise<void> => {
  return new Promise((resolve) => {
    const handler = (e: MessageEvent) => {
      if (e.data.type === "SAVE_MOD_SUCCESS" && mod.id === e.data.id) {
        window.removeEventListener("message", handler);
        resolve();
      }
    };
    window.addEventListener("message", handler);
    window.postMessage({ type: "SAVE_MOD", mod }, "*");
  });
};

export const removeMod = (mod: ModData): Promise<void> => {
  return new Promise((resolve) => {
    const handler = (e: MessageEvent) => {
      if (e.data.type === "REMOVE_MOD_SUCCESS" && mod.id === e.data.id) {
        window.removeEventListener("message", handler);
        resolve();
      }
    };
    window.addEventListener("message", handler);
    window.postMessage({ type: "REMOVE_MOD", id: mod.id }, "*");
  });
};

export const executeMod = (mod: ModData) => {
  console.log("Injecting Mod: " + mod.name);

  const blob = new Blob([`(() => {${mod.code}})()`], {
    type: "application/javascript",
  });
  const url = URL.createObjectURL(blob);

  const script = document.createElement("script");
  script.src = url;
  script.setAttribute("data-mod-id", mod.id);
  script.setAttribute("data-mod-name", mod.name);
  script.onload = () => URL.revokeObjectURL(url);

  document.head.appendChild(script);
};

export const loadMods = async () => {
  const mods = await getMods();
  for (const mod of mods) {
    executeMod(mod);
  }
};
