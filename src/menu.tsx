import { render } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import styles from "./menu.css" with { type: "text" };
import {
  executeMod,
  getMods,
  type ModData,
  parseMod,
  removeMod,
  saveMod,
} from "./mods";
import { getAssetUrl } from "./assets";

let openMenuInternal: () => void;

const Menu = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [logoUrl, setLogoUrl] = useState("");

  const [needRefresh, setNeedRefresh] = useState(false);
  const [mods, setMods] = useState<ModData[]>([]);

  useEffect(() => {
    openMenuInternal = () => {
      if (dialogRef.current) dialogRef.current.showModal();
    };

    const fetchMods = async () => {
      const data = await getMods();
      setMods(data);
    };
    fetchMods();

    const fetchLogoUrl = async () => {
      setLogoUrl(await getAssetUrl("assets/full.png"));
    };
    fetchLogoUrl();
  }, []);

  const handleUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0] as File;
    const reader = new FileReader();
    reader.onload = async () => {
      const newMod = parseMod(file.name, reader.result as string);

      setMods((prevMods) => {
        const existingIndex = prevMods.findIndex((m) => m.id === newMod.id);

        if (existingIndex !== -1) {
          const updatedMods = [...prevMods];
          updatedMods[existingIndex] = newMod;
          setNeedRefresh(true);
          return updatedMods;
        } else {
          executeMod(newMod);
          return [...prevMods, newMod];
        }
      });

      await saveMod(newMod);

      (e.target as HTMLInputElement).value = "";
    };
    reader.readAsText(file);
  };

  const handleRemoveMod = async (mod: ModData) => {
    await removeMod(mod);
    setMods(mods.filter((i) => i != mod));
    setNeedRefresh(true);
  };

  const handleClose = () => {
    if (needRefresh) window.location.reload();
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef}>
      <header>
        <img src={logoUrl} alt="Calcite" />
        <button onClick={handleClose}>
          🗙
        </button>
      </header>
      <input type="file" accept=".js" onChange={handleUpload} />
      {mods.length > 0 && (
        <ul>
          {mods.map((mod) => (
            <li>
              {mod.name}
              <button onClick={() => handleRemoveMod(mod)}>
                🗙
              </button>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  );
};

export const openMenu = () => openMenuInternal();

export const initMenu = () =>
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    container.id = "calcite-container";
    document.body.appendChild(container);
    render(<Menu />, container);

    const styleElem = document.createElement("style");
    styleElem.textContent = styles;
    document.head.appendChild(styleElem);
  });
