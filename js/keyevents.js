// Handle keyboard controls
var keysDown = {};
var keysUp = {};
var UP = false;
var DOWN = false;
var LEFT = false;
var RIGHT = false;

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	delete keysUp[e.keyCode];
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	keysUp[e.keyCode] = true;
}, false);

var droppingFork = false;

var keyEvents = function()
{
	if(playing){
		if (38 in keysDown || 87 in keysDown) { // Up
				UP = true;
		}
		if (37 in keysDown || 65 in keysDown) { // Left
				LEFT = true;
				rightFacing = false;				
		}
		if (39 in keysDown || 68 in keysDown) { // Right
				RIGHT = true;
				rightFacing = true;
		}
		if (38 in keysUp || 87 in keysUp) { // Up
				UP = false;
		}
		if (37 in keysUp || 65 in keysUp) { // Left
				LEFT = false;
		}
		if (39 in keysUp || 68 in keysUp) { // Right
				RIGHT = false;
		}			
		
		if (70 in keysDown && droppingFork == false) {
			droppingFork = true;
			dropFork();
		}		
		if (70 in keysUp){
			droppingFork = false;
		}
	}
	
	if(!playing && !crashed){
		if(32 in keysDown){
			playing = true;
			started = true;
		}
	}	
	if(crashed){
		if(82 in keysDown){
			reload();
			console.log("Restarted");
		}
	}
}