var canvas, ctx;

try
{
	init();
	update();
}
catch(err){
	console.log(err);
	alert("Please report this bug to: george@gcoope.co.uk");
}

function init()
{
	canvas = document.createElement("canvas");
	canvas.width = 600;
	canvas.height = 400;	
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	initClouds();
	initRabbits();
	console.log("Game loaded correctly");
}

function update()
{
	requestAnimationFrame(update);
	keyEvents();
	textThings();
	
	if(playing){
		clear();	
		updatePlayer();
		moveClouds();
		fbCollisions();
		moveRabbits();	
		moveForks();
		checkWin();
		draw();		
	}
}

function draw()
{	
	drawGround();
	drawClouds();
	drawForks();
	drawRabbits();	
	drawPlayer();	
	playerScoring();		
}