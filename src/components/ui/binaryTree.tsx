export class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export class BinaryTree {
  root: TreeNode | null = null;
  lastInsertedNode: TreeNode | null = null;

  insert(value: number) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      console.log(`Inserted root node: ${value}`);
    } else {
      this.insertNode(this.root, newNode);
    }
    this.lastInsertedNode = newNode;
  }

  insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
        console.log(
          `Inserted node: ${newNode.value} to the left of ${node.value}`,
        );
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        console.log(
          `Inserted node: ${newNode.value} to the right of ${node.value}`,
        );
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Serialize the tree to JSON
  serialize(): string {
    const serializeNode = (node: TreeNode | null): TreeNode | null => {
      if (!node) return null;
      return {
        value: node.value,
        left: serializeNode(node.left),
        right: serializeNode(node.right),
      };
    };
    return JSON.stringify(serializeNode(this.root));
  }

  // Deserialize the tree from JSON
  static deserialize(data: string): BinaryTree {
    interface SerializedTreeNode {
      value: number;
      left: SerializedTreeNode | null;
      right: SerializedTreeNode | null;
    }

    const deserializeNode = (
      obj: SerializedTreeNode | null,
    ): TreeNode | null => {
      if (!obj) return null;
      const node = new TreeNode(obj.value);
      node.left = deserializeNode(obj.left);
      node.right = deserializeNode(obj.right);
      return node;
    };

    const tree = new BinaryTree();
    try {
      const parsedData = JSON.parse(data);
      tree.root = deserializeNode(parsedData);
    } catch (error) {
      console.error("Failed to deserialize tree:", error);
      tree.root = null;
    }
    return tree;
  }
}
