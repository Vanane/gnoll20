export class Resizer extends Component {
	static baseHTML = `<div class="resizer"></div>`;

	static axes = {top:"top", left:"left", bottom:"bottom", right:"right"};	


	/** @type {Component} */
	target;


	static instantiate(parent, name, axis) {
		return new Resizer(parent, `${name}-${axis}`, axis);
	}


	constructor(parent, name, axis) {
		super(parent, name);


		this.parent.setStyle({ minWidth:'0px', minHeight:'0px' });
		this.setStyle({ zIndex:'1000' })
			.setAttributes({draggable:'true'})
			.setTarget(parent)
			.setAxis(axis);

		this.dom.classList.add('resizer');	

		this.dom.ondragstart = this.onResizerDragStart;
	}	



	setTarget(target) {
		this.target = target;
		return this;
	}


	setAxis(axis) {
		this.axis = axis;
		this.dom.classList.add(`resizer-${this.axis}`);

		switch(this.axis) {
			case Resizer.axes.bottom:
				this.dom.ondrag = this.onResizeBottom;
				break;
			case Resizer.axes.top:
				this.dom.ondrag = this.onResizeTop;
				break;
			case Resizer.axes.left:
				this.dom.ondrag = this.onResizeLeft;
				break;
			case Resizer.axes.right:
				this.dom.ondrag = this.onResizeRight;
				break;
		}

		return this;
	}

	
	/** Events Resize **/
    onResizerDragStart(e) {
		e.dataTransfer.setDragImage(ComponentManager.instance.blank.dom, 0, 0);
        var style =  window.getComputedStyle(this.component.target.dom);

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

		e.stopPropagation();
    }

	onResizeBottom(e) {
        var h = this.component.drag.dimension.h + (ComponentManager.instance.mouse.clientY - this.component.drag.start.clientY);
        this.component.target.dom.style.height = `${h}px`;
		e.stopPropagation();
	}

	onResizeTop(e) {
        var h = this.component.drag.dimension.h - (ComponentManager.instance.mouse.clientY - this.component.drag.start.clientY);
		var t = clamp(this.component.drag.position.y - (this.component.drag.start.clientY - ComponentManager.instance.mouse.clientY), 0, this.component.drag.position.y + this.component.drag.dimension.h);

        this.component.target.dom.style.height = `${h}px`;
		this.component.target.dom.style.top = `${t}px`;
		e.stopPropagation();
	}

	onResizeLeft(e) {
        var w = this.component.drag.dimension.w - (ComponentManager.instance.mouse.clientX - this.component.drag.start.clientX);
		var l = clamp(this.component.drag.position.x - (this.component.drag.start.clientX - ComponentManager.instance.mouse.clientX), 0, this.component.drag.position.x + this.component.drag.dimension.w);
        
		this.component.target.dom.style.width = `${w}px`;
        this.component.target.dom.style.left = `${l}px`;
		e.stopPropagation();
	}

	onResizeRight(e) {
        var w = this.component.drag.dimension.w + (ComponentManager.instance.mouse.clientX - this.component.drag.start.clientX);
        this.component.target.dom.style.width = `${w}px`;
		e.stopPropagation();
	}
}