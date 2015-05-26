/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
//Game framework variables
var canvas = document.getElementById("canvas");

//var stage: createjs.Stage;
var stage;
var stats;
var helloLabel;
var assets;
var pinkbutton;

var manifest = [
    { id: "button", src: "Assets/Images/button.png" },
    { id: "clicked", src: "Assets/Audio/clicked.wav" }];

//preloader function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);

    //event listener triggers when all the assets are loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);

    //setup statistics object
    setupStats();
}

//callback function that initializing game objects
function init() {
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); //framerate for the game

    //eventlistener triggers 60 times every second
    createjs.Ticker.on("tick", gameloop);

    //calling main game function
    main();
}

//following is other of declaring fuction.this is function to setuo stats.
var setupStats = function () {
    stats = new Stats;
    stats.setMode(0); // set to fps

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
};

// callback function that creates our game
function gameloop() {
    stats.begin(); //begin measuring
    stage.update();
    stats.end(); //ends measuring here
}

//calback function that allows me to respond to button clicked events
function pinkbuttonClicked(event) {
    //console.log("clicked");
    createjs.Sound.play("clicked");
}

//callback functions that changes the alpha transparency of the button
//mouseover event
function pinkbuttonOver() {
    pinkbutton.alpha = 0.8;
}

//mouse out event
function pinkbuttonOut() {
    pinkbutton.alpha = 1.0;
}

//our main function
function main() {
    console.log("Game is running");
    helloLabel = new createjs.Text("Hello world", "40px Consolas", "#000000");
    helloLabel.regX = helloLabel.getMeasuredWidth() * 0.3;
    helloLabel.regY = helloLabel.getMeasuredHeight() * 0.3;
    helloLabel.x = 100;
    helloLabel.y = 200;
    stage.addChild(helloLabel);

    pinkbutton = new createjs.Bitmap(assets.getResult("button"));
    pinkbutton.regX = pinkbutton.getBounds().width * 0.5;
    pinkbutton.regY = pinkbutton.getBounds().height * 0.5;
    pinkbutton.x = 160;
    pinkbutton.y = 270;
    stage.addChild(pinkbutton);
    pinkbutton.on("click", pinkbuttonClicked);
    pinkbutton.on("mouseover", pinkbuttonOver);
    pinkbutton.on("mouseout", pinkbuttonOut);
}
//# sourceMappingURL=game.js.map
