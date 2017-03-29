export class NodeAlreadyExistsError extends Error {
    constructor(id: number | string) {
        super();
        this.message = `The node "${id}" already exists`;
    }
}

export class NodeNotExistsError extends Error {
    constructor(id: number | string) {
        super();
        this.message = `The node "${id}" doesn't exist`;
    }
}

export class EdgeNotExistsError extends Error {
    constructor(from: number | string, to: number | string) {
        super();
        this.message = `The edge "${from}" to "${to}" doesn't exist`;
    }
}

export class NoLoopsError extends Error {
    constructor(node: number | string) {
        super();
        this.message = `Cannot add a loop on "${node}"`;
    }
}
