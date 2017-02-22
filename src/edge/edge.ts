import Node from '../node';

export default class Edge<N, E> {

    /**
     * Source node
     */
    private _source: Node<N, E>;

    /**
     * Target node
     */
    private _target: Node<N, E>;

    /**
     * Node data
     */
    private _data: E;

    /**
     * Constructor
     */
    constructor(source: Node<N, E>, target: Node<N, E>, data?: E) {
        this._source = source;
        this._target = target;
        this._data = data;
    }

    /**
     * Destroy this edge.
     */
    destroy() {
        this._source.removeEdge(this._target);
        this._target.removeEdge(this._source);
    }
};
