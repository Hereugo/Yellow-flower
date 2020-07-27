const DIST = 500;

let a;
let img;

function preload() {
	img = loadImage('yellow-flower.jpg');
}

function setup() {
	createCanvas(1000, 400).center();
	a = new rain(30);
}

const c = 1000/2 - 150;

function draw() {
	background(255);
	image(img, c, 0, 300, 435);
	a.run();
}

function rain(val) {
	this.amount = val;
	this.droplets = [];

	let arr = "Happy Birthday!".match(/.{1}/gi);
	for (let i=0; i<this.amount; i++) {
		this.droplets[i] = new droplet("yellow", random(arr));
	}
	this.run = function() {
		for (let i=0; i<this.amount; i++) {
			this.droplets[i].run();
		}
	}
}

function droplet(clr, lt) {
	this.pos = createVector(c + random(130, 250), random(5, 125));
	this.acc = createVector();
	this.vel = createVector(random() * 0.5);

	this.clr = clr;
	this.letter = lt;

	this.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	
		if (this.pos.y > height) {
			this.pos.set(c + random(130, 250), random(5, 125));
			this.acc.mult(0);
			this.vel.mult(random() * 0.5);
			return;
		}

		//Wind
		let F = createVector(-1, 0); // To right
		F.setMag((this.pos.x / DIST) * 0.05);
		this.applyForce(F);

		//Gravity
		let G = createVector(0, 1); //Down
		G.setMag(0.02);
		this.applyForce(G);
	}

	this.draw = function() {

		push();
		let ang = degrees(this.vel.heading()).toFixed(2) - 90;
		angleMode(DEGREES);
		translate(this.pos.x, this.pos.y);
		rotate(ang);

		fill(this.clr);
		textSize(16);
		text(this.letter, 0, 0);
		pop();
	}

	this.run = function() {
		this.update();
		this.draw();
	}

	this.applyForce = function(f) {
		this.acc.add(f);
	}
}