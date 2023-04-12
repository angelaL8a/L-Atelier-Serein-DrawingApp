//Displays and handles the colour palette.
function ColourPalette() {

	var intensity = 0.3;
	var first_Pal = true; 
	var second_Pal = false;

	this.colours = [
		["#000000", 
		 color("rgba(0, 0, 0,"+intensity+")"), 
		 [0, 0, 0, 255]],
		
		["#FF00FF", 
		 color("rgba(255, 0, 255,"+intensity+")"), 
		 [192, 192, 192, 255]],
		
		["#AAFF00", 
		 color("rgba(170, 255, 0,"+intensity+")"), 
		 [170, 255, 0, 255]], 
		
		["#00FFFF", 
		 color("rgba(0, 255, 255,"+intensity+")"), 
		 [0, 255, 255, 255]], 
		
		["#ffe000", 
		 color("rgba(255, 224, 0,"+intensity+")"), 
		 [255, 224, 0, 255]], 
		
		["#ffc3ea", 
		 color("rgba(255, 0, 193,"+intensity+")"), 
		 [255, 0, 193, 255]], 
		
		["#FFFFFF", 
		 color("rgba(255, 255, 255,"+intensity+")"), 
		 [255, 255, 255, 255]], 
		
		["#E4C1F9", 
		 color("rgba(228, 193, 249,"+intensity+")"), 
		 [255, 165, 0, 255]], 
		
		["#D0F4DE", 
		 color("rgba(208, 244, 222,"+intensity+")"), 
		 [208, 244, 222, 255]], 
		
		["#A9DEF9", 
		 color("rgba(169, 222, 249,"+intensity+")"), 
		 [169, 222, 249, 255]], 
		
		["#FCF6BD", 
		 color("rgba(252, 246, 189,"+intensity+")"), 
		 [252, 246, 189, 255]], 
		
		["#ffadbd", 
		 color("rgba(255, 153, 200,"+intensity+")"), 
		 [255, 153, 200, 255]], 
	];


	//make the start colour be black
	this.selectedColour = "#000000";


	var self = this;

	var colourClick = function () {
		//remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];

		self.selectedColour = c;
		fill(c);
		stroke(c);
		document.getElementById("colorpicker").value = c
		//set the selected colour and fill and stroke
		

		//add a new border to the selected colour
		//!IMPORTANT
		//this.style("border", "2px solid gray");
	}

	//load in the colours
	this.loadColours = function () {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0][0]);
		stroke(this.colours[0][0]);


		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i][0] + "Swatch";

			//using p5.dom add the swatch to the palette and set its background colour
			//to be the colour value.
			var colourSwatch = createDiv();
			colourSwatch.class("colourSwatches");
			colourSwatch.id(colourID);

			select(".colourPalette").child(colourSwatch);
			select("#" + colourID).style("background-color", this.colours[i][0]);
			colourSwatch.mouseClicked(colourClick);
		}

		select(".colourSwatches").style("border", "2px solid gray");


	};
	//call the loadColours function now it is declared
	this.loadColours();
}