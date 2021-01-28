/* Not really a class, more of a function that defines objects */

entities = []; // Contains all entities


function newEntity()
{
    let r = Object();
    r.id = randomId(); // Random ID, might change for a sequence. Also ID of the DOM element related to this entity..
    r.img = "https://example.com/example.png"; // Will be stored into db widht an id rather than url.
    r.color = "ffffff"; // Color filter of the object. White by default
    r.scale = 1;
    r.x = 0;
    r.y = 0;
    r.z = 0;
    entities[r.id] = r;
    return r;
}


function randomId()
{
    return Math.random().toString(36).replace(/[01]./g, '');
}