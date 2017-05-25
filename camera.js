var currentlyPressedKeys = {};

function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
    }

function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }

    var pitch = 0;
    var pitchRate = 0;
    var xPos = 0;
    var yPos = 0;
    var zPos = 0;
    var xRot = 0;
    var yRot = 0;
    var xr = 0;
    var yr = 0;
    var sd = 300;
    var speed = -0.2;
	var click = 0;
	var a = 0;
	var b = 0;
function handleKeys() {
        if (currentlyPressedKeys[33]) {
            // Page Up
            pitchRate = 0.1;
        } else if (currentlyPressedKeys[34]) {
            // Page Down
            pitchRate = -0.1;
        } else {
            pitchRate = 0;
        }
        if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
            // Left cursor key or A
            //xPos += speed;
		yr = sd;

        } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
            // Right cursor key or D
            //xPos -= speed;
		yr = -sd;

        } else {
            //xPos += 0;
		yr = 0;
        }
        if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
            // Up cursor key or W
            //yPos -= speed;
		xr = sd;
		
        } else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
            // Down cursor key
            //yPos += speed;
		xr = -sd;
        } else {
            //yPos += 0;
		xr = 0;
        }
    }
