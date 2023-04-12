function AngleBrushTool()
{
    //set an icon and a name for the object  
    this.name = 'BrushTool'
    this.icon = 'assets/tools/plume.png'

    var start_X = -1;
	  var start_Y = -1;
    //set the drawCrayon state
    var drawPlume = false;

    var self = this;

    var widthPlume = 5

    this.populateOptions = function()
    {
      //create an slider to change the strokeWeight()
      // create an slider to set the number of times we lerp the line in the for loop
      select(".options").html("<label style='color:black;font-size:20' for='brushArtTool'>Border</label> <input type='range' min='1' max='10' value='1' class='slider' id='brushArtTool'> <label style='color:black;font-size:20' for='brushArtTool'>Opacity</label> <input type='range' min='20' max='99' value='99' class='slider' id='opacityLine'> <br> <label style='color:black;font-size:20' for='brushArtTool'>Width</label> <input type='range' min='5' max='11' value='5' class='slider' id='widthPlume'>");
    }

    this.draw = function()
    { 
      if(widthPlume == 5 || widthPlume <6)
      {
        cursor("assets/angle32.png",4,16);
      }
      if(widthPlume == 6)
      {
        cursor("assets/angle42.png",6,20);
      }
      if(widthPlume == 7)
      {
        cursor("assets/angle48.png",7,24);
      }
      if(widthPlume == 8)
      {
        cursor("assets/angle52.png",8,26);
      }
      if(widthPlume == 9)
      {
        cursor("assets/angle57.png",8,30);
      }
      if(widthPlume > 9 && widthPlume <=11)
      {
        cursor("assets/angle64.png",11,32);
      }
      
      if (mouseIsPressed && pressOnCanvas()) {
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
            this.plume();
            pop();
          }   
        }
        else if(drawPlume){
            //The positions and bool are reset when the mouse is released.
            //IMPORTANT: The updates that were made in the pixel array are 
            //not restored, they were saved.
            loadPixels();
            drawPlume = false;
            start_X = -1;
            start_Y = -1;
        } 
    };
      
      
    this.plume = function() {
        // set the color and brush style
        strokeColor = document.getElementById("colorpicker").value;
        strokeW = document.getElementById("brushArtTool").value;
        strokeWeight(strokeW);

        opacityLine = document.getElementById("opacityLine").value;
        op = opacityLine.toString();
        if(opacityLine == 99)
        {
            op = "FF";
        }
        stroke(strokeColor+op);
      
        // set the number of times we lerp the line in the for loop
        times = 70
      
        // repeat the line with lerping
        for (var i = 0; i <= times - 1; i++) {
          widthPlume = document.getElementById("widthPlume").value;
          // find the lerp
          x = lerp(mouseX, pmouseX, i / times)
          y = lerp(mouseY, pmouseY, i / times)
          
          a = widthPlume.toString();
          b = parseInt(a)
          z = y + b
          // draw 

          line(x - b, y - b, x + b,z)
        }
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function () {
      if(self.name == "BrushTool"){
          select(".options").html(" ");
          cursor(HAND);
      }	
    };
}