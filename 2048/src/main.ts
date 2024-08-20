import './style.css'
import {createBoard, returnBoardBlock, difficultyBlockRelation, boardSpecifications} from './components/createBoard.ts'; 
import { moveLogic, LEFT, RIGHT, UP, DOWN } from './components/blockMovementLogic.ts';

const boardState = [[0,0,2,0], [0,0,2,0], [0,0,0,0], [0,0,0,0]]; 

// create main loop for this stuff
let gameOn = false;

const blockWidth = (500 - 10 * (difficultyBlockRelation.HARD + 1)) / difficultyBlockRelation.HARD;

let board = createBoard({boardWidth: 500, difficulty: difficultyBlockRelation.HARD}, boardState); 
const mainBoardDiv = document.querySelector<HTMLDivElement>('#mainB');

let pressableKey = true; 

const handleKeyPress = (e : KeyboardEvent)  => {

  let movementDone = false; 

  if(pressableKey)
    switch(e.key){  
      case 'ArrowUp': 
        movementDone = moveLogic(board, boardState, 0, 0, DOWN, RIGHT, blockWidth, 10); 
        pressableKey = false; 
        break; 
      case 'ArrowDown': 
        movementDone = moveLogic(board, boardState, difficultyBlockRelation.HARD - 1, difficultyBlockRelation.HARD - 1, UP, LEFT, blockWidth, 10); 
        pressableKey = false;
        break;
      case 'ArrowLeft': 
        movementDone = moveLogic(board, boardState, 0,0, RIGHT, DOWN, blockWidth, 10); 
        pressableKey = false;
        break; 
      case 'ArrowRight':
        movementDone = moveLogic(board, boardState, 0,difficultyBlockRelation.HARD - 1, LEFT, DOWN, blockWidth, 10);
        pressableKey = false;
        break;  
    }

  setTimeout(() => {
    // could also move this check to outer so the timeOut function does not even have to initialize 
    if(!pressableKey){
      // save some when you littearly made no movement altogether 
      if(movementDone){
        do{
          
          let randX = Math.floor(Math.random() * boardState.length); 
          let randY = Math.floor(Math.random() * boardState.length); 

          console.log(randX, randY); 

          if(!boardState[randY][randX]){
            boardState[randY][randX] = 2; 
              break; 
          }

        }while(true); 

        mainBoardDiv?.replaceChildren(); 
        board = createBoard({boardWidth: 500, difficulty: difficultyBlockRelation.HARD}, boardState); 
        mainBoardDiv?.appendChild(board);
      }
      pressableKey = true;
    }
  }, 150); 

} 

document.addEventListener('keydown', handleKeyPress); 

mainBoardDiv?.appendChild(board); 