import noisyLine from './noisyLine';
import Context from './Context';
import Tree from './Tree';


class Hill {
    constructor(width, height, x, y, colour) {
	this.width = width;
	this.height = height;
	this.y = y;
	this.x = x;
	this.colour = colour;
	this.line = new noisyLine(x, y, width + x, y, 50, 1);
	this.trees = [];
	this.genTrees = true;
    }

    draw() {
	const ctx = Context.get();
	const { width, height, x, y, colour } = this;
	const { line } = this;

	ctx.beginPath();
	ctx.fillStyle = colour;
	line.draw((x, y) => {
	    const randomRange = (min, max) => {
		return min + Math.random() * (max - min);
	    };

	    if (randomRange(0, 100) > 95 && this.genTrees) {
		const tree = new Tree(x, y + 3, randomRange(2, 5), this.colour, Math.floor(randomRange(3, 5)));
		this.trees.push(tree);
	    }
	});
	ctx.lineTo(width + x, height);
	ctx.lineTo(x, height);
	ctx.lineTo(x, y);
	ctx.fill();
	ctx.closePath();
	
	this.trees.map(t => t.draw());
	this.genTrees = false;
    }
}

export default Hill;
