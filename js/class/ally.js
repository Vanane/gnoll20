/* Not really a class, more of a function that defines objects */

allies = []; // Contains all allies


function newAlly()
{    
    let r = newLiving();
    allies[r.id] = r;
    return r;
}
