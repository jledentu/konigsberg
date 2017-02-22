import should from 'should';
import Graph from '../src/graph';
import testGraph from './fixtures/graph-data';

describe('Graph', function() {

    describe('#addNode', function() {
        it('adds a node if it doesn\'t exist', function() {
            let g = new Graph();
            g.addNode.bind(g, 'test', 'data').should.not.throw();
            g.hasNode('test').should.be.true();
        });

        it('throws an error if node already exists', function() {
            let g = new Graph();
            let result = g.addNode('test', 'data');
            g.addNode.bind(g, 'test', 'data').should.throw('The node "test" already exists');
        });
    });

    describe('#hasNode', function() {
        it('returns false in an empty graph', function() {
            let g = new Graph();

            g.hasNode('test').should.be.false();
            g.hasNode('').should.be.false();
        });

        it('returns false if the node doesn\'t exist', function() {
            let g = new Graph();
            g.addNode('test', 'data');

            g.hasNode('id').should.be.false();
            g.hasNode('').should.be.false();
        });

        it('returns true if the node exists', function() {
            let g = new Graph();
            g.addNode('test', 'data');

            g.hasNode('test').should.be.true();
            g.hasNode('').should.be.false();
        });
    });

    describe('#getNode', function() {
        it('returns undefined if the node doesn\'t exist', function() {
            let g = new Graph();
            g.addNode('test', 'data');

            should(g.getNode('id')).be.undefined();
            should(g.getNode('')).be.undefined();
        });

        it('returns the data of the node if it exists', function() {
            let g = new Graph();
            let node1 = g.addNode('test', 'data');
            let node2 = g.addNode('test2', {prop: 'property-test'});

            g.getNode('test').should.be.eql(node1);
            g.getNode('test2').should.be.eql(node2);
        });
    });

    describe('#removeNode', function() {
        it('throws an error if the node doesn\'t exist', function() {
            let g = new Graph();
            g.removeNode.bind(g, 'test').should.throw('The node "test" doesn\'t exist');
        });

        it('throws no error if the node exists', function() {
            let g = new Graph();
            g.addNode('test', 'data');
            g.removeNode.bind(g, 'test').should.not.throw();
        });

        it('removes the node', function() {
            let g = new Graph();
            g.addNode('test', 'data');
            g.removeNode('test');

            g.hasNode('test').should.be.false();
        });
    });

    describe('#addEdge', function() {
        it('adds an edge if it doesn\'t exist', function() {
            let g = new Graph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data2');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.not.throw();
            g.hasEdge('test', 'test2').should.be.true();
        });

        it('throws an error if source node does not exist', function() {
            let g = new Graph();
            g.addNode('test2', 'data2');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.throw('The node "test" doesn\'t exist');
        });

        it('throws an error if target node does not exist', function() {
            let g = new Graph();
            g.addNode('test', 'data');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.throw('The node "test2" doesn\'t exist');
        });
    });

    describe('#hasEdge', function() {
        it('returns false in an empty graph', function() {
            let g = new Graph();

            g.hasEdge('test', 'test2').should.be.false();
            g.hasEdge('', '').should.be.false();
        });

        it('returns false if the edge doesn\'t exist', function() {
            let g = new Graph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data');

            g.hasEdge('test', 'test2').should.be.false();
            g.hasEdge('', '').should.be.false();
        });

        it('returns true if the edge exists', function() {
            let g = new Graph();
            g.addNode('test', 'data');
            g.addNode('test2', 'data2');
            g.addEdge.bind(g, 'test', 'test2', 'dataEdge').should.not.throw();
            g.hasEdge('test', 'test2').should.be.true();
            g.hasEdge('', '').should.be.false();
        });
    });

    describe('#adjacents', function() {
        it('returns [] if the node does not exist', function() {
            let g = new Graph();

            g.adjacents('test').should.be.eql([]);
        });
    });
});
