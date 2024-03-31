class ComponentManager {
	/** @type {ComponentManager} */
	static instance = null;

	/** @type {MouseEvent} */
	mouse;
	/** @type {MouseEvent} */
	prevMouse;

	/** @type {Blank} */
	blank;

	
	constructor() {
		if(ComponentManager.instance != null)
			throw Error("Already instanciated");
		
		ComponentManager.instance = this;
		this.components = {};

		this.enableMousePosition();

		this.blank = Blank.instantiate(document.children[0], "_blank").setAttributes({ name:"_blank" });
	}


	enableMousePosition() {
		document.ondragover = (e) => {
            /* Met à jour la variable this.mouse lorsqu'on drag un onglet */
			this.prevMouse = this.mouse;
            this.mouse = e;
        };

        document.onmousemove = (e) => {
            /* Met à jour la variable this.mouse lorsqu'on passe la souris par-dessus n'improte quel élément. OnDragOver annule cet event, c'est pourquoi nous utilisons les deux events. */
			this.prevMouse = this.mouse;
            this.mouse = e;
        };
	}


	addComponent(c) {
		if(c.name)
			this.components[c.name] = c;
		else
			throw Error("Component lacks name");
	}
}