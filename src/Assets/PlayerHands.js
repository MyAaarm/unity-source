private var leftHand : GameObject;
private var rightHand : GameObject;

private var leftHandRigidBody : Rigidbody;
private var rightHandRigidBody : Rigidbody;
private var reSizingVector : Vector3 = Vector3(0.01,0.01,0.01);



function Awake () {
    leftHand = GameObject.Find("Arms/Hands/left");
    rightHand = GameObject.Find("Arms/Hands/right");

    leftHandRigidBody = leftHand.GetComponent(Rigidbody);
    rightHandRigidBody = rightHand.GetComponent(Rigidbody);
}

function FixedUpdate () { 
    var leftTriggerPressed = Input.GetKey('joystick button 8');
    var rightTriggerPressed = Input.GetKey('joystick button 9');

    if(leftTriggerPressed) {
      
      if(rightHand.transform.localScale.x <= 0) return;

      leftHand.transform.localScale += reSizingVector;
      rightHand.transform.localScale -= reSizingVector;

      leftHandRigidBody.mass += 0.01;
      rightHandRigidBody.mass -= 0.01;
    } 

    if(rightTriggerPressed) {

      if(leftHand.transform.localScale.x <= 0) return;

      rightHand.transform.localScale += reSizingVector;
      leftHand.transform.localScale -= reSizingVector;

      rightHandRigidBody.mass += 0.01;
      leftHandRigidBody.mass -= 0.01;
    } 

    Debug.Log('button 8:' + Input.GetKey('joystick button 8'));
    Debug.Log('button 9:' + Input.GetKey('joystick button 9'));

    Debug.Log('left Hand:' + leftHandRigidBody.mass);
    Debug.Log('right Hand:' + rightHandRigidBody.mass);
}