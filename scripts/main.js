var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var iso = new Isomer(canvas);

var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;
var red = new Color(160, 60, 50);
var blue = new Color(50, 60, 160);

var player = {
	x: 0,
	y: 0,
	z: 2
};

var world = {
	width: 4,
	height: 4
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var colorchange = 64 * Math.sin((Date.now() % 1000) / 1000 * Math.PI)
	var z = Math.sin((Date.now() % 2000) / 2000 * Math.PI);
	var floor = Shape.Prism(Point.ORIGIN, world.width, world.height, 2 + z).translate(-player.x, -player.y, 0);
	var player_shape = Shape.Prism(new Point(player.x, player.y, player.z + z), 1, 1, 1).translate(-player.x, -player.y, 0);;
	var color = new Color(50 + colorchange, 60, 160);
	iso.add(floor, color);
	iso.add(player_shape, color);
	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

document.onkeydown = function (e) {
	var event = window.event ? window.event : e;
	var key = event.keyCode;
	if (key === 37) {
		player.x -= 1;
		player.y+=1;
	} else if (key === 39) {
		player.x += 1;
		player.y-=1;
	} else if (key === 38) {
		player.y += 1;
		player.x += 1;
	} else if (key === 40) {
		player.y -= 1;
		player.x -= 1;
	}
	if (player.y < 0) player.y = 0;
	if (player.y > world.height - 1) player.y = world.height - 1;
	if (player.x < 0) player.x = 0;
	if (player.x > world.width - 1) player.x = world.width - 1;
}
