import should from 'should';
import Graph from '../../src/graph';
import BreadthFirstSearch from'../../src/algorithms/breadth-first-search';
import testGraph from '../fixtures/graph-data';

describe('BreadthFirstSearch', function() {
    it('iterates on all reachable nodes', function() {
        let g = new Graph(testGraph);

        let expectedIds       = [1, 4, 2, 3, 6, 9, 5, 7, 8];
        let expectedDistances = [0, 1, 1, 1, 1, 1, 2, 2, 3];
        let i = 0;

        let search = new BreadthFirstSearch(g.getNode(1));

        for (let node of search) {
            node.node.id.should.be.equal(expectedIds[i]);
            node.d.should.be.equal(expectedDistances[i]);
            i++;
        }
    });
});
