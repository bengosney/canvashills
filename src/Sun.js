import Context from './Context';

class Sun {
    constructor(x, y, size) {
	this.x = x;
	this.y = y;
	this.size = size;
    }

    draw() {
	const ctx = Context.get();
	const { x, y, size } = this;

	const grd = ctx.createRadialGradient(x, y, 0, x, y, size);
      
	grd.addColorStop(0, 'rgba(255, 255, 255, 1.000)');
	grd.addColorStop(0.75, 'rgba(255, 250, 230, 1.000)');
	grd.addColorStop(1, 'rgba(255, 255, 255, 0.000)');
      
	ctx.fillStyle = grd;

	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.fill();
    }
}

export default Sun;
