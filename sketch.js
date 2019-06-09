var canvas;
var ground;
var world;
var  base;
var obstacles = [];
var birdImage, bird;
var slingshot;
var boundary;

function preload(){
	birdImage = loadImage('assets/angrybird.png'); // Load bird Image
}


function setup() {
	createCanvas(1680, 720); // Display for game

	// Initialize box2d physics and create the world
	world = createWorld();

	// Create Ground
	ground = new Ground(width/2, height-10, width,120, '#66FF00');

	// Create boundary
	boundary = new Boundary(5, height / 2, 10, height, 0);

	// Create obstacles base
	base = new Ground(1300, 628, 600, 85,'brown');

	// Create Obstacle
	for(let i = 0; i < 3; i++){
		obstacles[i] = new Obstacles(1300, 300 - i * 70, 84, 100, 'gray');
	};

	// Create Bird
	bird = new Bird(100, 40, 50, 65, birdImage);

	// Create SlingShot
	slingshot = new SlingShot();

};


function draw() {
	background(155, 221, 255); // Background Color

	// We must always step through time!
	let timeStep = 1.0 / 60;
	// 2nd and 3rd arguments are velocity and position iterations.
	world.Step(timeStep, 10, 10);

	ground.show(); // Draw ground

	boundary.show() // Draw boundary
	
	base.show(); // Draw obstacles base

	slingshot.update(mouseX, mouseY);

	for(let obstacle of obstacles){
		obstacle.show() // Draw obstacle
	};

	bird.show(); // Draw Bird

	slingshot.show(); // Draw  SlingShot
};


// When the mouse is released we're done with the spring
function mouseReleased() {
  slingshot.destroy();
};

// When the mouse is pressed we. . .
function mousePressed() {
  // Check to see if the mouse was clicked on the box
  if (bird.contains(mouseX, mouseY)) {
    // And if so, bind the mouse position to the box with a spring
    slingshot.bind(mouseX, mouseY, bird);
  };
};
