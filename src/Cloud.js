import OpenSimplexNoise from 'open-simplex-noise';
import Context from './Context';

class Cloud {
    constructor(x, y, width, height) {
	this.noise = new OpenSimplexNoise(Date.now());
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
    }

    draw() {
	const ctx = Context.get();
	const { x, y, height, width } = this;
	const { noise } = this;

	const imgData = ctx.getImageData(x, y, width, height);
	const data = imgData.data;

	const scale = ( value, r1, r2 )  => { 
	    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
	};

	let i = 0;
	const zoom = 250;
	const nzoom = zoom / 4;
	const nscale = 15;
	for (let _y = 0; _y < height ; _y++) {
	    for (let _x = 0 ; _x < width ; _x++) {
		const c = scale(noise.noise2D(_x / zoom, _y / zoom), [-1, 1], [0, 255]);
		const n = scale(noise.noise2D(_x / nzoom, _y / nzoom), [-1, 1], [-nscale, nscale]);
		const g = c + n;
				
		data[i+0] = scale(g, [0, 255], [data[i+0], 255]);
		data[i+1] = scale(g, [0, 255], [data[i+1], 255]);
		data[i+2] = scale(g, [0, 255], [data[i+2], 255]);
		
		data[i+3] = 255;

		i += 4;
	    }
	}
	
	ctx.putImageData(imgData, x, y);
    }
}

export default Cloud;
