/* Not really a class, more of a function that defines objects */

enemies = []; // Contains all enemies


function newEnemy()
{    
    let r = newLiving();
    enemies[r.id] = r;
    return r;
}
