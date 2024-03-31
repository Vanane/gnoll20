export class Container extends Component {
	static baseHTML = `<div class='container'></div>`;

	static instantiate(parent, name) {
		return new Container(parent, name).setAttributes({name});
	}

	constructor(parent, name) {
		super(parent, name);
	}
}