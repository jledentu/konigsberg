import should from 'should';
import UndirectedGraph from '../../src/graph/undirected-graph';
import DirectedGraph from '../../src/graph/directed-graph';
import AStar from'../../src/algorithms/astar';
import testGraph from '../fixtures/graph-large-data';

describe('AStar', () => {
    describe('#path - DirectedGraph', () => {
        it('should return undefined if there is no path from start to target', () => {
            let g = new DirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(24), '', () => 1);
            path.nodes.length.should.eql(0);
        });

        it('should return shortest path', () => {
            let g = new DirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(19), '', () => 1);

            let nodeIds = path.nodes.map(node => node.id);
            nodeIds.should.eql([1, 2, 3, 5, 6, 7, 16, 19]);
        });

        it('should take into account distance function', () => {
            let g = new DirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(19), edgeData => edgeData.d, () => 1);

            let nodeIds = path.nodes.map(node => node.id);
            nodeIds.should.eql([1, 2, 3, 5, 6, 7, 16, 19]);
        });
    });

    describe('#path - UndirectedGraph', () => {
        it('should return undefined if there is no path from start to target', () => {
            let g = new UndirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(24), '', () => 1);
            path.nodes.length.should.eql(0);
        });

        it('should return shortest path', () => {
            let g = new UndirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(19), '', () => 1);

            let nodeIds = path.nodes.map(node => node.id);
            nodeIds.should.eql([1, 2, 3, 5, 6, 7, 16, 19]);
        });

        it('should take into account distance function', () => {
            let g = new UndirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(19), edgeData => edgeData.d || 0, () => 1);

            let nodeIds = path.nodes.map(node => node.id);
            nodeIds.should.eql([1, 2, 3, 5, 9, 10, 11, 8, 7, 16, 19]);
        });
    });
});
