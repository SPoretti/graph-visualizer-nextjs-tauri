import React, { createContext, useContext, useState } from "react";
import { BinaryTree } from "@/components/ui/binaryTree";

interface TreeContextProps {
  tree: BinaryTree;
  setTree: (tree: BinaryTree) => void;
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

interface TreeProviderProps {
  children: React.ReactNode;
}

export const TreeProvider: React.FC<TreeProviderProps> = ({ children }) => {
  const [tree, setTree] = useState<BinaryTree>(new BinaryTree());

  return (
    <TreeContext.Provider value={{ tree, setTree }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = (): TreeContextProps => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }
  return context;
};
