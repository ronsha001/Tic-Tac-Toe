var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', clicked);

var turns = 0;

const ROWS = 3;
const COLUMNS = 3;
const ROW_HEIGHT = canvas.height / ROWS;
const COLUMN_WIDTH = canvas.width / COLUMNS;
const X_CURSOR_IMAGE = "url('C:/Users/User/Desktop/Full Stack Client/SelfProjects/images/X.png'),auto";
const X_WIN = "X Win !!"
const O_WIN = "O Win !!"
canvas.style.cursor = X_CURSOR_IMAGE ; // change Cursor to X

var xTurn = true;
var oTurn = false;
var win = false;

var matrix = [
    [0 , 0 , 0],
    [0 , 0 , 0],
    [0 , 0 , 0]
];
ctx.lineWidth = 3;
ctx.moveTo(0, ROW_HEIGHT);      // draw first row line
ctx.lineTo(canvas.width, ROW_HEIGHT);

ctx.moveTo(0, ROW_HEIGHT * 2);  // draw second row line
ctx.lineTo(canvas.width, ROW_HEIGHT * 2);

ctx.moveTo(COLUMN_WIDTH, 0);    // draw first column line
ctx.lineTo(COLUMN_WIDTH, canvas.height);

ctx.moveTo(COLUMN_WIDTH * 2, 0); // draw second column line
ctx.lineTo(COLUMN_WIDTH * 2, canvas.height);
ctx.stroke();


function clicked(){
    if (event.offsetX <= canvas.width && event.offsetY <= canvas.height){                  
        var column = event.offsetX / COLUMN_WIDTH; // X
        column = Math.ceil(column);
        var row = event.offsetY / ROW_HEIGHT; // Y
        row = Math.ceil(row);

        if (xTurn == true && oTurn == false && matrix[row-1][column-1] == 0){ // if X turn
            turns++;
            drawX(column, row);             // draw X function
            matrix[row-1][column-1]++;      // update matrix on X position
            xTurn = false;                  // make X turn false (because he made his move already)
            oTurn = true;                   // make O turn true (because its O's turn now)
            CHECK_X_ROWS();                 // check if X won in ROWS function
            CHECK_X_COLUMNS();              // check if X won in COLUMNS function
            CHECK_X_SLANTS();               // check if X won in SLANTS function
            if (win == false && turns < 9){
                react();
            }
        }
         else {
            alert("Error: This platform is already taken !");
        }
        if (turns == 9){
            removeListener();
        }
    }
}

function react(){
    turns++;

    var column = 0;
    var row = 0;
    
    while (matrix[row][column] != 0){
        column = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
    }

  //  alert("Row: "+row+"\nColumn: "+column);

  /*  var msg = "";
        for (var i = 0; i < matrix.length; i++){                  //    DEBUGG
            for (var j = 0; j < matrix[i].length; j++){
                msg += "["+matrix[i][j]+"] "
            }
            msg += "\n";
        }
    alert(msg); */

    drawO(column, row);

    matrix[row][column] += 2;
    xTurn = true;
    oTurn = false;

    CHECK_O_ROWS();                 // check if O won in ROWS function
    CHECK_O_COLUMNS();              // check if O won in COLUMNS function
    CHECK_O_SLANTS(); 
}

// -------      Draw X          -------
function drawX(column, row){
    var x = 0;
    var y = 0;

    for (var i = 1; i < column; i++){
        x += COLUMN_WIDTH;
    }
    for (var i = 1; i < row; i++){
        y += ROW_HEIGHT;
    }
    //alert("X: "+x+" , y: "+y);                                    DEBUGG
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.moveTo(x + 20 , y + 20); // draw " \ " start from top
    ctx.lineTo(x + COLUMN_WIDTH - 20, y + ROW_HEIGHT - 20); // end at bottom " \ "

    ctx.moveTo(x + 20 , y + ROW_HEIGHT - 20); // draw " / " start from bottom
    ctx.lineTo(x + COLUMN_WIDTH - 20, y + 20); // end at top " / "
    ctx.closePath();
    ctx.stroke();     
}
// -------      Draw O          -------
function drawO(column, row){
    var x = 0;
    var y = 0;

    for (var i = 0; i < column; i++){
        x += COLUMN_WIDTH;
    }
    for (var i = 0; i < row; i++){
        y += ROW_HEIGHT;
    }
    x += COLUMN_WIDTH / 2;
    y += ROW_HEIGHT / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 10;
    ctx.arc(x , y , COLUMN_WIDTH / 4 , 0 , 2*Math.PI); // draw " O "
    ctx.closePath();

    ctx.stroke();
}
// -------      X Checks        -------
function CHECK_X_ROWS(){
    if (matrix[0][0] == 1 && matrix[0][1] == 1 && matrix[0][2] == 1){
        ctx.moveTo(0 , ROW_HEIGHT / 2);
        ctx.lineTo(canvas.width, ROW_HEIGHT / 2);
        ctx.stroke(); // Draw wining line
        removeListener();
        win = true;
        alert(X_WIN);
        return;
    } else if (matrix[1][0] == 1 && matrix[1][1] == 1 && matrix[1][2] == 1){
        ctx.moveTo(0 , ROW_HEIGHT + ROW_HEIGHT / 2);
        ctx.lineTo(canvas.width , ROW_HEIGHT + ROW_HEIGHT / 2);
        ctx.stroke(); // Draw wining line
        removeListener();
        win = true;
        alert(X_WIN);
        return;
    } else if (matrix[2][0] == 1 && matrix[2][1] == 1 && matrix[2][2] == 1){
        ctx.moveTo(0 , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
        ctx.lineTo(canvas.width , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
        ctx.stroke(); // Draw wining line
        removeListener();
        win = true;
        alert(X_WIN);
        return;
    }
}
function CHECK_X_COLUMNS(){
    if (matrix[0][0] == 1 && matrix[1][0] == 1 && matrix[2][0] == 1){
        ctx.moveTo(COLUMN_WIDTH / 2 , 0);
        ctx.lineTo(COLUMN_WIDTH / 2 , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(X_WIN);
        return;
    } else if (matrix[0][1] == 1 && matrix[1][1] == 1 && matrix[2][1] == 1){
        ctx.moveTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , 0);
        ctx.lineTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(X_WIN);
        return;
    } else if (matrix[0][2] == 1 && matrix[1][2] == 1 && matrix[2][2] == 1){
        ctx.moveTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , 0);
        ctx.lineTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(X_WIN);
        return;
    }
}
function CHECK_X_SLANTS(){
    if (matrix[0][0] == 1 && matrix[1][1] == 1 && matrix[2][2] == 1){
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width , canvas.height);
        ctx.stroke();
        alert(X_WIN);
        win = true;
        removeListener();
        return;
    } else if (matrix[2][0] == 1 && matrix[1][1] == 1 && matrix[0][2] == 1){
        ctx.moveTo(0 , canvas.height);
        ctx.lineTo(canvas.width , 0);
        ctx.stroke();
        alert(X_WIN);
        win = true;
        removeListener();
        return;
    }
}

// -------      O Checks        -------
function CHECK_O_ROWS(){
    if (matrix[0][0] == 2 && matrix[0][1] == 2 && matrix[0][2] == 2){
        ctx.moveTo(0 , ROW_HEIGHT / 2);
        ctx.lineTo(canvas.width, ROW_HEIGHT / 2);
        ctx.stroke(); // Draw wining line
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    } else if (matrix[1][0] == 2 && matrix[1][1] == 2 && matrix[1][2] == 2){
        ctx.moveTo(0 , ROW_HEIGHT + ROW_HEIGHT / 2);
        ctx.lineTo(canvas.width , ROW_HEIGHT + ROW_HEIGHT / 2);
        ctx.stroke(); // Draw wining line
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    } else if (matrix[2][0] == 2 && matrix[2][1] == 2 && matrix[2][2] == 2){
        ctx.moveTo(0 , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
        ctx.lineTo(canvas.width , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
        ctx.stroke(); // Draw wining line
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    }
}
function CHECK_O_COLUMNS(){
    if (matrix[0][0] == 2 && matrix[1][0] == 2 && matrix[2][0] == 2){
        ctx.moveTo(COLUMN_WIDTH / 2 , 0);
        ctx.lineTo(COLUMN_WIDTH / 2 , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    } else if (matrix[0][1] == 2 && matrix[1][1] == 2 && matrix[2][1] == 2){
        ctx.moveTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , 0);
        ctx.lineTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    } else if (matrix[0][2] == 2 && matrix[1][2] == 2 && matrix[2][2] == 2){
        ctx.moveTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , 0);
        ctx.lineTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    }
}
function CHECK_O_SLANTS(){
    if (matrix[0][0] == 2 && matrix[1][1] == 2 && matrix[2][2] == 2){
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width , canvas.height);
        ctx.stroke();
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    } else if (matrix[2][0] == 2 && matrix[1][1] == 2 && matrix[0][2] == 2){
        ctx.moveTo(0 , canvas.height);
        ctx.lineTo(canvas.width , 0);
        ctx.stroke();
        removeListener();
        win = true;
        alert(O_WIN);
        return;
    }
}

function BackToMenu(){
    matrix[0][0] -= 10;
    window.location.href='C:/Users/User/Desktop/Full Stack Client/SelfProjects/Tic Tac Toe/TTTMenu.html';
}
function removeListener(){
    document.removeEventListener('mousedown' , clicked);
}
