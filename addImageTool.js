function AddImageTool()
{
    this.name = "ImageTool"
    this.icon = "assets/tools/picture.png"
    this.size = 50;

    var input;
    var img;
    var removeButton;
    var finishButton;
    var inputImage = false;

    var start_X = -1;
    var start_Y = -1;

    //Array to store the current pixels of the added images
    var currentS = [];
    
    var showsImage = true;

    //checker to add the pixels of the added image to "currentS"
    var saveImage = false;

	var self = this;
    
    // create a sec canvas to draw on
    canvasContainer = select('#content');
    var canvasNew = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    canvasNew.select('#content');

	this.draw = function(){
        if(saveImage == true)
        {
            currentS.push({
                x: mouseX,
                y: mouseY
            })           
        }


        //image(canvasNew,150,75,100,100)

        if (mouseIsPressed && pressOnCanvas()){
            if (start_X == -1) {
                start_X = mouseX;
                start_Y = mouseY;
                //save the current pixel array after the drawing
                loadPixels();
            } 
            else{
                updatePixels();
                
                if(showsImage){
                    if(img){
                    image(img,start_X,start_Y, mouseX-start_X, mouseY-start_Y);
                    }
                }
            }
        }
        //if the mouse is not pressed then it will reset the initial values start_X=-1 & start_Y=-1
        else if (inputImage) {
            //save the pixels, resets the drawRect bool and reset start locations
            loadPixels();
            inputImage = false;
            start_X = -1;
            start_Y = -1;
      }
              
	};

    this.error = function(){
         
    }
    
    
    //callback to load images from file directory
    this.handleFile = function(file)
    {
        
        print(file);
        if(file.type ==='image'){
            cursor(CROSS);
            img = createImg(file.data, '');
            img.hide();
            img.size(width, height);
        }
        
        else{
            img = null;
            alert("This file is not an image, select an image to add to the canvas!")
        }
    }
    
	this.populateOptions = function() {
        // button to remove all images from the canvas
        removeButton = createButton('Remove Images');
        removeButton.parent(select('.options'));
        removeButton.class('button');
        removeButton.id('removeImage');
        select("#removeImage").mouseClicked(function() {
            
            //when the button "REMOVE IMAGES" is pressed all the pixels saved in "CanvasNew" will be copied to the canvas again. Thus, the added images will disappear and only the changes previously made in other tools will remain.
            copy(canvasNew, 0, 0, canvasNew.width, canvasNew.height, 0, 0, width, height);
            img = null;
            cursor(HAND);
        });

        // button to finalize the position of the image when adding it to the canvas
        finishButton = createButton('Finish Image');
        finishButton.parent(select('.options'));
        finishButton.class('button');
        finishButton.id('finishImage');
        select("#finishImage").mouseClicked(function() {
            
            saveImage = true;
            draw();
            loadPixels();
            currentS = [];
            start_X = -1;
            start_Y = -1;

        });
        
        // input to add an image
        input = createFileInput(this.handleFile);
        input.parent(select('.options'));
        input.class('button');
        input.id('InputImage');
        input.size(310,AUTO);

        //save all the pixels of the canvas before doing any modification
        canvasNew.copy(
            //source
            c,
            // source x, y, w, h
            0, 0, width, height,
            // destination x, y, w, h
            0, 0, canvasNew.width, canvasNew.height
        );
        
    }

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        if(self.name == "ImageTool"){
            select(".options").html("");
            cursor(HAND);
            canvasNew.remove();
        }        
    };
};

 

