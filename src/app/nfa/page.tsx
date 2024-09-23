"use client";

import React, { useState, useCallback } from "react";
import InputComponent from "@/components/ui/inputBinaryTreeComponent";
import BinaryTreeVisualizer from "@/components/ui/binaryTreeVisualizer";
import { BinaryTree } from "@/components/ui/binaryTree";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [tree, setTree] = useState(() => new BinaryTree());

  const handleInsert = useCallback(() => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      const newTree = Object.assign(
        Object.create(Object.getPrototypeOf(tree)),
        tree,
      );
      newTree.insert(value);
      setTree(newTree);
      setInputValue("");
    }
  }, [inputValue, tree]);

  return (
    <div className="h-full w-full flex flex-col p-2 gap-4">
      <div className="w-full">
        <p>NFA</p>
        <InputComponent
          inputValue={inputValue}
          setInputValue={setInputValue}
          onInsert={handleInsert}
        />
      </div>
      <div className="w-full flex-grow rounded-md">
        <BinaryTreeVisualizer tree={tree} />
      </div>
    </div>
  );
}
