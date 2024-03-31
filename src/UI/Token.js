export class Token extends Component {
	static baseHTML = `<div class="board-token"><span class="token-title">prout</span><img class="token-img"><img></div>`;

	/** @type {HTMLSpanElement} */
	title;

	/** @type {HTMLImageElement} */
	image;

	static instantiate(parent, name) {
		return new Token(parent, name).makeDraggable().restrictDragToParent();
	}


	constructor(parent, name) {
		super(parent, name);
		this.title = this.dom.getElementsByClassName("token-title")[0];
		this.image = this.dom.getElementsByClassName("token-img")[0];
	}


	setTitle(title) {
		this.title.innerHTML = `${title}`;
		return this;
	}

	setImage(url) {
		this.image.src = url;
		return this;
	}
};