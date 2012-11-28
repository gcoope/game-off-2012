// hero object
var hero = {
	xSpeed: 2,
	ySpeed: 5,
	x: 50,
	y: 50
};

var fallSpeed = 2;
var playerCropX = 0, playerCropY = 0;
var playerWidth = 48, playerHeight = 29;

function playerMovement()
{
	if(UP){hero.y -= hero.ySpeed;}	
	if(LEFT){hero.x -= hero.xSpeed;}	
	if(RIGHT){hero.x += hero.xSpeed;}

	if(!crashed) // Keeps player moving
	{
		if(rightFacing){hero.x += 4;}
		else{hero.x -= 4;}
	}
	if(hero.y > canvas.height-56) // If player hits ground level
	{
		if(!crashed)
		{
			console.log("You crashed!");
			crashed = true;
			window.setTimeout(pausingStuff, 30); // See function below
		}		
	}	
	else // Keep falling
	{
		hero.y += fallSpeed;
	}	
}

// Gives a delay of .3 seconds to give browser time to render the splat before pausing
function pausingStuff()
{
	playing = false;
}

function drawPlayer()
{
	if(spritesReady)
	{
		if(rightFacing)
		{
			if(!crashed)
			{
				// Right facing flying
				playerCropX = 187; 
				playerCropY = 63;
			}else
			{
				// Right facing splat
				playerCropX = 236;
				playerCropY = 33;
			}
		}
		else//(!rightFacing)
		{
			if(!crashed)
			{
				// Left facing flying
				playerCropX = 187;
				playerCropY = 33;
			}else
			{
				// Left facing splat
				playerCropX = 236;
				playerCropY = 63;				
			}
		}
		
		ctx.drawImage(spriteImg, playerCropX, playerCropY, playerWidth, playerHeight, hero.x, hero.y, playerWidth, playerHeight); // Draw player
	}
}

function updatePlayer()
{			
	edgeCollisions();
	playerMovement();
}

var edgeCollisions = function()
{
	if (hero.y < 5)
	{
		hero.y = 6;
	}

	if(hero.x < 0)
	{
		hero.x = 1;
	}
	if(hero.x > canvas.width - 48)
	{
		hero.x = canvas.width - 49;
	}
}

function playerScoring()
{
	if(playing && started){
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "20px Helvetica";
		ctx.fillText("Score: ", 50, 10);
		ctx.fillText(score, 90, 11);
	}
}