import noisyLine from './noisyLine';
import Context from './Context';
import Tree from './Tree';


class Hill {
    constructor(width, height, y, colour) {
	this.width = width;
	this.height = height;
	this.y = y;
	this.colour = colour;
    }

    draw() {
	const ctx = Context.get();
	const { width, height, y, colour } = this;
	
	const line = new noisyLine(0, y, width, y, 50, 1);

	ctx.beginPath();
	ctx.fillStyle = colour;
	line.draw((x, y) => {
	    const randomRange = (min, max) => {
		return min + Math.random() * (max - min);
	    };
	    
	    if (randomRange(0, 100) > 95) {
		const tree = new Tree(x, y + 3, randomRange(2, 5), null, Math.floor(randomRange(4, 6)));
		tree.draw();
	    }
	});
	ctx.lineTo(width, height);
	ctx.lineTo(0, height);
	ctx.lineTo(0, y);
	ctx.fill();
	ctx.closePath();
    }
}

export default Hill;
