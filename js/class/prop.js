/* Not really a class, more of a function that defines objects */

props = []; // Contains all props


function newProp()
{    
    let r = newEntity();
    props[r.id] = r;
    return r;
}
