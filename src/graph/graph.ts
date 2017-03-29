import Node from '../node';
import Edge from '../edge/edge';
import * as Errors from '../errors';

export interface GraphOptions<N, E> {
    nodes?: Array<Node<N, E>>,
    edges?: Array<Edge<N, E>>,
    noLoops?: boolean
};

export abstract class Graph<N, E> {

    public noLoops: boolean = false;
    private _nodes: Map<number|string, Node<N, E>>;
    private _edges: Array<Edge<N, E>> = [];

    constructor(options?: GraphOptions<N, E>) {

        this._nodes = new Map();

        if (options) {
            if (Object.prototype.hasOwnProperty.call(options, 'nodes')) {
                for (let node of options.nodes) {
                    if (Array.isArray(node) && node.length > 1) {
                        this.addNode(node[0], node[1]);
                    }
                }
            }

            if (Object.prototype.hasOwnProperty.call(options, 'edges')) {
                for (let edge of options.edges) {
                    if (Array.isArray(edge) && edge.length > 2) {
                        this.addEdge(edge[0], edge[1], edge[2]);
                    }
                }
            }

            if (Object.prototype.hasOwnProperty.call(options, 'noLoops')) {
                this.noLoops = options.noLoops;
            }
        }
    }

    /**
     * Add a new node in the graph.
     *
     * @param id   {number|string} ID to reference the new node
     * @param data {*}               Data to store in the new node
     * @throws {Errors.NodeAlreadyExistsError} if the graph already contains a
     *         node with the given ID
     */
    addNode(id: number|string, data: N) {
        if (this.hasNode(id)) {
            throw new Errors.NodeAlreadyExistsError(id);
        }

        let node: Node<N, any> = new Node(id, data);
        this._nodes.set(id, node);
        return node;
    }

    /**
     * Check if this graph contains a node with given ID.
     *
     * @param id {number | string} ID of the node to check
     * @return {boolean}           True if the node exists, else false
     */
    hasNode(id: number|string): boolean {
        return this._nodes.has(id);
    }

    /**
     * Return the node of given id.
     *
     * @param id {number|string} ID of the node to check
     * @return {*}                 Data of the node if it exists, else undefined
     */
    getNode(id: number|string): Node<N, E> {
        return this._nodes.get(id);
    }

    /**
     * Remove a node from the graph.
     *
     * @param id {number|string} ID of the node to remove
     * @throws {Errors.NodeNotExistsError} if the node does not exist
     */
    removeNode(id: number|string): void {
        let node = this.getNode(id);
        if (!node) {
            throw new Errors.NodeNotExistsError(id);
        }

        node.destroy();
        this._nodes.delete(id);
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

        if (this.noLoops && fromNode === toNode) {
            throw new Errors.NoLoopsError(from);
        }

        if (!this._edges) {
            this._edges = [];
        }

        this._edges.push(this.createEdge(fromNode, toNode, data));
    }

    /**
     * Create a new edge.
     *
     * @param from {Node} Source node
     * @param to   {Node} Target node
     * @param data {*}    Data to store in the new edge
     */
    public abstract createEdge(from: Node<N, E>, to: Node<N, E>, data: E): Edge<N, E>;

    /**
     * Check if this graph contains an edge between two nodes with given IDs.
     *
     * @param id {number|string} ID of the node to check
     * @param id {number|string} ID of the node to check
     * @return {boolean} True if the node exists, else false
     */
    hasEdge(from: number | string, to: number | string): boolean {
        let fromNode = this.getNode(from);

        if (!fromNode) {
            return false;
        }

        let toNode = this.getNode(to);

        if (!toNode) {
            return false;
        }

        return fromNode.hasEdgeBetween(toNode);
    }

    /**
     * Return the data associated with a node.
     *
     * @param id {number|string} ID of the node to check
     * @return {Array<Edge>} Data of the node if it exists, else undefined
     */
    getEdge(from: number|string, to: number|string): Array<Edge<N, E>> {
        let fromNode = this.getNode(from);

        if (!fromNode) {
            throw new Errors.NodeNotExistsError(from);
        }

        let toNode = this.getNode(to);

        if (!toNode) {
            throw new Errors.NodeNotExistsError(from);
        }

        return fromNode.getEdgeBetween(toNode);
    }

    /**
     * Remove an edge from the graph.
     *
     * @param from {number|string} ID of the node
     * @param to   {number|string} ID of the target node of the edge to remove
     * @throws {Errors.NodeNotExistsError} if the node does not exist
     */
    removeEdge(from: number|string, to: number|string): void {
        let edges = this.getEdge(from, to);

        for (let edge of edges) {
            edge.destroy();

            let index = this._edges.indexOf(edge);
            if (index !== -1) {
                this._edges.splice(index, 1);
            }
        }
    }

    /**
     * Return the adjacent nodes of a given node.
     *
     * @param id {number | string} ID of the node
     * @return {Array} Array containing the adjacent nodes IDs
     */
    adjacents(id: number | string): Array<Node<N, E>> {
        let node = this.getNode(id);

        if (node) {
            return node.adjacents();
        }

        return [];
    }

    /**
     * Return degree (number of connected edges) of a node.
     * 
     * @param id {number | string} ID of the node
     * @return {number} Number of connected edges to this node
     */
    degree(id: number | string): number {
        let node = this.getNode(id);
        return node ? node.degree : 0;
    }

    // ASSERTIONS

    _assertNodeExist(node: string) {
        if (!this.hasNode(node)) {
            throw new Errors.NodeNotExistsError(node);
        }
    }

    _assertEdgeExist(from: string, to: string) {
        if (!this.hasEdge(from, to)) {
            throw new Errors.EdgeNotExistsError(from, to);
        }
    }
}
