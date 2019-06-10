var world;
var boundary;
var ground;
var value  = false;
var obstacles = [];
var birdImage, bird;
var backgroundImage;
var sling1Image, sling2Image;

// Slingshot Varibales
var startPosition,position,velocity,gravity;


function preload(){

	birdImage = loadImage('assets/angrybird.png'); // Load bird Image
	backgroundImage = loadImage('assets/background.jpg') // Load background Image
	sling1Image = loadImage('assets/sling1.png');  // Load sling Image
	sling2Image = loadImage('assets/sling2.png');  // Load sling Image

}


function setup() {
	createCanvas(windowWidth, windowHeight); // Display for game

	// Initialize box2d physics and create the world
	world = createWorld();

	// Create Ground
	ground = new Ground(0,height-90, 8000, 80);

	// Create boundary
	boundary = new Boundary(5, height / 2, 10, height, 0);

	// Creating catapult
  catapult = new Catapult(280,708,40,130,sling1Image,sling2Image,birdImage);

	// Create Obstacle
	for(let i = 0; i < 3; i++){
		obstacles[i] = new Obstacles(1300, 600 - i * 70, 84, 100, '#FDBB01');
	};

	// // Create Bird
	// bird = new Bird(100, 40, 50, 65, birdImage);
	//
	// // Create SlingShot
	// slingshot = new SlingShot();


	startPosition = new box2d.b2Vec2(280,730);

	position =new box2d.b2Vec2(0, 0);
	velocity = new box2d.b2Vec2(0, 0);
	gravity = new box2d.b2Vec2(0, 0.3);

};


function draw() {
	background(backgroundImage); // Background Color

	// We must always step through time!
	let timeStep = 1.0 / 60;
	// 2nd and 3rd arguments are velocity and position iterations.
	world.Step(timeStep, 10, 10);

	textSize(50);
	fill('#D80026');
	text('Angry Birds', width/2 - 150, 80);

	ground.show(); // Draw ground

	boundary.show() // Draw boundary

	// slingshot.update(mouseX, mouseY);

	catapult.show(); // Draw catapult

	for(let obstacle of obstacles){
		obstacle.show() // Draw obstacle
	};

	// bird.show(); // Draw Bird
	//
	// slingshot.show(); //  Draw  SlingShot

	/* Calculate the movement */
  let acceleration = new box2d.b2Vec2();

  acceleration.x += gravity.x ;
  acceleration.y +=gravity.y;


  velocity.x += acceleration.x ;
  velocity.y += acceleration.y;


  position.x += velocity.x;
  position.y += velocity.y;

  /* Draw the object */
	stroke(0,255,0);
	bird = new Bird(position.x,position.y, 50, 50,birdImage);
	bird.show();
	bird.done();
  /* Draw slingshot */
  if(mousePressed) {
		if(value== true){
			stroke(0);
			strokeWeight(4);
	    line(mouseX, mouseY, startPosition.x, startPosition.y);

	    noStroke();
	    fill('#D80026');

	    rectMode(CENTER);
	    ellipse(startPosition.x, startPosition.y, 10,10);
		}
  }
};


function mousePressed() {
	value = true;

	// // Check to see if the mouse was clicked on the box
  // if (bird.contains(mouseX, mouseY)) {
  //   // And if so, bind the mouse position to the box with a spring
  //   slingshot.bind(mouseX, mouseY, bird);
  // };
};


function mouseReleased() {
	// slingshot.destroy();

	if(value == true){
		position.x = startPosition.x;
		position.y = startPosition.y;   // Begin where we started dragging

		let mouseDirection = new box2d.b2Vec2(mouseX, mouseY);   // Calculate the shooting direction & strength
		mouseDirection.x -= startPosition.x;
		mouseDirection.y -= startPosition.y;
		mouseDirection.x *= -1;
		mouseDirection.y *= -1;   // Other way or It throws the bird angle side
		mouseDirection.x *= 0.15;
		mouseDirection.y *= 0.15;  // Scale it down  and maintain the speed of bird

		velocity.x =mouseDirection.x;
		velocity.y = mouseDirection.y;
		value = false
	}
}
