
function playAudio(event) {
	const audioPlayer = this.parentElement.children[0];
	audioPlayer.play();
}

for (let element of document.querySelectorAll('[data-audio]')) {
	const button = document.createElement('BUTTON');
	button.classList.add('btn', 'rounded-circle', 'p-0');
	const icon = new Image();
	icon.src = '../img/control_play.png';
	icon.width = 32;
	icon.height = 32;
	icon.alt = 'Play';
	button.appendChild(icon);
	const audioPlayer = document.createElement('AUDIO');
	audioPlayer.src = '../audio/' + element.dataset.audio + '.mp3';
	element.appendChild(audioPlayer);
	button.addEventListener('click', playAudio);
	element.appendChild(button);
}
