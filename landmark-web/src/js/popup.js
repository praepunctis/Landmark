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
  console.log(elem.style.left);
    if(elem.style.left == ""){
        elem.style.display = "block";
        var pos = -1 * set_width;
        var id = setInterval(frame, 0.5);
        function frame() {
          if (pos > -10) {
            elem.style.left = "0px";
            clearInterval(id);
          } else {
            pos += 30;
            elem.style.left = pos + "px"; 
          }
        }
    }
    else{
        elem.style.left = "";
        elem.style.display = "none";
    }
  }