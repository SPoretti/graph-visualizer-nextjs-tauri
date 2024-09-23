"use client";

import BinaryTreeVisualizer from "@/components/ui/binaryTreeVisualizer";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col p-2 gap-4">
      <div className="w-full flex-grow rounded-md">
        <BinaryTreeVisualizer />
      </div>
    </div>
  );
}
