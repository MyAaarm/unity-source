#pragma strict

private var nav : NavMeshAgent;               // Reference to the nav mesh agent.
public static var theTarget : GameObject;
private var timer: float; 			// set duration time in seconds in the Inspector

function Awake ()
{
    // Set up the references.
    nav = GetComponent (NavMeshAgent);
}

function Update () {
	var targets = gameObject.FindGameObjectsWithTag("Player");
	var minDist = Number.MaxValue;
	var myTarget : Vector3;//GameObject;
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
	if(nav.enabled == false){
		transform.LookAt(myTarget);
	}
	Debug.Log(timer);
	if (PlayerDetection.playerDetected == false && Vector3.Distance(theTarget.transform.position, transform.position) >= 10){
		nav.enabled = true;
		nav.SetDestination (myTarget);
	}
	else{
		nav.enabled = false;
	}
	timer -= Time.deltaTime;
}