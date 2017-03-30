import Edge from './edge/edge';

export default class Node<N, E> {

    /**
     * Node identifier
     */
    private _id: number|string;

    /**
     * Edges
     */
    private _edges: Array<Edge<N, E>> = [];

    /**
     * Node data
     */
    private _data: N;

    /**
     * Constructor
     */
    constructor(id: number|string, data: N) {
        this._id = id;
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
        return this._edges;
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
     * Return degree (number of connected edges) of this node.
     */
    public get degree(): number {
        return this._edges.length;
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
    public attachEdge(edge: Edge<N, E>) {
        this._edges.push(edge);
    }

    /**
     * Indicate whether this node has an edge connected to a given other node or not.
     */
    public hasEdgeBetween(adjacent: Node<N, E>): boolean {
        return this.getEdgeBetween(adjacent).length > 0;
    }

    /**
     * Return edges from this node to a given node.
     */
    public getEdgeBetween(adjacent: Node<N, E>): Array<Edge<N, E>> {
        return this.edges.filter((e) => {
            return e.adjacent(this) === adjacent
        });
    }

    /**
     * Remove an edge connected to this node.
     */
    public detachEdge(edge: Edge<N, E>): void {
        let idx = this._edges.indexOf(edge);

        if (idx !== -1) {
            this._edges.splice(idx, 1);
        }
    }

    /**
     * Return adjacent nodes.
     */
    public adjacents(): Array<Node<N, E>> {
        return this._edges.map((e) => e.adjacent(this));
    }

    /**
     * Destroy this node.
     */
    public destroy(): void {
        for (let edge of this._edges) {
            console.log(edge);
            edge.destroy();
        }
    }
};
