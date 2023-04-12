function HelperFunctions() {

	//p5.dom click click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	// select("#clearButton").mouseClicked(function() {
	// 	background(255);

	//call loadPixels to update the drawing state
	//this is needed for the mirror tool
	// 	loadPixels();
	// });
	select("#clearB").mouseClicked(function() {
		background(255);

		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	select("#saveImageB").mouseClicked(function() {
		save("canvas.jpg");
	});


	select("#printB").mouseClicked(function()
	{
		var  pdf = createPDF();
		pdf.beginRecord();
		pdf.save();
	});
	
	
	// document.onkeydown = function (e) {
    //     console.log('key down');
    //     console.log(e);
    // };

	

}

