var rightFacing = true;
var playing = false;
var started = false;
var crashed = false;
var textRendered = false;
var score = 0; // start at 0

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
bgReady = true;
};
bgImage.src = "images/floor.png";

// The sun image
var sunReady = false;
var sunImage = new Image();
sunImage.onload = function () {
sunReady = true;
};

sunImage.src = "images/sun.png";
function drawGround()
{
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 368);
		ctx.drawImage(sunImage, 500, 30);
	}
}

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/ninja_right.png";

// Hero image left (firefox fix)
var herolReady = false;
var herolImage = new Image();
herolImage.onload = function () {
	herolReady = true;
};
herolImage.src = "images/ninja_left.png";

//<wat?>
var eReady = false;
var eImage = new Image();
eImage.onload = function () {
eReady = true;
};
eImage.src = "images/easter.jpg";
//</wat?>

// Create our objects
var hero = {
	xSpeed: 2,
	ySpeed: 5
};

function clear()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function textThings()
{
	if(!easter){
	// Draw things at the start	
	if(!started){
		clear();
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Press Space to start!", (canvas.width/2), (canvas.height/2));	
		for(var i = 0; i < clouds.length; i++)
		{	
			ctx.beginPath();
			ctx.drawImage(clImage, clouds[i].x, clouds[i].y);
			ctx.closePath();
		}	
		ctx.drawImage(heroImage, 50, 50);
		ctx.drawImage(sunImage, 500, 30);	
		ctx.drawImage(bgImage, 0, 368);
	}
	// End draw things at the start
	
	
	// Crash text
	if(started && !playing && crashed){
		if(!textRendered){
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("You've crashed! Tut tut!", (canvas.width/2), (canvas.height/2));	
		ctx.fillText("Press R to retry!", (canvas.width/2), (canvas.height/2 + 30));	
		textRendered = true;
		}
	}
	// End crash text
	}
}


function reload()
{
	clear();
	clouds = [];
	rabbits = [];
	forks = [];
	stuckForks = [];
	initClouds();
	initPlayer();
	initRabbits();
	crashed = false;
	rightFacing = true;
	playing = true;
	started = true;
	textRendered = false;
}

function drawAllOnce()
{
	//Draws all images of the screen once to load them into memory, not sure if this helps yet
	heroImage.src = "images/ninja_right.png";
	ctx.drawImage(heroImage, -200, -200);
	heroImage.src = "images/ninja_left.png";
	ctx.drawImage(heroImage, -200, -200);	
	heroImage.src = "images/splat.png";
	ctx.drawImage(heroImage, -200, -200);
	heroImage.src = "images/splatl.png";
	ctx.drawImage(heroImage, -200, -200);		
	heroImage.src = "images/ninja_right.png";
	ctx.drawImage(bunnyImage, -200, -200);
	clear();
	console.log("Drew all images once to avoid flickering");
}