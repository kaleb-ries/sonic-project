const menu = [
{
name: "settings",
sub: [
{
name: "volume",
enter: () => {
seek = volume;
},
sub: [
{
name: "volume",
row: (dir) => {
horizontal(dir);
volume = seek;
}
}
]
}
]
},
{
name: "help"
}
];

var item = 0;
var seek = 0;
var volume = 80;
var level = menu;
var root = [];
function opening() {
let sound = new Howl({
	src: [level[item].name+'.mp3'],
	autoplay: true
});
}
document.addEventListener('keyup', (key) => {
if (key.key === "ArrowUp") {
shift("up");
} else if (key.key === "ArrowDown") {
shift("down");
} else if (key.key === "ArrowLeft") {
if (level[item].row) {
level[item].row("left");
}
} else if (key.key === "ArrowRight") {
if (level[item].row) {
level[item].row("right");
}
} else if (key.key === "Enter") {
if (level[item].enter) {
level[item].enter;
}
if (level[item].sub) {
root.push(level);
level = level[item].sub;
item = 0;
let sound = new Howl({
	src: [level[item].name+'.mp3'],
	autoplay: true
});
}
} else if (key.key === "Escape") {
if (root.length !== 0) {
level = root[root.length - 1];
root.pop();
item = 0;
let sound = new Howl({
	src: [level[item].name+'.mp3'],
	autoplay: true
});
}
}
});

function shift(dir) {
if (dir === "up") {
item -= 1;
} else if (dir === "down") {
item += 1;
}
if (!menu[item]) {
if (dir === "up") {
item = menu.length - 1;
} else if (dir === "down") {
item = 0;
} else {
console.log("Invalid string given - must be either 'up' or 'down'");
}
}
let sound1 = new Howl({
	src: [level[item].name+'.mp3'],
	autoplay: true
});
let sound2 = new Howl({
	src: ['click.mp3'],
	autoplay: true
});
}
function horizontal(dir) {
if (dir === "right") {
seek += 10;
} else if (dir === "left") {
seek -= 10;
} else {
console.log("Invalid string given - should be 'right' or 'left'");
}
if (seek > 100) {
seek = 100;
} else if (seek < 0) {
seek = 0;
}
let sound = new Howl({
	src: ['volume/'+seek+'.mp3'],
	autoplay: true
});
}