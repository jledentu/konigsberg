import {GraphOptions, Graph} from './graph';
import Node from '../node';
import DirectedEdge from '../edge/directed-edge';

export default class DirectedGraph<N, E> extends Graph<N, E>{

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
    public createEdge(from: Node<N, E>, to: Node<N, E>, data: E): DirectedEdge<N, E> {
        return new DirectedEdge<N, E>(from, to, data);
    }
}
