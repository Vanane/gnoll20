/* Not really a class, more of a function that defines objects */

entities = []; // Contains all entities


function newEntity()
{
    let r = Object();
    r.id = randomId(); // Random ID, might change for a sequence
    r.name = "New entity"; // Name displayed
    r.img = "https://example.com/example.png"; // Will be stored into db widht an id rather than url
    r.dom = undefined; // DOM element attached to this entity
    entities[r.id] = r;
    return r;
}


function randomId()
{
    return Math.random().toString(16).replace(/[01]./g, '');
}