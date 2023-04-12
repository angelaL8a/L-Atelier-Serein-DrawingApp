function GeometricDesignTool()
{
    this.name = "geometricDesign"
    this.icon = "assets/tools/geometric.png"

	// set default grids
    this.symmetry = 54;

	var self = this;

	var prev_mouseX = -1;
	var prev_mouseY = -1;

	//mouse coordinates for the other side of symmetric lines.
	var prev_Symmetric = -1;

	this.draw = function(){
        //stroke 
        strokeColor = document.getElementById("colorpicker").value;
		stroke(strokeColor);

        updatePixels();
        
		if(mouseIsPressed){
            
			if (prev_mouseX == -1){
				prev_mouseX = mouseX;
				prev_mouseY = mouseY;
                
                var initAngle = this.calcInitialAngle(prev_mouseX,
                                                        prev_mouseY);
                // empty 
                prev_Symmetric = [];
                
                // add points to prev_Symmetric[]
                for(let i = 0; i < this.symmetry; i++) {
                    // calculate point angle
                    let symmetricAngle = initAngle + i*(TWO_PI/this.symmetry);
                    // calculate point position
                    let pos = this.calcSymmetric(prev_mouseX,
                                                      prev_mouseY,
                                                      symmetricAngle);
                    // add point position to prev_Symmetric
                    prev_Symmetric.push(pos);
                }
                
			}
			else{
                push()
                // translate to center
                translate(width/2, height/2);    
                // draw a line
				line(prev_mouseX, prev_mouseY, mouseX, mouseY);
                pop();
                // update the pixels[] array
                updatePixels();
                
                // set prev_mouseX and prev_mouseY
				prev_mouseX = mouseX;
				prev_mouseY = mouseY;

                var initAngle = this.calcInitialAngle(prev_mouseX,
                                                        prev_mouseY);
                
                // empty 
                var symmetric = [];
                for(let i = 0; i < this.symmetry; i++) {
                    // angle
                    let symmetricAngle = initAngle + i*(TWO_PI/this.symmetry);
                    // position
                    let pos = this.calcSymmetric(mouseX,
                                                      prev_mouseY,
                                                      symmetricAngle);
                    symmetric.push(pos);
                }
                push();
                // translate to center
                translate(width/2, height/2);     
                // line from prev_Symmetric to symmetric
                for(let i = 0; i < this.symmetry; i++) {
                    sizeLine = document.getElementById("geometricLine").value;
                    strokeWeight(sizeLine);
                    line(prev_Symmetric[i][0], 
                         prev_Symmetric[i][1], 
                         symmetric[i][0], 
                         symmetric[i][1]);
                }
                pop();
                prev_Symmetric = symmetric;
			}
		}
		else{
            // reset 
			prev_mouseX = -1;
			prev_mouseY = -1;

            prev_Symmetric = -1;
           
		}

		loadPixels();
        
        // draw grids
        push();
        strokeWeight(1);
        stroke(210);
        //draw the line of symmetry
        var angle = TWO_PI/this.symmetry;
        translate(width/2, height/2);
        for(let i = 1; i <= this.symmetry; i++) {
            rotate(angle);
            line(0,0,width,height);
        }
        //return to the original stroke
        pop();
        
	};


    this.calcInitialAngle = function(x,y){
        // angle
        var a = y-height/2;
        var b = x-width/2;
        var r = sqrt(a**2 + b**2);
        var angle = acos(b/r);
        return angle;
    };
	this.calcSymmetric = function(x,y,angle){
        //symmetric point x and y
        var a = abs(y-height/2);
        var b = abs(x-width/2);
        var r = sqrt(a**2 * b**2);
        var x = r*cos(angle);
        var y = r*sin(angle);
        return [x,y];
	};
    
    this.populateOptions = function(){
        select(".options").html("<label style='color:black;font-size:20' for='geometricLine'>Line size </label> <input type='range' min='1' max='5' value='3' class='slider' id='geometricLine'>");

        grid9 = createButton("Grid 9");
        grid9.class("button");
        grid9.id("grid9_Button");
        grid9.parent(select(".options"));

        grid18 = createButton("Grid 18");
        grid18.class("button");
        grid18.id("grid18_Button");
        grid18.parent(select(".options"));

        grid36 = createButton("Grid 36");
        grid36.class("button");
        grid36.id("grid36_Button");
        grid36.parent(select(".options"));

        grid54 = createButton("Grid 54");
        grid54.class("button");
        grid54.id("grid54_Button");
        grid54.parent(select(".options"));


        //  g 54
		select("#grid54_Button").mouseClicked(function(){
			if (self.symmetry != 54){ 
				self.symmetry = 54;
			}
		});
        // g 36
        select("#grid36_Button").mouseClicked(function(){
			if (self.symmetry != 36){ 
				self.symmetry = 36;
			}
		});
        //  g 18
        select("#grid18_Button").mouseClicked(function(){
			if (self.symmetry != 18){ 
				self.symmetry = 18;
			}
		});
        //  g 9
        select("#grid9_Button").mouseClicked(function(){
			if (self.symmetry != 9){ 
				self.symmetry = 9;
			}
		});

        restoreButton.hide();
        saveButton.hide();
	};
    
    this.unselectTool = function() {
        if(self.name == "geometricDesign"){
            updatePixels();
            select(".options").html("");
            restoreButton.show();
            saveButton.show();
        } 
    };
    
}