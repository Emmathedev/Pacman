document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score')
    const width = 28 // 28 x 28 = 784 squares
    let score = 0
    const divVies = document.querySelector('.vies')
    const rejouerBtn = document.getElementById('rejouer')
    const totalVies = 6;
    let vies = totalVies;

    // Modèle de coeurs
    const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
    const coeurPlein = '<ion-icon name="heart"></ion-icon>';
    
    


    //layout de la grid et ce qu'il y a dans les squares
    const layout = [
    1,1,1,1,1,1,1,1,4,4,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,1,4,4,1,3,1,4,4,1,0,0,0,0,0,0,0,0,0,0,3,1,
    1,0,1,1,1,1,0,1,1,1,1,0,1,4,4,1,1,1,1,0,1,0,1,1,1,0,1,1,
    1,3,1,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,1,0,0,0,1,4,1,0,1,4,
    1,0,1,4,4,1,0,1,1,0,1,0,1,4,4,4,4,4,1,0,1,0,1,4,1,0,1,4,
    1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,
    1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,3,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,
    4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,4,4,4,4,4,
    4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
    4,0,0,0,0,0,0,1,4,1,0,2,2,2,2,2,2,0,1,4,1,0,0,0,0,0,0,4,
    1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
    4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,4,4,4,4,4,
    1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,3,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,1,
    1,0,1,1,1,1,0,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,1,1,0,1,1,0,1,0,1,4,4,4,
    1,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,4,1,0,0,0,0,1,0,1,4,4,4,
    4,4,1,0,1,4,4,4,1,0,1,4,4,4,4,4,4,1,0,1,1,1,1,0,1,1,1,1,
    1,1,1,0,1,1,1,1,1,0,1,1,1,4,4,1,1,1,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,1,1,1,0,1,1,0,1,
    1,3,1,1,1,1,1,1,1,1,1,0,1,4,4,1,0,1,0,1,4,4,1,0,1,3,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,4,4,1,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1]; 

    const squares = []
    // Legende : 
    // 0 : pac-dot (les friandises)
    // 1 : wall
    // 2 : ghost-lair
    // 3 : power-pellet
    // 4 : empty


// Créaction du plateau appelé ici board
    function createBoard() {
        for (let i=0; i < layout.length; i++){
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square) //ajoute un élément à la fin du tableau

            //Ici on ajoute les friandises
            if(layout[i] === 0) { //si l'élément dans le layout est égale à 0 c'est un pacdot donc:
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 1) { //ajout des murs
                squares[i].classList.add('wall')
            } else if (layout[i] === 2) { 
                squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {  //ajout des bonus
                squares[i].classList.add('power-pellet')
            } else if (layout[i] === 4){ //rien
                squares[i].classList.add('empty') 
            }
            console.log(createBoard)
            // ça va faire une boucle jusqu'à ce que tous les 784 squares soient lu
        }
    }
    createBoard()

// Point de départ de pacman 
let pacmanCurrentIndex = 462  //point de départ
squares[pacmanCurrentIndex].classList.add('pac-man')

// Faisons bouger pacman
function movePacman(e) {
    
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(e.keyCode) {
        case 37: //flèche de gauche
            //Pacman is in a square where the number is divisible by the width(28) 
            // & does not leave remainder(le reste) of 0
            // if this is true Move pac-man left to index 489
            if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall')) pacmanCurrentIndex -=1
                                     // '&&' les 2 conditions sont vrais            qui n'inclus pas le wall
                                                // ! pour prévenir 
             // If Pac-Man is on the left exit
          if (pacmanCurrentIndex - 1 === 363) {
            pacmanCurrentIndex = 391}
        break 
        case 38: //flèche du haut
            if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall')) pacmanCurrentIndex -= width
            break
        case 39: //flèche de droite
            if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall')) pacmanCurrentIndex += 1
             // If Pac-Man is on the right exit
          if(pacmanCurrentIndex + 1 === 392) {
            pacmanCurrentIndex = 364}
            break
        case 40: //flèche du bas
            if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall')) pacmanCurrentIndex +=width
            break
    }

    squares[pacmanCurrentIndex].classList.add('pac-man')


    pacDotEaten()
    powerPelletEaten()
    takeLife()
    checkForWin()
    actualiseCoeurs()
}

document.addEventListener('keyup', movePacman) // ajout de keyup(qui indique quel touche à été enfoncé) et de la fonction ligne74

//Lorsque Pacman mange une friandise
function pacDotEaten(){
if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
}
}

//Lorsque Pacman mange un fruit
function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score +=10
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
    
}


// Le template du fantome
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
    }
}

ghosts = [
    new Ghost('blinky', 348, 250), //250milisecondes
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]
console.log(ghosts)
// Draw the ghosts onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add("ghost");
  })

 //move the Ghosts randomly
 ghosts.forEach(ghost => moveGhost(ghost))

 //fonction pour faire bouger les fantomes
 function moveGhost(ghost){
 const directions = [-1, +1, width, -width] //width = 28 donc bouger de 28squares = +1 pou -1
 let direction = directions[Math.floor(Math.random() * directions.length)] 

 ghost.timerId = setInterval(function(){
 //si sur la prochaine square tu n'as pas de ghost ou de wall alors ok tu peux y aller
 if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
          //remove the ghosts classes. Sans ces 2 lignes ci-dessous les ghosts se multiplient
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost')
          //move into that space
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      //else find a new random direction ot go in
      } else direction = directions[Math.floor(Math.random() * directions.length)]
    takeLife()
}, ghost.speed)

 }
//check for lifes
function takeLife() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost')) {
    //  // ghosts.forEach(ghost => clearInterval(ghost.timerId))
    //  // document.removeEventListener('keyup', movePacman)
    // //   scoreDisplay.innerHTML = 'Game Over' //le placer ailleurs
    vies--;
    verifyLoose();
    }
    actualiseCoeurs(vies);
    console.log(takeLife)
  }

  const verifyLoose = () => {
    if (vies < 1){
      alert('Game Over');
      rejouerBtn.style.display ="block";
      console.log(verifyLoose);
    } else { 
        squares[pacmanCurrentIndex].classList.remove('pac-man')
        squares[pacmanCurrentIndex].classList.add('pac-man')
    }
   
}
   
  const actualiseCoeurs = (vies) => { 
      divVies.innerHTML = "";
      let tableauDeVies = [];
      for(let i=0; i < vies; i++){
          tableauDeVies.push(coeurPlein);
      }
      for(let i=0; i < totalVies - vies; i++){
        tableauDeVies.push(coeurVide);
    }
    tableauDeVies.forEach(coeur => {
        divVies.innerHTML += coeur;
    });
    console.log(actualiseCoeurs);
};
actualiseCoeurs(vies);
   
  


   //check for a win - more is when this score is reached
   function checkForWin() {
    if (score === 50) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("Bravooooo!"); }, 500)
      rejouerBtn.style.display = "block";
    }
    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
    })
  }
  
})