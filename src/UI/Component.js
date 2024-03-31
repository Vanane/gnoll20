/**
 * Encapsulation de la création dynamique d'élément
 */
class Component {
	/** @type {string} */
	static baseHTML = ``;

	static axes = {top:"top", left:"left", bottom:"bottom", right:"right"};	


	/** @type {HTMLElement} */
	parent;

	/** @type {HTMLElement} */
	dom;
	
	/** @type {string} */
	name;

	/** @type {Boolean} */
	restrictDrag;


	static instantiate(parentDom, name) {
		return new Component(parentDom, name);
	}


	static fromRaw(parentDom, name, html) {
		var c = new Component(parentDom, name, false);
		c.html = html;
		return c.write();
	}


	constructor(parentDom, name, write=true) {
		this.parent = parentDom;
		this.name = name;
		this.html = this.constructor.baseHTML;

		if(write)
			this.write();
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
	 * @param {Object} from Quels côtés sont redimensionnables : bottom, top, left, right
	 */
	makeResizable(from) {
		if(from[Component.axes.top]) {
			Resizer.instantiate(this.dom, `${this.name}-resizer`, Component.axes.top);
		}
		
		if(from[Component.axes.left]) {
			Resizer.instantiate(this.dom, `${this.name}-resizer`, Component.axes.left);
		}
		
		if(from[Component.axes.bottom]) {
			Resizer.instantiate(this.dom, `${this.name}-resizer`, Component.axes.bottom);
		}
		
		if(from[Component.axes.right]) {
			Resizer.instantiate(this.dom, `${this.name}-resizer`, Component.axes.right);
		}		
	}
	


	setTags(tagsAndReplace) {
		for(var i in tagsAndReplace) {
			this.html = this.html.replaceAll(`{{${i}}}`, tagsAndReplace[i]);
		}
		return this;
	}


	write() {
		if(!this.html)
			throw Error("Empty HTML given");	
		var template = document.createElement('template');
		template.innerHTML = this.html;
		this.dom = template.content.children[0];
		this.dom.component = this;
		this.parent.appendChild(this.dom);
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
			x = Math.clamp(x, parentRect.x, parentRect.x + parentRect.width - rect.width);
			y = Math.clamp(y, parentRect.y, parentRect.y + parentRect.height - rect.height);
		}

        this.style.left = `${x}px`;
        this.style.top = `${y}px`;
    }
}