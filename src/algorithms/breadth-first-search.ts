import Node from '../node';

export default class BreadthFirstSearch<N, E> {

    private _root: Node<N, E>;

    constructor(root: Node<N, E>) {
        this._root = root;
    }

    [Symbol.iterator]() {
        let queue = [{node: this._root, d: 0}];
        let visited: Array<Node<N, E>> = [this._root];
        let iterator = {
            next() {
                if (queue.length === 0) {
                    return {value: undefined, done: true};
                }

                let current = queue.shift();
                for (let adj of current.node.adjacents()) {
                    if (visited.indexOf(adj) === -1) {
                        queue.push({node: adj, d: current.d + 1});
                        visited.push(adj);
                    }
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
