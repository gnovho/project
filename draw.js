var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }



function degToRad(degrees) {
        return degrees * pi / 180;
    }

var arrayx = new Float32Array (12);
var arrayy = new Float32Array (12);
var arrayl = new Uint8Array (12);
var f=0;

for (var t=0; t<2*Math.PI; t+=Math.PI/6)
{
	arrayx[f] = 10*Math.cos(t);
	arrayy[f] = 10*Math.sin(t);
	arrayl[f] = 1;
	f++;
}

function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  		
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

	//Light

	gl.uniform1i(shaderProgram.useLightingUniform, 1);
	gl.uniform3f(
                shaderProgram.ambientColorUniform,
                0.2, 0.2, 0.2
            );

        gl.uniform3f(
                shaderProgram.pointLightingLocationUniform,
                20, 20, -10	
            );

        gl.uniform3f(
                shaderProgram.pointLightingColorUniform,
                1, 1, 1	
            );

	mat4.identity(mvMatrix);

	

	//Camera
	mat4.translate(mvMatrix, [0.0, 0.0, -40.0]);
	mat4.rotate(mvMatrix, -pi/4, [1, 0, 0]);
	mat4.translate(mvMatrix, [0, -10, 0]);	
	mat4.rotate(mvMatrix, degToRad(-pitch), [1, 0, 0]);

	{
		if (xPos>28) xPos=28;
		if (xPos<-28) xPos=-28;
		if (yPos>28) yPos=28;
		if (yPos<-28) yPos=-28;
	}
	
        mat4.translate(mvMatrix, [-xPos, -yPos, -zPos]);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

	//Scence
	mvPushMatrix();
	//mat4.translate(mvMatrix, [0.0, 0.0, 15.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, scenceVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, scenceVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, scenceVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, scenceVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, scenceTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();

	mat4.translate(mvMatrix, [0.0, 0.0, 12]);

	
	//Cube
	var lo=0;

	for (var t=0; t<2*pi; t+=pi/6)
	{
	
	var x=10*Math.cos(t);
	var y=10*Math.sin(t);
	mat4.translate(mvMatrix, [ x, y, 0.0]);	
	mvPushMatrix();
	
        mat4.rotate(mvMatrix, degToRad(rCube), [1, 1, 1]);
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
        setMatrixUniforms();

	if (arrayl[lo]==1) {
        gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0); }

        mvPopMatrix();
	lo++;
	mat4.translate(mvMatrix, [ -x, -y, 0.0]);	
	}

	//Moon
	
	mvPushMatrix();
	
	var a=0;
	var b=0;
	
	{
		if (xPos>28) xPos=28;
		if (xPos<-28) xPos=-28;
		if (yPos>28) yPos=28;
		if (yPos<-28) yPos=-28;
	}
	mat4.translate(mvMatrix, [xPos, yPos, zPos]);
	var t=0;
	for (var t=0; t<12; t++)
	{
		a=arrayx[t];
		b=arrayy[t];
		if (xPos>=a-3 && xPos<=a+3 && yPos>=b-3 && yPos<=b+3)
			arrayl[t]=0; 
	}

	//Score
	var diem =0;
	for (var t=0; t<12; t++)
		if (arrayl[t]==0) diem+=10;	
	ctx.clearRect(0, 0, 1000, 600);
	ctx.font = '50px "Times New Roman"';    
	ctx.fillStyle = 'rgba(255, 255, 255, 1)';
	if (diem<120)
	    	ctx.fillText('Score: ' + diem.toString(), 400, 50);	
	else {
		ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		ctx.fillText('You won!!!', 400, 50);
		}

	if (xr!=0)
		{
			mat4.rotate(mvMatrix, -degToRad(xRot), [1, 0, 0]);
		
		}
	if (yr!=0)
		{
			mat4.rotate(mvMatrix, -degToRad(yRot), [0, 1, 0]);
		}
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, moonTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, moonVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, moonVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, moonVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, moonVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	
        

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, moonVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	mvPopMatrix(); 
    }

var lastTime = 0;
    function animate() {
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;
		rCube-= (75*elapsed)/1000.0;
	    xRot += (xr * elapsed)/1000.0;
            yRot += (yr * elapsed)/1000.0;

	    xPos += (-yr * elapsed) / 20000.0;
            yPos += (xr * elapsed) / 20000.0;

            pitch += pitchRate * elapsed;
        }
        lastTime = timeNow;
    }


function tick() {

        requestAnimFrame(tick);
        handleKeys();
        drawScene();	
        animate();
    }

function webGLStart() {
        var canvas = document.getElementById("My_project-canvas");
	var score = document.getElementById("score");
        initGL(canvas, score);
        initShaders();
	inCubeBuffers();
        inCubeTexture();
	inScenceBuffers();
        inScenceTexture();
	inMoonBuffers();
        inMoonTexture();
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        tick();
    }
