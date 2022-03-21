var ghostJumpingImg
var jump;
var gameOver = false;
var doorGroup;
var climberGroup;
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
    ghostJumpingImg = loadImage("ghost-jumping.png");
    spookySound = loadSound("spooky.wav");
}

function setup() {
    createCanvas(600, 600);

    climberGroup = createGroup();
    doorGroup = createGroup();

    tower = createSprite(300, 0);
    tower.addImage("tower", towerImg);
    tower.velocityY = 2;



    ghost = createSprite(300, 300)

    ghost.addImage("ghost-standing", ghostImg)
    ghost.scale = 0.25;
    ghost.debug = true
    ghost.setCollider("rectangle", -25, 25, 125, 250)

    door = createSprite(Math.round(random(125, 475)), -75);
    door.addImage("door", doorImg);
    door.debug = true
    door.setCollider("rectangle", 0, 63, 90, 10);
    door.velocityY = 2;
    ghost.depth = door.depth;
    ghost.depth++;

    climber = createSprite(door.x, door.y + 70);
    climber.addImage("climber", climberImg);
    climber.velocityY = 2;
    climber.debug = true
    climber.setCollider("rectangle", 0, 5, 90, 10);
    ghost.depth = climber.depth
    ghost.depth++;
    climberGroup.add(climber)
    doorGroup.add(door)

    L_Wall = createSprite(-2.5, 300, 5, 600);
    R_Wall = createSprite(602.5, 300, 5, 600);
    T_Wall = createSprite(300, -2.5, 600, 5);
    B_Wall = createSprite(300, 602.5, 600, 5);




}

function draw() {
    background(200);

    if (keyWentDown("SPACE")) {
        ghost.velocityY = -10;
    }

    if (keyDown("LEFT_ARROW")) {
        ghost.velocityX -= 0.6
    }

    if (keyDown("RIGHT_ARROW")) {
        ghost.velocityX += 0.6
    }

    if (ghost.velocityX < 0) {
        ghost.velocityX += 0.3
    }

    if (ghost.velocityX > 0) {
        ghost.velocityX -= 0.3

    }

    if (ghost.velocityX > -0.2 && ghost.velocityX < 0.2) {
        ghost.velocityX = 0
    }



    ghost.velocityY += 0.6

    if (tower.y > 595) {
        tower.y = 0

    }
    ghost.collide(doorGroup);
    doorSpawner();

    ghost.collide(L_Wall)
    ghost.collide(R_Wall)
    ghost.collide(T_Wall)


    drawSprites();


    if (ghost.isTouching(climberGroup) || ghost.isTouching(B_Wall)) {
        gameOver = true;
    }
    if (gameOver == true) {
        background("black")
        stroke("yellow");
        fill("yellow");
        textSize(40);
        text("Game Over", 200, 300)

    }


}



function doorSpawner() {
    //doorImg = loadImage("door.png");
    //climberImg = loadImage("climber.png");

    if (frameCount % 200 == 0) {
        door = createSprite(Math.round(random(125, 475)), -75);
        door.addImage("door", doorImg);
        door.debug = true
        door.setCollider("rectangle", 0, 63, 90, 10);
        door.velocityY = 2;
        ghost.depth = door.depth;
        ghost.depth++;
        doorGroup.add(door)

        climber = createSprite(door.x, door.y + 70);
        climber.addImage("climber", climberImg);
        climber.velocityY = 2;
        climber.debug = true
        climber.setCollider("rectangle", 0, 5, 90, 10);
        ghost.depth = climber.depth
        ghost.depth++;
        climberGroup.add(climber)
        door.lifetime = 800;
        climber.lifetime = 800;
    }
}