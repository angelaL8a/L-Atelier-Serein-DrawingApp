function BackColorTool(){
	//set an icon and a name for the object
	this.icon = "assets/tools/paint.png";
	this.name = "BackColorTool";
    
    var r;
    var g; 
    var b; 

    var backColorPicker;

    // verifiers to display the corresponding sliders for the modes: 
        //RGB, HSB, HSL
    var RGBmode = false;
    var HSBmode = false;
    var HSLmode = false;
    var colorPickermode = false;
    var self = this;

    //set the background color. 
    //It supports three different color modes: RGB, HSB, and HSL.
    this.draw = function() {
        if(RGBmode == true)
        {
            colorMode(RGB);
            // retrieves the current values of the:
                // red, green, and blue sliders
            r = document.getElementById("redSlider").value;
            g = document.getElementById("greenSlider").value;
            b = document.getElementById("blueSlider").value;
            background(r, g, b);
        }
        else if (HSBmode == true)
        {
            colorMode(HSB);
            //retrieves the current values of the:
                // hue, saturation, and brightness sliders 
            h = document.getElementById("HSlider").value;
            s = document.getElementById("SSlider").value;
            b = document.getElementById("BSlider").value;
            background(h, s, b);
        }
        else if(HSLmode == true)
        {
            colorMode(HSL);
            //retrieves the current values of the:
                // hue, saturation, and lightness sliders 
            hh = document.getElementById("3HSlider").value;
            ss = document.getElementById("3SSlider").value;
            ll = document.getElementById("3LSlider").value;
            background(hh, ss, ll);

        }
        else if(colorPickermode == true)
        {
            colour = backColorPicker.color();
            background(colour); 
        }
    }

    this.populateOptions = function () {
		// slider for size, returns value to size with getelementbyid.value
        select(".options").html("<button class='cssbuttons-io-button' id = 'RGB'> RGB <div class='icon'> <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h24v24H0z'  fill='none'></path><path d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z' fill='currentColor'></path></svg> </div> </button> <button class='cssbuttons-io-button' id = 'HSB'> HSV <div class='icon'> <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h24v24H0z'  fill='none'></path><path d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z' fill='currentColor'></path></svg> </div> </button> <button class='cssbuttons-io-button' id = 'HSL'> HSL <div class='icon'> <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h24v24H0z'  fill='none'></path><path d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z' fill='currentColor'></path></svg> </div> </button> <button class='cssbuttons-io-button' id = 'ColorPickER'> ColorPicker <div class='icon'> <svg height='24' width='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h24v24H0z'  fill='none'></path><path d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z' fill='currentColor'></path></svg> </div> </button>");

        this.colorRGB();
        this.colorHSV();
        this.colorHSL(); 

        //button "BACK"
            //(for each function): If the "BACK" button is pressed, the function "this.populateOptions()" is called and respectively the bouleans "RGBmode", "HSBmode", "HSLmode" becomes false so that the displayed sliders are hidden again and are show the main buttons "RGB", "HSB", "HSL" to choose the color mode and color for the background of the canvas.
        var backButton = createButton("BACK");
        backButton.parent(select(".options"));
        backButton.class("button");
        backButton.id("backButton");
        backButton.hide();

        //create div for color picker
        var divPick = createDiv("COLOR ");
        divPick.parent(select('#otherSpace2'));
        divPick.class('divPick');
        // create color picker
        backColorPicker = createColorPicker('#000000');
        backColorPicker.parent(divPick);
        backColorPicker.class("backColorPicker");
        backColorPicker.id("backColorPicker");
        divPick.hide();
        backColorPicker.hide();
        //It hides elements corresponding to other color modes and shows the appropriate COLOR PICKER for controlling the color.
        select("#ColorPickER").mouseClicked(function(){
            document.getElementById("RGB").style.display = "none";
            document.getElementById("HSB").style.display = "none";
            document.getElementById("HSL").style.display = "none";
            document.getElementById("ColorPickER").style.display = "none";
            if(RGBmode == false && HSBmode == false && HSLmode == false)
            {
                colorPickermode = true;
                
                divPick.show();
                backColorPicker.show();

                backButton.show();
                backButton.style('margin-top', '10px');

                select("#backButton").mouseClicked(function(){
                    divPick.hide();
                    backColorPicker.hide();
                    select(".options").html(" ");
                    select("#otherSpace2").html(" ");
                    select("#otherSpace3").html(" ");
                    RGBmode = false;
                    HSBmode = false;
                    HSLmode = false;
                    colorPickermode = false;    
                    self.populateOptions();
                });
                
            }
        });


        //It hides elements corresponding to other color modes and shows the appropriate sliders and divs for controlling the RGB values.
        select("#RGB").mouseClicked(function(){
            document.getElementById("RGB").style.display = "none";
            document.getElementById("HSB").style.display = "none";
            document.getElementById("HSL").style.display = "none";
            document.getElementById("ColorPickER").style.display = "none";
            if(RGBmode == false && HSBmode == false && colorPickermode == false && HSLmode == false);
            {
                RGBmode = true
                sliderR.show();
                sliderG.show();
                sliderBl.show();
                div1.show();
                div2.show();
                div3.show();
                
                backButton.show();
                select("#backButton").mouseClicked(function(){
                    select(".options").html(" ");
                    select("#otherSpace2").html(" ");
                    select("#otherSpace3").html(" ");
                    RGBmode = false;
                    HSBmode = false;
                    HSLmode = false;
                    colorPickermode = false;    
                    self.populateOptions();               
                });
                
            }
        })
        
        //It hides elements corresponding to other color modes and shows the appropriate sliders and divs for controlling the HSB values.
        select("#HSB").mouseClicked(function(){
            document.getElementById("RGB").style.display = "none";
            document.getElementById("HSB").style.display = "none";
            document.getElementById("HSL").style.display = "none";
            document.getElementById("ColorPickER").style.display = "none";
            if(HSBmode == false && RGBmode == false && colorPickermode == false)
            {
                HSBmode = true
                sliderH.show();
                sliderS.show();
                sliderB.show();
                divA.show();
                divB.show();
                divC.show();

                backButton.show();
                select("#backButton").mouseClicked(function(){
                    select(".options").html(" ");
                    select("#otherSpace2").html(" ");
                    select("#otherSpace3").html(" ");
                    RGBmode = false;
                    HSBmode = false;
                    HSLmode = false;
                    colorPickermode = false;    
                    self.populateOptions(); 
                });
            }
        });

        //It hides elements corresponding to other color modes and shows the appropriate sliders and divs for controlling the HSL values.
        select("#HSL").mouseClicked(function(){
            document.getElementById("RGB").style.display = "none";
            document.getElementById("HSB").style.display = "none";
            document.getElementById("HSL").style.display = "none";
            document.getElementById("ColorPickER").style.display = "none";
            if(HSBmode == false && RGBmode == false && HSLmode == false && colorPickermode == false)
            {
                HSLmode = true
                slider3H.show();
                slider3S.show();
                slider3L.show();
                divI.show();
                divII.show();
                divIII.show();

                backButton.show();
                select("#backButton").mouseClicked(function(){
                    select(".options").html(" ");
                    select("#otherSpace2").html(" ");
                    select("#otherSpace3").html(" ");
                    RGBmode = false;
                    HSBmode = false;
                    HSLmode = false;
                    colorPickermode = false;    
                    self.populateOptions(); 
                });
            }
        })

	}

    //Each function creates three sliders for the RGB color mode, as well as three corresponding labels to display the slider values.

    //The sliders are initially hidden and the labels are placed inside their own div elements which are also hidden. They will be displayed when "RGB", "HSB", "HSL" button is pressed respectively.

    this.colorRGB = function()
    {
        //SliderRED
        sliderR = createSlider(1,255,255);
        sliderR.parent(select('.options'));
        sliderR.id('redSlider');
        sliderR.class('sliderColors');
        sliderR.hide();

        //SliderGREEN
        sliderG = createSlider(1,255,255);
        sliderG.parent(select('.options'));
        sliderG.id('greenSlider');
        sliderG.class('sliderColors');
        sliderG.hide();

        //SliderBLUE
        sliderBl = createSlider(1,255,255);
        sliderBl.parent(select('.options'));
        sliderBl.id('blueSlider');
        sliderBl.class('sliderColors');
        sliderBl.hide(); 

        div1 = createDiv()
        div1.id('divLabelR')
        div1.parent(select('.otherSpace3'));

        div2 = createDiv()
        div2.id('divLabelG')
        div2.parent(select('.otherSpace3'));

        div3 = createDiv()
        div3.id('divLabelB')
        div3.parent(select('.otherSpace3'));

        //label SliderR
        red = document.createElement('label');
        red.innerHTML = "R";   
        document.getElementById('divLabelR').appendChild(red);
        //label SliderG
        green = document.createElement('label');
        green.innerHTML = "G";   
        document.getElementById('divLabelG').appendChild(green);
        //label SliderBl
        blue = document.createElement('label');
        blue.innerHTML = "B";   
        document.getElementById('divLabelB').appendChild(blue);

        div1.hide();
        div2.hide();
        div3.hide();

    }

    this.colorHSV = function()
    {
        
        //SliderHUE
        sliderH = createSlider(0,360,360);
        sliderH.parent(select('.options'));
        sliderH.id('HSlider');
        sliderH.class('sliderColors');
        sliderH.hide();
        
        //SliderSATURATION
        sliderS = createSlider(0,100,100);
        sliderS.parent(select('.options'));
        sliderS.id('SSlider');
        sliderS.class('sliderColors');
        sliderS.hide();

        //SliderBRIGHTNESS
        sliderB = createSlider(0,100,100);
        sliderB.parent(select('.options'));
        sliderB.id('BSlider');
        sliderB.class('sliderColors');
        sliderB.hide();

        divA = createDiv()
        divA.id('divLabelH')
        divA.parent(select('.otherSpace3'));

        divB = createDiv()
        divB.id('divLabelS')
        divB.parent(select('.otherSpace3'));

        divC = createDiv()
        divC.id('divLabelV')
        divC.parent(select('.otherSpace3'));

        //label SliderHUE
        hue = document.createElement('label');
        hue.innerHTML = "H";   
        document.getElementById('divLabelH').appendChild(hue);
        //label SliderSATURATION
        saturation = document.createElement('label');
        saturation.innerHTML = "S";   
        document.getElementById('divLabelS').appendChild(saturation);
        //label SliderBRIGHTNESS
        value = document.createElement('label');
        value.innerHTML = "V";   
        document.getElementById('divLabelV').appendChild(value);

        divA.hide();
        divB.hide();
        divC.hide();
    }
    //<blockquote> 

    this.colorHSL = function()
    {
        //SliderHUE
        slider3H = createSlider(0,360,360);
        slider3H.parent(select('.options'));
        slider3H.id('3HSlider');
        slider3H.class('sliderColors');
        slider3H.hide();       

        //SliderSATURATION
        slider3S = createSlider(0,100,100);
        slider3S.parent(select('.options'));
        slider3S.id('3SSlider');
        slider3S.class('sliderColors');
        slider3S.hide();

        //SliderLIGHTNESS
        slider3L = createSlider(0,100,50);
        slider3L.parent(select('.options'));
        slider3L.id('3LSlider');
        slider3L.class('sliderColors');
        slider3L.hide();

        divI = createDiv()
        divI.id('divLabel3H')
        divI.parent(select('.otherSpace3'));

        divII = createDiv()
        divII.id('divLabel3S')
        divII.parent(select('.otherSpace3'));

        divIII = createDiv()
        divIII.id('divLabel3L')
        divIII.parent(select('.otherSpace3'));

        //label SliderHUE
        hUe = document.createElement('label');
        hUe.innerHTML = "H";   
        document.getElementById('divLabel3H').appendChild(hUe);
        //label SliderSATURATION
        sAturation = document.createElement('label');
        sAturation.innerHTML = "S";   
        document.getElementById('divLabel3S').appendChild(sAturation);
        //label SliderLIGHTNESS
        vAlue = document.createElement('label');
        vAlue.innerHTML = "L";   
        document.getElementById('divLabel3L').appendChild(vAlue);

        divI.hide();
        divII.hide();
        divIII.hide();
    }

    //clear options button on tool deselect
    this.unselectTool = function() {
        if(self.name == "BackColorTool")
        {
            select(".options").html(" ");
            select("#otherSpace2").html(" ");
            select("#otherSpace3").html(" ");
            RGBmode = false;
            HSBmode = false;
            HSLmode = false;
            colorPickermode = false;
        }
    }    
}