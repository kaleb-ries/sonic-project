var playing = [];
var startup = false;
var music;
var config = {
volume: {
speech: 60,
music: 50
},
music: "on",
rate: 50
};
const menu = [
{
name: "settings",
config: config,
sub: [
{
name: function () {
return "speech_volume|seek/"+config.volume.speech;
},
enter: () => {
seek = config.volume.speech;
},
sub: [
{
name: "volume",
row: (dir) => {
horizontal(dir);
config.volume.speech = seek;
playAudio('seek/'+seek);
}
}
]
},
{
name: () => {
return "music|"+config.music;
},
enter: () => {
if (config.music === "on") {
config.music = "off";
if (music) {
music.stop();
music = null;
}
} else {
config.music = "on";
music = new Howl({
	src: ["sounds/main_menu.mp3"],
	volume: config.volume.music*0.01,
	loop: true,
	html5: true,
	autoplay: true
});
}
playAudio(level[item].name, config.music);
}
},
{
name: function () {
return "music_volume|seek/"+config.volume.music;
},
enter: () => {
seek = config.volume.music;
},
sub: [
{
name: "music_volume",
row: (dir) => {
horizontal(dir);
config.volume.music = seek;
if (music) {
music.volume(config.volume.music*0.01);
}
playAudio('seek/'+seek);
}
}
]
},
{
name: () => {
return "rate|seek/"+config.rate;
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
playAudio('seek/'+seek);
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
if (config.music === "on") {
music = new Howl({
	src: ['sounds/main_menu.mp3'],
	volume: config.volume.music*0.01,
	loop: true,
	html5: true,
	autoplay: true
});
}
playAudio(level[item].name);
}

document.addEventListener('keyup', (key) => {
if (startup) {
if (key.key === "Control") {
playing.forEach((sound) => {
sound.stop();
});
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
} else if (key.key === " ") {
playAudio(level[item].name);
} else if (key.key === "Backspace") {
level = menu;
item = 0;
playAudio(level[item].name);
}
} else {
if (key.key === 'Enter') {
// alert("Enter pressed");
opening();
startup = true;
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
playing.forEach((sound) => {
sound.stop();
});
setTimeout(function () {
let sound = new Howl({
	src: ['sounds/'+list[0]+'.mp3'],
	html5: true,
	volume: config.volume.speech*0.01,
	rate: (config.rate*(1*0.01))+1,
	autoplay: true
});
playing.push(sound);
sound.once('end', () => {
playing.splice(playing.findIndex(s => s === sound));
list.shift();
if (list[0]) {
playAudio(list[0]);
}
});
}, 1);

}


