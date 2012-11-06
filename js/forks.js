var forkSpeed = 10;
var forks = [];
var maxForks = 15;
var forkHeight = 32, forkWidth = 9;

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
	this.x2 = this.x + 9;
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

		if (forkReady) 
		{
			ctx.drawImage(forkImage, forks[i].x, forks[i].y);
		}

		if(forks[i].y > canvas.height - 72)
		{
			forks[i].y = canvas.height - 72;
		}
	}	
}

function fbCollisions()
{
// i = forks
// j = rabbits
	for(var i = 0; i < forks.length; i++)
	{
	if(forks[i].y > canvas.height - 75) // Only does this if fork is low, saves memory
	{
		for(var j = 0; j < rabbits.length; j++)
			{
				if(isPixelCollision(forkImage, forks[i].x, forks[i].y, bunnyImage, rabbits[j].x, rabbits[j].y, false))
				{
					console.log("collision");
					score += 1;
				}
			}
		}
	}
}


function checkCollision(x, y, w, h)
{
	var imgd = ctx.getImageData(x, y, w, h);
	var pix = imgd.data;
	for (var i = 0; n = pix.length, i < n; i++) 
	{
		if (pix[i] == 0) {
			collision = 1;
		}
	}
}


/**
 * @param first An ImageData object from the first image we are colliding with.
 * @param x The x location of 'first'.
 * @param y The y location of 'first'.
 * @param other An ImageData object from the second image involved in the collision check.
 * @param x2 The x location of 'other'.
 * @param y2 The y location of 'other'.
 * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
 */
function isPixelCollision( first, x, y, other, x2, y2, isCentred )
{
    // we need to avoid using floats, as were doing array lookups
    x  = Math.round( x );
    y  = Math.round( y );
    x2 = Math.round( x2 );
    y2 = Math.round( y2 );

    var w  = first.width,
        h  = first.height,
        w2 = other.width,
        h2 = other.height ;

    // deal with the image being centred
    if ( isCentred ) {
        // fast rounding, but positive only
        x  -= ( w/2 + 0.5) << 0
        y  -= ( h/2 + 0.5) << 0
        x2 -= (w2/2 + 0.5) << 0
        y2 -= (h2/2 + 0.5) << 0
    }

    // find the top left and bottom right corners of overlapping area
    var xMin = Math.max( x, x2 ),
        yMin = Math.max( y, y2 ),
        xMax = Math.min( x+w, x2+w2 ),
        yMax = Math.min( y+h, y2+h2 );

    // Sanity collision check, we ensure that the top-left corner is both
    // above and to the left of the bottom-right corner.
    if ( xMin >= xMax || yMin >= yMax ) {
        return false;
    }

    var xDiff = xMax - xMin,
        yDiff = yMax - yMin;

    // get the pixels out from the images
    var pixels  = first.data,
        pixels2 = other.data;

    // if the area is really small,
    // then just perform a normal image collision check
    if ( xDiff < 4 && yDiff < 4 ) {
        for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
            for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
                if (
                        ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                        ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                ) {
                    return true;
                }
            }
        }
    } else {
        /* What is this doing?
         * It is iterating over the overlapping area,
         * across the x then y the,
         * checking if the pixels are on top of this.
         *
         * What is special is that it increments by incX or incY,
         * allowing it to quickly jump across the image in large increments
         * rather then slowly going pixel by pixel.
         *
         * This makes it more likely to find a colliding pixel early.
         */

        // Work out the increments,
        // it's a third, but ensure we don't get a tiny
        // slither of an area for the last iteration (using fast ceil).
        var incX = xDiff / 3.0,
            incY = yDiff / 3.0;
        incX = (~~incX === incX) ? incX : (incX+1 | 0);
        incY = (~~incY === incY) ? incY : (incY+1 | 0);

        for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
            for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
                for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
                    for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                        if (
                                ( pixels [ ((pixelX-x ) + (pixelY-y )*w )*4 + 3 ] !== 0 ) &&
                                ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                        ) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}


/*
			if(forks[i].y == (canvas.height - 64))
			{
				if((forks[i].x2 > rabbits[j].x) && (forks[i].x < rabbits[j].x2))
				{
					rabbits.splice(j,1);
					forks.splice(i,1);
				}
			}
*/