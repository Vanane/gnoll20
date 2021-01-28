/* Not really a class, more of a function that defines objects */

players = []; // Contains all players


function newPlayer()
{    
    let r = newLiving();
    players[r.id] = r;
    return r;
}
