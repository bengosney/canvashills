class Context {
    static get() {
	return this.ctx;
    }

    static set(ctx) {
	this.ctx = ctx;
    }

    static getOffscreen(height, width) {
	const oc = new OffscreenCanvas(height, width);

	return oc.getContext('2d');
    }
}

Context.ctx = null;

export default Context;
