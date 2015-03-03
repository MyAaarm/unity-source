import Pathfinding;

#pragma strict

public static var theTarget : GameObject;
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

function Awake ()
{
    // Set up the references.
    seeker = GameObject.Find("A*");
    speed = 10f;
    currentWaypoint = 0;
    nextWaypointDistance  = 10;
    frac = 0.1f;
}

function FixedUpdate () {
	var targets = gameObject.FindGameObjectsWithTag("Player");
	var minDist = Number.MaxValue;
	if (theTarget == null || timer <= 0){
		timer = 0;
		for (var enemy : GameObject in targets){
			for (var enemy2 : GameObject in targets){
				if ((Vector3.Distance(enemy.transform.position, enemy2.transform.position) < minDist) && !enemy.Equals(enemy2)){
					minDist = Vector3.Distance(enemy.transform.position, enemy2.transform.position);
					if (Vector3.Distance(enemy.transform.position, transform.position) < Vector3.Distance(enemy2.transform.position, transform.position)){
						myTarget = enemy.transform.position;
						theTarget = enemy;
						timer = 30;
					}
					else{
						myTarget = enemy2.transform.position;
						theTarget = enemy2;
						timer = 30;
					}
				}	
				else if (targets.Length == 1){
					myTarget = enemy.transform.position;
					theTarget = enemy;
				}
			}
		}
	}
	else{
		myTarget = theTarget.transform.position;
	}
	//Look at the target
	transform.LookAt(myTarget);
	
	seeker.BroadcastMessage("IsDoneMod", "Judge");
	
		if (path != null && currentWaypoint < path.vectorPath.Count && Mathf.RoundToInt(Vector3.Distance(transform.position,myTarget)) > nextWaypointDistance){
            //Direction to the next waypoint
        	var dir : Vector3 = (path.vectorPath[currentWaypoint]-transform.position).normalized;
        	dir *= speed * Time.deltaTime;
        	transform.position += dir;
        	
        	//transform.rigidbody.MovePosition(Vector3.Lerp(transform.position, path.vectorPath[currentWaypoint], frac));
        	//transform.position = Vector3.Lerp(transform.position, path.vectorPath[currentWaypoint], frac);
        	//transform.rigidbody.MovePosition(Vector3.Lerp(startPos, path.vectorPath[currentWaypoint], frac));
      		
      		
        	if (Vector3.Distance(transform.position, myTarget) > nextWaypointDistance){//Vector3.Distance (transform.position, myTarget) > nextWaypointDistance) {
            	currentWaypoint++;
        	}
        }
	timer -= Time.deltaTime;
}

function setTarget(){
	var vectors = [transform.position, myTarget];
	seeker.BroadcastMessage("StartPath", vectors);
}

function OnPathComplete (p : Path) {
	//Debug.Log ("Yay, we got a path back. Did it have an error? "+p.error);
	if (!p.error) {
    	path = p;
        //Reset the waypoint counter
        currentWaypoint = 0;
    }
}