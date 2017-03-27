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
};
