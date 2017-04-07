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

    /**
     * Return the direct predecessors of a given node.
     *
     * @param id {number | string} ID of the node
     * @return {Array} Array containing the direct predecessors IDs
     */
    public directPredecessors(id: number | string): Array<{node: Node<N, E>, edge: DirectedEdge<N, E>}> {
        let node = this.getNode(id);

        if (node) {
            return node.directPredecessors();
        }

        return [];
    }

    /**
     * Return the direct successors of a given node.
     *
     * @param id {number | string} ID of the node
     * @return {Array} Array containing the direct successors IDs
     */
    public directSuccessors(id: number | string): Array<{node: Node<N, E>, edge: DirectedEdge<N, E>}> {
        let node = this.getNode(id);

        if (node) {
            return node.directSuccessors();
        }

        return [];
    }
}
