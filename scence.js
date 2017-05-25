var scenceTexture;
function inScenceTexture() {
        scenceTexture = gl.createTexture();
        scenceTexture.image = new Image();
        scenceTexture.image.onload = function () {
            handleLoadedTexture(scenceTexture)
        }
        scenceTexture.image.src = "scence.png";
    }

var scenceVertexPositionBuffer;
var scenceVertexIndexBuffer;
var scenceVertexNormalBuffer;
var scencetexTextureCoordBuffer;

function inScenceBuffers() {
       
        scenceVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, scenceVertexPositionBuffer);
        vertices = [
             // Front face
            -30.0, -30.0,  10.0,
             30.0, -30.0,  10.0,
             30.0,  30.0,  10.0,
            -30.0,  30.0,  10.0,
            // Back face
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
            // Top face
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
            // Bottom face
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
            // Right face
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
            // Left face
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,
             0.0, 0.0, 0.0,

        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        scenceVertexPositionBuffer.itemSize = 3;
        scenceVertexPositionBuffer.numItems = 4;

	scenceVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, scenceVertexNormalBuffer);
        var vertexNormals = [
            // Front face
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,
             0.0,  0.0,  1.0,

            // Back face
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,

            // Top face
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
            // Bottom face
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
            // Right face
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
            // Left face
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
             0.0,  0.0, 0.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
        scenceVertexNormalBuffer.itemSize = 3;
        cubeVertexNormalBuffer.numItems = 4;

        scenceVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, scenceVertexTextureCoordBuffer);
        var textureCoords = [
          // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          // other
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          // 
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          // 
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          // 
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          // 
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
          0.0, 0.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        scenceVertexTextureCoordBuffer.itemSize = 2;
        scenceVertexTextureCoordBuffer.numItems = 4;
        scenceVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, scenceVertexIndexBuffer);
        var scenceVertexIndices = [
            0, 1, 2,      0, 2, 3,    // Front face
            4, 5, 6,      4, 6, 7,    // Back face
            8, 9, 10,     8, 10, 11,  // Top face
            12, 13, 14,   12, 14, 15, // Bottom face
            16, 17, 18,   16, 18, 19, // Right face
            20, 21, 22,   20, 22, 23  // Left face
        ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(scenceVertexIndices), gl.STATIC_DRAW);
        scenceVertexIndexBuffer.itemSize = 1;
        scenceVertexIndexBuffer.numItems = 36;
    }
    
