// Clouds array
var clouds = [];
var cloudWidth = 128, 
	cloudHeight = 64,
    cloudCropX = 0,
	cloudCropY = 33,
	cloudCount = 8;

function objCloud()
{
	this.y = (Math.random() * 100);
	this.x = (Math.random() * canvas.width - 200) + 30;
	this.speed = ((Math.random() * 1.2) + 0.4); // Random speed
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
		ctx.drawImage(spriteImg, cloudCropX, cloudCropY, cloudWidth, cloudHeight, clouds[i].x, clouds[i].y, cloudWidth, cloudHeight);
	}	
}

function initClouds()
{
	for(var i = 0; i <= cloudCount; i++){newCloud();} // spawns 8 clouds
}