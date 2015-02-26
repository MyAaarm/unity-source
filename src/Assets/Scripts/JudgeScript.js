import Pathfinding;

#pragma strict

public static var theTarget : GameObject;
private var timer: float; 			// set duration time in seconds in the Inspector
private var targetTimer: float; 			// set duration time in seconds in the Inspector
private var seeker : GameObject;
private var Aa : GameObject; 
//The calculated pat
private var path : Path;
//Speed
public var speed : float;
//The waypoint we are currently moving towards
public var currentWaypoint : int;
//The max distance from the AI to a waypoint for it to continue to the next waypoint
public var nextWaypointDistance : float;
public var myTarget : Vector3;//GameObject;
public var controller : CharacterController;

function Awake ()
{
    // Set up the references.
    seeker = GameObject.Find("Seeker");
    Aa = GameObject.Find("A*");
    speed = 500;
    currentWaypoint = 0;
    nextWaypointDistance  = 3;
    targetTimer = 0;
    controller = GetComponent(CharacterController); 
    //Aa.BroadcastMessage("Scan");
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
	if (targetTimer >= 1){// PlayerDetection.playerDetected == false &&){
		var vectors = [transform.position, myTarget];
		seeker.BroadcastMessage("StartPath", vectors);	
		targetTimer = 0;	
//		var vectors = [transform.position, myTarget];
//		seeker.BroadcastMessage("StartPath", vectors);
	}
        	
		if (path != null && currentWaypoint < path.vectorPath.Count) {
            //Direction to the next waypoint
        	var dir : Vector3 = (path.vectorPath[currentWaypoint]-transform.position).normalized;
        	dir *= speed * Time.fixedDeltaTime;
        	dir.y += 3;
        	controller.SimpleMove(dir);
        	
        	Debug.Log(Vector3.Distance(transform.position,path.vectorPath[currentWaypoint]) + " " + path.vectorPath[currentWaypoint] + " " + nextWaypointDistance);
        		
        	if (Vector3.Distance(transform.position,path.vectorPath[currentWaypoint]) < nextWaypointDistance) {
            	currentWaypoint++;
        	}
        }
//		var direction : Vector3 = (myTarget - transform.position).normalized;
//		direction *= speed * Time.fixedDeltaTime;//fixedDeltaTime; 
//		controller.SimpleMove(direction);

		//rigidbody.MovePosition((transform.position + direction)*Time.deltaTime);
		//transform.position += (transform.forward * speed * Time.deltaTime);
		//rigidbody.MovePosition
		//nav.SetDestination (myTarget);
//		var vectors = [transform.position, myTarget];
//		seeker.BroadcastMessage("StartPath", vectors);
		//Seeker.StartPath (transform.position,myTarget);
	
	timer -= Time.deltaTime;
	targetTimer += Time.deltaTime;
}

function OnPathComplete (p : Path) {
	//Debug.Log ("Yay, we got a path back. Did it have an error? "+p.error);
	//Debug.Log(p.vectorPath.Count);
	if (!p.error) {
    	path = p;
        //Reset the waypoint counter
        currentWaypoint = 0;
    }
}