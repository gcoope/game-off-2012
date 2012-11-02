var forkSpeed = 4;
var forks = [];
var stuckForks = [];
var maxForks = 30;

var forkReady = false;
var forkImage = new Image();
forkImage.onload = function () {
	forkReady = true;
};
forkImage.src = "images/fork.png";	

function objFork(x, y)
{
	this.x = x;
	this.y = y;
}

function objStuckFork(x)
{
	this.x = x;
}

function dropFork()
{
	/*if(forks.length > maxForks){
		forks.splice(0,1);
		stuckForks.splice(0,1);
		var tempFork = new objFork(hero.x + 20, hero.y);
		forks.push(tempFork);
	}*/
	var tempFork = new objFork(hero.x + 20, hero.y);
	forks.push(tempFork);
	console.log("Fork dropped"); 
	if(forks.length > maxForks || stuckForks > maxForks){
		forks.splice(0,1);
		stuckForks.splice(0,1);
	}
}

function moveForks()
{
	for(var i = 0; i < forks.length; i++)
	{	
		forks[i].y += forkSpeed;

		if (forkReady) 
		{
			ctx.drawImage(forkImage, forks[i].x, forks[i].y);
		}

		if(forks[i].y > canvas.height - 64)
		{
			var tempStuckFork = new objStuckFork(forks[i].x);
			stuckForks.push(tempStuckFork);
			forks[i].y = canvas.height - 64;
		}
	}	
}

function drawStuckForks(){

	for(var i = 0; i < stuckForks.length; i++)
	{
		ctx.beginPath();
		ctx.drawImage(forkImage, stuckForks[i].x, -64);
		ctx.closePath();
	}
}
