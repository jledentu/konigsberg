import Node from '../node';
import {Edge} from '../edge/edge';
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
    private _handlers: {[id: string]: Array<() => void>;} = {};

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
    public addNode(id: number|string, data: N) {
        if (this.hasNode(id)) {
            throw new Errors.NodeAlreadyExistsError(id);
        }

        let node: Node<N, any> = new Node(id, data);
        this._nodes.set(id, node);

        this._notifyHandlers('nodeCreated');

        return node;
    }

    /**
     * Check if this graph contains a node with given ID.
     *
     * @param id {number | string} ID of the node to check
     * @return {boolean}           True if the node exists, else false
     */
    public hasNode(id: number|string): boolean {
        return this._nodes.has(id);
    }

    /**
     * Return the node of given id.
     *
     * @param id {number|string} ID of the node to check
     * @return {*}                 Data of the node if it exists, else undefined
     */
    public getNode(id: number|string): Node<N, E> {
        return this._nodes.get(id);
    }

    /**
     * Remove a node from the graph.
     *
     * @param id {number|string} ID of the node to remove
     * @throws {Errors.NodeNotExistsError} if the node does not exist
     */
    public removeNode(id: number|string): void {
        let node = this.getNode(id);
        if (!node) {
            throw new Errors.NodeNotExistsError(id);
        }

        node.destroy();
        this._nodes.delete(id);

        this._notifyHandlers('nodeDeleted');
    }

    /**
     * Add an edge between two nodes.
     *
     * @param from {number|string} ID of the source node
     * @param to   {number|string} ID o  the target node
     * @param data {*}             Data to store in the new edge
     * @throws {Errors.NodeNotExistsError} if one of the nodes does not exist
     */
    public addEdge(from: number|string, to: number|string, data: E): void {
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

        this._notifyHandlers('edgeCreated');
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
    public hasEdge(from: number | string, to: number | string): boolean {
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
    public getEdge(from: number|string, to: number|string): Array<Edge<N, E>> {
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
    public removeEdge(from: number|string, to: number|string): void {
        let edges = this.getEdge(from, to);

        for (let edge of edges) {
            edge.destroy();

            let index = this._edges.indexOf(edge);
            if (index !== -1) {
                this._edges.splice(index, 1);
            }
        }

        this._notifyHandlers('edgeDeleted');
    }

    /**
     * Return the neighbors of a given node.
     *
     * @param id {number | string} ID of the node
     * @return {Array} Array containing the neighbors nodes IDs
     */
    public neighbors(id: number | string): Array<Node<N, E>> {
        let node = this.getNode(id);

        if (node) {
            return node.neighbors();
        }

        return [];
    }

    /**
     * Return degree (number of connected edges) of a node.
     *
     * @param id {number | string} ID of the node
     * @return {number} Number of connected edges to this node
     */
    public degree(id: number | string): number {
        let node = this.getNode(id);
        return node ? node.degree : 0;
    }

    /**
     * Return the order of this graph (i.e the number of nodes).
     *
     * @return {number} Number of nodes
     */
    public get order(): number {
        return this._nodes.size;
    }

    /**
     * Return the size of this graph (i.e the number of edges).
     *
     * @return {number} Number of edges
     */
    public get size(): number {
        return this._edges.length;
    }

    // EVENT HANDLING

    /**
     * Add an event handler.
     *
     * @param {string}   eventName Name of the event to handle
     * @param {function} handler   Event handler
     */
    public on(eventName: string, handler: () => void): void {
        if (!Array.isArray(this._handlers[eventName])) {
            this._handlers[eventName] = [];
        }

        this._handlers[eventName].push(handler);
    }

    /**
     * Remove an event handler.
     *
     * @param {string}   eventName Name of the event
     * @param {function} handler   Event handler to remove
     */
    public off(eventName: string, handler: () => void): void {
        if (Array.isArray(this._handlers[eventName])) {
            let idx = this._handlers[eventName].indexOf(handler);

            if (idx !== -1) {
                this._handlers[eventName].splice(idx, 1);
            }
        }
    }

    /**
     * Notify event handlers that an event occurred.
     *
     * @param {string} eventName Name of the event
     */
    private _notifyHandlers(eventName: string): void {
        if (Array.isArray(this._handlers[eventName])) {
            for (let handler of this._handlers[eventName]) {
                if (typeof handler === 'function') {
                    handler.call(this);
                }
            }
        }
    }
}
