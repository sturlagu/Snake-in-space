var snakeHead;
var scoreboard;
var snakeBodyArray = [];
var food;
var enemy;
var enemyArray = [];
var keyStrokeMap = [];

// Initiate game
function startGame() {
    scoreboard = new scoreboard();
    gameArea.start();
    snakeHead = new snakeHead(25, 25, "darkgreen", (gameArea.canvas.width/4), (gameArea.canvas.height/2))
    food = new food(25, 25 ,"red", getRandomInt(gameArea.canvas.width), getRandomInt(gameArea.canvas.height))
    enemy = new enemy();
    enemy.shoot();
}
// Create canvas
var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.getElementById("scoreboardText").innerHTML = scoreboard.text;
        document.getElementById("levelCounter").innerHTML = scoreboard.progression + "/5";
        // On start direction right
        this.key = 39;
        document.body.insertBefore(this.canvas, document.body.childNodes[1]);
        this.interval = setInterval(updategameArea, scoreboard.levelspeed);
        window.addEventListener('keydown', function (e) {
            if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
                gameArea.key = e.keyCode;
            }else if(e.keyCode == 82){
                gameArea.loss();
            }
        })
        window.addEventListener('keyup', function (e) {
            keyStrokeMap[e.keyCode] = 1;
            for(var i = 0; i < keyStrokeMap.length; i++){
                if(keyStrokeMap[50] && keyStrokeMap[52] && keyStrokeMap[48]){
                    console.log("Omg 420")
                    
                }
            }
        })
    },
    clear: function() {
        if(snakeBodyArray.length == 0){
            this.context.clearRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height)
        }else{
            this.context.clearRect(snakeBodyArray[snakeBodyArray.length-1].x, snakeBodyArray[snakeBodyArray.length-1].y, snakeHead.width, snakeHead.height)
        }
    },
    loss: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        snakeHead.reset();
        food.reset()
        scoreboard.reset()
        enemy.reset()
        this.canvas.setAttribute('style', 'background-color: lightgray;')
    }
}
// Create snakeHead
function scoreboard(){
   this.value = 0;
   this.level = 1;
   this.levelspeed = 250;
   this.progression = 0;
   this.text = "Score: " + this.value + "p" + " - Level: " + this.level;
   this.update = function() {
       this.value += 100;
       this.progression++;
       document.getElementById("levelCounter").innerHTML = this.progression + "/5";
       document.getElementById("level" + this.progression).style.backgroundColor = "red";
       this.text = "Score: " + this.value + "p" + " - Level: " + this.level;
       document.getElementById("scoreboardText").innerHTML = this.text;
       if(this.progression == 5){
            this.level++;
            this.text = "Score: " + this.value + " - Level: " + this.level;
            document.getElementById("scoreboardText").innerHTML = this.text;
            this.levelspeed -= 20;
            clearInterval(gameArea.interval);
            gameArea.interval = setInterval(updategameArea, this.levelspeed);
            for(var i = 1; i <= this.progression; i++){
                document.getElementById("level" + i).style.backgroundColor = "white";
            }
            this.progression = 0;
            document.getElementById("levelCounter").innerHTML = this.progression + "/5";
            this.sceneLevel();
       }
   }
   this.reset = function() {
        this.value = 0;
        this.level = 1;
        this.progression = 0;
        this.text = "Score: " + this.value + "p" + " - Level: " + this.level;
        this.levelspeed = 200;
        clearInterval(gameArea.interval);
        gameArea.interval = setInterval(updategameArea, this.levelspeed)
        for(var i = 1; i <= 5; i++){
            document.getElementById("level" + i).style.backgroundColor = "white";
        }
        document.getElementById("scoreboardText").innerHTML = this.text;
        document.getElementById("levelCounter").innerHTML = this.progression + "/5";
   }
   this.sceneLevel = function(){
       switch(this.level){
           case 2:
                gameArea.canvas.setAttribute('style', 'background-image: url("images/stage2.jpg")')
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 3:
                gameArea.canvas.setAttribute('style', 'background-image: url("images/stage3.jpg")')
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 4:
                gameArea.canvas.setAttribute('style', 'background-image: url("images/stage4.jpg")')
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 5:
                gameArea.canvas.setAttribute('style', 'background-image: url("images/stage5.jpg")')
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 6:
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 7:
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 8:
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
           case 9:
                enemy.bulletsPerSecond = enemy.bulletsPerSecond - 500;
                clearInterval(enemy.interval);
                enemy.interval = setInterval(enemy.shoot, enemy.bulletsPerSecond);
           break;
       }
   }
}
function enemy() {
    this.context = gameArea.context;
    this.width = 50;
    this.height = 50;
    this.speedY = 25;
    this.bulletsPerSecond = 5000;
    this.up = false;
    this.down = true;
    this.x = gameArea.canvas.width-this.width;
    this.y = 0;
    this.img = new Image();
    this.img.src = "images/stage2Enemy.jpg"
    this.newPos = function(){
        if(this.down == true){
            this.y += 25;
            if(this.y == gameArea.canvas.height-this.height){
                this.down = false;
                this.up = true;
            }
        }
        else if(this.up == true) {
            this.y -= 25;
            if(this.y == 0){
                this.down = true;
                this.up = false;
            }
        }
    }
    this.update = function(){
        if(this.img.complete == true){
            this.context.drawImage(this.img, this.x, this.y, this.width , this.height)
        }else{
            console.log("hei")
        }
    }
    this.clear = function() {
        this.context.clearRect(this.x, this.y, this.width, this.height)
    }
    this.shoot = function(){
        enemyArray.push(new bullets())
        this.interval = setInterval(this.shoot, this.bulletsPerSecond)

    }
    this.reset = function(){
        this.bulletsPerSecond = 5000;
        this.up = false;
        this.down = true;
        this.y = 0;
        enemyArray = [];
        clearInterval(this.interval)
        this.interval = setInterval(this.shoot, this.bulletsPerSecond)
    }
}
// Level 2 enemy bullets
function bullets(){
    this.context = gameArea.context;
    this.width = snakeHead.width;
    this.height = snakeHead.height;
    this.color = "blue";
    this.x = enemy.x;
    this.y = enemy.y;
    this.newPos = function() {
        this.x += -25;
    } 
    this.update = function(){
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height)
    }
    this.clear = function() {
        this.context.clearRect(this.x, this.y, this.width, this.height)
    }
}
//Check for bullet collision (only head)
function bulletCollision(){
    //snake
    for(var i = 0; i < enemyArray.length; i++){
        if(snakeHead.x == enemyArray[i].x && snakeHead.y == enemyArray[i].y){
            gameArea.loss()
        }
    }
}

// Create snakeHead
function snakeHead(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.up = false;
    this.down = false;
    this.right = true;
    this.left = false;
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY; 
    } 
    this.update = function(){
        context = gameArea.context;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    this.reset = function() {
        this.x = gameArea.canvas.width/4;
        this.y = gameArea.canvas.height/2;
        gameArea.key = 39;
        snakeBodyArray = []
    }
}
// Check keyboard input
function inputKey(){
    snakeHead.speedX = 0;
    snakeHead.speedY = 0; 
    if(gameArea.key && gameArea.key == 37 && snakeHead.right == false){snakeHead.speedX = -25; snakeHead.up = false; snakeHead.down = false; snakeHead.right = false; snakeHead.left = true;}
    else if(gameArea.key && gameArea.key == 37 && snakeHead.right == true){snakeHead.speedX = 25;}
    if (gameArea.key && gameArea.key == 39  && snakeHead.left == false) {snakeHead.speedX = 25; snakeHead.up = false; snakeHead.down = false; snakeHead.right = true; snakeHead.left = false;}
    else if(gameArea.key && gameArea.key == 39 && snakeHead.left == true){snakeHead.speedX = -25;}
    if (gameArea.key && gameArea.key == 38 && snakeHead.down == false) {snakeHead.speedY = -25; snakeHead.up = true; snakeHead.down = false; snakeHead.right = false; snakeHead.left = false;}
    else if(gameArea.key && gameArea.key == 38 && snakeHead.down == true){snakeHead.speedY = 25;}
    if (gameArea.key && gameArea.key == 40 && snakeHead.up == false) {snakeHead.speedY = 25; snakeHead.up = false; snakeHead.down = true; snakeHead.right = false; snakeHead.left = false;}
    else if(gameArea.key && gameArea.key == 40 && snakeHead.up == true){snakeHead.speedY = -25;}
}
// Check collision
function wallCollision(){
    // RGIHT
    if(snakeHead.x == gameArea.canvas.width){
        
        gameArea.loss();
    }
    // LEFT
    if(snakeHead.x == -25){
        snakeHead.left = false;
        gameArea.loss();
    }
    // UP
    if(snakeHead.y == -25){
        gameArea.loss();
    }
    // DOWN
    if(snakeHead.y == gameArea.canvas.height){
        gameArea.loss();
    }
}
// Create food
function food(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    context = gameArea.context;
    context.fillStyle = color;
    context.fillRect(this.x, this.y, this.width, this.height)
    this.newRandomPos = function(){
            this.x = getRandomInt(gameArea.canvas.width);
            this.y = getRandomInt(gameArea.canvas.height);
            for(var i = 0; i < snakeBodyArray.length; i++){
                if(this.x == snakeHead.x && this.y == snakeHead.y || this.x == snakeBodyArray[i].x && this.y == snakeBodyArray[i].y){
                    this.newRandomPos();
                }
            }
    }
    this.update = function() {
        context = gameArea.context;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    this.reset = function() {
        this.newRandomPos()
        this.update();
    }
}
// getRandomInt() for position of food
function getRandomInt(max) {
    max = Math.floor(max);
    var result = Math.floor(Math.random() * (max/snakeHead.width))*snakeHead.width;
    return result
}
// Check collision for snakeHead and food
function foodCollision(){
    if(snakeHead.x == food.x && snakeHead.y == food.y){
        snakeBody.bodyLength++;
        snakeBodyArray.push(new snakeBody(snakeHead.width, snakeHead.height, "green"))
        food.newRandomPos();
        food.update();
        scoreboard.update()
    }
}
// Create snakeBody
function snakeBody(width, height, color){
    this.width = width;
    this.height = height;
    this.number = snakeBodyArray.length;
    if(snakeBodyArray.length == 0){
        if(snakeHead.left == true || snakeHead.right == true){
            this.x = snakeHead.x-(snakeHead.speedX);
            this.y = snakeHead.y;
        }
        else if(snakeHead.up == true || snakeHead.down == true){
            this.x = snakeHead.x;
            this.y = snakeHead.y-(snakeHead.speedY); 
        }
    }else{
        this.x = snakeBodyArray[snakeBodyArray.length-1].x;
        this.y = snakeBodyArray[snakeBodyArray.length-1].y;
    }
    this.newPos = function() {
        if(this.number == 0){
            this.x = snakeHead.x;
            this.y = snakeHead.y;
        }else{
            this.x = snakeBodyArray[this.number-1].x;
            this.y = snakeBodyArray[this.number-1].y;
        }
    } 
    this.update = function(){
        context = gameArea.context;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}
//Check snake collision
function snakeCollision(){
    for(var i = 0; i < snakeBodyArray.length; i++){
        if(snakeHead.x == snakeBodyArray[i].x && snakeHead.y == snakeBodyArray[i].y){
            gameArea.loss()
        }
    }
}
// Update game canvas
function updategameArea(){
    gameArea.clear();
    inputKey()
    wallCollision()
    foodCollision()
    snakeCollision()
    bulletCollision()
    for(var i = snakeBodyArray.length-1; i >= 0; i--){
        snakeBodyArray[i].newPos()
    }
    snakeHead.newPos();
    snakeHead.update();
    food.update();
    for(var j = 0; j < snakeBodyArray.length; j++){
        snakeBodyArray[j].update()
    }
    enemy.clear()
    enemy.newPos()
    enemy.update()
    for(var i = 0; i < enemyArray.length; i++){
        enemyArray[i].clear();
        enemyArray[i].newPos();
        enemyArray[i].update();
    }
    console.log(enemyArray.length)
}


