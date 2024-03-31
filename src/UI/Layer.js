/**
 * Encapsulation de Component pour ajouter du comportement autour d'un élément
 */
class Layer extends Component {
	static baseHTML = `<canvas class='board-layer'><img class="layer-img"></img></canvas>`;

	/** @type {Token[]}} */
	tokens;

	/** @type {CanvasRenderingContext2D} */
	context2D;

	/** @type {HTMLImageElement} */
	backgroundImage;
	
	static instantiate(parentDom, name, id) {
		return new Layer(parentDom, name)
			.setAttributes({name, id});
	}


	constructor(parentDom, name) {
		super(parentDom, name);

		this.tokens = [];
		this.context2D = this.dom.getContext("2d");
		this.backgroundImage = this.dom.getElementsByTagName("img")[0];
	}


	setBackgroundURL(bg) {
		var img = this.dom.getElementsByTagName("img")[0];
		img.src = bg;
		img.onload = () => { this.renderAll() };
		return this;
	}


	/** Spécifique layer **/

	addToken(t) {
		this.tokens[t.name] = t;
		this.renderAll();
		return this;
	}

	removeToken(name) {
		delete this.tokens[name];
		this.renderAll();
		return this;
	}
	

	renderBackground() {
		this.context2D.drawImage(this.backgroundImage, 0, 0);
	}

	renderTokens() {
		for(var t in this.tokens) {
			this.context2D.drawImage(t.getImage(), t.position.x, t.position.y);
		}
	}

	renderLight() {

	}

	renderGrid() {

	}

	renderAll() {
		this.renderBackground();
		this.renderLight();
		this.renderGrid();
		this.renderTokens();
	}
}