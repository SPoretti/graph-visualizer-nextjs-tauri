"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InputComponentProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onInsert: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  inputValue,
  setInputValue,
  onInsert,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onInsert();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Binary Tree</CardTitle>
        <CardDescription>Insert one number at a time</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            placeholder="Insert number"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-grow"
          />
          <Button type="submit">Insert</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputComponent;
