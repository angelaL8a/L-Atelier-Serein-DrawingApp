function FiltersTool(){
    //set an icon and a name for the object
    this.icon = "assets/tools/Filters.png";
    this.name = "filtersTool";

    var self = this; 
    
    //division for buttons
    var filtersSpace;

    canvasContainer = select('#content');
    var canvasNew = createGraphics(canvasContainer.size().width, canvasContainer.size().height);
    canvasNew.parent("content");

    //GRAY filter function
    const gray = () => {
        filter(GRAY);
        console.log("ImWork")
        }
    
    //THRESHOLD filter function
    const threshold = () => {
        filter(THRESHOLD);
        }
    //OPAQUE filter function
    const opaque = () => {
        filter(OPAQUE);
        }
    //INVERT filter function
    const invert = () => {
        filter(INVERT);
        }
    //POSTERIZE filter function
    const posterize = () => {
        filter(POSTERIZE, 3);
        }
    //DILATE filter function
    const dilate = () => {
        filter(DILATE);
        }
    //BLUR filter function
    const blur = () => {
        filter(BLUR, 3);
        }
    //ERODE filter function
    const erode = () => {
        filter(ERODE);
        }
    //SEPIA filter function
    const sepia = () => {
        loadPixels();
        let d = pixelDensity();
        let imageLength = 4 * (width * d) * (height * d);
        for (let i =0; i < imageLength; i += 4){
            let red = Math.round(0.393 * pixels[i] +
                                 0.769 * pixels[i+1] +
                                 0.189 * pixels[i+2]);
            let green = Math.round(0.349 * pixels[i] +
                                 0.686 * pixels[i+1] +
                                 0.168 * pixels[i+2]);
            let blue = Math.round(0.272 * pixels[i] +
                                 0.534 * pixels[i+1] +
                                 0.131 * pixels[i+2]);
            pixels[i] = red;
            pixels[i+1] = green;
            pixels[i+2] = blue;
        };
        updatePixels();
    }

    this.populateOptions = function ()
    {        
        //division for buttons
        filtersSpace  = createDiv();
        filtersSpace.parent(select('.options'));
        filtersSpace.class("FiltersSpace");

        //list of filters and generates a button for each filter in the HTML element with the id "filtersSpace". Each button is given the class "buttonFilters" and an id equal to the filter name.
        var filters = ["Sepia", "Gray", "Threshold", "Opaque", "Invert", "Posterize", "Dilate", "Blur", "Erode"];
        filters.forEach(filter => {
            let filterBtn = createDiv(`<button class='buttonFilters' id = "${filter}"> ${filter} </button>`);
            filterBtn.parent(filtersSpace);
            
        })

        //The namesFilters object is a mapping of filter names to their corresponding functions that apply the filter to the image.
        //"Sepia" key maps to the sepia() function
        //"Gray" key maps to gray() function
        //...
        const namesFilters = { 
            "Sepia": sepia,
            "Gray": gray,
            "Threshold": threshold,
            "Opaque": opaque,
            "Invert": invert,
            "Posterize": posterize,
            "Dilate": dilate,
            "Blur": blur,
            "Erode": erode
        }; 

        //call the corresponding filter function from the namesFilters object when the button is clicked.
        Object.keys(namesFilters).forEach(fun => select(`#${fun}`).mouseClicked(namesFilters[fun]));

        //reset filters
        restoreFilters = createButton("Reset filters");
        restoreFilters.parent(select(".underbox"))
        restoreFilters.class("learn-more");
        restoreFilters.id("restoreFilter");
        select("#restoreFilter").mouseClicked(function(){
            copy(canvasNew, 0, 0, canvasNew.width, canvasNew.height, 0, 0, width, height);
        });

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

    this.draw = function (){}


    //clear modification when tool is deselected
    this.unselectTool = function()
    {
        if(self.name == "filtersTool"){
            filtersSpace.remove();
            canvasNew.remove();
            restoreFilters.remove();
        } 
    }
    
}