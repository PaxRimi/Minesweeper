window.addEventListener("DOMContentLoaded", function () {
   class Minesweeper {
       constructor(boardWidth, boardHeight){
           this.width = boardWidth;
           this.height = boardHeight;
           this.numberOfElements = this.width * this.height;
           this.quantityOfMines = boardWidth;
           this.board = document.getElementById('board');
           this.cells = [];
           this.placeOfMines = [];
           this.createBoard =() => {
               this.board.style.width = `${this.width * 25}px`;
               this.board.style.height = `${this.height * 25}px`;
               for (let i=0; i<this.numberOfElements; i++) {
                   const div = document.createElement('div');
                   div.classList.add("hide");
                   this.board.appendChild(div);
               }
               this.cells = this.board.querySelectorAll('div');
               this.cells.forEach(function (element) {
                   element.addEventListener('click', function (e) {
                       this.classList.remove('hide');
                   })
               });
           };
           this.addBombs = () => {
               for (let i=0; i<this.quantityOfMines; i++) {
                   let number;

                   do {
                       number = ~~(Math.random() * this.numberOfElements);
                       console.log(number);
                   } while (this.placeOfMines.indexOf(number) !== -1);

                    this.cells[number].classList.add('bomb');
                    this.placeOfMines.push(number);
                    console.log(this.placeOfMines);
               }
           }



       }
    }

    const playGame = new Minesweeper(10,10);
    playGame.createBoard();
    playGame.addBombs();



});