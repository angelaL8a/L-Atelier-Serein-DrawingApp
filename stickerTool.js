function StickerTool()
{
    this.name = 'StickerTool'
    this.icon = "assets/tools/sello.png"

    var self = this; 
    var stickerSpace;

    var angle;

    this.stickers = ["gato", "loro", "perro", "chocolate", "macarron", "helado", "twitter", "snapchat", "instagram"];
    //make first stamp as the initial
    this.stickerSelected = loadImage("assets/stickers/gato.png"); 
    this.currentSticker = "gato";

    self.stickerSelected = loadImage(self.stickerSelected);
    // }

    var startMouseX = -1;
	var startMouseY = -1;
    
    //load in the stickers
    this.populateOptions = function()
    {
        
        //div for stickers
        stickerSpace = createDiv();
        stickerSpace.parent(select('.options'));
        stickerSpace.class('stampPalette');
        stickerSpace.id('stampPalette');
        
        //for each sticker create a new division in the html for the stickerSwatches
        for (var i = 0; i < this.stickers.length; i++) 
        {
            var stickerKEY = this.stickers[i];
            //add the sticker to the palette 
            var stickerSwatches = createDiv()
            stickerSwatches.class('stampSwatches');
            stickerSwatches.id(stickerKEY);

            stickerSpace.child(stickerSwatches);
            var stickerImg = "assets/stickers/" + stickerKEY + ".png"; 
            var imageELT = createImg(stickerImg, 'stamp');
            imageELT.class('stickers');
            select("#" + stickerKEY).child(imageELT);
            //stickerSwatches.mouseClicked(self.stickerClicked);
            stickerSwatches.mouseClicked(function()
            {
                var s = this.id();
                self.currentSticker = s;

                //set the selected sticker
                self.stickerSelected = "assets/stickers/" + s + ".png"; 
                self.stickerSelected = loadImage(self.stickerSelected);
            });
        }

        // slider that can be used to adjust the size of a sticker
        sizeSticker = createSlider(50, 150, 50);
        sizeSticker.class("slider");
        sizeSticker.id("sizeSticker");
        sizeSticker.parent(select(".options"));
        // slider that can be used to adjust the rotation angle of a sticker
        rotateSticker = createSlider(0, 360, 0);
        rotateSticker.class("slider");
        rotateSticker.id("rotateSticker");
        rotateSticker.parent(select(".options"));

        // new div for "SIZE" tag
        divSize = createDiv();
        divSize.id("divSizeSticker");
        divSize.parent(select(".options"));
        //display the text "SIZE" next to the size slider
        labelSize = document.createElement('label');
        labelSize.innerHTML = "SIZE";
        document.getElementById('divSizeSticker').appendChild(labelSize);
        
        // new div for "ROTATE" tag
        divRotate = createDiv();
        divRotate.id("divRotateSticker");
        divRotate.parent(select(".options"));
        //display the text "ROTATE" next to the size slider
        labelRotate = document.createElement('label');
        labelRotate.innerHTML = "ROTATE";
        document.getElementById('divRotateSticker').appendChild(labelRotate);

    };

    //Display sticker on the canvas with corresponding size and rotation
    this.sticker = function(pos_x, pos_y, size_width, size_height, imgAngle)
    {
        imageMode(CENTER);
        translate(pos_x+size_width/2, pos_y+size_width/2);
        rotate(PI/180*angle);
        image(this.stickerSelected, 0, 0, size_width, size_height);
        //After the image is drawn, the rotation and translation is undone. 
        rotate(-PI / 180 * imgAngle);
        translate(-(pos_x+size_width/2), -(pos_y+size_width/2));
        imageMode(CENTER);
    }


    this.draw = function()
    {
        //sticker
        if(mouseIsPressed && pressOnCanvas()) {
            
            if(startMouseX == -1){
                startMouseX = mouseX;
                startMouseY = mouseY;
                loadPixels();
            }
            else{
                //updatePixels()
                //set rotation angle based on the slider
                size = document.getElementById("sizeSticker").value;
                angle = document.getElementById("rotateSticker").value;
                
                //call the function this.sticker() and specify the parameters to follow to place a sticker at the current location of the mouse cursor, with a specified size and angle of rotation.
                this.sticker(mouseX-(size/2), mouseY-(size/2), size, size, angle);  
            }            
        }
    };

    //When selecting another tool, deselect the previous tool to clear all settings made so that the next tool can work correctly.
    this.unselectTool = function() {
        if(self.name == "StickerTool"){
            //remove the current selection in the options section
            select('.options').html("");
            translate(0, 0);
            rotate(0);
            imageMode(CORNER);
        } 
    };
}