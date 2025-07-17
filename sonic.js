var config = {
volume: 80,
rate: 50
};
const menu = [
{
name: "settings",
config: config,
sub: [
{
name: function () {
return "rate|volume/"+menu[0].config.rate;
},
enter: () => {
seek = config.rate;
},
sub: [
{
name: "rate",
row: (dir) => {
horizontal(dir);
config.rate = seek;
playAudio('volume/'+seek);
}
}
]
},
{
name: function () {
return "volume|volume/"+menu[0].config.volume;
},
enter: () => {
seek = config.volume;
},
sub: [
{
name: "volume",
row: (dir) => {
horizontal(dir);
config.volume = seek;
playAudio('volume/'+seek);
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
var level = menu;
var root = [];
function opening() {
playAudio(level[item].name);
}
document.addEventListener('keyup', (key) => {
if (key.key === "Control") {
Howler.stop();
} else if (key.key === "ArrowUp") {
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
level[item].enter();
}
if (level[item].sub) {
root.push(level);
level = level[item].sub;
item = 0;
playAudio(level[item].name);
}
} else if (key.key === "Escape") {
if (root.length !== 0) {
level = root[root.length - 1];
root.pop();
item = 0;
playAudio(level[item].name);
}
}
});

function shift(dir) {
if (dir === "up") {
item -= 1;
} else if (dir === "down") {
item += 1;
}
if (!level[item]) {
if (dir === "up") {
item = level.length - 1;
} else if (dir === "down") {
item = 0;
} else {
console.log("Invalid string given - must be either 'up' or 'down'");
}
}
playAudio(level[item].name);
playAudio('click');
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

}
function playAudio(path, extra) {

var list;
if (typeof path === "function") {
list = path().split("|");
} else {
list = path.split("|");
}
Howler.stop();
setTimeout(function () {
let sound = new Howl({
	src: [list[0]+'.mp3'],
	html5: true,
	volume: config.volume*0.01,
	rate: (config.rate*0.01)+0.5,
	autoplay: true
});
sound.on('end', () => {
list.shift();
if (list[0]) {
console.log(list[0]);
playAudio(list[0]);
}
});
}, 1);
}