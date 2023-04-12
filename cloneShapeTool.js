function CloneShapeTool()
{
    this.icon = "assets/tools/clones.png"
    this.name = 'CloneShapeTool'

    var self = this; 

    //check if the CTRL key was pressed
    var ctrlisPressed = false;
    
    //check if the mouse clicked on the canvas or not
    var mouseIsClicked = false;

    //initial values of the area to clone
    var initialX;
    var initialY;

    //final coordinates of the new area to paste the cloned area
    var destination_X;
    var destination_Y;

    var distanceX;
    var distanceY; 
    
    var minSize = 10;
    var increment = 3;

    this.mousePressed = function (){
        mouseIsClicked = true;   
    }

    this.mouseReleased = function(){
        mouseIsClicked = false;
    }
    
    //if CTRL key is pressed then "ctrlisPressed" is TRUE
    this.keyPressed = function(){
        if(keyCode == 17){
            ctrlisPressed = true;
        }
    }

    //CTRL key is released then "ctrlisPressed" is FALSE
    this.keyReleased = function(){
        if (keyCode == 17){
            ctrlisPressed = false;
        }
    }


    this.draw = function(){
        //size of the cloning box
        var n = this.sizeSlider.value();
        var val = minSize + (n - 1) * increment;
        var mouseVal = val/2;
        
        
        //if CTRL is pressed and the mouse is clicked on the canvas, the position of the current coordinates (mouseX,mouseY) will determine the initial position to be cloned.
        if(ctrlisPressed == true && mouseIsClicked == true){
            initialX = mouseX
            initialY = mouseY      
        }
        
        //when the mouse is clicked on the canvas, the position of the current coordinates (mouseX,mouseY) will determine the position where the cloned area will start to be drawn.
        if(mouseIsClicked == true){
            destination_X = mouseX
            destination_Y = mouseY
            
           //The distance between the chosen start position and the destination position will be used when the selected area to be cloned is drawn in a new area. In such a way that the initial coordinates move in the same direction as the current mouse position.
            distanceX = destination_X - initialX
            distanceY = destination_Y - initialY
        }
        
        mouseIsClicked = false
        updatePixels();
        
        //Draw chosen (cloned) area to new area
        if(mouseIsPressed && pressOnCanvas()){
            copy(mouseX - distanceX - mouseVal, 
                 mouseY - distanceY - mouseVal, 
                 val, val, 
                 mouseX - mouseVal, 
                 mouseY - mouseVal, 
                 val, val)
            loadPixels(); 
            
            //While the mouse is dragged on the canvas onCanvas==true, that means that a rectangle will be drawn to identify the zone that is being cloned until the mouse is released.
            noFill()
            strokeWeight(1)
            stroke(166,166,166)
            onCanvas = true
            if(onCanvas == true){
                rect(mouseX - distanceX - mouseVal, 
                     mouseY - distanceY - mouseVal, 
                     val, val)
            }
        }
    }

    
    this.populateOptions = function() {
        var sizeText = createDiv('Size:') 
        sizeText.class('sizeText')
        sizeText.parent(select('.options'));

        //slider to change the size of cloning box
        this.sizeSlider = createSlider(1,20,10);
        this.sizeSlider.class('slider');
        this.sizeSlider.parent(select('.options'));

        //indicate how to use the tool
        var sizeText2 = createDiv('Press CTRL + left mouse click to set the start point to clone');
        sizeText2.parent(select('.options'));
        sizeText2.class('sizeText2');   
    };


    //clear modifications when the tool is deselected 
    this.unselectTool = function() {
        if(self.name == "CloneShapeTool")
        {
            onCanvas = false;
            draw();
            loadPixels();
            select('.options').html("");
        }
    } 
}
