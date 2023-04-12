
function SprayCanTool() {
    this.name = "sprayCanTool",
    this.icon = "assets/tools/spray-paint.png",
    this.points = 50,
    this.spread = 10,

    this.populateOptions = function()
    {
        select(".options").html(
			"<label style='color:black;font-size:20' for='spraySize'>Spray size</label> <input type='range' min='1' max='10' value='1' class='slider' id='spraySize'>  <label style='color:black;font-size:20' for='sprayNum'>#Points</label> <input type='range' min='20' max='100' value='1' class='slider' id='sprayNum'> <br> <label style='color:black;font-size:20' for='sprayWeight'>Points Size</label> <input type='range' min='1' max='3' value='1' class='slider' id='sprayWeight'>");
    }
    
    this.draw = function(){
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        spread = document.getElementById("spraySize").value;
        points = document.getElementById("sprayNum").value;
        strokeColor = document.getElementById("colorpicker").value;
        strokeW = document.getElementById("sprayWeight").value;
		strokeWeight(strokeW);
        stroke(strokeColor);
        cursor(HAND);
        if(mouseIsPressed && pressOnCanvas()){
            for(var i = 0; i < points; i++){
                point(random(mouseX-this.spread * spread, mouseX + this.spread * spread), 
                random(mouseY-this.spread * spread, mouseY+this.spread * spread));
            }
        }
    }

    

    this.unselectTool = function() {
        
        select(".options").html("");
	} 

};