import Node from '../node';
import {Edge} from '../edge/edge';
import Path from '../path';

interface StepInfo<N, E> {
    node: Node<N, E>,
    edge?: Edge<N, E>,
    f: number,
    g: number,
    parent?: StepInfo<N, E>
};

/**
 * AStar pathfinding algorithm
 */
export default class AStar {

    /**
     * Return the shortest path found by the algorithm from a node to another.
     *
     * @param start     Start node
     * @param target    Target node
     * @param weight    Weight function
     * @param heuristic Heuristic function
     */
    public static path<N, E>(start: Node<N, E>, target: Node<N, E>, weight: ((edgeData: E) => number), heuristic: (from: N, to: N) => number): Path<N, E> {
        if (start === undefined || target === undefined) {
            return undefined;
        }

        if (!weight || typeof weight !== 'function') {
            weight = _ => 1;
        }

        if (!heuristic || typeof heuristic !== 'function') {
            heuristic = _ => 0;
        }

        let openList: Array<StepInfo<N, E>> = [{node: start, f: 0, g: 0}];
        let closedList: Array<string|number> = [];

        while (openList.length > 0) {
            // Find the best node
            let min: number = 0;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[min].f) {
                    min = i;
                }
            }

            let currentNode: StepInfo<N, E> = openList[min];
            openList.splice(min, 1);

            if (currentNode.node === target) {
                // Found the goal: rebuild the path
                let nodes = [];
                let edges = [];
                let parent: StepInfo<N, E> = currentNode;
                while (parent) {
                    nodes.unshift(parent.node);

                    if (parent.edge) {
                        edges.unshift(parent.edge);
                    }
                    parent = parent.parent;
                }
                return new Path(nodes, edges);
            }

            closedList.push(currentNode.node.id);

            for (let successor of currentNode.node.directSuccessors()) {

                let adjIndexInClosed = closedList.indexOf(successor.node.id);
                if (adjIndexInClosed !== -1) {
                    continue;
                }

                let cost = currentNode.g + weight(successor.edge.data);

                let adjIndexInOpen = -1;
                for (let i = 0, length = openList.length; i < length; i++) {
                    if (openList[i].node === successor.node) {
                        adjIndexInOpen = i;
                        break;
                    }
                }

                if (adjIndexInOpen < 0) {
                    openList.push({
                        node: successor.node,
                        edge: successor.edge,
                        g: cost,
                        f: cost + heuristic(successor.node.data, target.data),
                        parent: currentNode
                    });
                } else if (cost < openList[adjIndexInOpen].g) {
                    openList[adjIndexInOpen].g = cost;
                    openList[adjIndexInOpen].edge = successor.edge;
                    openList[adjIndexInOpen].parent = currentNode;
                    openList[adjIndexInOpen].f = cost + heuristic(successor.node.data, target.data);
                }
            }
        }

        return new Path<N, E>();
    }
};
