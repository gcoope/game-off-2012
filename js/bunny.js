var rabbits = [];
var rabbitHeight = 16,
	rabbitWidth = 16,
	bunnyCropX = 0,
	bunnyCropY = 0,
	maxRabbits = 8;

function objRabbit()
{
	this.x = randomRange(16, canvas.width - 17);
	x = this.x;
	this.speed = ((Math.random() * 3) + 2); // Random speed
	this.height = rabbitHeight;
	this.width = rabbitWidth;
	this.rect = Shapes().rectangle(x, this.y, this.width, this.height);	
}

function newRabbit()
{
	var rab = new objRabbit();	
	rabbits.push(rab);
}

function limitRabbits()
{
	if(rabbits.length > 10)
	{
		clear();
		rabbits = [];	
	}		
}

function moveRabbits()
{
	for(var i = 0; i < rabbits.length; i++)
	{	
		rabbits[i].x += rabbits[i].speed;		
		if(rabbits[i].x > canvas.width - 15)
		{
			rabbits[i].speed = -rabbits[i].speed ;
		}	
		if(rabbits[i].x < 0)
		{
			rabbits[i].speed = -rabbits[i].speed ;
		}					
		clear();
	}	
}



function drawRabbits()
{
	for(var i = 0; i < rabbits.length; i++)
	{		
		if(rabbits[i].speed > 0)
		{
			bunnyCropX = 285;
			bunnyCropY = 50;
		}
		else if(rabbits[i].speed < 0)
		{
			bunnyCropX = 285;
			bunnyCropY = 33;
		}		
		if(spritesReady)
		{
			ctx.drawImage(spriteImg, bunnyCropX, bunnyCropY, rabbitHeight, rabbitWidth, rabbits[i].x, canvas.height -46, rabbitHeight, rabbitWidth);
		}
	}
}

function initRabbits()
{
	for(var i = 0; i < maxRabbits; i++){newRabbit();} // spawns 7 rabbits
}