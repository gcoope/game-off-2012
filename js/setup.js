var rightFacing = true,
	playing = false,
	started = false,
	crashed = false,
	textRendered = false,
	score = 0;

// Spritesheet image loading
var spritesReady = false;
var spriteImg = new Image();
spriteImg.onload = function () {
spritesReady = true;
};
spriteImg.src = "images/spritesheet.png";

function drawGround()
{
	if (spritesReady) {
		ctx.drawImage(spriteImg, 0, 0, 600, 32, 0, 368, 600, 32); // Ground
		ctx.drawImage(spriteImg, 129, 33, 57, 57, 500, 30, 57, 57); // Sun
	}
}

function clear()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function textThings()
{
	// Initial drawings
	if(!started){
		clear();
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("Press Space to start!", (canvas.width/2), (canvas.height/2));	
		for(var i = 0; i < clouds.length; i++)
		{	
			ctx.drawImage(spriteImg, 0, 33, 128, 64, clouds[i].x, clouds[i].y, 128, 65); // Draw clouds
		}	
		
		ctx.drawImage(spriteImg, 187, 63, 48, 29, 50, 50, 48, 29);// Player
		ctx.drawImage(spriteImg, 129, 33, 57, 57, 500, 30, 57, 57); // Sun	
		ctx.drawImage(spriteImg, 0, 0, 600, 32, 0, 368, 600, 32); // Ground
	}	
	
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
}

function checkWin()
{
	if(score == 8)
	{
		playing = false;
		started = false;
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText("You win!", (canvas.width/2), (canvas.height/2));	
		ctx.fillText("Press R to retry!", (canvas.width/2), (canvas.height/2 + 30));	
		textRendered = true;
	}
}

function reload()
{
	clear();
	score = 0;
	clouds = [];
	rabbits = [];
	forks = [];
	stuckForks = [];
	initClouds();
	hero.x = 50, hero.y = 50;
	initRabbits();
	crashed = false;
	rightFacing = true;
	playing = true;
	started = true;
	textRendered = false;
}

//function to get random number in a range
function randomRange(minVal,maxVal,floatVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}