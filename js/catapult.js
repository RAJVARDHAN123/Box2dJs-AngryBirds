class Catapult {
  constructor(x, y, w, h,sling1,sling2, birdImage) {
    this.x = x;     // Number: x-coordinate of the rectangle.
    this.y = y;     // Number: y-coordinate of the rectangle.
    this.w = w;     // Number: width of the rectangle.
    this.h = h;     // Number: height of the rectangle.
    this.sling1 = sling1; // sling1 Image
    this.sling2 = sling2; // sling2 Image
    this.birdImage = birdImage; // Bird image

    // Add Fixtures
    var fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Define Body
    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position = scaleToWorld(this.x, this.y);

    // Create Body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

  };
  show(){
    var pos = scaleToPixels(this.body.GetPosition());
    var angle = this.body.GetAngleRadians();

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    image(this.sling1,0 ,0 , this.w, this.h);
    image(this.birdImage,0 - 15, 0, 50, 45);
    image(this.sling2, 0 - 25 , 0 - 10, this.w, this.h - 40);
    pop();
  };
};
