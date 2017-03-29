import {GraphOptions, Graph} from './graph';
import Node from '../node';
import UndirectedEdge from '../edge/undirected-edge';

export default class UndirectedGraph<N, E> extends Graph<N, E> {

    constructor(options?: GraphOptions<N, E>) {
        super(options);
    }

    /**
     * Create a new edge.
     *
     * @param from {Node} Source node
     * @param to   {Node} Target node
     * @param data {*}    Data to store in the new edge
     */
    createEdge(from: Node<N, E>, to: Node<N, E>, data: E): UndirectedEdge<N, E> {
        return new UndirectedEdge<N, E>(from, to, data);
    }
}
