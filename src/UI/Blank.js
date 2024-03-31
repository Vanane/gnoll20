class Blank extends Component {
	static baseHTML = `<span></span>`;

	static instantiate(parentDom, name, id) {
		return new Blank(parentDom, name);
	}


}