import noisyLine from './noisyLine';
import Context from './Context';


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
	line.draw();
	ctx.lineTo(width, height);
	ctx.lineTo(0, height);
	ctx.lineTo(0, y);
	ctx.fillStyle = colour;
	ctx.fill();
	ctx.closePath();
    
    }
}

export default Hill;
