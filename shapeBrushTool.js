function shapesBrushTool() {
    this.name = "shapesBrushTool";
    this.icon = "assets/tools/shapes.png";

    var start_X = -1;
	  var start_Y = -1;
    //set the drawShape state
    var drawShape = false;

    var sliderValue;
    var square = false; 
    var ellipse = false; 
    var self = this; 
    var noMulticolor = true;
    var fullStroke = false;

    this.populateOptions = function()
    {     
      //select (square-ellipse)
      sliderShapes = createSelect();
      sliderShapes.class('button');
      sliderShapes.id('sliderShapeBrush')
      sliderShapes.parent(select('#otherSpace2'));
      sliderShapes.option('square');
      sliderShapes.option('ellipse');
      sliderShapes.selected('ellipse');
      //slider (stroke weight)
      sliderStroke = createSlider(1,3,1);
      sliderStroke.parent(select('#otherSpace2'));
      sliderStroke.class('slider');
      sliderStroke.id('sliderShape');
      
      //create a button to change the color
      select(".options").html("<label class='container'> <input type='checkbox' id='container' checked='false'> <div class='checkmark'></div> </label> <label class='switch'> <input type='checkbox'> <span class='sliderShape'></span> ");

      //"fullStroke" (TRUE-FALSE) when "checkbox" with id(container) is pressed --------------> fullStroke defines stroke() or noStroke()
      select("#container").mouseClicked(function(){
        if(fullStroke == false)
        {
          fullStroke = true;
        }
        else 
        {
          fullStroke = false; 
        }
      })

      //"noMulticolor" (TRUE-FALSE) when "checkbox" with class(sliderShape)is pressed---------> noMulticolor defines the color mode (HSB-RGB)
      select(".sliderShape").mouseClicked(function(){
        if(noMulticolor == true)
        {
          noMulticolor = false;
        }
        else 
        {
          noMulticolor = true; 
        }
      })

      //checked OFF when tool is selected
      this.uncheck();

      //create a div for the labels
      var divLabels = createDiv();
      divLabels.parent("#otherSpace2");
      divLabels.id("divLabels");
      var divLabels2 = createDiv();
      divLabels2.parent("#otherSpace2");
      divLabels2.id("divLabels2");
      //create a label "stroke on|off"
      labelStroke = document.createElement('label');
      labelStroke.innerHTML = "STROKE SIZE";
      document.getElementById('divLabels').appendChild(labelStroke);
      //create a label "RAINBOW style"
      labelRainbow = document.createElement('label');
      labelRainbow.innerHTML = "RAINBOW";
      document.getElementById('divLabels2').appendChild(labelRainbow);

    }
    
    this.draw = function() {
      
      this.mySelectEvent();

      strokeW = document.getElementById("sliderShape").value;
      strokeWeight(strokeW);

      if (mouseIsPressed) {
        //identify if the initial value is -1. If so, the initial location will be set to the current mouse location.
        if(start_X == -1){
          start_X = mouseX;
          start_Y = mouseY;
          drawCircle = true;
          //save the current pixel array after the drawing
          loadPixels();
        }
        else{
          push();
          this.rainbowShapes()
          pop();
        }   
      }

      else if(drawShape){
        //The positions and bool are reset when the mouse is released.
        //IMPORTANT: The updates that were made in the pixel array are 
        //not restored, they were saved.
        loadPixels();
        drawShape = false;
        start_X = -1;
        start_Y = -1;
      }
    };

    this.mySelectEvent  = function()
    {
      sliderValue = sliderShapes.value();
      if(sliderValue == 'square')
      {
        square = true;
        ellipse = false; 
      }
      else if(sliderValue == 'ellipse'){
        square = false; 
        ellipse = true; 
      }

    }

    this.uncheck = function(){
      document.getElementById("container").checked = false;
    }
      
    this.rainbowShapes = function() {

      // find the hue, which is a number from 0 to 360
      hue = (frameCount * 10) % 360
        
      // color and brush style
      if(noMulticolor == true)
      {
        //switch between HSB(rainbow style)-RGB(solid color) color mode
        theColor = color(`hsba(${hue}, 100%, 100%, 0.6)`)
        fill(theColor)
        if(fullStroke == true)
        {
          strokeColor = document.getElementById("colorpicker").value;
          stroke(strokeColor);
        }
        else{
          noStroke()
        }
        
      }
      else if(noMulticolor == false)
      {
        theColor = document.getElementById("colorpicker_2").value;
        fill(theColor);
        //determine if figure drawn on the canvas will have borders
        if(fullStroke == true)
        {
          strokeColor = document.getElementById("colorpicker").value;
          stroke(strokeColor);
        }
        else{
          noStroke()
        }
      }
      
      
      // find the dist between the current and previous mouse points
      theDist = dist(mouseX, mouseY, pmouseX, pmouseY)
      
      // find the midpoint between the current and previous mouse points
      middleX = (mouseX + pmouseX) / 2
      middleY = (mouseY + pmouseY) / 2
      
      // draw a circle at the midpoint, with distance as its diameter
      if(ellipse == true && square == false)
      {
        circle(middleX, middleY, theDist)
      }
      else if(square == true && ellipse == false)
      {
        rect(middleX,middleY,theDist,theDist)
      }
          
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
      
      if(self.name == "shapesBrushTool"){
        select(".options").html("");
        select("#otherSpace2").html(" ");
        noMulticolor = true;
        fullStroke = false
      }	
    };
} 