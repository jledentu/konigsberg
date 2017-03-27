import {Edge} from './edge';
import Node from '../node';

export default class UndirectedEdge<N, E> extends Edge<N, E> {

    /**
     * Indicate whether this edge is directed or not.
     */
    public isDirected(): boolean {
        return false;
    }

    /**
     * Indicate whether this edge is an incoming edge of a given node or not.
     */
    public isIncoming(node: Node<N, E>): boolean {
        return node === this._target || node === this._target;
    }

    /**
     * Indicate whether this edge is an incoming edge of a given node or not.
     */
    public isOutgoing(node: Node<N, E>): boolean {
        return this.isIncoming(node);
    }
};
