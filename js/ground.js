class Ground {
  constructor(x, y, w, h, color) {
    this.x = x;  // X-Cordinate
    this.y = y;  // Y-Cordinate
    this.w = w;  // Wdith
    this.h = h; // Height
    this.color = color; // Body Color

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
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  };
};
