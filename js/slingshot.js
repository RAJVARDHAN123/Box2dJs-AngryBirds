class SlingShot {
  constructor(x, y) {
    // At first it doesn't exist
    this.mouseJoint = null;
  };

  // If it exists we set its target  to the mouse location
  update(x, y){
    if(this.mouseJoint !== null){
      // Always convert to world coordinates!
      var mouseWorld = scaleToWorld(x, y);
      this.mouseJoint.SetTarget(mouseWorld);
    };
  };

  show() {
    if(this.mouseJoint !== null){
      var posA = this.mouseJoint.GetAnchorA();
      var  posB = this.mouseJoint.GetAnchorB();

      // We can get the two  anchore points
      var v1 = scaleToPixels(posA.x, posA.y);
      var v2 = scaleToPixels(posB.x, posB.y);
      // And just draw a line
      stroke(200);
      strokeWeight(2);
      // TODO: Change code  to anchore point
      line(v1.x, v1.y, v2.x, v2.y);

    };
  };

  /* This is  the key  function where
  we can attach the bird to an x, y location
  and the Bird object's location*/

  bind(x, y, bird){
    // Define the joint
    var  md = new box2d.b2MouseJointDef();
    // Body A is just a fake ground body  for simplicity (there isn't  anything at the mouse)
    md.bodyA = world.CreateBody(new box2d.b2BodyDef());
    // Body B is the bird's body
    md.bodyB = bird.body;
    // Get the mouse location in world coordinates
    var mp = scaleToWorld(x, y);
    md.target = mp;

    // Some stuff about how strong and bouncy the bird should be
    md.maxForce = 1000.0 * bird.body.m_mass;
    md.frequencyHz = 5.0;
    md.dampingRatio = 0.9;


    // Make joint!
    this.mouseJoint = world.CreateJoint(md);
  }

  destroy() {
    // we  can get rid of the joint when the mouse is realeased
    if(this.mouseJoint !== null) {
      world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
    };
  };
};
