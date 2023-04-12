function AutoRainbowTool()
{
    this.name = 'AutoRainbowTool'
    this.icon = "assets/tools/autoR.png"

    //array that stores the coordinates of points on the canvas that the user clicks and drags to draw a line
    let points = [];
    // store the starting coordinates of the line
    var startMouseX = -1;
	var startMouseY = -1;
    // indicates whether the user is currently drawing a line or not.
	var drawing = false;
    //determines whether the line is drawn as a rainbow or a solid color
    var rainbowType = true;

    //sliders
    var sliderHue;
    var sliderSaturation;

    var self = this;

    this.populateOptions = function()
    {
        // creates a button and checkbox input to end the drawing animation and change from the "rainbow" line style to just a solid color.
        select(".options").html("<button class='button' id = 'OFF'>OFF</button> <label style='color:black;font-size:20;padding-left:620px; for='AutoRainbowTool'>Rainbow</label> <input checked='' type='checkbox' id='rainBow' class='rainBowhidden-xs-up'><label for='rainBow' class='rainBow'></div> ");

        //slider to change HUE value 
        sliderHue = createSlider(20,80,68);
        sliderHue.parent(select('.options'));
        sliderHue.id('Hue');
        sliderHue.class('slider');
        
        //slider to change SATURATION value 
        sliderSaturation = createSlider(80,100,100);
        sliderSaturation.parent(select('.options'));
        sliderSaturation.id('Saturation');
        sliderSaturation.class('slider');

        //divs for the labels
        var div1 = createDiv()
        div1.id('divLabel1')
        div1.parent(select('.options'));

        var div2 = createDiv()
        div2.id('divLabel2')
        div2.parent(select('.options'));

        //label for HUE slider
        var nameHue = document.createElement('label');
        nameHue.innerHTML = "Hue";   
        document.getElementById('divLabel1').appendChild(nameHue);
        //label for SATURATION slider
        var nameSaturation = document.createElement('label');
        nameSaturation.innerHTML = "Saturation";   
        document.getElementById('divLabel2').appendChild(nameSaturation);
        
        //if the checkbox is pressed then the corresponding sliders to change the values of HUE and SATURATION of the color will be hidden, since the color mode will change from HSB to RGB and this mode does not accept these parameters.
        select("#rainBow").mouseClicked(function(){
            if(rainbowType == true)
            {
                rainbowType = false;
                sliderHue.hide();
                sliderSaturation.hide();
                div1.hide()
                div2.hide()
            }
            else 
            {
                rainbowType = true;
                sliderHue.show();
                sliderSaturation.show();
                div1.show()
                div2.show()
            }
        })

        //when the "OFF" button is pressed the drawing of lines on the canvas is maintained and the draw() function is called and the "points" array is reset to draw a new stroke.
        select("#OFF").mouseClicked(function(){
            
            draw();
            loadPixels();
            points = [];
        })
    }

    this.draw = function()
    {
        strokeColor = document.getElementById("colorpicker").value;
        push();
        //By default, the HSB (rainbow) color mode will be chosen but if the "Rainbow" button is pressed, rainbowType will be true and the color mode will change to RGB (solid color).
        if(rainbowType == true)
        {
            colorMode(HSB, 360, 100, 100, 100);
            fill(0, 10);
        }
        else {
            colorMode(RGB);
            fill(0, 10);
        }
        
        
		if(mouseIsPressed && pressOnCanvas()){
			//if the mouse is clicked on the canvas
			if(startMouseX == -1){
				
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				// Load and save pixels array of the canvas
				loadPixels();
			}

			else{points.push(createVector(mouseX, mouseY));} 
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
        this.rainbow();
        pop();
    }

    //
    this.rainbow = function()
    {
        //n iterates over each point in the array of points and draws the corresponding trace
        for (let i = 1; i < points.length; i++) {
            noStroke();    
            strokeWeight(2);
            // Get the point before, so we can draw a continuous line
            let p1 = points[i - 1];
            p1.x += randomGaussian();
            p1.y += randomGaussian();
            
            // Set the hue depending on how far through the line it is
            let h = map(i, 0, points.length, 0, 360);
            if(rainbowType == true)
            {
                a = sliderHue.value();
                b = sliderSaturation.value();
                stroke(h, a, b, 80);
            }
            else{
                stroke(strokeColor+"40");
            }

            let p2 = points[i];
            line(p1.x, p1.y, p2.x, p2.y);
        }
    }

    this.unselectTool = function() {
        if(self.name == "AutoRainbowTool"){
            //remove the current selection in the options section
            select(".options").html("");
        } 
    };
}