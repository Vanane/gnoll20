document.onreadystatechange = function(){
    if(document.readyState == "complete")
        init();
};


// global variables
domGame = undefined;


function init()
{
    domGame = document.getElementById("game");

    // The only thing to be able to drop in the div :thonk:
    domGame.ondragover = function (e)
    { 
        e.preventDefault() 
    }
}


function onEntityDrag()
{

}


function onPrefabDrop(color)
{
    el = '<div class="menuprop" style="background-color: red;"><p>name</p></div>';
    document.getElementById("game").append('')
}
