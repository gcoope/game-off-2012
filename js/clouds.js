// Clouds array
var clouds = [];

// Cloud image
var clReady = false;
var clImage = new Image();
clImage.onload = function () {
clReady = true;
};
clImage.src = "images/cloud1.png";


function objCloud()
{
	this.y = (Math.random() * 100);
	this.x = (Math.random() * canvas.width - 200) + 30;
	this.speed = ((Math.random() * 1.5) + 1); // Random speed
}

function newCloud()
{
	var cld = new objCloud();	
	clouds.push(cld);
}

function limitClouds()
{
	if(clouds.length > 5)
	{
		clear();
		clouds = [];	
	}		
}

function moveClouds()
{
	for(var i = 0; i < clouds.length; i++)
	{	
		clouds[i].x += clouds[i].speed;
		
		if(clouds[i].x > (canvas.width + 129))
		{
			clouds[i].x = - 129;
		}				
				
		clear();
	}	
}

function drawClouds()
{
	for(var i = 0; i < clouds.length; i++)
	{	
		ctx.beginPath();
		ctx.drawImage(clImage, clouds[i].x, clouds[i].y);
		ctx.closePath();
	}	
}

function initClouds()
{
	for(var i = 0; i < 7; i++){newCloud();} // spawns 8 clouds
}