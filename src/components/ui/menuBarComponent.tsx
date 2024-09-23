import ThemeButton from "@/components/ui/themeButton";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { BinaryTree } from "./binaryTree";
import { useTree } from "@/components/tree-context";
import { useRouter } from "next/navigation";

const MenuBarComponent: React.FC = () => {
  const { tree, setTree } = useTree();
  const [recentFiles, setRecentFiles] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // Load recent files from local storage
    const storedRecentFiles = localStorage.getItem("recentFiles");
    if (storedRecentFiles) {
      setRecentFiles(JSON.parse(storedRecentFiles));
    }
  }, []);

  useEffect(() => {
    // Save recent files to local storage whenever it changes
    if (isClient) {
      localStorage.setItem("recentFiles", JSON.stringify(recentFiles));
    }
  }, [recentFiles, isClient]);

  const handleOpenFile = async () => {
    try {
      const selectedFile = await open({
        multiple: false,
        filters: [{ name: "Text Files", extensions: ["txt", "json"] }],
      });

      if (selectedFile && typeof selectedFile === "string") {
        const contents = await readTextFile(selectedFile);
        const loadedTree = BinaryTree.deserialize(contents);
        setTree(loadedTree);

        // Update recent files
        setRecentFiles((prev) =>
          [selectedFile, ...prev.filter((f) => f !== selectedFile)].slice(0, 5),
        ); // Keep only the 5 most recent files

        if (isClient) {
          router.push("/binary-tree");
        }
      }
    } catch (error) {
      console.error("Error opening file:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleSaveFile = async () => {
    try {
      const filePath = await save({
        filters: [{ name: "Text Files", extensions: ["txt", "json"] }],
      });

      if (filePath) {
        const serializedTree = tree.serialize();
        await writeTextFile(filePath, serializedTree);
      }
    } catch (error) {
      console.error("Error saving file:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleOpenRecent = async (fileName: string) => {
    try {
      const contents = await readTextFile(fileName);
      const loadedTree = BinaryTree.deserialize(contents);
      setTree(loadedTree);
      router.push("/binary-tree");
    } catch (error) {
      console.error("Error opening recent file:", error);
      // You might want to show an error message to the user here
      // and possibly remove the file from recent files if it's no longer accessible
      setRecentFiles((prev) => prev.filter((f) => f !== fileName));
    }
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={handleOpenFile}>
            Open <MenubarShortcut>ctrl+o</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={handleSaveFile}>
            Save <MenubarShortcut>ctrl+s</MenubarShortcut>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
            <MenubarSubContent>
              {recentFiles.length > 0 ? (
                recentFiles.map((file, index) => (
                  <MenubarItem
                    key={index}
                    onSelect={() => handleOpenRecent(file)}
                  >
                    {file.split("/").pop()}{" "}
                    {/* Display only the file name, not the full path */}
                  </MenubarItem>
                ))
              ) : (
                <MenubarItem disabled>No recent files</MenubarItem>
              )}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>ctrl+P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href="/">Home</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href="/binary-tree">Binary Tree</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href="/nfa">NFA</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href="/heap">Heap</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <ThemeButton />
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBarComponent;
