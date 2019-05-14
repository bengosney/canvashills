import noisyLine from './noisyLine';
import Context from './Context';
import Tree from './Tree';


class Hill {
    constructor(width, height, y, colour) {
	this.width = width;
	this.height = height;
	this.y = y;
	this.colour = colour;
	this.line = new noisyLine(0, y, width, y, 50, 1);
	this.trees = [];
	this.genTrees = true;
    }

    draw() {
	const ctx = Context.get();
	const { width, height, y, colour } = this;
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
	ctx.lineTo(width, height);
	ctx.lineTo(0, height);
	ctx.lineTo(0, y);
	ctx.fill();
	ctx.closePath();
	
	this.trees.map(t => t.draw());
	this.genTrees = false;
    }
}

export default Hill;
