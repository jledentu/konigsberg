import should from 'should';
import DirectedGraph from '../../src/graph/directed-graph';
import AStar from'../../src/algorithms/astar';
import testGraph from '../fixtures/graph-large-data';

describe('AStar', () => {
    describe('#path', () => {
        it('should return undefined if there is no path from start to target', () => {
            let g = new DirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(24), '', () => 1);
            should(path).be.Undefined();
        });

        it('should return shortest path', () => {
            let g = new DirectedGraph(testGraph);

            let path = AStar.path(g.getNode(1), g.getNode(19), '', () => 1);

            let nodeIds = path.map(step => step.node.id);
            nodeIds.should.eql([1, 2, 3, 5, 6, 7, 16, 19]);
        });
    });
});
