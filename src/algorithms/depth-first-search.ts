import Node from '../node';

/**
 * Depth First Search algorithm
 */
export default class DepthFirstSearch<N, E> {

    private _root: Node<N, E>;

    constructor(root: Node<N, E>) {
        this._root = root;
    }

    [Symbol.iterator]() {
        let stack = [{node: this._root, d: 0}];
        let visited: Array<Node<N, E>> = [this._root];
        let iterator = {
            next() {
                if (stack.length === 0) {
                    return {value: undefined, done: true};
                }

                let current = stack.shift();

                if (visited.indexOf(current.node) === -1) {
                    visited.push(current.node);
                    let successors = current.node.directSuccessors().map(({node: adj}) => {
                        return {node: adj, d: current.d + 1};
                    });
                    stack.unshift.apply(stack, successors);
                } else {
                    return this.next();
                }

                return {
                    value: {
                        node: current.node,
                        d: current.d
                    },
                    done: false
                };
            }
        };
        return iterator;
    }
};
