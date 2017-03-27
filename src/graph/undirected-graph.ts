import {GraphOptions, Graph} from './graph';
import UndirectedEdge from '../edge/undirected-edge';
import * as Errors from '../errors';

export default class UndirectedGraph<N, E> extends Graph<N, E> {

    private _edges: Array<UndirectedEdge<N, E>> = [];

    constructor(options?: GraphOptions<N, E>) {
        super(options);
    }

    /**
     * Add an edge between two nodes.
     *
     * @param from {number|string} ID of the source node
     * @param to   {number|string} ID o  the target node
     * @param data {*}             Data to store in the new edge
     * @throws {Errors.NodeNotExistsError} if one of the nodes does not exist
     */
    addEdge(from: number|string, to: number|string, data: E): void {
        let fromNode = this.getNode(from);

        if (!fromNode) {
            throw new Errors.NodeNotExistsError(from);
        }

        let toNode = this.getNode(to);

        if (!toNode) {
            throw new Errors.NodeNotExistsError(to);
        }

        if (!this._edges) {
            this._edges = [];
        }

        this._edges.push(new UndirectedEdge<N, E>(fromNode, toNode, data));
    }

    /**
     * Remove an edge from the graph.
     *
     * @param from {number|string} ID of the node
     * @param to   {number|string} ID of the target node of the edge to remove
     * @throws {Errors.NodeNotExistsError} if the node does not exist
     */
    removeEdge(from: number|string, to: number|string): void {

        let edge = this.getEdge(from, to);

        if (edge) {
            edge.destroy();
        }

        let index = this._edges.findIndex((e) => e === edge);
        if (index !== -1) {
            this._edges.splice(index, 1);
        }
    }
}
