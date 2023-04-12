function RainbowBrushTool(){  
    this.name = "RainbowBrush"
    this.icon = "assets/tools/blur.png";

    loadPixels();

    this.populateOptions = function()
    {
        select(".options").html(
			"<label style='color:black;font-size:20' for='linSize'>Line size</label> <input type='range' min='10' max='42' value='1' class='slider' id='linSize'>");
    };

	var self = this;
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	// start to draw the line
	this.draw = function(){

		push();
        var size = document.getElementById("linSize").value;
        colorMode(HSB);
		console.log(size)
		if(size == 10 | size <=16)
		{
			cursor("assets/cir16.png",8,10);
		}
		if(size > 16 && size <=23)
		{
			cursor("assets/cir20.png",8,10);
		}
		if(size > 23 && size <=28)
		{
			cursor("assets/cir24.png",11,13);
		}
		if(size > 28 && size <=33)
		{
			cursor("assets/cir28.png",12,15);
		}
		if(size > 33 && size <=37)
		{
			cursor("assets/cir32.png",14,17);
		}
		if(size > 37 && size <=42)
		{
			cursor("assets/cir38.png",16,20);
		}
		if(mouseIsPressed && pressOnCanvas()){

			//if the mouse is clicked on the canvas
			if(startMouseX == -1){
				
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//console.log(drawing)
				// Load and save pixels array of the canvas
				loadPixels();
			}

			else{
                noStroke();
				this.times = 5
				stroke((this.times*frameCount) % 360,40, 100);
                strokeWeight(size);
				//Draw the straight line
				line(startMouseX, startMouseY, mouseX, mouseY);
				startMouseX = mouseX;
				startMouseY = mouseY;
				//console.log(startMouseX)
			}

            colorMode(RGB);

		}

		else if(drawing){
			//The positions and bool are reset when the mouse is released.
			//IMPORTANT: The updates that were made in the pixel array are 
			//not restored, they were saved.
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}

		pop();

	};

    this.unselectTool = function() {
        if(self.name == "RainbowBrush")
        {
            select(".options").html(" ");
			cursor(HAND);
        }
	}; 
}