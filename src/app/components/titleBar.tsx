import { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMinimize,
  faWindowMaximize,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/icon-64.png";
import Image from "next/image";

export default function TitleBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
    <nav className="h-7 w-full bg-customBlack text-customGray flex justify-between items-center">
      <div
        className="h-full w-full flex items-center px-2"
        onMouseDown={handleDrag}
        onDoubleClick={handleDoubleClick}
      >
        <div className="h-full w-fit bg-customGray rounded-full p-1">
          <Image src={logo} alt="Logo" width={20} height={20} className="" />
        </div>
      </div>
      <div className="flex items-center h-full">
        <button
          className="hover:bg-customDarkGray h-full w-full px-2"
          onClick={() => {
            appWindow.minimize();
          }}
        >
          <FontAwesomeIcon icon={faWindowMinimize} />
        </button>
        <button
          className="hover:bg-customDarkGray h-full w-full px-2"
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
