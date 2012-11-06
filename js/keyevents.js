// Handle keyboard controls
var keysDown = {};
var keysUp = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	delete keysUp[e.keyCode];
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	keysUp[e.keyCode] = true;
}, false);

var easter = false;
var droppingFork = false;

var keyEvents = function()
{
	if(playing){
		if (38 in keysDown || 87 in keysDown) { // Up
				hero.y -= hero.ySpeed;
		}
		if (40 in keysDown) { // Down
			// do nothing
		}
		if (37 in keysDown || 65 in keysDown) { // Left
				hero.x -= hero.xSpeed;
				rightFacing = false;
				if(!crashed){heroImage.src = "images/ninja_left.png";}
				
		}
		if (39 in keysDown || 68 in keysDown) { // Right
				hero.x += hero.xSpeed;
				rightFacing = true;
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
	/////////////////////////////////
	if(54 in keysDown && 57 in keysDown){
		if(!playing && !crashed){
		easter = true;
		ctx.drawImage(eImage, 100, -20);
		score = 69;
		}
	} else{easter = false;}
}