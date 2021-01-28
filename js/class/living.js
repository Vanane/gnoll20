/* Not really a class, more of a function that defines objects */

livings = []; // Contains all livings


function newLiving()
{    
    let r = newEntity();
    r.name = "noname";
    r.maxHp = 10;
    r.hp = r.maxHp;
    r.maxMp = 10;
    r.mp = r.maxMp;
    r.lvl = 1;
    livings[r.id] = r;
    return r;
}
