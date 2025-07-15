const menu = [
{
name: "settings",
sub: [
{name: "cool-boom"},
{name: "weird"}
]
},
{
name: "help"
}
];

var item = 0;
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
} else if (key.key === "Enter") {
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