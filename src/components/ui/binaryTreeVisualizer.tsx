import React, { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { BinaryTree, TreeNode } from "./binaryTree";
import "../../app/globals.css";

interface BinaryTreeVisualizerProps {
  tree: BinaryTree;
}

const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({
  tree,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const renderTree = useCallback(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const width = svg.node()?.getBoundingClientRect().width ?? 0;
      const height = svg.node()?.getBoundingClientRect().height ?? 0;
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      if (tree.root) {
        console.log("Tree root:", tree.root);
        const root = d3.hierarchy<TreeNode>(tree.root, (d) => {
          return d.left || d.right
            ? [d.left, d.right].filter(
                (node): node is TreeNode => node !== null,
              )
            : [];
        });

        const treeLayout = d3.tree<TreeNode>().size([innerWidth, innerHeight]);
        const treeData = treeLayout(root);

        console.log("Tree data:", treeData);
        console.log("Tree nodes:", treeData.descendants());
        console.log("Tree links:", treeData.links());

        // Draw links
        const linkGenerator = d3
          .linkVertical<
            d3.HierarchyPointLink<TreeNode>,
            d3.HierarchyPointNode<TreeNode>
          >()
          .x((d) => d.x) // Use x for horizontal layout
          .y((d) => d.y); // Use y for vertical layout

        g.selectAll(".link")
          .data(treeData.links())
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("d", linkGenerator)
          .attr("fill", "none")
          .attr("stroke", "var(--graph-node)")
          .attr("stroke-width", 2);

        // Draw nodes
        const nodes = g
          .selectAll(".node")
          .data(treeData.descendants())
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => `translate(${d.x},${d.y})`); // Use x and y for horizontal layout

        nodes
          .append("circle")
          .attr("r", 18)
          .attr("fill", "var(--graph-node-bg)")
          .attr("stroke", "var(--graph-node)")
          .attr("stroke-width", 2);

        nodes
          .append("text")
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .attr("fill", "var(--graph-label)")
          .text((d) => d.data.value);
      }
    }
  }, [tree]);

  useEffect(() => {
    renderTree();
  }, [renderTree]);

  return (
    <div className="flex flex-col h-full w-full rounded-md">
      <svg ref={svgRef} className="border w-full h-full"></svg>
    </div>
  );
};

export default BinaryTreeVisualizer;
