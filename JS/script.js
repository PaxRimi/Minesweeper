window.addEventListener("DOMContentLoaded", function () {
   class Minesweeper {
       constructor(boardWidth, boardHeight) {
           this.width = boardWidth;
           this.height = boardHeight;
           this.numberOfElements = this.width * this.height;
           this.quantityOfMines = boardWidth;
           this.board = document.getElementById('board');
           this.cells = [];
           this.placeOfMines = [];
           const self = this;
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
                   element.addEventListener('click', (e) => self.checkNumber(e))
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

           self.checkNumber = (el) => {
               let array = Array.from(this.cells);
               let x;
               let y;

               if (el.currentTarget.innerText === "0") {
                   let number = array.indexOf(el.currentTarget).toString();

                   if (number.length < 2) {
                       x = number;
                       y = 0;
                   } else {
                       y = number.charAt(0);
                       x = number.charAt(1);
                   }

                   console.log(x, y)
                   this.checkNeighbor(Number(x), Number(y))
               }
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
       }
   }








    const playGame = new Minesweeper(10,10);
    playGame.createBoard();
    playGame.addBombs();
    playGame.showNumbers();



});