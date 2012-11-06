var fallSpeed = 2;

function initPlayer()
{
hero.x = 50;
hero.y = 50;
}


function drawPlayer()
{
	// If the browser ISN'T firefox. This is done as firefox doesn't show the player facing left
	// using the normal method, unsure why
	if(!navigator.userAgent.toLowerCase().indexOf('firefox') > -1)	{
		if (heroReady) {
				ctx.drawImage(heroImage, hero.x, hero.y);
		}	
	}
	else{
		if (heroReady && rightFacing) {
			ctx.drawImage(heroImage, hero.x, hero.y);
		}	
		else if(herolReady && !rightFacing){
			ctx.drawImage(herolImage, hero.x, hero.y);
		}
	}
}

function updatePlayer()
{		
	playerMovement();
	edgeColls();
}

var edgeColls = function()
{
	// Max player height
	if (hero.y < 5)
	{
		hero.y = 6;
	}

	// Keeps player in canvas on x-axis
	if(hero.x < 0)
	{
		hero.x = 1;
	}
	if(hero.x > canvas.width - 48)
	{
		hero.x = canvas.width - 49;
	}
}

 
function playerMovement()
{
	if(!crashed){
		if(rightFacing){
			hero.x += 4;
			heroImage.src = "images/ninja_right.png";
		}
		else{
			hero.x -= 4;
			heroImage.src = "images/ninja_left.png";
		}
	}
	if(hero.y < canvas.height-56){
		hero.y += fallSpeed;
	}	
	else{
		if(!crashed){
			if(rightFacing){heroImage.src = "images/splat.png";}
			else if(!rightFacing){heroImage.src = "images/splatl.png";}		
			score -= 1;
			console.log("You crashed!");
			crashed = true;
			window.setTimeout(pausingStuff, 30); // See function below
		}
	}	
}

// Gives a delay of .3 seconds to give browser time to render the splat before pausing
function pausingStuff()
{
	playing = false;
}

function playerScoring()
{
	// Start scoring text
	if(playing && started){
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.font = "24px Helvetica";
		ctx.fillText("Score: ", 50, 10);
		ctx.fillText(score, 100, 11);
	}
	// End scoring
}