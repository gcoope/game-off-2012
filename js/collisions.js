/**
 * Author: Jared Lee Ostmeyer
 * Email Address: jostmey@gmail.com
 * Date Started: 2012-02-06
 * Purpose: Simple collision detection
 * License: http://www.gnu.org/licenses/lgpl.txt
 *
 * This package is designed to create models of geometric shapes. The shapes can be
 * placed anywhere in the cartesian plane, moved around, and combined together to form
 * more complicated composite shapes. In addition, collision detection is provided to
 * determine if any two shapes overlap or intersect on another.
 *
 * By default the package comes with three basic shapes. The example below illustrates
 * the three available shapes.
 *
 * 	var point = Shapes().point(4, 5);
 *	var circle = Shapes().circle(10, 12, 4);
 *	var rectangle = Shapes().rectangle(3, 0, 15, 24);
 *
 * In this example, the first line creates a point with coordinate (4, 5). The second
 * line creates a circle centered at thecoordinate (10, 12) with radius 4. The last line
 * creates a rectangle centered at the coordinate (3, 0) with length 15 and height 24.
 *
 * Each shapes contains a set of methods for manipulating and retriving information about
 * the shape.
 *
 * 	getCenter()  -> { x: FLOAT, y: FLOAT }
 * 	setCenter(x_center, y_center)
 * 	translate(dx, dy)
 *	intersect(shape)  -> BOOLEAN
 *
 * These methods are easy to use. As an example, suppose you want to check if one shape
 * intersects or overlaps another shape. The "intersect" command will accomplish this
 * task, as shown below.
 *
 *	circle.intersect(rectangle)
 *
 * This snippet of code will return a boolean value indicating if the circle from the
 * first example collides with the rectangle (also from the first example).
 *
 * Sometimes it may be advantageous to create additional shapes. This can easily be done
 * by using the "build" command. This command creates a composite shape out of the three
 * basic shapes already provided. Here is an example of how this command may be used to
 * define a new composite shape.
 *
 *	doubleCircle = function(x, y, r) {
 *		return Shapes().build([
 * 			Shapes().circle(x-r, y, r),
 * 			Shapes().circle(x+r, y, r)
 * 		]);
 *	}
 *
 * The new shape can then be created using the line of code below. The new composite
 * shape will contain all the same methods as the already existing default shapes
 * provided.
 *
 * 	var compositeShape = doubleCircle(0, 10, 4);
 *
 */

function Shapes() {

	var shapes = {

		/* Create a point centered at the coordinate (x, y). */

		point: function(x, y) {

			return {

				__private: { x: x, y: y, type: "point" },
 
				getCenter: function() { return { x: this.__private.x, y: this.__private.y }; },

				setCenter: function(x, y) { this.__private.x = x; this.__private.y = y; },

				translate: function(dx, dy) { this.__private.x += dx; this.__private.y += dy; },

				intersect: function(shape) {
					if(shape.__private.type)
						switch(shape.__private.type) {
							case "point": return intersect.pointPoint(this, shape);
							case "circle": return intersect.pointCircle(this, shape);
							case "rectangle": return intersect.pointRectangle(this, shape);
						}
					else if(shape.__private.primitives)
						for(var index in shape.__private.primitives)
							if(this.intersect(shape.__private.primitives[index]))
								return true;
					return false;
				}
			};
		},

		/* Create a circle centered at the coordinate (x, y) with radius r. */

		circle: function(x, y, r) {

			return {

				__private: { x: x, y: y, r: r, type: "circle" },
 
				getCenter: function() { return { x: this.__private.x, y: this.__private.y }; },

				setCenter: function(x, y) { this.__private.x = x; this.__private.y = y; },

				translate: function(dx, dy) { this.__private.x += dx; this.__private.y += dy; },

				intersect: function(shape) {
					if(shape.__private.type)
						switch(shape.__private.type) {
							case "point": return intersect.pointCircle(shape, this);
							case "circle": return intersect.circleCircle(this, shape);
							case "rectangle": return intersect.circleRectangle(this, shape);
						}
					else if(shape.__private.primitives)
						for(var index in shape.__private.primitives)
							if(this.intersect(shape.__private.primitives[index]))
								return true;
					return false;
				}
			};
		},

		/* Create a rectangle centered at the coordinate (x, y) with width dy and height dy. */

		rectangle: function(x, y, dx, dy) {

			return  {

				__private: { x: x, y: y, dx: dx, dy: dy, type: "rectangle" },

				getCenter: function() { return { x: this.__private.x, y: this.__private.y }; },

				setCenter: function(x, y) { this.__private.x = x; this.__private.y = y; },

				translate: function(dx, dy) { this.__private.x += dx; this.__private.y += dy; },

				intersect: function(shape) {
					if(shape.__private.type)
						switch(shape.__private.type) {
							case "point": return intersect.pointRectangle(shape, this);
							case "circle": return intersect.circleRectangle(shape, this);
							case "rectangle": return intersect.rectangleRectangle(this, shape);
						}
					else if(shape.__private.primitives)
						for(var index in shape.__private.primitives)
							if(this.intersect(shape.__private.primitives[index]))
								return true;
					return false;
				}
			};
		},

		/* Command useful for creating composite shapes out of the ones that already exist. */

		build: function(primitives) {
			return {

				__private: { primitives: primitives },

				getCenter: function() {
					var x = 0.0, y = 0.0, count = 0;
					for(var index in this.__private.primitives) {
						var r = this.__private.primitives[index].getCenter();
						x += r.x; y += r.y; count++;
					}
					x /= count; y /= count;
					return { x: x, y: y };
				},

				setCenter: function(x, y) {
					var r = this.getCenter();
					for(var index in this.__private.primitives) {
						var r_ = this.__private.primitives[index].getCenter();
						this.__private.primitives[index].setCenter(x+(r_.x-r.x), y+(r_.y-r.y));
					}
				},

				translate: function(dx, dy) {
					for(var index in this.__private.primitives)
						this.__private.primitives[index].translate(dx, dy);
				},

				intersect: function(shape) {
					for(var index in this.__private.primitives)
						if(this.__private.primitives[index].intersect(shape))
							return true;
					return false;
				}
			}
		}
	};

	var intersect = {

		/* Methods for detecting if a point intersects with any of the other primitive shapes. */

		pointPoint: function(point, point_) {
			return (point.__private.x == point_.__private.x && point.__private.y == point_.__private.y);
		},

		pointCircle: function(point, circle) {
			var dx = circle.__private.x-point.__private.x, dy = circle.__private.y-point.__private.y;
			if(dx*dx+dy*dy <= circle.__private.r*circle.__private.r) return true;
			return false;
		},

		pointRectangle: function(point, rectangle) {
			if(point.__private.x < rectangle.__private.x-rectangle.__private.dx/2.0 || 
				rectangle.__private.x+rectangle.__private.dx/2.0 < point.__private.x) return false;
			if(point.__private.y < rectangle.__private.y-rectangle.__private.dy/2.0 || 
				rectangle.__private.y+rectangle.__private.dy/2.0 < point.__private.y) return false;
			return true;
		},

		/* Methods for detecting if a circle intersects with any of the remaining primitive shapes. */

		circleCircle: function(circle, circle_) {
			var dx = circle.__private.x-circle_.__private.x;
			var dy = circle.__private.y-circle_.__private.y;
			var r_sum = circle.__private.r+circle_.__private.r;
			if(dx*dx+dy*dy <= r_sum*r_sum) return true;
			return false;
		},

		circleRectangle: function(circle, rectangle) {
			if(
				this.pointRectangle(
					shapes.point(circle.__private.x, circle.__private.y),
					shapes.rectangle(
						rectangle.__private.x, rectangle.__private.y,
						rectangle.__private.dx, rectangle.__private.dy+2*circle.__private.r
					)
				) ||
				this.pointRectangle(
					shapes.point(circle.__private.x, circle.__private.y),
					shapes.rectangle(
						rectangle.__private.x, rectangle.__private.y,
						rectangle.__private.dx+2*circle.__private.r, rectangle.__private.dy
					)
				) ||
				this.pointCircle(
					shapes.point(
						rectangle.__private.x-rectangle.__private.dx/2.0,
						rectangle.__private.y-rectangle.__private.dy/2.0
					),
					circle
				) ||
				this.pointCircle(
					shapes.point(
						rectangle.__private.x-rectangle.__private.dx/2.0,
						rectangle.__private.y+rectangle.__private.dy/2.0
					),
					circle
				) ||
				this.pointCircle(
					shapes.point(
						rectangle.__private.x+rectangle.__private.dx/2.0,
						rectangle.__private.y-rectangle.__private.dy/2.0
					),
					circle
				) ||
				this.pointCircle(
					shapes.point(
						rectangle.__private.x+rectangle.__private.dx/2.0,
						rectangle.__private.y+rectangle.__private.dy/2.0
					),
					circle
				)
			) return true;
			return false;
		},

		/* Methods for detecting if a rectangle intersects with any of the remaining primitive shapes. */

		rectangleRectangle: function(rectangle, rectangle_) {
			if(rectangle_.__private.x+rectangle_.__private.dx/2.0 < rectangle.__private.x-rectangle.__private.dx/2.0 ||
				rectangle.__private.x+rectangle.__private.dx/2.0 < rectangle_.__private.x-rectangle_.__private.dx/2.0)
				return false;
			if(rectangle_.__private.y+rectangle_.__private.dy/2.0 < rectangle.__private.y-rectangle.__private.dy/2.0 ||
				rectangle.__private.y+rectangle.__private.dy/2.0 < rectangle_.__private.y-rectangle_.__private.dy/2.0)
				return false;
			return true;
		}
	};

	return shapes;
}