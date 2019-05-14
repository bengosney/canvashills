import Context from './Context';

class Tree {
    constructor(x, y, size = 200, colour = '#000000', iterations = 10) {
	this.size = size;
	this.canvasSize = size * 10;
	this.colour = colour;
	this.iterations = iterations;

	this.x = x - (this.canvasSize / 2);
	this.y = y - this.canvasSize;

	this.ox = x;
	this.oy = y;

	this.img = null;
    }
    
    _draw(ctx) {
	const { colour } = this;
	
	const randomRange = (min, max) => {
	    return min + Math.random() * (max - min);
	};

	const angMod = 4;
	const branchAngleA = randomRange(-Math.PI / 3, -Math.PI / angMod);

	if (colour !== null) {	    
	    ctx.fillStyle = colour;
	}
	
	const tree = (x, y, size, angle, limit) => {
	    ctx.save();
	    ctx.translate(x, y);
	    ctx.rotate(angle);
	    ctx.fillRect(0, 0, size, -size);

	    // left branch
	    const x0 = 0;
	    const y0 = -size;
	    const size0 = Math.abs(Math.cos(branchAngleA) * size);
	    const angle0 = branchAngleA;

	    if (limit > 0) {
		tree(x0, y0, size0, angle0, limit - 1);
	    } else {
		ctx.save();
		ctx.translate(x0, y0);
		ctx.rotate(angle0);
		ctx.fillRect(0, 0, size0, -size0);
		ctx.restore();
	    }

	    // right branch
	    const x1 = x0 + Math.cos(angle0) * size0;
	    const y1 = y0 + Math.sin(angle0) * size0;
	    const size1 = Math.abs(Math.sin(branchAngleA) * size);
	    const angle1 = angle0 + Math.PI / 2;

	    if (limit > 0) {
		tree(x1, y1, size1, angle1, limit - 1);
	    } else {
		ctx.save();
		ctx.translate(x1, y1);
		ctx.rotate(angle1);
		ctx.fillRect(0, 0, size1, -size1);
		ctx.restore();
	    }

	    ctx.restore();
	};

	const { size, iterations, canvasSize } = this;
	const x = (canvasSize + size) / 2;
	const y = canvasSize;
	tree(x, y, size, 0, iterations);
    }

    draw() {
	const ctx = Context.get();
	const size = this.canvasSize;
	
	if (this.img === null) {	    
	    const octx = Context.getOffscreen(size, size);
	    for (let i = 0 ; i < 3; i++) {
		this._draw(octx);
	    }

	    // get image from octx and render it to ctx
	    this.img = octx.getImageData(0,0, size, size);
	}

	const { width, height } = this.img;
	const { x, y } = this;
	const background = ctx.getImageData(x, y, width, height);
	const { data } = this.img;
	for ( let i = 0 ; i < data.length ; i += 4 ) {
	    const sum = data[i+0] + data[i+1] + data[i+2];
	    
	    if (sum !== 0) {
		background.data[i+0] = data[i+0];
		background.data[i+1] = data[i+1];
		background.data[i+2] = data[i+2];
	    }
	}
	ctx.putImageData(background, x, y);
    }    
}

export default Tree;
