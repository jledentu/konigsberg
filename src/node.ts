import Edge from './edge/edge';

export default class Node<N, E> {

    /**
     * Node identifier
     */
    private _id: number|string;

    /**
     * Edges
     */
    private _edges: Map<Node<N, E>, Edge<N, E>>;

    /**
     * Node data
     */
    private _data: N;

    /**
     * Constructor.
     */
    constructor(id: number|string, data: N) {
        this._id = id;
        this._edges = new Map();
        this._data = data;
    }

    /**
     * Return edges connected to this node
     */
    public get id(): number|string {
        return this._id;
    }

    /**
     * Return edges connected to this node
     */
    public get edges(): Array<Edge<N, E>> {
        return Array.from(this._edges.values());
    }

    /**
     * Return data attached to this node
     */
    public get data(): N {
        return this._data;
    }

    /**
     * Add a directed edge from this node to an other node.
     */
    public addEdgeTo(to: Node<N, E>, data?: E) {
        this._edges.set(to, new Edge(this, to, data));
    }

    /**
     * Indicate whether this node has an edge connected to a given other node or not.
     */
    public hasEdgeTo(to: Node<N, E>): boolean {
        return this._edges.has(to);
    }

    /**
     * Return an edge from this node to a given node.
     */
    public getEdgeTo(to: Node<N, E>): Edge<N, E> {
        return this._edges.get(to);
    }

    /**
     * Remove an edge connected to this node.
     */
    public removeEdge(to: Node<N, E>) {
        this._edges.delete(to);
    }

    /**
     * Return adjacent nodes.
     */
    public adjacents() {
        return Array.from(this._edges.keys());
    }

    /**
     * Destroy this node.
     */
    public destroy() {
        for (let edge of this._edges.values()) {
            edge.destroy();
        }
    }
};
