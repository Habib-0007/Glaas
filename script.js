var colorInput =
	document.querySelector("#color");
var blurInput =
	document.querySelector("#blur");
var opacityInput =
	document.querySelector("#opacity");
var card =
	document.querySelector(".card");

document.addEventListener(
	"coloris:pick",
	event => {
		console.log(
			"New color",
			event.detail.color
		);
		color.value = event.detail.color;
		card.style.background = event.detail.color;
		card.style.border = `1px solid ${event.detail.color}`;
	}
);

blurInput.addEventListener(
	"input",
	() => {
		card.style.backdropFilter = `blur(${blurInput.value}px)`;
	}
);

opacityInput.addEventListener(
	"input",
	() => {
		card.style.opacity = `${opacityInput.value}`;
	}
);
