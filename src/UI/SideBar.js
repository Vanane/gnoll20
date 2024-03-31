export class SideBar extends Component {
	static baseHTML = `<div class="sidebar"><span class="sidebar-title"></span></div>`;

	/** @type {HTMLSpanElement} */
	title;

	/** @type {HTMLElement} */
	content;

	static instantiate(parent, name) {
		return new SideBar(parent, name);
	}


	constructor(parent, name) {
		super(parent, name);
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
		this.dom.style.width = `${width}`;
		return this;
	}
};