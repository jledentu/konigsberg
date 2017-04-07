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
     * @param distance  Distance function
     * @param heuristic Heuristic function
     */
    public static path<N, E>(start: Node<N, E>, target: Node<N, E>, distance: ((edgeData: E) => number), heuristic: (from: N, to: N) => number): Path<N, E> {
        if (start === undefined || target === undefined) {
            return;
        }

        let openList: Array<StepInfo<N, E>> = [{node: start, f: 0, g: 0}];
        let closedList: Array<StepInfo<N, E>> = [];

        while (openList.length > 0) {
            // Find the best node
            let min: number = 0;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[min].f) {
                    min = i;
                }
            }

            let currentNode: StepInfo<N, E> = openList[min];
            closedList.push(currentNode);
            openList.splice(min, 1);

            if (currentNode.node === target) {
                // Rebuild the path
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

            console.log(currentNode.node.id);

            for (let successor of currentNode.node.directSuccessors()) {
                let cost = currentNode.g + (typeof distance === 'function' ? distance(successor.edge.data) : 1);

                let adjIndexInOpen = -1;
                for (let i = 0, length = openList.length; i < length; i++) {
                    if (openList[i].node === successor.node) {
                        adjIndexInOpen = i;
                        break;
                    }
                }
                if (adjIndexInOpen >= 0 && cost < openList[adjIndexInOpen].g) {
                    openList.splice(adjIndexInOpen, 1);
                }

                let adjIndexInClosed = -1;
                for (let i = 0, length = closedList.length; i < length; i++) {
                    if (closedList[i].node === successor.node) {
                        adjIndexInClosed = i;
                        break;
                    }
                }
                if (adjIndexInClosed >= 0 && cost < closedList[adjIndexInClosed].g) {
                    closedList.splice(adjIndexInClosed, 1);
                }

                if (adjIndexInOpen < 0 && adjIndexInClosed < 0) {
                    openList.push({
                        node: successor.node,
                        edge: successor.edge,
                        g: cost,
                        f: cost + heuristic(successor.node.data, target.data),
                        parent: currentNode
                    });
                }
            }
        }

        return new Path<N, E>();
    }
};
