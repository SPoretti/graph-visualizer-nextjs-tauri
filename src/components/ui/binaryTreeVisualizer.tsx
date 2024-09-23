"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import * as d3 from "d3";
import { BinaryTree, TreeNode } from "./binaryTree";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import InputComponent from "@/components/ui/inputBinaryTreeComponent";
import { useTree } from "@/components/tree-context";

const BinaryTreeVisualizer: React.FC = () => {
  const { tree, setTree } = useTree();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const [lastInsertedNode, setLastInsertedNode] = useState<TreeNode | null>(
    null,
  );
  const [inputValue, setInputValue] = useState("");

  const renderTree = useCallback(() => {
    if (svgRef.current && gRef.current) {
      const svg = d3.select(svgRef.current);
      const g = d3.select(gRef.current);
      g.selectAll("*").remove();

      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const width = svg.node()?.getBoundingClientRect().width ?? 0;
      const height = svg.node()?.getBoundingClientRect().height ?? 0;
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      g.attr("transform", `translate(${margin.left},${margin.top})`);

      if (tree.root) {
        const root = d3.hierarchy<TreeNode>(tree.root, (d) => {
          return d.left || d.right
            ? [d.left, d.right].filter(
                (node): node is TreeNode => node !== null,
              )
            : [];
        });

        const treeLayout = d3.tree<TreeNode>().size([innerWidth, innerHeight]);
        const treeData = treeLayout(root);

        // Draw links
        const linkGenerator = d3
          .linkVertical<
            d3.HierarchyPointLink<TreeNode>,
            d3.HierarchyPointNode<TreeNode>
          >()
          .x((d) => d.x)
          .y((d) => d.y);

        const links = g
          .selectAll(".link")
          .data(treeData.links())
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("fill", "none")
          .attr("stroke", "var(--graph-node)")
          .attr("stroke-width", 2)
          .attr("d", linkGenerator);

        // Animate links
        links
          .attr("stroke-dasharray", function () {
            const length = (this as SVGPathElement).getTotalLength();
            return `${length} ${length}`;
          })
          .attr("stroke-dashoffset", function () {
            return (this as SVGPathElement).getTotalLength();
          })
          .transition()
          .duration(1000)
          .attr("stroke-dashoffset", 0);

        // Draw nodes
        const nodes = g
          .selectAll(".node")
          .data(treeData.descendants())
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => `translate(${d.x},${d.y})`);

        nodes
          .append("circle")
          .attr("r", 0)
          .attr("fill", "var(--graph-node-bg)")
          .attr("stroke", (d) =>
            d.data === lastInsertedNode ? "red" : "var(--graph-node)",
          )
          .attr("stroke-width", 2)
          .transition()
          .duration(1000)
          .attr("r", 18);

        nodes
          .append("text")
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("fill", "var(--graph-label)")
          .text((d) => d.data.value)
          .style("opacity", 0)
          .transition()
          .duration(1000)
          .style("opacity", 1);
      }
    }
  }, [tree, lastInsertedNode]);

  useEffect(() => {
    renderTree();
  }, [renderTree]);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      renderTree();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderTree]);

  // Detect changes in the tree and update the last inserted node
  useEffect(() => {
    setLastInsertedNode(tree.lastInsertedNode);
    renderTree();
  }, [tree, renderTree]);

  // Set up zoom behavior
  useEffect(() => {
    if (svgRef.current && gRef.current) {
      const svg = d3.select(svgRef.current);
      const g = d3.select(gRef.current);

      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 2])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });

      svg.call(zoom);
    }
  }, []);

  const handleClearTree = () => {
    const newTree = new BinaryTree();
    setTree(newTree);
    setLastInsertedNode(null);
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
    }
  };

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      const newTree = Object.assign(
        Object.create(Object.getPrototypeOf(tree)),
        tree,
      );
      newTree.insert(value);
      setTree(newTree);
      setLastInsertedNode(newTree.lastInsertedNode);
      setInputValue("");
      renderTree();
    }
  };

  const getNodeValues = (node: TreeNode | null): number[] => {
    if (!node) return [];
    return [
      node.value,
      ...getNodeValues(node.left),
      ...getNodeValues(node.right),
    ];
  };

  const nodeValues = getNodeValues(tree.root);

  return (
    <div className="flex flex-row justify-evenly items-start h-full w-full rounded-md border relative p-2">
      <svg ref={svgRef} className="w-full h-full">
        <g ref={gRef}></g>
      </svg>
      <Button
        className="absolute top-2 right-2 w-10 h-10 bg-background text-foreground border p-2 rounded-sm hover:bg-red-700"
        onClick={handleClearTree}
      >
        <TrashIcon />
      </Button>
      <div className="absolute bottom-2 right-2 text-xs bg-background text-foreground shadow">
        Nodes: {nodeValues.join(", ")}
      </div>
      <div className="absolute top-2 left-2">
        <InputComponent
          inputValue={inputValue}
          setInputValue={setInputValue}
          onInsert={handleInsert}
        />
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;
