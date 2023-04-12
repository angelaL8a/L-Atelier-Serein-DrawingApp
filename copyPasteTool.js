function CopyPasteTool(){
    //set an icon and a name for the object
    this.icon = "assets/tools/copyPaste.png";
    this.name = "CopyPaste";
    
    var self = this; 
    //status indicator
    var selectMode;
    //coordinates and dimensions selected to clone
    var selectedArea;
    //selected area to clone
    var selectedPixels;

    var ctrl = false; 

    //Function that re-populates the edit and finish buttons
    this.populateOptions = function() 
    {
        // (state 0):
        // the tool is inactive
        // the button displays "Select area".
        selectMode = 0;

        selectedArea = {x: 0, y:0, w: 0, h: 0};
        //button (select-cut-paste) selected area
        select(".options").html("<button class='button' id = 'selectButton'>Select area</button>");

        select("#selectButton").mouseClicked(function()
        {
            var selectButton = select("#selectButton")

            //when selectButton (state = 0 "Select area") is pressed
            if(selectMode == 0)
            {   // (state 1): the tool is active and waiting for the user to select an area on the canvas. The button displays "Cut", and an explanatory text is shown.
                selectMode = 1;
                selectButton.html("Copy");
                divExplain  = createDiv("Press CTRL + Click to select area");
                divExplain.parent(select('.options'));
                divExplain.class("divExplain");
                loadPixels(); // store current frame
            }
            //when selectButton (state = 1 "Cut") is pressed 
            else if(selectMode == 1)
            {
                // (state 2): the user has selected an area, and the tool is waiting for the user to paste it somewhere else on the canvas. The button displays "End paste", and a different explanatory text is shown.
                selectMode += 1;
                selectButton.html("End paste");
                divExplain.hide();
                div2Explain  = createDiv("Press CTRL to paste select area");
                div2Explain.parent(select('.options'));
                div2Explain.class("div2Explain");
                //refresh the screen
                updatePixels();

                //store the pixels
                selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);                     
            }
            //when selectButton (state = 2 "End paste") is pressed
            else if(selectMode == 2)
            {
                //the user has completed the cut and paste operation and wants to return to selection mode. All properties are reset.
                div2Explain.hide();
                selectMode = 0;
                loadPixels();
                selectedArea = {x: 0, y: 0, w: 0, h: 0};
                selectButton.html("Select area");
            }
        });
    }

    // It checks whether the key pressed is the control key (keyCode == 17) and sets the ctrl variable to true if it is.
    this.keyPressed = function()
    {
        // If the selectMode is 1, it means that the user is currently selecting an area to cut, so the code updates the selectedArea object with the current mouse position.
        if(keyCode == 17){
            ctrl = true;
        }
        if(ctrl == true)
        {
            if(selectMode == 1)
            {
                selectedArea.x = mouseX;
                selectedArea.y = mouseY;
            }
            //If the selectMode is 2, it means that the user has finished the cut and paste operation and is now pasting the selected pixels, so the code displays the selectedPixels image at the current mouse position, adjusted by half the width and height of the selected area so that the image is centered on the mouse cursor.
            else if(selectMode == 2)
            {
                image(selectedPixels, 
                    mouseX - selectedArea.w/2, 
                    mouseY - selectedArea.h/2);
            }
        }       
    }

    this.draw  = function() 
    {
        //console.log(selectMode);
        if(mouseIsPressed && pressOnCanvas())
        {       
            //It checks if the mouse is pressed within the canvas, and if the selectMode is 1, it updates the pixels on the canvas to display a semi-transparent blue rectangle representing the selected area.
            if (selectMode == 1)
            {
                updatePixels();
                console.log("imwork")
                noStroke();
                fill(256,198,196,100);
                rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
            }
        }
        else
        {
            //if the user has released the mouse we want to set the previousMouse values 
            //back to -1.
            previousMouseX = -1;
            previousMouseY = -1;
        }
    }

    

    this.mouseDragged = function()
    {
        if(selectMode == 1)
        {
            // the user is currently selecting an area of the canvas to cut. Therefore, the width and height of the selected area are updated based on the difference between the current mouse position and the initial mouse position
            var w = mouseX - selectedArea.x;
            var h = mouseY - selectedArea.y;

            selectedArea.w = w;
            selectedArea.h = h;
        }
    } 
    
    //Clear modifications when the tool is deselected
    this.unselectTool = function(){
		if(self.name == "CopyPaste"){
            updatePixels();
		    //clear options
		    select(".options").html("");
        }
	};
    
}