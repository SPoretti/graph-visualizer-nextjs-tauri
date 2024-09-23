"use client";

import { useEffect, useState } from "react";
import {
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  Cross2Icon,
  DividerHorizontalIcon,
} from "@radix-ui/react-icons";
import MenuBarComponent from "@/components/ui/menuBarComponent";

export default function TitleBar() {
  const [isClient, setIsClient] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [appWindow, setAppWindow] = useState<
    import("@tauri-apps/api/window").WebviewWindow | null
  >(null);

  useEffect(() => {
    setIsClient(true);

    const initializeTauri = async () => {
      const { appWindow } = await import("@tauri-apps/api/window");
      setAppWindow(appWindow);

      const checkMaximized = async () => {
        const maximized = await appWindow.isMaximized();
        setIsMaximized(maximized);
      };

      checkMaximized();

      const resizeListener = appWindow.listen("tauri://resize", checkMaximized);

      return () => {
        resizeListener.then((unlisten) => unlisten());
      };
    };

    initializeTauri();
  }, []);

  if (!isClient || !appWindow) {
    return null;
  }

  const handleToggleMaximize = async () => {
    if (isMaximized) {
      await appWindow.unmaximize();
    } else {
      await appWindow.maximize();
    }
    setIsMaximized(!isMaximized);
  };

  const handleDrag = (event: React.MouseEvent) => {
    if (event.detail === 1) {
      appWindow.startDragging();
    }
  };

  const handleDoubleClick = () => {
    appWindow.toggleMaximize();
  };

  return (
    <nav className="h-10 pl-1 w-full flex justify-between items-center border-b">
      <div className="h-8 w-fit flex items-center">
        <MenuBarComponent />
      </div>
      <div
        className="h-full w-full flex items-center"
        onMouseDown={handleDrag}
        onDoubleClick={handleDoubleClick}
      ></div>
      <div className="flex items-center h-full">
        <button
          className="hover:bg-zinc-900 h-full w-full px-2"
          onClick={() => {
            appWindow.minimize();
          }}
        >
          <DividerHorizontalIcon />
        </button>
        <button
          className="hover:bg-zinc-900 h-full w-full px-2"
          onClick={handleToggleMaximize}
        >
          {isMaximized ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
        </button>
        <button
          className="hover:bg-red-700 h-full w-full px-2"
          onClick={() => {
            appWindow.close();
          }}
        >
          <Cross2Icon />
        </button>
      </div>
    </nav>
  );
}
