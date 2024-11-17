// now we want to access each and every button so that we could 
// perform some operations whenever buttons are clicked.

let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");

let newGameBtn = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


// now deciding that which turn is this( x or o);
let turnO = true; // player O

// making a 2D array to store the pattern of answers
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let draw = 0;

// now on clicking any button, there should be some actions
// so now we are adding event listener. 
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        draw++;
        console.log("box was clicked");
        if(turnO === true){// player O's turn
            box.innerText = "O";
            turnO = false;
        }
        else{// player X's turn
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;// disabling current button, so that we could not click it again after clicking it once.

        // now, as soon as any button is clicked, then just check that, did you get your winner or not.
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){

        box.disabled = true;
        
    }
};


const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    // // after winning the game, just disable all the remaining button,
    disableBoxes();
};


const checkWinner = () =>{
    
    for(let pattern of winPatterns){
        // box me jo bhi print h, wo screen me print kra rha hu

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner", pos1Val); 
                showWinner(pos1Val);
            }
        }
        if(draw === 9 && pos1Val != pos2Val){
            showDraw();
        }
    }
    
};



const showDraw = () => { 
    msg.innerText = `Draw`;
    msgContainer.classList.remove("hide");
    // // after winning the game, just disable all the remaining button,
    disableBoxes();
};

// after winning one game, if we have to play it again, then just reset the game and then play it again.
// so making a function to reset the game.

const resetGame = () => {
    turnO = true;
    draw = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

// to resetting the new game, we are adding the event listener in new game button
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click",resetGame);
