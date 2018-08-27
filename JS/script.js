window.addEventListener("DOMContentLoaded", function () {

    const resetGame = document.getElementById('restartGame');
    var boardParent = document.querySelector('.boardFlex');
    console.log(resetGame);

   class Minesweeper {
       constructor(boardWidth, boardHeight) {
           this.width = boardWidth;
           this.height = boardHeight;
           const self = this;
           this.numberOfElements = this.width * this.height;
           this.quantityOfMines = boardWidth + 5;
           this.board = document.getElementById('board');
           this.counterOfBombs = document.getElementById("bombCounter");
           self.emoticonFace = document.querySelector('#restartGame img');
           this.gameTimer = document.getElementById("timeCounter");
           this.cells = [];
           this.placeOfMines = [];
           this.createBoard = () => {
               this.board.style.width = `${this.width * 25}px`;
               this.board.style.height = `${this.height * 25}px`;
               for (let i = 0; i < this.numberOfElements; i++) {
                   const div = document.createElement('div');
                   div.classList.add("hide");
                   this.board.appendChild(div);
               }
               this.cells = this.board.querySelectorAll('div');
               this.cells.forEach(function (element) {
                   element.addEventListener('click', function (e) {
                       this.classList.remove('hide');
                   });
                   element.addEventListener('click', (e) => self.checkNumber(e));
                   element.addEventListener('contextmenu', function(e) {
                       e.preventDefault();
                       self.addFlag(e);
                       return false;
                   }, false);
                   element.addEventListener('mousedown',(e) => {
                       self.emoticonFace.setAttribute("src","img/icons8-surprised-emoticon-50.png");
                   });
                   element.addEventListener('mouseup',(e) => {
                       self.emoticonFace.setAttribute("src","img/icons8-happy-50.png");
                   });
               });
           };
           this.index = (x, y) => {
               return x + (y * this.height);
           };
           this.addBombs = () => {
               for (let i = 0; i < this.quantityOfMines; i++) {
                   let number;

                   do {
                       number = ~~(Math.random() * this.numberOfElements);
                   } while (this.placeOfMines.indexOf(number) !== -1);

                   this.cells[number].classList.add('bomb');
                   this.placeOfMines.push(number);
               }
           };
           this.showNumbers = () => {
               for (let i = 0; i < this.height; i++) {
                   for (let j = 0; j < this.width; j++) {
                       const cell = this.cells[this.index(j, i)];
                       let bombNeighbor = 0;

                       if (cell.className.indexOf("bomb") === -1) {

                           if (i !== 0) {
                               if (j !== 0) {
                                   if (this.cells[this.index(j - 1, i - 1)].className.indexOf("bomb") > -1) {
                                       bombNeighbor++;
                                   }
                               }
                           }

                           if (i !== 0) {
                               if (this.cells[this.index(j, i - 1)].className.indexOf("bomb") > -1) {
                                   bombNeighbor++;
                               }
                           }

                           if (i !== 0) {
                               if (j !== this.width - 1) {
                                   if (this.cells[this.index(j + 1, i - 1)].className.indexOf("bomb") > -1) {
                                       bombNeighbor++;
                                   }
                               }
                           }

                           if (j !== 0) {
                               if (this.cells[this.index(j - 1, i)].className.indexOf("bomb") > -1) {
                                   bombNeighbor++;
                               }
                           }

                           if (j !== this.width - 1) {
                               if (this.cells[this.index(j + 1, i)].className.indexOf("bomb") > -1) {
                                   bombNeighbor++;
                               }
                           }

                           if (i !== this.height - 1) {
                               if (j !== 0) {
                                   if (this.cells[this.index(j - 1, i + 1)].className.indexOf("bomb") > -1) {
                                       bombNeighbor++;
                                   }
                               }
                           }

                           if (i !== this.height - 1) {
                               if (this.cells[this.index(j, i + 1)].className.indexOf("bomb") > -1) {
                                   bombNeighbor++;
                               }
                           }

                           if (i !== this.height - 1) {
                               if (j !== this.width - 1) {
                                   if (this.cells[this.index(j + 1, i + 1)].className.indexOf("bomb") > -1) {
                                       bombNeighbor++;
                                   }
                               }
                           }

                           cell.innerText = bombNeighbor;
                       }
                   }
               }
           };

           this.startCountingTime = () => {
             self.setinterval = setInterval(() => {
                 this.gameTimer.innerText--;

                 if (this.gameTimer.innerText === "0"){
                     this.stopCountingTime();
                     this.gameOver();
                 }
             }, 1000);

           };

           this.stopCountingTime = () => {
             clearInterval(self.setinterval);
           };

           self.checkNumber = (el) => {
               let array = Array.from(this.cells);
               let x;
               let y;
               console.log(el.currentTarget);

               if (el.currentTarget.innerText === "0") {
                   let number = array.indexOf(el.currentTarget).toString();

                   if (number.length < 2) {
                       x = number;
                       y = 0;
                   } else {
                       y = number.charAt(0);
                       x = number.charAt(1);
                   }

                   console.log(x, y);
                   this.checkNeighbor(Number(x), Number(y))
               } else if (el.currentTarget.classList.contains("bomb")) {
                   this.gameOver();
               }
               this.winGame();
           };

           this.checkNeighbor = (x, y) => {

               let element;
               let numA;
               let numB;

               console.log("Działa");
               if (y !== 0) {
                   if (x !== 0) {
                       if (this.cells[this.index(x - 1, y - 1)].className.indexOf("hide") > -1 && this.cells[this.index(x - 1, y - 1)].className.indexOf("bomb") === -1) {
                           element = this.cells[this.index(x - 1, y - 1)];

                           element.classList.remove("hide");
                           if (element.innerText === "0") {
                               numA = x - 1;
                               numB = y - 1;
                               this.checkNeighbor(numA, numB)
                           }
                       }
                   }
               }

               if (y !== 0) {
                   if (this.cells[this.index(x, y-1)].className.indexOf("hide") > -1 && this.cells[this.index(x, y - 1)].className.indexOf("bomb") === -1) {
                       element = this.cells[this.index(x, y - 1)];

                       element.classList.remove("hide");
                       if (element.innerText === "0") {
                           numA = x;
                           numB = y - 1;
                           this.checkNeighbor(numA, numB)
                       }
                   }
               }

               if (y !== 0) {
                   if (x !== this.width - 1) {
                       if (this.cells[this.index(x + 1, y - 1)].className.indexOf("hide") > -1 && this.cells[this.index(x + 1, y - 1)].className.indexOf("bomb") === -1) {
                           element = this.cells[this.index(x + 1, y - 1)];

                           element.classList.remove("hide");
                           if (element.innerText === "0") {
                               numA = x + 1;
                               numB = y - 1;
                               this.checkNeighbor(numA, numB)
                           }
                       }
                   }
               }

               if (x !== 0) {
                   if (this.cells[this.index(x - 1, y)].className.indexOf("hide") > -1 && this.cells[this.index(x - 1, y)].className.indexOf("bomb") === -1) {
                       element = this.cells[this.index(x - 1, y)];

                       element.classList.remove("hide");
                       if (element.innerText === "0") {
                           numA = x - 1;
                           numB = y;
                           this.checkNeighbor(numA, numB)
                       }
                   }
               }

               if (x !== this.width - 1) {
                   if (this.cells[this.index(x + 1, y)].className.indexOf("hide") > -1 && this.cells[this.index(x + 1, y)].className.indexOf("bomb") === -1) {
                       element = this.cells[this.index(x + 1, y)];

                       element.classList.remove("hide");
                       if (element.innerText === "0") {
                           numA = x + 1;
                           numB = y;
                           this.checkNeighbor(numA, numB)
                       }
                   }
               }

               if (y !== this.height - 1) {
                   if (x !== 0) {
                       if (this.cells[this.index(x - 1, y + 1)].className.indexOf("hide") > -1 && this.cells[this.index(x - 1, y + 1)].className.indexOf("bomb") === -1) {
                           element = this.cells[this.index(x - 1, y + 1)];

                           element.classList.remove("hide");
                           if (element.innerText === "0") {
                               numA = x - 1;
                               numB = y + 1;
                               this.checkNeighbor(numA, numB)
                           }
                       }
                   }
               }

               if (y !== this.height - 1) {
                   if (this.cells[this.index(x, y + 1)].className.indexOf("hide") > -1 && this.cells[this.index(x, y + 1)].className.indexOf("bomb") === -1) {
                       element = this.cells[this.index(x, y + 1)];

                       element.classList.remove("hide");
                       if (element.innerText === "0") {
                           numA = x;
                           numB = y + 1;
                           this.checkNeighbor(numA, numB)
                       }
                   }
               }

               if (y !== this.height - 1) {
                   if (x !== this.width - 1) {
                       if (this.cells[this.index(x + 1, y + 1)].className.indexOf("hide") > -1 && this.cells[this.index(x + 1, y + 1)].className.indexOf("bomb") === -1) {
                           element = this.cells[this.index(x + 1, y + 1)];

                           element.classList.remove("hide");
                           if (element.innerText === "0") {
                               numA = x + 1;
                               numB = y + 1;
                               this.checkNeighbor(numA, numB)
                           }
                       }
                   }
               }
           };
           self.addFlag = (e) => {
                let element = e.currentTarget;

                if(element.classList.contains("hide")) {
                    if (element.children.length > 0) {
                        let child = element.querySelector("span");
                        child.remove();
                        this.counterOfBombs.innerText++;
                    } else {
                        let flag = document.createElement("span");
                        flag.classList.add("flag");
                        element.appendChild(flag);
                        this.counterOfBombs.innerText--;
                    }
                }
           };

           this.setbombCounter = () => {
               this.counterOfBombs.innerText = this.quantityOfMines;
           };

           this.gameOver = () => {
               for (let i = 0; i < this.numberOfElements; i++) {
                   this.cells[i].classList.remove("hide");

                   if(this.cells[i].classList.contains("bomb")){
                       this.cells[i].classList.add("bombImg");
                   }
               }
               self.emoticonFace.setAttribute("src","img/icons8-disappointed-emoticon-50.png")
               clearInterval(self.setinterval);
           };

           this.winGame = () => {
                let hideLeft = 0;

                for(let i = 0; i < this.numberOfElements; i++) {
                    if(this.cells[i].classList.contains("hide")){
                        hideLeft++;
                    }
                }

                console.log(hideLeft);
                if (hideLeft === this.quantityOfMines){
                    for(let i = 0; i < this.numberOfElements; i++) {
                        if(this.cells[i].classList.contains("hide")){
                            let flag = document.createElement("span");
                            flag.classList.add("flag");
                            this.cells[i].appendChild(flag);
                        }
                    }

                    self.emoticonFace.setAttribute("src","img/icons8-cartoon-face-50.png");
                    this.counterOfBombs.innerText = "0";
                    clearInterval(self.setinterval);

                }
           }
       }
   }

   // let playGame;

    function clearBoard() {
        boardParent.removeChild(boardParent.lastElementChild);
        let board = document.createElement("section");
        board.setAttribute('id','board');
        boardParent.appendChild(board);
    }

    playGame = new Minesweeper(10,10);
    playGame.createBoard();
    playGame.addBombs();
    playGame.showNumbers();
    playGame.setbombCounter();
    playGame.startCountingTime();

    resetGame.addEventListener('click', () => {
        delete window.playGame;
        clearBoard();
        playGame = new Minesweeper(10,10);
        playGame.createBoard();
        playGame.addBombs();
        playGame.showNumbers();
        playGame.setbombCounter();
        playGame.gameTimer.innerText = "70";
        playGame.startCountingTime();
        playGame.emoticonFace.setAttribute("src","img/icons8-happy-50.png");
    })

});