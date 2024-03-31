import * as gnoll20 from '../gnoll20.js';

function main() {
	window.componentManager = new gnoll20.ComponentManager();

	let layers = [];

	const mainContainer = gnoll20.Container.instantiate(gnoll20.ComponentManager.instance.root, "main-container");
	const layersContainer = gnoll20.Container.instantiate(mainContainer, "layers-container")
		.makeFixed();
	
	const uiContainer = gnoll20.Container.instantiate(mainContainer, "ui-container");




	const sidebar = gnoll20.SideBar.instantiate(uiContainer, "sidebar")
		.setWidth(`${Math.round(window.visualViewport.width / 4)}px`)
		.makeResizable(gnoll20.Resizer.axes.right)
		.setTitle('Menu');

	const sidebarContainer = gnoll20.Container.instantiate(sidebar, "panel-layers");
	gnoll20.Button.instantiate(sidebarContainer, "button-add-layer")
		.setLabel("Ajouter une couche")
		.setAction((e) => {
			gnoll20.Layer.instantiate(layersContainer, 'test', 'test');
		});

}


document.onreadystatechange = (e) => {
	if(e.target.readyState == 'complete') {
		main();
	}
}

