window.addEventListener("DOMContentLoaded", function () {
   class Minesweeper {
       constructor(boardWidth, boardHeight){
           this.width = boardWidth;
           this.height = boardHeight;
           this.board = document.getElementById('board');
           this.cells = [];
           this.createBoard =() => {
               this.board.style.width = `${this.width * 25}px`;
               this.board.style.height = `${this.height * 25}px`;
               const numberOfElements = this.width * this.height;
               for (let i=0; i<numberOfElements; i++) {
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
       }
    }

    const playGame = new Minesweeper(10,10);
    playGame.createBoard();




});