function main() {
	window.componentManager = new ComponentManager();
	var board = document.getElementById('board');

	Layer.instantiate(board, 'test', 'test')
		.setBackgroundURL("https://upload.wikimedia.org/wikipedia/commons/5/52/Prout_William_painting.jpg");

	Token.instantiate(board, 'test2')
		.setTitle('Test 2')
		.setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png");

	Component.fromRaw(board, "testraw", "<div style='position:fixed;width:200px;height:200px;background-color:white;z-index:500'>prout</div>")
		.makeDraggable(true)
		.restrictDragToParent(true)
		.makeResizable(Component.axes);
}


document.onreadystatechange = (e) => {
	if(e.target.readyState == 'complete') {
		main();
	}
}