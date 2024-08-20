import { difficultyBlockRelation } from "./createBoard";

type move2D = {
    xMove: number; 
    yMove: number; 
}

export const LEFT : move2D = {xMove: -1, yMove: 0};
export const RIGHT : move2D = {xMove: 1, yMove: 0}; 
export const UP : move2D = {xMove: 0, yMove: -1};
export const DOWN : move2D = {xMove: 0, yMove: 1};

const swapTwoItemsIn2DArray = (array2D: any[][],  pos1X : number, pos1Y : number,  pos2X: number, pos2Y: number) : any[][] => {
    let throwaway = array2D[pos1Y][pos1X]; 
    array2D[pos1Y][pos1X] = array2D[pos2Y][pos2X]; 
    array2D[pos2Y][pos2X] = throwaway; 
    return array2D; 
} 

export function moveLogic(repOfBoard : HTMLDivElement, matrixRepresentation : number[][], startRow : number, startCol : number, innerMovement : move2D, outerMovement : move2D, blockWidth: number, blockPadding: number) : boolean {
    
    let coordX = startCol, coordY = startRow; 
    let nextBestX = undefined, nextBestY = undefined;  

    let mergeMap : boolean[][] = new Array<Array<boolean>>(matrixRepresentation.length);
    let movementDone = false; 

    for(let i = 0; i < matrixRepresentation.length; i++)
        mergeMap[i] = new Array<boolean>(matrixRepresentation.length); 


    for(let i = 0; i < matrixRepresentation.length; i++)
        for(let j = 0; j < matrixRepresentation.length; j++)
            mergeMap[i][j] = false; 

    while(coordX >= 0 && coordX < matrixRepresentation.length && coordY >= 0 && coordY < matrixRepresentation.length){
       
        while(coordX >= 0 && coordX < matrixRepresentation.length && coordY >= 0 && coordY < matrixRepresentation.length){

            // merge checking
            let mergeable = false;
            
            if(!matrixRepresentation[coordY][coordX] && nextBestX == undefined){

                nextBestX = coordX; 
                nextBestY = coordY; 
            
            }else if(matrixRepresentation[coordY][coordX] && nextBestX != undefined && nextBestY != undefined && !mergeable){
                
                let blockId = coordY * matrixRepresentation.length + coordX; 
                let blockDiv: HTMLDivElement = repOfBoard.querySelector(`#i${blockId}`)!; 
                
                swapTwoItemsIn2DArray(matrixRepresentation, nextBestX, nextBestY, coordX, coordY); 

                mergeable = mergeLogic(nextBestX, nextBestY, innerMovement, matrixRepresentation, mergeMap);
            
                if(mergeable){
                    nextBestX -= innerMovement.xMove; 
                    nextBestY -= innerMovement.yMove; 
                    mergeMap[nextBestY][nextBestX] = true; 
                }

                movementDone = true; 

                blockDiv.style.left = (((blockWidth + blockPadding) * nextBestX ) + blockPadding) + "px";  
                blockDiv.style.top = (((blockWidth + blockPadding) * nextBestY ) + blockPadding) + "px"; 

                nextBestX += innerMovement.xMove; 
                nextBestY += innerMovement.yMove;

            }else if(matrixRepresentation[coordY][coordX]){
                
                mergeable = mergeLogic(coordX, coordY, innerMovement, matrixRepresentation, mergeMap);

                let blockId = coordY * matrixRepresentation.length + coordX; 
                let blockDiv: HTMLDivElement = repOfBoard.querySelector(`#i${blockId}`)!; 

                if(mergeable){
                    
                    mergeMap[coordY - innerMovement.yMove][coordX - innerMovement.xMove] = true;
                    
                    blockDiv.style.top = (((blockWidth + blockPadding) * (coordY - innerMovement.yMove) ) + blockPadding) + "px";  
                    blockDiv.style.left = (((blockWidth + blockPadding) * (coordX - innerMovement.xMove) ) + blockPadding) + "px"; 
                    
                    movementDone = true; 

                    nextBestX = coordX; 
                    nextBestY = coordY;

                }

            }

            coordX += innerMovement.xMove; 
            coordY += innerMovement.yMove; 
        }

        coordX = startCol, coordY = startRow; 

        coordX += outerMovement.xMove; 
        coordY += outerMovement.yMove; 

        nextBestX = undefined; 
        nextBestY = undefined; 

        startCol = coordX, startRow = coordY; 
    }

    return movementDone; 
}


export const mergeLogic = (xPos : number, yPos : number, innerMovement: move2D, matrixRepresentation : number[][], alreadyMerged : boolean[][]) : boolean => {
    let newXPos = xPos - innerMovement.xMove, newYPos = yPos - innerMovement.yMove; 
    if(newXPos < 0 || newXPos >= matrixRepresentation.length || newYPos < 0 || newYPos >= matrixRepresentation.length) return false; 
    if(alreadyMerged[newYPos][newXPos]) return false; 
    if(matrixRepresentation[yPos][xPos] == matrixRepresentation[newYPos][newXPos]){
        matrixRepresentation[newYPos][newXPos] *= 2; 
        matrixRepresentation[yPos][xPos] = 0; 
        return true; 
    }
    return false; 
}