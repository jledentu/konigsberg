import should from 'should';
import sinon from 'sinon';
import DirectedGraph from '../../src/graph/directed-graph';
import testGraph from '../fixtures/graph-data';

describe('DirectedGraph', function() {

    describe('#addNode', function() {
        it('adds a node if it doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode.bind(g, 'test', 'data').should.not.throw();
            g.hasNode('test').should.be.true();
        });

        it('throws an error if node already exists', function() {
            let g = new DirectedGraph();
            let result = g.addNode('test', 'data');
            g.addNode.bind(g, 'test', 'data').should.throw('The node "test" already exists');
        });

        it('should invoke event handlers', function() {
            let g = new DirectedGraph();
            let spy = sinon.spy();
            let spy2 = sinon.spy();
            g.on('nodeCreated', spy);
            g.on('nodeCreated', spy2);
            let result = g.addNode('test', 'data');
            spy.calledOnce.should.be.true();
            spy2.calledOnce.should.be.true();
        });
    });

    describe('#hasNode', function() {
        it('returns false in an empty graph', function() {
            let g = new DirectedGraph();

            g.hasNode('test').should.be.false();
            g.hasNode('').should.be.false();
        });

        it('returns false if the node doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');

            g.hasNode('id').should.be.false();
            g.hasNode('').should.be.false();
        });

        it('returns true if the node exists', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');

            g.hasNode('test').should.be.true();
            g.hasNode('').should.be.false();
        });
    });

    describe('#getNode', function() {
        it('returns undefined if the node doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');

            should(g.getNode('id')).be.undefined();
            should(g.getNode('')).be.undefined();
        });

        it('returns the data of the node if it exists', function() {
            let g = new DirectedGraph();
            let node1 = g.addNode('test', 'data');
            let node2 = g.addNode('test2', {prop: 'property-test'});

            g.getNode('test').should.be.eql(node1);
            g.getNode('test2').should.be.eql(node2);
        });
    });

    describe('#removeNode', function() {
        it('throws an error if the node doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.removeNode.bind(g, 'test').should.throw('The node "test" doesn\'t exist');
        });

        it('throws no error if the node exists', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.removeNode.bind(g, 'test').should.not.throw();
        });

        it('removes the node', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.removeNode('test');

            g.hasNode('test').should.be.false();
        });

        it('should invoke event handlers', function() {
            let g = new DirectedGraph();
            let spy = sinon.spy();
            let spy2 = sinon.spy();
            g.on('nodeDeleted', spy);
            g.on('nodeDeleted', spy2);
            g.addNode('test', 'data');
            g.removeNode('test');
            spy.calledOnce.should.be.true();
            spy2.calledOnce.should.be.true();
        });
    });

    describe('#addEdge', function() {
        it('adds an edge if it doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data2');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.not.throw();
            g.hasEdge('test', 'test2').should.be.true();
        });

        it('throws an error if source node does not exist', function() {
            let g = new DirectedGraph();
            g.addNode('test2', 'data2');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.throw('The node "test" doesn\'t exist');
            g.hasEdge('test', 'test2').should.be.false();
        });

        it('throws an error if target node does not exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.throw('The node "test2" doesn\'t exist');
            g.hasEdge('test', 'test2').should.be.false();
        });

        it('throws an error if add a loop and graph has not noLoop property', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addEdge.bind(g, 'test', 'test', 'dataEdge').should.not.throw();
            g.hasEdge('test', 'test').should.be.true();
        });

        it('throws an error if add a loop and graph has false noLoop property', function() {
            let g = new DirectedGraph({noLoops: false});
            g.addNode('test', 'data');
            g.addEdge.bind(g, 'test', 'test', 'dataEdge').should.not.throw();
            g.hasEdge('test', 'test').should.be.true();
        });

        it('throws an error if add a loop and graph has noLoop property', function() {
            let g = new DirectedGraph({noLoops: true});
            g.addNode('test', 'data');
            g.addEdge.bind(g, 'test', 'test', 'dataEdge').should.throw('Cannot add a loop on "test"');
            g.hasEdge('test', 'test').should.be.false();
        });

        it('should invoke event handlers', function() {
            let g = new DirectedGraph();
            let spy = sinon.spy();
            let spy2 = sinon.spy();
            g.on('edgeCreated', spy);
            g.on('edgeCreated', spy2);
            g.addNode('test', 'data');
            g.addEdge('test', 'test', 'dataEdge');
            spy.calledOnce.should.be.true();
            spy2.calledOnce.should.be.true();
        });

        it('should not invoke removed event handlers', function() {
            let g = new DirectedGraph();
            let spy = sinon.spy();
            let spy2 = sinon.spy();
            g.on('edgeCreated', spy);
            g.on('edgeCreated', spy2);
            g.off('edgeCreated', spy);
            g.addNode('test', 'data');
            g.addEdge('test', 'test', 'dataEdge');
            spy.calledOnce.should.be.false();
            spy2.calledOnce.should.be.true();
        });
    });

    describe('#hasEdge', function() {
        it('returns false in an empty graph', function() {
            let g = new DirectedGraph();

            g.hasEdge('test', 'test2').should.be.false();
            g.hasEdge('', '').should.be.false();
        });

        it('returns false if the edge doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data');

            g.hasEdge('test', 'test2').should.be.false();
            g.hasEdge('', '').should.be.false();
        });

        it('returns true if the edge exists', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data2');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.not.throw();
            g.hasEdge('test', 'test2').should.be.true();
            g.hasEdge('test2', 'test').should.be.true();
            g.hasEdge('', '').should.be.false();
        });
    });

    describe('#getEdge', function() {
        it('should throw an error if the first endpoint doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.getEdge.bind(g, 'test', 'test2').should.throw('The node "test" doesn\'t exist');
        });

        it('should throw an error if the second endpoint doesn\'t exist', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.getEdge.bind(g, 'test2', 'test').should.throw('The node "test2" doesn\'t exist');
        });

        it('should return the array of edges between two edges', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data2');
            let e = g.addEdge('test', 'test2', 'dataEdge');
            g.getEdge('test', 'test2').should.be.eql([e]);
        });
    });

    describe('#neighbors', function() {
        it('returns [] if the node does not exist', function() {
            let g = new DirectedGraph();

            g.neighbors('test').should.be.eql([]);
        });

        it('returns the neighbors of a given node', function() {
            let g = new DirectedGraph(testGraph);

            let neighbors = g.neighbors(1);

            neighbors.should.be.Array();
            neighbors.length.should.be.eql(5);
            let ids = neighbors.map(node => node.id);
            ids.should.be.eql([4, 2, 3, 6, 9]);
        });
    });

    describe('#directPredecessors', function() {
        it('returns [] if the node does not exist', function() {
            let g = new DirectedGraph();

            g.directPredecessors('test').should.be.eql([]);
        });

        it('returns the direct predecessors of a given node', function() {
            let g = new DirectedGraph(testGraph);

            let predecessors = g.directPredecessors(6);

            predecessors.should.be.Array();
            predecessors.length.should.be.eql(2);
            let ids = predecessors.map(node => node.id);
            ids.should.be.eql([1, 2]);
        });
    });

    describe('#directSuccessors', function() {
        it('returns [] if the node does not exist', function() {
            let g = new DirectedGraph();

            g.directSuccessors('test').should.be.eql([]);
        });

        it('returns the direct successors of a given node', function() {
            let g = new DirectedGraph(testGraph);

            let successors = g.directSuccessors(1);

            successors.should.be.Array();
            successors.length.should.be.eql(5);
            let ids = successors.map(node => node.id);
            ids.should.be.eql([4, 2, 3, 6, 9]);
        });
    });

    describe('#degree', function() {
        it('returns 0 if the node does not exist', function() {
            let g = new DirectedGraph();

            g.degree('test').should.be.eql(0);
        });

        it('returns 2 if the node has just one loop', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.addEdge('test', 'test', 'data');
            g.degree('test').should.be.eql(2);
        });

        it('returns number of edges connected to this node', function() {
            let g = new DirectedGraph(testGraph);

            g.degree(1).should.be.eql(5);
            g.degree(2).should.be.eql(3);
        });

        it('returns 0 after removing all nodes', function() {
            let g = new DirectedGraph(testGraph);
            g.removeEdge(1, 2);
            g.removeEdge(1, 3);
            g.removeEdge(1, 4);
            g.removeEdge(1, 6);
            g.removeEdge(1, 9);

            g.degree(1).should.be.eql(0);
            g.degree(2).should.be.eql(2);
        });
    });

    describe('#order', function() {
        it('returns 0 if the graph has no node', function() {
            let g = new DirectedGraph();
            g.order.should.be.eql(0);
        });

        it('returns the number of nodes of the graph', function() {
            let g = new DirectedGraph(testGraph);
            g.order.should.be.eql(10);
        });
    });

    describe('#size', function() {
        it('returns 0 if the graph has no edge', function() {
            let g = new DirectedGraph();
            g.addNode('test', 'data');
            g.size.should.be.eql(0);
        });

        it('returns the number of nodes of the graph', function() {
            let g = new DirectedGraph(testGraph);
            g.size.should.be.eql(9);
        });
    });
});
