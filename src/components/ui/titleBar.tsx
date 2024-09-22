"use client";

import { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMinimize,
  faWindowMaximize,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
import ThemeButton from "@/components/ui/themeButton";
import MenuBarComponent from "@/components/ui/menuBarComponent";

export default function TitleBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const handleDrag = (event: React.MouseEvent) => {
    if (isClient && event.detail === 1) {
      appWindow.startDragging();
    }
  };

  const handleDoubleClick = () => {
    if (isClient) {
      appWindow.toggleMaximize();
    }
  };

  return (
    <nav className="h-8 w-full flex justify-between items-center">
      <div className="h-full w-fit flex items-center">
        <MenuBarComponent />
        <ThemeButton />
      </div>
      <div
        className="h-full w-full flex items-center justify-center"
        onMouseDown={handleDrag}
        onDoubleClick={handleDoubleClick}
      ></div>
      <div className="flex items-center h-full border rounded-sm">
        <button
          className="hover:bg-zinc-900 h-full w-full px-2"
          onClick={() => {
            appWindow.minimize();
          }}
        >
          <FontAwesomeIcon icon={faWindowMinimize} />
        </button>
        <button
          className="hover:bg-zinc-900 h-full w-full px-2"
          onClick={() => {
            appWindow.toggleMaximize();
          }}
        >
          <FontAwesomeIcon icon={faWindowMaximize} />
        </button>
        <button
          className="hover:bg-red-700 h-full w-full px-2"
          onClick={() => {
            appWindow.close();
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </nav>
  );
}
