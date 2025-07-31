const menu = [];
const Item = (name) => {
return {name: name};
}
const Append = (data, ...item) => {
if (Array.isArray(data)) {
item.forEach((i) => {
data.push(i);
});
} else {
console.log('Error: This function only supports the appending of items to an array');
}
}

const display = document.getElementById('display');
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

let game = Item('game');
let settings = Item('settings');
let help = Item('help');
Append(menu, game, settings, help);
game.sub = [];
let object_picker = Item('object_picker');
Append(game.sub, object_picker);
settings.sub = [];
let speech_volume = Item(() => {
return "speech_volume|seek/"+config.volume.speech;
});
let music_switch = Item(() => {
return "music|"+config.music;
});
let music_volume = Item(() => {
return "music_volume|seek/"+config.volume.music;
});
let speaking_rate = Item(() => {
return "rate|seek/"+config.rate;
});
Append(settings.sub, speech_volume, music_switch, music_volume, speaking_rate);
speech_volume.enter = () => {
seek = config.volume.speech;
}
speech_volume.sub = [];
let sp_volume = Item('volume');
sp_volume.row = (dir) => {
horizontal(dir);
config.volume.speech = seek;
playAudio('seek/'+seek);
}

Append(speech_volume.sub, sp_volume);
music_switch.enter = () => {
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
music_volume.enter = () => {
seek = config.volume.music;
}
music_volume.sub = [];
let m_volume = Item('music_volume');
Append(music_volume.sub, m_volume);
m_volume.row = (dir) => {
horizontal(dir);
config.volume.music = seek;
if (music) {
music.volume(config.volume.music*0.01);
}
playAudio('seek/'+seek);
}
speaking_rate.enter = () => {
seek = config.rate;
}
speaking_rate.sub = [];
let rate = Item('rate');
rate.row = (dir) => {
horizontal(dir);
config.rate = seek;
playAudio('seek/'+seek);
}
Append(speaking_rate.sub, rate);

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
switch (key.key) {
case 'Control':
playing.forEach((sound) => {
sound.stop();
});
break;
case 'ArrowUp':
shift("up");
break;
case 'ArrowDown':
shift("down");
break;
case 'ArrowLeft':
if (level[item].row) {
level[item].row("left");
}
break;
case 'ArrowRight':
if (level[item].row) {
level[item].row("right");
}
break;
case 'Enter':
if (level[item].enter) {
level[item].enter();
}
if (level[item].sub) {
root.push(level);
level = level[item].sub;
item = 0;
playAudio(level[item].name);
}
break;
case 'Escape':
if (root.length !== 0) {
level = root[root.length - 1];
root.pop();
item = 0;
playAudio(level[item].name);
}
break;
case ' ':
playAudio(level[item].name);
break;
case 'Backspace':
level = menu;
item = 0;
playAudio(level[item].name);
break;
case 'Home':
item = 0;
playAudio(level[item].name);
break;
case 'End':
item = level.length - 1;
playAudio(level[item].name);
break;
case 'PageDown':
(level.length-1)-item > 4 ?
	item += 5 :
	item = level.length - 1
playAudio(level[item].name);
break;
case 'PageUp':
item > 4 ?
	item -= 5 :
	item = 0
playAudio(level[item].name);
break;
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


