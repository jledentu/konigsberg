import Node from '../node';

export abstract class Edge<N, E> {

    /**
     * Source node
     */
    protected _source: Node<N, E>;

    /**
     * Target node
     */
    protected _target: Node<N, E>;

    /**
     * Edge data
     */
    protected _data: E;

    /**
     * Constructor
     */
    constructor(source: Node<N, E>, target: Node<N, E>, data?: E) {
        this._source = source;
        this._target = target;
        this._data = data;

        source.attachEdge(this);
        target.attachEdge(this);
    }

    /**
     * Return the data attached to this edge.
     */
    public get data(): E {
        return this._data;
    }

    /**
     * Destroy this edge.
     */
    public destroy() {
        this._source.detachEdge(this);
        this._target.detachEdge(this);
    }

    /**
     * Get the neighbor of the given node by this edge.
     *
     * @param node
     */
    public neighbor(node: Node<N, E>): Node<N, E> {
        if (node === this._source) {
            return this._target;
        } else if (node === this._target) {
            return this._source;
        } else {
            return undefined;
        }
    }

    /**
     * Indicate whether this edge is directed or not.
     */
    public abstract isDirected(): boolean;

    /**
     * Indicate whether this edge is an incoming edge of a given node or not.
     */
    public abstract isIncoming(node: Node<N, E>): boolean;

    /**
     * Indicate whether this edge is an incoming edge of a given node or not.
     */
    public abstract isOutgoing(node: Node<N, E>): boolean;

    /**
     * Get the direct predecessor of the given node by this edge.
     *
     * @param node
     */
    public abstract directPredecessor(node: Node<N, E>): Node<N, E>;

    /**
     * Get the direct successor of the given node by this edge.
     *
     * @param node
     */
    public abstract directSuccessor(node: Node<N, E>): Node<N, E>;
};
