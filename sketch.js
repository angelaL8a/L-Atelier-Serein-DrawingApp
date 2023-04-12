//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;

var sound_1 = null;
var sound_2 = null;
var sound_3 = null;

// check whether the respective sound is playing or not
var s1 = false;
var s2 = false;
var s3 = false;

let buffer;
let c;

// Boolean to check if music is playing or not
var playSounds = false;

var saveButton; 
var restoreButton;

var canvasContainer;

//Loads assets (sounds) that are necessary for the program to work correctly, so they are available when needed, and reduces the likelihood of errors or delays during runtime.
function preload() {
	document.getElementById("loadingPage").style.display = "flex";
	sound_1 = loadSound("assets/music/sound1.mp3");
	sound_2 = loadSound("assets/music/sound2.mp3");
	sound_3 = loadSound("assets/music/sound3.mp3");

	setTimeout(() => {
		document.getElementById("loadingPage").style.display = "none";
	}, 4500);
}

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();
	backCOlour = new BackColorTool();
	//add the tools to the toolbox.
	//BACKGROUND COLOR
	//toolbox.addTool(new Prove());
	toolbox.addTool(new BackColorTool());
	//TYPES OF PAINT BRUSHES
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new CrayonTool());
	toolbox.addTool(new AngleBrushTool());
	toolbox.addTool(new ArcsTool());
	toolbox.addTool(new HatchingTool());
	//TOOLS 
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new MyEraserTool());
	toolbox.addTool(new EditShapeTool());
	toolbox.addTool(new mirrorDrawTool());
	//SHAPES
	toolbox.addTool(new CircleCanTool());
	toolbox.addTool(new RectangleTool());
	toolbox.addTool(new MidMoonTool());
	//SPRAY
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new SprayPincelTool());
	//DECORATION
	toolbox.addTool(new Mandala());
	toolbox.addTool(new GeometricDesignTool());
	toolbox.addTool(new RainbowRadialTool());
	toolbox.addTool(new WatercolourTool());
	toolbox.addTool(new MulicolorLineTool());
	toolbox.addTool(new RainbowBrushTool());
	toolbox.addTool(new HighLightTool());
	toolbox.addTool(new AutoRainbowTool());
	toolbox.addTool(new shapesBrushTool());
	toolbox.addTool(new BladesTool());
	toolbox.addTool(new PointsTool());
	//EXTRAS
	toolbox.addTool(new AddImageTool());
	toolbox.addTool(new StarTool());
	toolbox.addTool(new StickerTool());
	toolbox.addTool(new CloneShapeTool());
	toolbox.addTool(new FiltersTool());
	toolbox.addTool(new CutPasteTool());
	toolbox.addTool(new CopyPasteTool());
	toolbox.addTool(new TextTool());
	
	
	background(255);

	buffer = createGraphics(width, height);

	saveButton = createButton("save");
	saveButton.parent(select('.header'));
	saveButton.class('learn-more');
	saveButton.id('save');
	saveButton.mouseClicked(() => {
	  // Copy from canvas into buffer
	  buffer.copy(
		// source
		c,
		// source x, y, w, h
		0, 0, width, height,
		// destination x, y, w, h
		0, 0, buffer.width, buffer.height)
	});
	
	restoreButton = createButton("restore");
	restoreButton.parent(select('.header'));
	restoreButton.class('learn-more');
	restoreButton.id('restore');
	restoreButton.mouseClicked(() => {
	  // Copy from buffer into the canvas
	  copy(buffer, 0, 0, buffer.width, buffer.height, 0, 0, width, height);
	});

	// <<This code below creates a "play music" button and three additional buttons that play different music tracks when clicked.>>

	//create a division for the buttons
	let divToSounds = createDiv()
	divToSounds.parent(select('.header'));
    divToSounds.class("divToSounds");

	// <<If playSounds is true, clicking the button will pause all music tracks and remove extra buttons.>>
	// <<If playSounds is false, the additional buttons will be created and clicking them will play their respective tracks.>>

	let playMusicButton = createButton("play music");
	playMusicButton.parent(divToSounds);
	playMusicButton.class('learn-more');
	playMusicButton.id('playMusic');
	playMusicButton.mouseClicked(() => {
		document.getElementById("playMusic").innerHTML = "cancel music";
		if(playSounds ==false)
		{
			playSounds = true;
			sound1 = createButton("Chill");
			sound1.parent(select('.header'));
			sound1.class('button');
			sound1.id('sound1')
			sound1.mouseClicked(() => {
				//pause if playing, play if paused, change button labels
				if (sound_1.isPlaying() && s1 == true) {
						sound_1.pause();
						document.getElementById("sound1").innerHTML = "Chill";
						s1 = false;
					  } else {
						if(s1 == false && s2 == false && s3 == false){
							document.getElementById("sound1").innerHTML = "Chill↓";
							sound_1.loop();
							s1 = true;
						}
						
				  }
			});

			sound2 = createButton("Electro");
			sound2.parent(select('.header'));
			sound2.class('button');
			sound2.id('sound2')
			sound2.mouseClicked(() => {
				//pause if playing, play if paused, change button labels
				if (sound_2.isPlaying() && s2 == true) {						
						sound_2.pause();
						document.getElementById("sound2").innerHTML = "Electro";
						s2 = false;
					  } else {
						if(s1 == false && s2 == false && s3 == false)
						{
							document.getElementById("sound2").innerHTML = "Electro↓";
							sound_2.loop();
							s2 = true;
						}
						
				  }
			});

			sound3 = createButton("Blues");
			sound3.parent(select('.header'));
			sound3.class('button');
			sound3.id('sound3')
			sound3.mouseClicked(() => {
				//pause if playing, play if paused, change button labels
				if (sound_3.isPlaying() && s3 == true) {
						sound_3.pause();
						document.getElementById("sound3").innerHTML = "Blues";
						s3 = false;
					  } else {
						if(s1 == false && s2 == false && s3 == false)
						{
							document.getElementById("sound3").innerHTML = "Blues↓";
							sound_3.loop();
							s3 = true; 
						}
						
				  }
			});
		}
		else if(playSounds == true)
		{
			document.getElementById("playMusic").innerHTML = "play music";
			sound_1.pause();
			sound_2.pause();
			sound_3.pause();
			sound1.remove();
			sound2.remove();
			sound3.remove();
			playSounds = false;
			s1 = false;
			s2= false; 
			s3 = false; 
		}
	});

	

}

//checks if the currently selected tool (in the toolbox object) has a keyPressed method. If it does, the function calls that method with the keyCode parameter.
function keyPressed(keyCode){
    if (toolbox.selectedTool.hasOwnProperty("keyPressed")){
        toolbox.selectedTool.keyPressed(keyCode)
    }
	else if(keyCode.keyCode == 90 && (keyCode.ctrlKey || keyCode.metaKey))
	{
			copy(buffer, 0, 0, buffer.width, buffer.height, 0, 0, width, height);
	}
}

//checks if the currently selected tool (in the toolbox object) has a keyReleased method. If it does, the function calls that method with the keyCode parameter.
function keyReleased(keyCode){
    if (toolbox.selectedTool.hasOwnProperty("keyReleased")){
        toolbox.selectedTool.keyReleased(keyCode)
    }
}

//checks if the currently selected tool (in the toolbox object) has a keyTyped method. If it does, the function calls that method.
function keyTyped(){
	if (toolbox.selectedTool.hasOwnProperty('keyTyped')){
        toolbox.selectedTool.keyTyped();
    }
}

function error()
{
	if (toolbox.selectedTool.hasOwnProperty('error')){
        toolbox.selectedTool.error();
    }
}

// The following event handlers just forward the events to the selected tool, checking first to 
// see if there are handlers defined.

function mousePressed(){
    if (toolbox.selectedTool.hasOwnProperty("mousePressed")){
        toolbox.selectedTool.mousePressed()
    }
}

function mouseReleased(){
    if (toolbox.selectedTool.hasOwnProperty('mouseReleased')){
        toolbox.selectedTool.mouseReleased();
    }
}

function mouseDragged(){
    if (toolbox.selectedTool.hasOwnProperty('mouseDragged')){
        toolbox.selectedTool.mouseDragged();
    }
}

function draw() {
		
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}
