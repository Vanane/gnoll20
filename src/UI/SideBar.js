class SideBar extends Component {
	static baseHTML = `<div class="sidebar"><span class="sidebar-title"></span><div class="sidebar-content"></div></div>`;

	/** @type {HTMLSpanElement} */
	title;

	/** @type {HTMLElement} */
	content;

	static instantiate(parentDom, name) {
		return new Token(parentDom, name);
	}


	constructor(parentDom, name) {
		super(parentDom, name);
		this.title = this.dom.getElementsByClassName("sidebar-title")[0];
		this.content = this.dom.getElementsByClassName("sidebar-content")[0];
	}


	setTitle(title) {
		this.title.innerHTML = `${title}`;
		return this;
	}


	setContent(content) {
		this.content.innerHTML = `${content}`;
		return this;
	}


	setWidth(width) {
		this.dom.style.width = `${width}px`;
		return this;
	}
}