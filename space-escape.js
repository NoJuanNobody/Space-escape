var animate = window.requestAnimationFrame||
	window.webkitRequestAnimationFrame||
	window.MozRequestAnimationFrame||
	function(callback){window.setTimeout(callback, 1000,60);};

var canvas = document.createElement('canvas');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
	document.body.appendChild(canvas);
	animate(step);
};

var step = function() {
	update();
	render();
	animate(step);
};

var update = function(){
	spaceship.update();
	asteroid.update();
for(var i = 1; i<asteroidArray.length;i+=5){
		asteroidArray[i].update();
	}
	if (asteroidArray.length >50){
		asteroidArray.splice(0,20);
	}
};

var render = function() {
	context.fillStyle = "#22313F";
	context.fillRect(0,0,width,height);
	spaceship.render();
	asteroid.render();
	for(var i = 1; i<asteroidArray.length;i+=5){
		asteroidArray[i].render();
	}
	context.fillStyle = "#FFFFFF";
	context.textAlign = "right";
	context.font = "32px courier";
	context.fillText(score, 700, 50);
	context.fillText("Score", 600, 50);
};


function Spaceship(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
}

Spaceship.prototype.update = function(){
	for (var key in keysDown) {
		var value = Number(key);
		if(value == 37){
			this.move(-4,0);
		}else if (value == 39){
			this.move(4,0);
		// }else if(value == 38){
		// 	this.move(0,-4);
		// }else if (value == 40){
		// 	this.move(0,4);
		}else{
			this.move(0,0);
		}
	}
};
Spaceship.prototype.move = function(x,y){
	this.x +=x;
	this.y +=y;
	this.x_speed=x;
	this.y_speed=y;
	var top_y = this.y-75;
	var bottom_y = this.y+20;
	var right_x = this.x+90;
	var left_x = this.x-40;
	// if the spaceship hits the left wall 
	if (left_x<0){
		this.x = 40;
		this.x_speed = 0;
	}else if(right_x>canvas.width){ //right wall
		this.x = canvas.width-90;
		this.x_speed = 0;
	}else if(bottom_y>canvas.height){
		this.y=canvas.height-20;
		this.y_speed = 0;
	}else if(top_y < 0){
		this.y=75;
		this.y_speed = 0;
	}
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

Spaceship.prototype.render = function() {
  context.beginPath();
  context.moveTo(this.x,this.y);
  context.lineTo(this.x+25,this.y-75);
  context.lineTo(this.x+50,this.y);
  // context.lineTo(this.x+75,this.y);
  // context.lineTo(this.x+80,this.y-50);
  // context.lineTo(this.x+90,this.y);
  // context.lineTo(this.x+85,this.y+20);
  // context.lineTo(this.x+80,this.y+10);
  context.lineTo(this.x+50,this.y+10);
  context.lineTo(this.x+40,this.y+20);
  context.lineTo(this.x+25,this.y+10);
  context.lineTo(this.x+12,this.y+20);
  context.lineTo(this.x,this.y+10);
  // context.lineTo(this.x-30,this.y+10);
  // context.lineTo(this.x-35, this.y+20);
  // context.lineTo(this.x-40, this.y+10);
  // context.lineTo(this.x-40, this.y);
  // context.lineTo(this.x-35,this.y-50);
  // context.lineTo(this.x-30,this.y);
  context.lineTo(this.x,this.y);
  context.fillStyle = "#C5EFF7";
  context.fill();
};

var spaceship = new Spaceship(375,540);

function Asteroid(x,y){
	this.x = x;
	this.y = y;
	this.x_speed =0;
	this.y_speed=5;
	this.radius = 5;
}

Asteroid.prototype.render = function(){
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#FFFFFF";
	context.fill();
};
Asteroid.prototype.update = function(){
	this.x+=this.x_speed;
	this.y+=this.y_speed;
	if(this.y>canvas.height){
		this.y=0;
		this.x = Math.random()*canvas.width;
		// create new asteroid
		asteroidArray.push(new Asteroid(Math.random()*canvas.width,-Math.random()*canvas.height));
		score++;
	}
	if(this.y>spaceship.y && this.y>(spaceship.y+20) && spaceship.x<this.x  && this.x<(spaceship.x+50)){
		console.log("fail");
		asteroidArray.splice(0,50);
		score=0;
	}
};

var asteroid = new Asteroid(Math.random()*canvas.width,0);
var asteroidArray=[];
var score=0;
