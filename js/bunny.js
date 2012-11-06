// Rabbits array
var rabbits = [];

var rabbitHeight = 16, rabbitWidth = 16;

// Rabbit image
var bunnyReady = false;
var bunnyImage = new Image();
bunnyImage.onload = function () {
bunnyReady = true;
};
bunnyImage.src = "images/rabbit_r.png";

// Left Rabbit image (for firefox)
var bunnylReady = false;
var bunnylImage = new Image();
bunnylImage.onload = function () {
bunnylReady = true;
};
bunnyImage.src = "images/rabbit.png";


function objRabbit()
{
	this.x = (Math.random() * canvas.width);
	this.x2 = this.x + 16;
	this.speed = ((Math.random() * 3) + 2); // Random speed
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
		
		if(rabbits[i].x > canvas.width)
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
		if(rabbits[i].speed > 0){bunnyImage.src = "images/rabbit_r.png";}
		else if(rabbits[i].speed < 0){bunnyImage.src = "images/rabbit.png";}
		
		if (bunnyReady && rabbits[i].speed > 0) {
			ctx.drawImage(bunnyImage, rabbits[i].x, rabbits[i].y);
		}	
		else if(bunnylReady && rabbits[i].speed < 0){
			ctx.drawImage(bunnylImage, rabbits[i].x, rabbits[i].y);
		}
	
		ctx.beginPath();
		ctx.drawImage(bunnyImage, rabbits[i].x, canvas.height -46);
		ctx.closePath();
	}	
}

function initRabbits()
{
	for(var i = 0; i < 8; i++){newRabbit();} // spawns 7 rabbits
}