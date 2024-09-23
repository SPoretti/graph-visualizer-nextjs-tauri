"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-6 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Graph Visualizer
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Visualize and interact with various graph structures effortlessly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 mt-4">
          <Button className="w-full max-w-xs" variant="default">
            Binary Tree View
          </Button>
          <Button className="w-full max-w-xs" variant="secondary">
            Graph View
          </Button>
          <Button className="w-full max-w-xs" variant="outline">
            Settings
          </Button>
        </CardContent>
      </Card>
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Visualization</CardTitle>
              <CardDescription>
                Interact with graph nodes and edges to see real-time updates.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customizable Settings</CardTitle>
              <CardDescription>
                Adjust visualization settings to suit your preferences.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Multiple Graph Types</CardTitle>
              <CardDescription>
                Visualize different types of graphs including binary trees and
                more.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
              <CardDescription>
                Enjoy a seamless experience on any device with our responsive
                design.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
