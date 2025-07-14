document.addEventListener('keyup', (key) => {
if (key.key === "ArrowUp") {
let sound = new Howl({
	src: ['opening.wav'],
	autoplay: true
});
}
});
