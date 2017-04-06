import Node from './node';
import {Edge} from './edge/edge';

/**
 * A Path represents a path in a Graph.
 */
export default class Path<N, E> {

    private _nodes: Array<Node<N, E>> = [];
    private _edges: Array<Edge<N, E>> = [];

    /**
     * Constructor.
     *
     * @param nodes Nodes making up the path
     * @param edges Edges making up the path
     */
    constructor(nodes: Array<Node<N, E>> = [], edges: Array<Edge<N, E>> = []) {
        this._nodes = nodes;
        this._edges = edges;
    }

    /**
     * Return the sequence of nodes traversed by this path.
     */
    public get nodes() {
        return this._nodes;
    }

    /**
     * Return the sequence of edges traversed by this path.
     */
    public get edges() {
        return this._edges;
    }

    /**
     * Return the start node of this path.
     */
    public get start(): Node<N, E> {
        return this.nodes.length > 0 ? this._nodes[0] : undefined;
    }

    /**
     * Return the end node of this path.
     */
    public get end(): Node<N, E> {
        return this.nodes.length > 0 ? this._nodes[this._nodes.length - 1] : undefined;
    }

    /**
     * Return the number of edges traversed by this path.
     *
     * @returns {number} Number of edges of this path
     */
    public get length(): number {
        return this.edges.length;
    }

    /**
     * Return a string displaying this path.
     */
    public toString(): string {
        return this.nodes.reduce((s, node) => s + (s ? '->' : '') + node.id, '');
    }
}
