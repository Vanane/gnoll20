export class Button extends Component {
	static baseHTML = `<a class='button' href='#'></a>`;


	static instantiate(parent, name) {
		return new Button(parent, name);
	}

	constructor(parent, name) {
		super(parent, name);
	}

	setLabel(lbl) {
		this.dom.innerHTML = lbl;
		return this;
	}


	setAction(func) {
		this.dom.onclick = func;
		return this;
	}
}