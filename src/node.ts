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
     * Constructor
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
     * Return incoming edges connected to this node
     */
    public get inEdges(): Array<Edge<N, E>> {
        return this.edges.filter((e) => {
            return e.isIncoming(this); 
        });
    }

    /**
     * Return outgoing edges connected from this node
     */
    public get outEdges(): Array<Edge<N, E>> {
        return this.edges.filter((e) => {
            return e.isOutcoming(this); 
        });
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
    public attachEdge(adjacent: Node<N, E>, edge: Edge<N, E>) {
        this._edges.set(adjacent, edge);
    }

    /**
     * Indicate whether this node has an edge connected to a given other node or not.
     */
    public hasEdgeBetween(adjacent: Node<N, E>): boolean {
        return this._edges.has(adjacent);
    }

    /**
     * Return an edge from this node to a given node.
     */
    public getEdgeBetween(adjacent: Node<N, E>): Edge<N, E> {
        return this._edges.get(adjacent);
    }

    /**
     * Remove an edge connected to this node.
     */
    public detachEdge(edge: Edge<N, E>) {
        for (let [adjacent, e] of this._edges) {
            if (e === edge) {
                this._edges.delete(adjacent);
                break;
            }
        }
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
