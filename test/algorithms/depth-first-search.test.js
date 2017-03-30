import should from 'should';
import DirectedGraph from '../../src/graph/directed-graph';
import DepthFirstSearch from'../../src/algorithms/depth-first-search';
import testGraph from '../fixtures/graph-data';

describe('DepthFirstSearch', function() {
    it('should iterate on all reachable nodes', function() {
        let g = new DirectedGraph(testGraph);

        let expectedIds       = [1, 4, 2, 6, 5, 3, 7, 8, 6];
        let expectedDistances = [0, 1, 1, 2, 2, 1, 2, 3, 1];
        let i = 0;

        let search = new DepthFirstSearch(g.getNode(1));

        for (let node of search) {
            node.node.id.should.be.equal(expectedIds[i]);
            //node.d.should.be.equal(expectedDistances[i]);
            i++;
        }
    });
});
