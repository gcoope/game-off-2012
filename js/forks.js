var forkSpeed = 10;
var maxForks = 15;
var forks = [];
var forkWidth = 9,
	forkHeight = 32,	
	forkCropX = 302,
	forkCropY = 33;

function objFork(x, y)
{
	this.x = x;
	this.y = y;
	this.height = 36;
	this.width = 9;
	x2 = this.x;
	this.rect = Shapes().rectangle(this.x, this.y, this.width, this.height);
}

function dropFork()
{
	var tempFork = new objFork(hero.x + 20, hero.y);
	forks.push(tempFork);
	console.log("Fork dropped"); 
	if(forks.length >= maxForks){
		forks.splice(0,1);
	}
}

function moveForks()
{
	for(var i = 0; i < forks.length; i++)
	{	
		forks[i].y += forkSpeed;

		if(forks[i].y > canvas.height - 62)
		{
			forks[i].y = canvas.height - 62;
		}
	}	
}

function drawForks()
{
	for(var i = 0; i < forks.length; i++)
	{	
		if (spritesReady) 
		{
			ctx.drawImage(spriteImg, forkCropX, forkCropY, forkWidth, forkHeight, forks[i].x, forks[i].y, forkWidth, forkHeight);
		}
	}
}

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function fbCollisions()
{
for(var r = 0; r < rabbits.length; r++)
{
	for(var f = 0; f < forks.length; f++)
	{
		if(rabbits[r].rect.intersect(forks[f].rect))
		{
			console.log("collision");
			forks.splice(f,1);
			rabbits.splice(r,1);
			score += 1;				
		}
	
		/*if(intersectRect(rabbits[r].rabbitRect, forks[f].forkRect))
		{
			console.log("collision");
			forks.splice(f,1);
			rabbits.splice(r,1);
			score += 1;
		}*/
	}
}
}