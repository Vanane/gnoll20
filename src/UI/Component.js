/**
 * Encapsulation de la création dynamique d'élément
 */
export class Component {
	/** @type {string} */
	static baseHTML = ``;


	/** @type {Component} */
	parent;

	/** @type {HTMLElement} */
	dom;
	
	/** @type {string} */
	name;

	/** @type {Boolean} */
	restrictDrag;


	static instantiate(parent, name) {
		return new Component(parent, name);
	}


	static fromRaw(parent, name, html) {
		var c = new Component(parent, name, false);
		return c.write(html);
	}

	static getRoot() {
		var r = new Component(null, "root", false);
		return r.write("<div id='root'></div>", false);
	}

	/**
	 * 
	 * @param {Component} parent 
	 * @param {*} name 
	 * @param {*} write 
	 */
	constructor(parent, name, write=true) {
		this.parent = parent;
		this.name = name;

		if(write)
			this.write(this.constructor.baseHTML);
		ComponentManager.instance.addComponent(this);
	}

	setAttributes(attrs) {
		for(var i in attrs) {
			this.dom.setAttribute(i, attrs[i]);
		}
		return this;
	}


	setStyle(styleAttrs) {
		for(var i in styleAttrs) {
			this.dom.style[i] = styleAttrs[i];
		}
		return this;
	}


	makeDraggable(bool=true) {
		if(bool) {
			this.dom.setAttribute('draggable', 'true');
			this.dom.classList.add('draggable');
			this.dom.ondragstart = this.onDragStart;
			this.dom.ondrag = this.onDrag;
		} else {
			this.dom.removeAttribute('draggable');
			this.dom.classList.remove('draggable');
			delete this.dom.ondragstart;
			delete this.dom.ondrag;
		}
		return this;
	}


	afterDrag(func=null) {
		this.dom.ondragend = func;
	}

	restrictDragToParent(bool=true) {
		this.restrictDrag = bool;
		return this;
	}


	makeClickable(bool=true, func=null) {
		if(bool)
			this.dom.onclick = func;
		else
			delete this.dom.onclick;
		return this;
	}


	/**
	 * 
	 * @param {strgin} axis Quel côté redimensionner : bottom, top, left, right (voir Resizer.axes)
	 */
	makeResizable(...axes) {
		for(var i in axes) {
			var axis = axes[i];
			if(axis in Resizer.axes)
				Resizer.instantiate(this, `${this.name}-resizer`, axis);
			else
				throw Error(`Axis ${axis} not in Resizer.axes`);
		}

		return this;
	}


	makeFixed() {
		this.setStyle({ position:"fixed", top:'0', left:'0' });
		return this;
	}

	
	write(html, append=true) {
		if(!html)
			throw Error("Empty HTML given");
		
		this.dom = createElementFromHTML(html);
		console.log(this.parent);
		this.dom.component = this;
		
		if(append)
			this.parent.dom.appendChild(this.dom);

		return this;
	}


	/** Events **/
    onDragStart(e) {
        e.dataTransfer.setDragImage(ComponentManager.instance.blank.dom, 0, 0);

        this.mouseOffset = {
            x: ComponentManager.instance.mouse.clientX - this.style.left.split('px')[0],
            y: ComponentManager.instance.mouse.clientY - this.style.top.split('px')[0]
        };
    }


    onDrag(e) {
		var rect = this.getBoundingClientRect();
		var parentRect = this.parentElement.getBoundingClientRect();

		var x = ComponentManager.instance.mouse.clientX - this.mouseOffset.x;
		var y = ComponentManager.instance.mouse.clientY - this.mouseOffset.y;
		
		if(this.component.restrictDrag) {
			x = clamp(x, parentRect.x, parentRect.x + parentRect.width - rect.width);
			y = clamp(y, parentRect.y, parentRect.y + parentRect.height - rect.height);
		}

        this.style.left = `${x}px`;
        this.style.top = `${y}px`;
    }
};