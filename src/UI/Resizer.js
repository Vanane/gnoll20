class Resizer extends Component {
	static baseHTML = `<div class="resizer"></div>`;

	/** @type {HTMLElement} */
	target;

	constructor(parentDom, name) {
		super(parentDom, name);

		this.setStyle({ zIndex:'1000', minWidth:'0px', minHeight:'0px'});
		this.setAttributes({draggable:'true'});
		this.dom.classList.add('resizer');

		this.dom.ondragstart = this.onResizerDragStart;
	}


	static instantiate(parentDom, name, axis) {
		return new Resizer(parentDom, `${name}-${axis}`)
			.setTarget(parentDom)
			.setAxis(axis);
	}


	setTarget(target) {
		this.target = target;
		return this;
	}


	setAxis(axis) {
		this.axis = axis;
		this.dom.classList.add(`resizer-${this.axis}`);

		switch(this.axis) {
			case Component.axes.bottom:
				this.dom.ondrag = this.onResizeBottom;
				break;
			case Component.axes.top:
				this.dom.ondrag = this.onResizeTop;
				break;
			case Component.axes.left:
				this.dom.ondrag = this.onResizeLeft;
				break;
			case Component.axes.right:
				this.dom.ondrag = this.onResizeRight;
				break;
		}

		return this;
	}

	
	/** Events Resize **/
    onResizerDragStart(e) {
		e.dataTransfer.setDragImage(ComponentManager.instance.blank.dom, 0, 0);
        var style =  window.getComputedStyle(this.component.target);

		this.component.drag = {
			start: e,
			position: {
				x:parseInt(style.left.slice(0, -2)),
				y:parseInt(style.top.slice(0, -2))
			},
			dimension: {
				w: parseInt(style.width.slice(0, -2)),
				h: parseInt(style.height.slice(0, -2))
			}
		};

		console.log(this.component.drag);

		e.stopPropagation();
    }

	onResizeBottom(e) {
        var h = this.component.drag.dimension.h + (ComponentManager.instance.mouse.clientY - this.component.drag.start.clientY);
        this.component.target.style.height = `${h}px`;
		e.stopPropagation();
	}

	onResizeTop(e) {
        var h = this.component.drag.dimension.h - (ComponentManager.instance.mouse.clientY - this.component.drag.start.clientY);
		var t = Math.clamp(this.component.drag.position.y - (this.component.drag.start.clientY - ComponentManager.instance.mouse.clientY), 0, this.component.drag.position.y + this.component.drag.dimension.h);

        this.component.target.style.height = `${h}px`;
		this.component.target.style.top = `${t}px`;
		e.stopPropagation();
	}

	onResizeLeft(e) {
        var w = this.component.drag.dimension.w - (ComponentManager.instance.mouse.clientX - this.component.drag.start.clientX);
		var l = Math.clamp(this.component.drag.position.x - (this.component.drag.start.clientX - ComponentManager.instance.mouse.clientX), 0, this.component.drag.position.x + this.component.drag.dimension.w);
        
		this.component.target.style.width = `${w}px`;
        this.component.target.style.left = `${l}px`;
		e.stopPropagation();
	}

	onResizeRight(e) {
        var w = this.component.drag.dimension.w + (ComponentManager.instance.mouse.clientX - this.component.drag.start.clientX);
        this.component.target.style.width = `${w}px`;
		e.stopPropagation();
	}
}