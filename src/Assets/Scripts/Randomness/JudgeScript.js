import Pathfinding;

#pragma strict

public var theTarget : GameObject;
private var timer: float; 			// set duration time in seconds in the Inspector
private var seeker : GameObject;
//The calculated pat
private var path : Path;
//Speed
public var speed : float;
//The waypoint we are currently moving towards
public var currentWaypoint : int;
//The max distance from the AI to a waypoint for it to continue to the next waypoint
public var nextWaypointDistance : float;
public var myTarget : Vector3;//GameObject;
public var frac : float;
private var moveLegs : JudgeLegsMovement;

function Awake ()
{
    // Set up the references.
    moveLegs = GetComponent(JudgeLegsMovement);
    seeker = GameObject.Find("A*");
    speed = 10f;
    currentWaypoint = 0;
    nextWaypointDistance  = 20;
    frac = 0.1f;
}

function FixedUpdate () {
	var targets = GameObject.FindGameObjectsWithTag("body");
	var minDist = Number.MaxValue;
	if ((theTarget == null || timer <= 0) && targets.Length != 0){
		timer = 0;
		for (var enemy : GameObject in targets){
			for (var enemy2 : GameObject in targets){
				if ((Vector3.Distance(enemy.transform.position, enemy2.transform.position) < minDist) && !enemy.Equals(enemy2)){
					minDist = Vector3.Distance(enemy.transform.position, enemy2.transform.position);
					if (Vector3.Distance(enemy.transform.position, transform.position) < Vector3.Distance(enemy2.transform.position, transform.position)){
						theTarget = enemy;
						myTarget = enemy.transform.position;
						timer = 15;
					}
					else{
						theTarget = enemy2;
						myTarget = enemy2.transform.position;
						timer = 15;
					}
				}
				else if (targets.Length == 1){
					theTarget = enemy;
					myTarget = enemy.transform.position;
				}
			}
		}
	}
	else{
		if (targets.Length !=0){
		myTarget = theTarget.transform.position;
		}
		else{
			myTarget = transform.position;
		}
	}
	//Look at the target
	transform.LookAt(myTarget);

	seeker.BroadcastMessage("IsDone");

		if (path != null && currentWaypoint < path.vectorPath.Count && Mathf.RoundToInt(Vector3.Distance(transform.position,myTarget)) > nextWaypointDistance){
            rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionX;
            rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionZ;
            //Direction to the next waypoint
        	var dir : Vector3 = (path.vectorPath[currentWaypoint]-transform.position).normalized;
        	dir *= speed * Time.deltaTime;
        	transform.position += dir;
			moveLegs.moveLegs();
        	if (Vector3.Distance(transform.position, myTarget) > nextWaypointDistance){//Vector3.Distance (transform.position, myTarget) > nextWaypointDistance) {
            	currentWaypoint++;
        	}
        }
        else{
        	rigidbody.constraints = RigidbodyConstraints.FreezePositionX && RigidbodyConstraints.FreezePositionZ;
        }
	timer -= Time.deltaTime;
}

function setTarget(){
	var vectors = [transform.position, myTarget];
	seeker.BroadcastMessage("StartPath", vectors);
}

function OnPathComplete (p : Path) {
	if (!p.error) {
    	path = p;
        //Reset the waypoint counter
        currentWaypoint = 0;
    }
}