function toggleAction(action){
    menu = document.getElementById("menu");
    popup = document.getElementById(action);
    if(popup.style.display == "none"){
        popup.style.display = "block";
	    menu.style.display = "none";
    }
    else{
        popup.style.display = "none";
	    menu.style.display = "flex";
    }
}

function myMove() {
    var elem = document.getElementById("explore");
    var set_width = window.innerWidth * 0.33;

    if(elem.style.left != "-33%"){
        
        elem.style.display = "block";
        var pos = -1 * set_width;
        var id = setInterval(frame, 0.5);
        function frame() {
          if (pos >= 0) {
            clearInterval(id);
          } else {
            pos += 6;
            elem.style.left = pos + "px"; 
          }
        }
        //document.getElementById("exploreContainer").style.display = "block";
    }
    else{
        elem.style.left = -1 * set_width;
        //document.getElementById("exploreContainer").style.display = "none";
    }
  }