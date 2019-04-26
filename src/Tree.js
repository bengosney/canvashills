import Context from './Context';

class Tree {
    constructor(x, y, size = 200, colour = '#000000', iterations = 10) {
	this.x = x - (size / 2);
	this.y = y;
	this.size = size;
	this.colour = colour;
	this.iterations = iterations;
    }
    
    _draw() {
	const ctx = Context.get();
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

	const { x, y, size, iterations } = this;
	tree(x, y, size, 0, iterations);
    }

    draw() {
	for (let i = 0 ; i < 5; i++) {
	    this._draw();
	}
    }
}

export default Tree;
