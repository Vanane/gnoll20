function createElementFromHTML(html) {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content.children[0];
}

Math.clamp = (v, min, max) => {
	return v > max ? max : v < min ? min : v;
};