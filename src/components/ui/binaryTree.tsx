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

  insert(value: number) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
      console.log(`Inserted root node: ${value}`);
    } else {
      this.insertNode(this.root, newNode);
    }
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
}
