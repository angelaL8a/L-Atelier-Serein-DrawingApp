function PointsTool()
{
    //set an icon and a name for the object
    this.name = 'PointsTool'
    this.icon = 'assets/tools/points.png'

    var start_X = -1;
	  var start_Y = -1;
    //set the drawCrayon state
    var drawPoints = false;
    var multicolor = true;
    var self = this; 

    this.populateOptions = function()
    {
      //create a button to change the type of color 
      //create a slider to change the strokeWeight
      //create a checkbox to change the colorMode
      select(".options").html("<label style='color:black;font-size:20' for='sizePoint'>Size</label> <input type='range' min='1' max='8' value='4' class='slider' id='sizePoint'> <label style='color:black;font-size:20' for='opacityPoint'>Opacity</label> <input type='range' min='44' max='99' value='60' class='slider' id='opacityPoint'> <label style='color:black;font-size:20;padding-left:45px; for='AutoRainbowTool'>Multicolor</label> <input checked='' type='checkbox' id='pointMulticolor' class='pointMulticolorhidden-xs-up'><label for='pointMulticolor' class='pointMulticolor'></div>");

      select("#pointMulticolor").mouseClicked(function(){
        if(multicolor == true)
        {
          multicolor = false;
        }
        else 
        {
          multicolor = true; 
        }
    })
    }

    this.draw = function()
    {
      strokeColor = document.getElementById("colorpicker").value;
      strokeW = document.getElementById("sizePoint").value;
      strokeWeight(strokeW);
      opacityPoint = document.getElementById("opacityPoint").value;
      op = opacityPoint.toString();
        if(opacityPoint == 99)
        {
          op = "FF";
        }
        

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
          this.splash()
          pop();
        }   
      }
      else if(drawPoints){
          //The positions and bool are reset when the mouse is released.
          //IMPORTANT: The updates that were made in the pixel array are 
          //not restored, they were saved.
          loadPixels();
          drawPoints = false;
          start_X = -1;
          start_Y = -1;
      }
    };
     
    this.splash = function() {
      // set the color and brush style
      if(multicolor == true)
        {
          stroke(frameCount % 255, 180, 255, 160);
          
        }
        else {
          stroke(strokeColor+op);
        }
      
      
      // set the number of times we lerp the point in the for loop
      times = 8
      
      // repeat the point with lerping
      for (let i = 0; i < times; i++) {
      
        // find lerped x and y coordinates of the point
        x = lerp(mouseX, pmouseX, i / times + times)
        y = lerp(mouseY, pmouseY, i / times + times)
      
          // draw a point
          point(x, y)
        }
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
      if(self.name == "PointsTool"){
          select(".options").html(" ");
      }	
    };

}