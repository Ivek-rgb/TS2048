import { HslValue, createHslValue, hslColorVal } from "../utils";

export enum difficultyBlockRelation {
    EASY = 10,
    NORMAL = 7,  
    HARD = 4
}

export type boardSpecifications = {
    boardWidth : number; 
    difficulty : difficultyBlockRelation; 
}

export const returnEmptyBlock = (width: number) => {
    return returnBoardBlock(0, width); 
}

export const returnBoardBlock = (value: number = 0, width: number) : HTMLDivElement => {
    const innerBlock : HTMLDivElement = document.createElement("div"); 
    innerBlock.style.position = "absolute"; 
    innerBlock.style.borderRadius = 10 + "px"; 
    innerBlock.classList.add("innerBlock");
    innerBlock.style.width = width + "px"; 
    innerBlock.style.height = width + "px";
    const headerForNumber = document.createElement("h3");
    headerForNumber.classList.add("headerNumber"); 
    if(value != 0){
        headerForNumber.textContent = value.toString();
    }
    else{
        innerBlock.style.backgroundColor = "#A0A0A0"; 
    }
    innerBlock.appendChild(headerForNumber) 
    return innerBlock; 
}

// if the board just create an empty board
// this could be used to resize the whole board every time the window is  resized itself 

export const createBoard = (specifications : boardSpecifications, boardItself : number[][] | null = null) : HTMLDivElement => {

    const innerGrid = document.createElement("div"); 
    innerGrid.classList.add("innerGrid"); 

    const boardWidth = specifications.boardWidth; 
    const padding = 10; 

    const blockWidth = (boardWidth - padding * (specifications.difficulty + 1)) / specifications.difficulty;   

    for(let i = 0; i < specifications.difficulty; i++)
        for(let j = 0; j < specifications.difficulty; j++){
            let innerBlock = returnEmptyBlock(blockWidth);
            innerBlock.style.left = (j  * (blockWidth + padding) + padding) + "px";
            innerBlock.style.top = (i * (blockWidth + padding) + padding) + "px";  
            innerGrid.appendChild(innerBlock); 
        }

    if(boardItself != null)
        for(let i = 0; i < specifications.difficulty; i++)
            for(let j = 0; j < specifications.difficulty; j++){
                if(!boardItself[i][j]) continue; 
                let innerBlock = returnBoardBlock(boardItself[i][j], blockWidth); 
                let blockHslVal = boardItself[i][j]; 
                innerBlock.style.backgroundColor = hslColorVal(blockHslVal); 
                innerBlock.id = "i" + (i * specifications.difficulty + j);
                innerBlock.style.left = (j  * (blockWidth + padding) + padding) + "px";
                innerBlock.style.top = (i * (blockWidth + padding) + padding) + "px"; 
                innerGrid.appendChild(innerBlock); 
            }


    return innerGrid; 
}
