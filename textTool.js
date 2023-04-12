//before creating a new tool on the toolbar first test it here.
function TextTool(){
    //set an icon and a name for the object
    this.icon = "assets/tools/texto.png";
    this.name = "textTool";

    //string that stores the text that the user enters on the canvas
    var content = "";
    // indicator that while writing the text it will be reflected directly on the canvas
    var onCanvasMode = false;
    //indicator that the text will be mirrored by text input
    var inputMode = true;
    // text input inputMode and canvas inputMode
    var upper = false;
    var lower = false;

    var self = this;

    this.draw = function(){
        
        //determine the size of the string content
        sizeT = this.sizetext.value();
        s = Number(sizeT);
        textSize(s);
        strokeWeight(1);

        //when the user wants the text to be reflected directly on the canvas each time a key is pressed.
        if(onCanvasMode == true && inputMode == false){
            if(upper == true)
            {      
                upper = false;
                lower = false;
            }
            else if(lower == true)
            {
                
                lower = false;
                upper = false;
            }
            //drawing the text on the canvas
            text(content, initialPositions.x , initialPositions.y, width - 10, height-10);
        }

        //fill and stroke colors are set using the colorpicker_2 and colorpicker elements, respectively.
        fillColor = document.getElementById("colorpicker_2").value;
        fill(fillColor);
        strokeColor = document.getElementById("colorpicker").value;
        stroke(strokeColor); 
  
    }

    this.mouseReleased = function(){
        //the string returned by textInput will be drawn on the canvas at the position where the mouse click was released on the canvas.
        if(pressOnCanvas())
        {
            initialPositions.x = mouseX;
            initialPositions.y = mouseY;
            updatePixels();
            textInput = document.getElementById("input").value;
            text(textInput, initialPositions.x, initialPositions.y, width - 10, height-10);
        }
    }

    this.keyTyped = function(){
        //The keyTyped method is called when the user types a key while the text tool is selected. If onCanvasMode is true and inputMode is false (i.e., the user is typing on the canvas), the key is appended to the content string.
        if(onCanvasMode == true && keyCode != 13 && inputMode == false)
        {
            content += key;
        }
    }

    this.keyReleased = function(){
        // if BACKSPACE is pressed last character in the content string is removed
        if(keyCode == BACKSPACE || keyCode == DELETE){
            content = content.substring(0,content.length - 1);
            updatePixels();
        }
        //if ENTER is pressed a newline character is appended to the content string.
        else if(keyCode == 13)
        {
            content = content + "\n"
        }
    }


    this.populateOptions = function()
    {
        //adds buttons to finish drawing text on the canvas, toggle between text input, and text directly on the canvas. Select text in upper or lower case. 
        select(".options").html("<button class='button' id = 'finishText'> Finish </button> <div class='input-container'> <input type='text' id='input' required=''> <label for='input' class='label'>Enter Text</label> <div class='underline'></div> </div> <button class='button' id = 'TextonCanvas'> Click to type </button>  <button class='bottone5 ' id = 'bottoneUpper'> UpperCase </button></button>  <button class='bottone5 ' id = 'bottoneLower'> LowerCase </button>");

        select("#bottoneUpper").hide();
        select("#bottoneLower").hide();

        select("#finishText").mouseClicked(function() {
            draw();
            loadPixels();
            initialPositions.x = 0;
            initialPositions.y = 0;
            content = "";
        });       
        initialPositions = {x: 0, y:0}

        //tag to describe the functionality of "Click on type" mode
        this.divLabelTOnCan1 = createDiv()
        this.divLabelTOnCan1.id('divLabelTOnCan1')
        this.divLabelTOnCan1.parent(select('.options'));
        //-->//
        this.divLabelTOnCan2 = createDiv()
        this.divLabelTOnCan2.id('divLabelTOnCan2')
        this.divLabelTOnCan2.parent(select('.options'));
        //-->//
        var labelTextOnC1 = document.createElement('label');
        var labelTextOnC2 = document.createElement('label');
        labelTextOnC1.innerHTML = "PRESS ON CANVAS"; 
        labelTextOnC2.innerHTML = "AND START WRITING";    
        document.getElementById('divLabelTOnCan1').appendChild(labelTextOnC1);
        document.getElementById('divLabelTOnCan2').appendChild(labelTextOnC2);
        //-->//
        select("#divLabelTOnCan1").hide();
        select("#divLabelTOnCan2").hide();

        //if "Click on type" is pressed
        select('#TextonCanvas').mouseClicked(function()
        {
            onCanvasMode = true;
    
            document.getElementById("input").value = null;
            if(inputMode == true)
            {
                //If the inputMode is true, it will be hidden and the label of the "click to type" button will now be "finish click to type", also the buttons to make the string UPPERCASE or LOWERCASE will be displayed.
                select("#input").hide();
                select(".label").hide();
                document.getElementById("TextonCanvas").innerHTML = "Finish Click to type";
                inputMode = false;
                select("#bottoneUpper").show();
                select("#bottoneLower").show();
                select("#divLabelTOnCan1").show();
                select("#divLabelTOnCan2").show();
            }
            //If the inputMode is false, the text input will be displayed and the "finish click to type" button label will now be "click to type", the UPPERCASE and LOWERCASE buttons will be hidden.
            else
            {
                select("#input").show();
                select(".label").show();
                document.getElementById("TextonCanvas").innerHTML = "Click to type";
                inputMode = true; 
                select("#bottoneUpper").hide();
                select("#bottoneLower").hide();
                select("#divLabelTOnCan1").hide();
                select("#divLabelTOnCan2").hide();
            }
            
        });

        select('#bottoneUpper').mouseClicked(function(){
            upper = true;
            // convert the string content to uppercase
            content = content.toUpperCase();
            updatePixels();
            
        })
        select('#bottoneLower').mouseClicked(function(){
            lower = true;
            // convert the string content to lowercase
            content = content.toLowerCase();
            updatePixels();
        })

        //Create a slider to select the font size.
        this.sizetext = createSlider(14,50,24);
        this.sizetext.parent(select(".underbox"));
        this.sizetext.class("slider");
        this.sizetext.id("sliderSizeText");

        //each time sizetext is pressed, the pixels of the canvas are updated for the last modification of the text size
        select('#sliderSizeText').mouseClicked(function(){updatePixels()});

        //tag to describe the functionality of the slider
        this.divLabel = createDiv()
        this.divLabel.id('divLabelText')
        this.divLabel.parent(select('.underbox'));

        var labelSize = document.createElement('label');
        labelSize.innerHTML = "Size";   
        document.getElementById('divLabelText').appendChild(labelSize);

    }
    

    //clear modifications when the tool is deselected
    this.unselectTool = function(){
        if(self.name == "textTool")
        {
            //clear options
            select(".options").html("");
            content = "";
            onCanvasMode = false;
            inputMode = true;
            this.sizetext.remove();
            this.divLabel.remove();
            this.divLabelTOnCan1.remove();
            this.divLabelTOnCan2.remove();
        }
		
	};
    
}