class Colour {
    constructor(h, s, l) {
	this.h = h;
	this.s = s;
	this.l = l;
    }
    
    static fromRGB(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max == min) {
	    h = s = 0; // achromatic
	} else {
	    const d = max - min;
	    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

	    switch (max) {
	    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	    case g: h = (b - r) / d + 2; break;
	    case b: h = (r - g) / d + 4; break;
	    }

	    h /= 6;
	}

	return new Colour(h, s, l);
    }

    static fromHEX(hex) {
        if (hex.charAt(0) === '#') {
            hex = hex.substr(1);
        }
	
        if ((hex.length < 2) || (hex.length > 6)) {
            return false;
        }
	
        let values = hex.split('');
        let r;
        let g;
        let b;

        if (hex.length === 2) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = r;
            b = r;
        } else if (hex.length === 3) {
            r = parseInt(values[0].toString() + values[0].toString(), 16);
            g = parseInt(values[1].toString() + values[1].toString(), 16);
            b = parseInt(values[2].toString() + values[2].toString(), 16);
        } else if (hex.length === 6) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = parseInt(values[2].toString() + values[3].toString(), 16);
            b = parseInt(values[4].toString() + values[5].toString(), 16);
        } else {
            return false;
        }

	return Colour.fromRGB(r, g, b);
    }


    getRGB() {
	const { h, s, l } = this;
	let r, g, b;

	if (s == 0) {
	    r = g = b = l; // achromatic
	} else {
	    function hue2rgb(p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1/6) return p + (q - p) * 6 * t;
		if (t < 1/2) return q;
		if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		return p;
	    }

	    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	    var p = 2 * l - q;

	    r = hue2rgb(p, q, h + 1/3);
	    g = hue2rgb(p, q, h);
	    b = hue2rgb(p, q, h - 1/3);
	}

	return { r: r * 255, g: g * 255, b: b * 255 };
    }

    toString() {
	const { r, g, b } = this.getRGB();
	
	return `rgb(${r}, ${g}, ${b})`;
    }

    valueOf() {
	const { h, s , l } = this;
	return {h: h, s: s, l: l};
    }

    add(c) {
	let h = (this.h + c.h) / 2;

	while ( this.h > 360 ) {
	    this.h -= 360;
	}

	const s = (this.s + c.s) / 2;
	const l = (this.l + c.l) / 2;

	return new Colour(h, s, l);
    }

    lighten(percent) {
	const { h, s } = this;
	const l = Math.max(Math.min(this.l + (percent / 100), 1), 0);
	return new Colour(h, s, l);
    }

    darken(percent) {
	return this.lighten(-percent);
    }
}

export default Colour;
