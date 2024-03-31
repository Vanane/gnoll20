export class Blank extends Component {
	static baseHTML = `<span></span>`;

	static instantiate(parent, name, id) {
		return new Blank(parent, name);
	}
};