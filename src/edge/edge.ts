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
     * Node data
     */
    protected _data: E;

    /**
     * Constructor
     */
    constructor(source: Node<N, E>, target: Node<N, E>, data?: E) {
        this._source = source;
        this._target = target;
        this._data = data;

        source.attachEdge(this._target, this);
        target.attachEdge(this._source, this);
    }

    /**
     * Destroy this edge.
     */
    public destroy() {
        this._source.detachEdge(this._target);
        this._target.detachEdge(this._source);
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
};
