var canvas = document.getElementById('mycanvas');
            var ctx = canvas.getContext('2d');

            canvas.addEventListener('mousedown', clicked);

            var turns = 0;
            const ROWS = 3;
            const COLUMNS = 3;
            const ROW_HEIGHT = canvas.height / ROWS;
            const COLUMN_WIDTH = canvas.width / COLUMNS;
            const X_CURSOR_IMAGE = "url('C:/Users/User/Desktop/Full Stack Client/SelfProjects/images/X.png'),auto";

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

            react();

            function clicked(){
                if (event.offsetX <= canvas.width && event.offsetY <= canvas.height){                  
                    var column = event.offsetX / COLUMN_WIDTH; // X
                    column = Math.ceil(column);
                    var row = event.offsetY / ROW_HEIGHT; // Y
                    row = Math.ceil(row);
      
                    if (xTurn == true && oTurn == false && matrix[row-1][column-1] == 0){ // if X turn
                        turns++;
                        drawX(row, column);             // draw X function
                        matrix[row-1][column-1]++;      // update matrix on X position 
                        xTurn = false;                  // make X turn false (because he made his move already)
                        oTurn = true;                   // make O turn true (because its O's turn now)
                        CHECK_X_ROWS();                 // check if X won in ROWS function
                        CHECK_X_COLUMNS();              // check if X won in COLUMNS function
                        CHECK_X_SLANTS();               // check if X won in SLANTS function
                        if (win == false && turns < 10){
                           react(); // Play PC turn
                        }
                    } else {
                        alert("Error: This platform is already taken !");
                    }
                    if (turns == 9){ // board is maxed
                        removeListener(); // remove 'mousedown' eventListener
                    }
                }
            }
            var defended = false;
            var attacked = false;
            var reactedSmart = false;

            function react(){ // Play PC turn function
                turns++;
                defended = false;
                attacked = false;
                reactedSmart = false;

                ATTACK_ROWS(); // Start with Attacking possibilities (1st priority)
                if (attacked == false){
                    ATTACK_COLUMNS();
                }
                if (attacked == false){
                    ATTACK_SLANTS();
                }
                if (attacked == false){ // if PC didnt attack, check for defensive possibilities (2nd priority)
                    DEFEND_ROWS();
                }
                if (attacked == false && defended == false){
                    DEFEND_COLUMNS();
                }
                if (attacked == false && defended == false){
                    DEFEND_SLANTS();
                }
                if (attacked == false && defended == false){ // if PC didnt attack and didnt defend, check for smart move possibilities (3rd)
                    REACT_SMART();
                }
                if (attacked == false && defended == false && reactedSmart == false){ // if PC didnt made any moves, just dice a move
                    dice();
                }
                
                
                xTurn = true;
                oTurn = false;
                CHECK_O_ROWS();                 // check if O won in ROWS function
                CHECK_O_COLUMNS();              // check if O won in COLUMNS function
                CHECK_O_SLANTS(); 

                if (turns == 9 && win == false){
                    alert("Draw !");
                }
            }



            function DEFEND_ROWS(){
                var countX = 0;
                var countO = 0;
                var emptyPosition = 0;
                for (var i = 0; i < ROWS; i++){
                    countX = 0;
                    countO = 0;
                    emptyPosition = 0;
                    for (var j = 0; j < ROWS; j++){
                        if (matrix[i][j] == 2){
                            countO++;
                            break;
                        } else if (matrix[i][j] == 1){
                            countX++;
                        } else {
                            emptyPosition = j;
                        }
                    }
                    if (countX == 2 && countO == 0){
                       // alert("defend rows");
                        drawO(i , emptyPosition);
                        matrix[i][emptyPosition] += 2;
                        defended = true;
                        return;
                    }
                }
            }
            function DEFEND_COLUMNS(){
                var countX = 0;
                var countO = 0;
                var emptyPosition = 0;
                for (var i = 0; i < COLUMNS; i++){
                    countX = 0;
                    countO = 0;
                    emptyPosition = 0;
                    for (var j = 0; j < ROWS; j++){
                        if (matrix[j][i] == 2){
                            countO++;
                            break;
                        } else if (matrix[j][i] == 1){
                            countX++;
                        } else {
                            emptyPosition = j;
                        }
                    }
                    
                    if (countX == 2 && countO == 0){
                        //alert("defend columns");
                        drawO(emptyPosition , i);
                        matrix[emptyPosition][i] += 2;
                        defended = true;
                        return;
                    }
                }
            }
            function DEFEND_SLANTS(){
                var countX = 0;
                var countO = 0;
                var emptyX = 0;
                var emptyY = 0;
                for (var i = 0; i < ROWS; i++ ){ // defend slant \
                    if (matrix[i][i] == 2){
                        countO++;
                        break;
                    } else if (matrix[i][i] == 1){
                        countX++;
                    } else {
                        emptyX = i;
                        emptyY = i;
                    }
                }
                if (countX == 2 && countO == 0){
                   // alert("defend slant \\");
                    drawO(emptyX , emptyY);
                    matrix[emptyX][emptyY] += 2;
                    defended = true;
                    return;
                }
                countX = 0;
                countO = 0;
                emptyX = 0;
                emptyY = 0;
                for (var i = 2, j = 0; j < ROWS; i-- , j++){ // defend slant /
                    if (matrix[i][j] == 2){
                        countO++;
                        break;
                    } else if (matrix[i][j] == 1){
                        countX++;
                    } else {
                        emptyX = i;
                        emptyY = j;
                    }
                }
                if (countX == 2 && countO == 0){
                 //   alert("defend slant /");
                    drawO(emptyX , emptyY);
                    matrix[emptyX][emptyY] += 2;
                    defended = true;
                    return;
                }
            }

            function ATTACK_ROWS(){
               var countX = 0;
               var countO = 0;
               var emptyPosition = 0;
               for (var i = 0; i < ROWS; i++){
                   countX = 0;
                   countO = 0;
                   emptyPosition = 0;
                   for (var j = 0; j < COLUMNS; j++){
                       if (matrix[i][j] == 2){
                           countO++;
                       } else if (matrix[i][j] == 1){
                           countX++;
                       }
                       if (countO == 2 && countX == 0 && j == 2){
                           if (matrix[i][0] == 0){
                               emptyPosition = 0;
                           } else if (matrix[i][1] == 0){
                               emptyPosition = 1;
                           } else if (matrix[i][2] == 0){
                               emptyPosition = 2;
                           }
                          // alert("Attack rows: "+i+" , "+emptyPosition);
                           drawO(i , emptyPosition);
                           matrix[i][emptyPosition] += 2;
                           attacked = true;
                           var msg = "";
                /*   for (var i = 0; i < matrix.length; i++){                  //    DEBUGG
                        for (var j = 0; j < matrix[i].length; j++){
                            msg += "["+matrix[i][j]+"] "
                        }
                        msg += "\n";
                    }
                alert(msg); */
                           return;
                       }
                   }
               }
            }
            function ATTACK_COLUMNS(){
                var countX = 0;
                var countO = 0;
                var emptyPosition = 0;
                for (var i = 0; i < ROWS; i++){
                    countX = 0;
                    countO = 0;
                    emptyPosition = 0;
                    for (var j = 0; j < ROWS; j++){
                        if (matrix[j][i] == 2){
                            countO++;
                        } else if (matrix[j][i] == 1){
                            countX++;
                            break;
                        } else {
                            emptyPosition = j;
                        }
                    }
                    if (countO == 2 && countX == 0){
                      //  alert("Attack column: "+emptyPosition+" , "+i);
                        drawO(emptyPosition , i);
                        matrix[emptyPosition][i] += 2;
                        attacked = true;
                        return;
                    }
                }
            }
            function ATTACK_SLANTS(){
                var countO = 0;
                var countX = 0;
                var emptyX = 0;
                var emptyY = 0;
                for (var i = 0; i < ROWS; i++){
                    if (matrix[i][i] == 2){
                        countO++;
                    } else if(matrix[i][i] == 1){
                        countX++;
                    } else if(matrix[i][i] == 0){
                        emptyY = i;
                        emptyX = i;
                    }
                }
                if (countO == 2 && countX == 0){
                  //  alert("Attack slant \\ : "+emptyX+" , "+emptyY);
                    drawO(emptyX , emptyY);
                    matrix[emptyX][emptyY] += 2;
                    attacked = true;
                    return;
                }
                countO = 0;
                countX = 0;
                emptyX = 0;
                emptyY = 0;

                for (var i = 2, j = 0; j < ROWS;  i--, j++){
                    if (matrix[i][j] == 2){
                        countO++;
                    } else if(matrix[i][j] == 1){
                        countX++;
                    } else if(matrix[i][j] == 0){
                        emptyY = j;
                        emptyX = i;
                    }   
                }
                if (countO == 2 && countX == 0){
                //    alert("Attack slant / : "+emptyX+" , "+emptyY);
                    drawO(emptyX , emptyY);
                    matrix[emptyX][emptyY] += 2;
                    attacked = true;
                    return;
                }
            }

            function REACT_SMART(){
                var xLocationX = 0;
                var xLocationY = 0;
                if (turns == 3 && matrix[1][1] == 0){
                    for (var i = 0; i < ROWS; i++){
                        for (var j = 0; j < COLUMNS; j++){
                            if (matrix[i][j] == 1){
                                xLocationX = i;
                                xLocationY = j;
                                break;
                            }
                        }
                        if (xLocationX != 0 || xLocationY != 0){
                            if (xLocationX == 0 && xLocationY == 1 || xLocationY == 2){
                              //  alert("reacted smart: (2 , 0) ");
                                drawO(2 , 0);
                                matrix[2][0] += 2;
                                reactedSmart = true;
                                return;    
                            }
                            if (xLocationX == 1 && xLocationY == 0 || xLocationX == 2){
                               // alert("reacted smart: (0 , 2) ");
                                drawO(0 , 2);
                                matrix[0][2] += 2;
                                reactedSmart = true;
                                return;    
                            }
                        }
                    }
                }
                if (turns == 5){
                    if (matrix[0][0] == 2 && matrix[2][0] == 2){
                        if (matrix[0][1] == 1 && matrix[1][0] == 1){
                          //  alert("reacted smart: (1 , 1) ");
                            drawO(1 , 1);
                            matrix[1][1] += 2;
                            reactedSmart = true;
                            return;
                        }
                        if (matrix[0][2] == 0){
                         //   alert("reacted smart: (0 , 2) ");
                            drawO(0 , 2);
                            matrix[0][2] += 2;
                            reactedSmart = true;
                            return; 
                        } else if (matrix[2][2] == 0){
                           // alert("reacted smart: (2 , 2) ");
                            drawO(2 , 2);
                            matrix[2][2] += 2;
                            reactedSmart = true;
                            return; 
                        }
                    } else if (matrix[0][0] == 2 && matrix[0][2] == 2){
                        if (matrix[2][2] == 0){
                           // alert("reacted smart: (2 , 2) ");
                            drawO(2 , 2);
                            matrix[2][2] += 2;
                            reactedSmart = true;
                            return; 
                        }
                    }
                }
                
            }
        
            function dice(){
                var column = 0;
                var row = 0;
               // alert("dice");
                while (matrix[row][column] != 0){
                    column = Math.floor(Math.random() * 3);
                    row = Math.floor(Math.random() * 3);
                }
                drawO(row, column);
                matrix[row][column] += 2;
            }
            // -------      Draw X          -------
            function drawX(row, column){
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
            function drawO(row, column){
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
                   // alert("X Won !!");
                    return;
                } else if (matrix[1][0] == 1 && matrix[1][1] == 1 && matrix[1][2] == 1){
                    ctx.moveTo(0 , ROW_HEIGHT + ROW_HEIGHT / 2);
                    ctx.lineTo(canvas.width , ROW_HEIGHT + ROW_HEIGHT / 2);
                    ctx.stroke(); // Draw wining line
                    removeListener();
                    win = true;
                  //  alert("X Won !!");
                    return;
                } else if (matrix[2][0] == 1 && matrix[2][1] == 1 && matrix[2][2] == 1){
                    ctx.moveTo(0 , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
                    ctx.lineTo(canvas.width , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
                    ctx.stroke(); // Draw wining line
                    removeListener();
                    win = true;
                 //   alert("X Won !!");
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
                 //   alert("X Won !!");
                    return;
                } else if (matrix[0][1] == 1 && matrix[1][1] == 1 && matrix[2][1] == 1){
                    ctx.moveTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , 0);
                    ctx.lineTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , canvas.height);
                    ctx.stroke();
                    removeListener();
                    win = true;
                 //   alert("X Won !!");
                    return;
                } else if (matrix[0][2] == 1 && matrix[1][2] == 1 && matrix[2][2] == 1){
                    ctx.moveTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , 0);
                    ctx.lineTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , canvas.height);
                    ctx.stroke();
                    removeListener();
                    win = true;
                  //  alert("X Won !!");
                    return;
                }
            }
            function CHECK_X_SLANTS(){
                if (matrix[0][0] == 1 && matrix[1][1] == 1 && matrix[2][2] == 1){
                    ctx.moveTo(0, 0);
                    ctx.lineTo(canvas.width , canvas.height);
                    ctx.stroke();
                 //   alert("X wons !!");
                    win = true;
                    removeListener();
                    return;
                } else if (matrix[2][0] == 1 && matrix[1][1] == 1 && matrix[0][2] == 1){
                    ctx.moveTo(0 , canvas.height);
                    ctx.lineTo(canvas.width , 0);
                    ctx.stroke();
                  //  alert("X wons !!");
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
                 //   alert("O Won !!");
                    return;
                } else if (matrix[1][0] == 2 && matrix[1][1] == 2 && matrix[1][2] == 2){
                    ctx.moveTo(0 , ROW_HEIGHT + ROW_HEIGHT / 2);
                    ctx.lineTo(canvas.width , ROW_HEIGHT + ROW_HEIGHT / 2);
                    ctx.stroke(); // Draw wining line
                    removeListener();
                    win = true;
                 //   alert("O Won !!");
                    return;
                } else if (matrix[2][0] == 2 && matrix[2][1] == 2 && matrix[2][2] == 2){
                    ctx.moveTo(0 , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
                    ctx.lineTo(canvas.width , ROW_HEIGHT * 2 + ROW_HEIGHT / 2);
                    ctx.stroke(); // Draw wining line
                    removeListener();
                    win = true;
                  //  alert("O Won !!");
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
                //    alert("O Won !!");
                    return;
                } else if (matrix[0][1] == 2 && matrix[1][1] == 2 && matrix[2][1] == 2){
                    ctx.moveTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , 0);
                    ctx.lineTo(COLUMN_WIDTH + COLUMN_WIDTH / 2 , canvas.height);
                    ctx.stroke();
                    removeListener();
                    win = true;
                 //   alert("O Won !!");
                    return;
                } else if (matrix[0][2] == 2 && matrix[1][2] == 2 && matrix[2][2] == 2){
                    ctx.moveTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , 0);
                    ctx.lineTo(COLUMN_WIDTH * 2 + COLUMN_WIDTH / 2 , canvas.height);
                    ctx.stroke();
                    removeListener();
                    win = true;
                 //   alert("O Won !!");
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
                  //  alert("O wons !!");
                    return;
                } else if (matrix[2][0] == 2 && matrix[1][1] == 2 && matrix[0][2] == 2){
                    ctx.moveTo(0 , canvas.height);
                    ctx.lineTo(canvas.width , 0);
                    ctx.stroke();
                    removeListener();
                    win = true;
                //    alert("O wons !!");
                    return;
                }
            }

            function BackToMenu(){
                window.location.href='C:/Users/User/Desktop/Full Stack Client/SelfProjects/Tic Tac Toe/TTTMenu.html';
            }
            function removeListener(){
                canvas.removeEventListener('mousedown' , clicked);
            }