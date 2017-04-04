import {Edge} from './edge';
import Node from '../node';

export default class DirectedEdge<N, E> extends Edge<N, E> {

    /**
     * Indicate whether this edge is directed or not.
     */
    public isDirected(): boolean {
        return true;
    }

    /**
     * Indicate whether this edge is an incoming edge of a given node or not.
     */
    public isIncoming(node: Node<N, E>): boolean {
        return node === this._target;
    }

    /**
     * Indicate whether this edge is an incoming edge of a given node or not.
     */
    public isOutgoing(node: Node<N, E>): boolean {
        return node === this._source;
    }

    /**
     * Get the direct predecessor of the given node by this edge.
     *
     * @param node
     */
    public directPredecessor(node: Node<N, E>): Node<N, E> {
        return (node === this._target) ? this._source : undefined;
    }

    /**
     * Get the direct successor of the given node by this edge.
     *
     * @param node
     */
    public directSuccessor(node: Node<N, E>): Node<N, E> {
        return (node === this._source) ? this._target : undefined;
    }
};
