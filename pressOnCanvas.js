function pressOnCanvas(){
	if(mouseX > 0 && mouseY < (0 + width) && 
	mouseY > 0 && mouseY < (0 + height) ){
		return true;
	}
	return false;
}