import React, { Component } from 'react';
import './App.css';

import Noise from './Noise';
import Hill from './Hill';
import Cloud from './Cloud';
import Colour from './Colour';
import Sun from './Sun';

import Context from './Context';

class App extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    pixelSize: 8,
	    height: 500,
	    width: 150,
	    lenth: 100,
	    range: 20,
	    yOffset: null	    
	};
	
	this.drawing = false;
	this.ctx = null;
	this.line = 

	this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	this.startts = this.getTS();
    }

    
    componentDidMount() {
	const canvas = this.refs.canvas;
	Context.set(canvas.getContext("2d"));

	
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
	this.updateWindowDimensions();
	window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
	const { innerWidth, innerHeight } = window;
	const { range } = this.state;

	const length = Math.floor(innerWidth / 2);
	const noise = new Noise(length, [-range, range]);
	
	this.setState({ width: innerWidth, height: innerHeight, noise: noise, length: length }, () => this.nextFrame());
    }
    
    componentWillUnmount() {
	cancelAnimationFrame(this.rAF);
	window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateAnimationState() {
	this.ts = this.getTS();
	this.clearFrame();

	this.drawLine();
		
	//this.nextFrame();
    }

    nextFrame() {
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
    }

    clearFrame() {
	const { width, height } = this.state;
	const ctx = Context.get();

	const light = '#f3d091';//'#b9c3d0';
	const dark = '#7e818f';//'#678bbb';

	const grd = ctx.createLinearGradient(0, height, 0, 0);
	grd.addColorStop(0, light);
	grd.addColorStop(.4, light);
	grd.addColorStop(.75, dark);
	grd.addColorStop(1, dark);
	
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, width, height);
    }

    getTS() {
	const date = new Date();
	
	return date.getTime();
    }

    scale( value, r1, r2 ) { 
	return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }

    drawLine() {
	const { width, height } = this.state;
	const interval = Math.floor(height / 10);

	const sun = new Sun(300, 400, 100);
	sun.draw();
	
	const cloud = new Cloud(0, 0, width, height);
	cloud.draw();

	const hillCount = 4;

	let colour = Colour.fromRGB(106, 121, 101);
		
	for (let i = hillCount; i > 0; i--) {
	    let mul = (((hillCount * 2) + 1) - i) + 1;
	    
	    const hill = new Hill(width, height, interval * mul, colour);
	    colour = colour.lighten(-10);
	    
	    hill.draw();
	}
    }
        
    render() {
	const { width, height } = this.state;

        return (
	    <div>
              <div>
		<canvas ref="canvas" width={ width } height={ height } />
              </div>
            </div>
	);	
    }
}

export default App;
