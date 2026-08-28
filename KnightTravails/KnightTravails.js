const knightOffsets = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2]
]

class Knight {
    constructor(startingPos){
        this.startingPos = startingPos;
        this.journeyMap = new Map();
        this.visited = new Set();
    }

    isValidMove(offSet, curPos){
        if (curPos[0] + offSet[0] < 0 || curPos[0] + offSet[0] > 7){
            return false;
        }

        if (curPos[1] + offSet[1] < 0 || curPos[1] + offSet[1] > 7){
            return false;
        }

        return true;
    }

    getValidMoves(curPos){
        let validMoves = [];

        for (let move of knightOffsets){
            
            let potentialPos = [
                curPos[0] + move[0],
                curPos[1] + move[1]
            ];
            
            //continue if potential pos exists in the journey
            if (this.visited.has(potentialPos.toString())) {
                continue;
            }

            if (this.isValidMove([move[0], move[1]], curPos)){
                this.visited.add(potentialPos.toString())
                validMoves.push(potentialPos);
                this.mapJourney(curPos, potentialPos);
            }

        }
        return validMoves;
    }

    moveKnight(){
        this.visited.add(this.startingPos.toString())
        let queue = [];
        queue.push(this.startingPos)

        while (queue.length > 0){
            let curPos = queue.shift();
            queue.push(...this.getValidMoves(curPos))
        }
    }

    mapJourney(curPos, potentialPos){
        this.journeyMap.set(potentialPos.toString(), curPos);
    }

    traceJourney(endPos){
        let journeyArr = [];
        let curPos = endPos;

        while (curPos !== undefined){
            journeyArr.push(curPos);
            curPos = this.journeyMap.get(curPos.toString());
        }

        journeyArr.reverse();
        return this.logJourney(journeyArr);
    }

    logJourney(journeyArr){
        console.log(`You made it in ${journeyArr.length - 1} moves!`);

        for (let move of journeyArr){
            console.log(`[${move}]`)
        }
    }
}

const testKnight = new Knight([4,2])
testKnight.moveKnight();
testKnight.traceJourney([0, 1])