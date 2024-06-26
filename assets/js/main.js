let gameContainer = document.querySelector(".game-container")
let character = document.querySelector(".character")
let interval;
let keyDown = false;




const moveLeft = ()=>{
    let leftpos =parseInt(window.getComputedStyle(character).getPropertyValue("left")) 
    if(leftpos > 0){
        character.style.left = leftpos - 10 + "px" 
    }
}
const moveRight = ()=>{
    let Rightpos = parseInt(window.getComputedStyle(character).getPropertyValue("left"))
    if(Rightpos < 370 ){
        character.style.left = Rightpos + 10 + "px" 
    }
}
document.addEventListener("keydown",(event)=>{
    if(event.key == "ArrowRight"){
        interval = setInterval(moveRight,30 )
    }
    else if(event.key == "ArrowLeft"){
    interval = setInterval( moveLeft , 30 );
    }   
    keyDown = true
} )


document.addEventListener("keyup", () =>{
    clearInterval(interval)
    keyDown = false;

})


let genertocke = () =>{
    let block = document.createElement("div")
    let hole = document.createElement("div")
    block.setAttribute("class" , "block")
    hole.setAttribute("class" , "hole")

    let randHolePos = Math.floor(Math.random() * 320)
    hole.style.left = randHolePos + "px"

    gameContainer.appendChild(block)
    gameContainer.appendChild(hole)


    $('.block').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd' , function(e) {$(this).remove();})
    $('.hole').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd' , function(e) {$(this).remove();})
}
setInterval(genertocke , 1500)
const checkColliding = () => {
    const allblocks = document.querySelectorAll(".block");
    const allholes = document.querySelectorAll(".hole");

    allblocks.forEach(b => {
        let hitObstacle = false;

        if(collision(b, character)) {
            hitObstacle = true;

            allholes.forEach(h => {
                if(holeCollision(h, character)) {
                    hitObstacle = false;
                }
            });
        }

        if(hitObstacle) {
            // Perform some action when a collision with an obstacle occurs
            alert("Collision with obstacle detected!");
            location.reload()
        }
    });
};

setInterval(checkColliding,1)


function collision(a,b){
    let a_top =parseInt(window.getComputedStyle(a).getPropertyValue("top")) 
    let b_top =parseInt(window.getComputedStyle(b).getPropertyValue("top")) 

    return(
            a_top + 20 > b_top && a_top < b_top + 20
    )
}


function holeCollision(b,h)
{
    let b_left  = parseInt(window.getComputedStyle(b).getPropertyValue("left")) 
    let b_top = parseInt(window.getComputedStyle(b).getPropertyValue("top")) 

    let h_left = parseInt(window.getComputedStyle(h).getPropertyValue("left")) 
    let h_top = parseInt(window.getComputedStyle(h).getPropertyValue("top")) 
    
    return(
        b_left + 20 > h_left && b_left < h_left + 20 &&
        b_top + 20 > h_top && b_top < h_top + 20
    )
}