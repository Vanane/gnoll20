draggedItem = undefined;

function openTab(name)
{
    document.getElementById(name).hidden = 0;
}


function closeTab(name)
{
    document.getElementById(name).hidden = 1;
}


function setDraggedItem(item)
{
    draggedItem = item;
}


function onDragGame(e)
{
    if(draggedItem != undefined)
    {
        console.log(draggedItem);
        console.log("has been dragged into the game");
        let newEntity = draggedItem.cloneNode(true);
        domGame.append(newEntity);
        newEntity.style.position = "absolute";
        elDims = newEntity.getBoundingClientRect();
        elWidth = elDims.width;
        elHeight = elDims.height;
        newEntity.style.left = e.layerX - elWidth / 2;
        newEntity.style.top = e.layerY - elHeight / 2;
        setDraggedItem(undefined);
    }
    else
        console.log("draggedItem was null");
}