<html>
    <head>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">        
        <link href="css/css.css" rel="stylesheet"/>
        <script src="js/events.js"></script>
        <script src="js/class/entity.js"></script>
        <script src="js/main.js"></script>
    </head>
    <body>
        <div class="mainmenu">
            <a class="abutton" href="#">Home</a>
            <a class="abutton" href="#">blbl</a>
            <a class="abutton" href="#">blbl</a>
        </div>
        <div class="leftmenu">
            <a class="abutton" onclick="openTab('dice')" href="#">Dice</a>
            <a class="abutton" onclick="" href="#">Dice</a>
            <span class="separator"></span>
            <div id="propslist">
                <p>Filter props :</p>
                <input class="search"/>
                <div draggable="true" class="menuprop" style="background-color: red;" ondragstart="setDraggedItem(this)">
                    name
                </div>
                <div draggable="true" class="menuprop" style="background-color: green;" ondragstart="setDraggedItem(this)">
                    name
                </div>
                <div draggable="true" class="menuprop" style="background-color: blue;" ondragstart="setDraggedItem(this)">
                    name
                </div>

                <!--
                    <p id="prop1" onclick="">
                        <p class="propname">eroghijb</p>
                        <img class="proppic" src="https://..."></img>
                    </p>
                -->
            </div>
        </div>
        <div class="game" id="game" ondrop="onDragGame(event)">            
        </div>
        <div class="players" id="players">
            <!--
                <div id="1" class="player">
                    <p class="playername">Vanane</p>
                    <p class="playerlevel">13</p>
                    <img class="playerpic" src="https://..."></img>
                </div>
            -->
        </div>


        <div id="dice" class="hiddentab" hidden>
            <div class="content">                
                <a class="quit" onclick="closeTab('dice')"></a>
            </div>
        </div>
    </body>
</html>