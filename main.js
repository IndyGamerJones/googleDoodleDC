var fullText = 'var msg="hey"; System.out.println("Hello World"); std::cout << "Heyyo"; int test<br>=0;  &lt;h1 style="text-decoration: underline;">Ello Internet &lt;/h1> &lt;title><br> Welcome &lt;/title> print("hi pals") &lt;br> echo("g-day!"); class Player() <br>{function yell (msg) {console.writeLine(msg);}} Document.write("Eyyyyy"); <br> mov edx, 53  01001000 01100101 01101100 01101100  01101111 &lt;canvas<br> width="1200" height="800">Sorry your browser does not support html5 canvas :( <br>&lt;/canvas> &lt;b> this is bold text &lt;/b> public String testVar1="This is a string";<br> if (likeCookies) {console.log("huh you like cookies");} else {console.log<br>("Welp you dont like cookies");} for (int i = 0; i < list.length; i++) {console.log(list[i]);}';
// the background text I used
var currentText = fullText; // a setup for removing he text one charecter at a time
var sHeight = 0; // the screen height, will be heavily used for a player camera when it comes to drawing
var sWidth = 0; // the screen width will also be used to the camera
var wHeight = 0; // the world width, used for world gen
var wWidth = 0; // the world height used for world gen
var heart = new Image(); // the heart image
var bHeart = new Image(); // the broken heart image
var monsterPic = new Image(); // the AI pic
var projectilePic = new Image(); // the projectile pic
var hasHearts = [true, true, true, true, true]; // the list of hearts left as a boolean array
var heartsLeft = 5; // the list of hearts left as an integer
var playing = false; // if the player is playing
var alive = true; // if the player is alive
var canvas; // what will be the canvas the game is drawn on
var world; // the main game class
var player; // the player reference
var gInterval; // a reference to the main loop interval

// Setting image sources
heart.src = "sprites/heart.png";
bHeart.src = "sprites/brokenHeart.png";
monsterPic.png = "sprites/stoneMonster.png";
projectilePic.png = "sprites/stone.png";

document.getElementById("logo").innerHTML = currentText; // setting the background text to what the text earlier declared

var timer = 0; // the setup for the timer used for deleting the text
var timerMax = fullText.length; // getting the amount of charecters in the background text


function Start() { // the start function
    if (!playing) { // if the start function has not already been called then
        timer = 0;
        timerMax = currentText.length;
        RemoveCodeChar(); // begin the chain reaction that removes all the charecters
        playing = true; // sets the playing to true so that the player can not hit start twice
    }
}

function mainLoop() { // get a reference to the main loop so we can later stop it
    gInterval = setInter(); // run mainloop 50 times a secound0
}

function setInter() { // just a wrapper for the set interval
    return window.setInterval(function() {
        world.Update();
    }, 20); // run the update 50 times a secound
}

function RemoveCodeChar() { // this is a bit messy, sorry!
    if (timer <= timerMax) { // checks if all of the charecters have been removed
        currentText = currentText.substring(0, currentText.length - 1); // if so then remove the last letter of the current text
        timer++; // move the timer up
        setTimeout(RemoveCodeChar, 0.5); // restart the function is 1/2 a millasecound
        document.getElementById("logo").innerHTML = currentText; // set the background text to the current text
    } else { // if all the charecters are gone
        timer = 0;
        initFoil(); // start the a second init
    }
}

function initFoil() { // the secound initation
    document.getElementById("start").setAttribute("style", "transition: 4s; margin-left:-100;"); // set a animation to slowley ease out the two halfs of the logo
    document.getElementById("half1").setAttribute("style", "transition: 4s; margin-left:-500");
    document.getElementById("half2").setAttribute("style", "transition: 4s; margin-left:1331");
    setTimeout(init, 4000); // after the animation is done begin the final setup
}

function init() { // almost the final step
    document.getElementById("main").innerHTML = document.getElementById("main").innerHTML + "<canvas width=900 style='left:50%;margin-left:-369px;' height=600 id='myCanvas' style='background-color:#000000;'></canvas>"; // add the canvas to the webpage

    var c = document.getElementById("myCanvas"); // get the canvas
    canvas = c.getContext("2d"); // get the context of the canvas
    sWidth = parseInt(document.getElementById("myCanvas").getAttribute("width")); // get the width of the canvas
    sHeight = parseInt(document.getElementById("myCanvas").getAttribute("height")); //  get the height of the canvas
    wWidth = 3600; // the world width
    wHeight = 600; // the world height

    world = new World(); // finally setup the world
    player = world.player;
    mainLoop();

}

function AddCodeChar() { // Messy alert :/
    if (timer <= fullText.length) { // checks if all of the charecters not been added
        if (fullText[timer] !== null && fullText[timer] !== undefined) { // check to be certain that there is still text left to add
            currentText += fullText[timer]; // add the text
            timer++; // move the timer up
            setTimeout(AddCodeChar, 0.5); // restart the function is 1/2 a millasecound
            document.getElementById("logo").innerHTML = currentText; // set the background text to the current text
        } else { // if there is no text to add, fully reset the game
            timer += 0;
            playing = false;
            alive = true;
        }
    }

}
class Coords { //the collisions class
    static pSqCollide(c, c1, c2) { // point to square collision
        if (c.x >= c1.x && c.x <= c2.x && c.y >= c1.y && c.y <= c2.y) { // check if the point is within the square
            return true;
        }
        return false;
    }
    static sqCollide(c1, c2, c01, c02) { // rectange collision
        if (Coords.pSqCollide(new Vector2(c1.x, c1.y), c01, c02) || Coords.pSqCollide(new Vector2(c1.x, c2.y), c01, c01) || Coords.pSqCollide(new Vector2(c2.x, c1.y), c01, c01) || Coords.pSqCollide(new Vector2(c2.x, c2.y), c01, c01)) { // check if any of the corners of the first rectangle are in the secound one
            return true;
        }
        return false;
    }
}
class Block { // the tile class
    constructor(c1, c2, type) { // a basic constructor for the block
        this.c1 = c1; // set the top left corner
        this.c2 = c2; // set the bottom right corner
        this.type = type; // set the type of block ie a sky or dirt block
    }
}

function unInit() {
    document.getElementById("myCanvas").parentNode.removeChild(document.getElementById("myCanvas"));
    document.getElementById("start").setAttribute("style", "margin-left:300px !important;"); // undo the movement (Can't seem to animate it :( )
    document.getElementById("half1").setAttribute("style", "margin-left:-100px !important");
    document.getElementById("half2").setAttribute("style", "margin-left:831px !important")
    heartsLeft = 5; // reset vales and clear the mainloop
    hasHearts = [true, true, true, true, true];
    AddCodeChar();
    window.clearInterval(gInterval);
    timerMax = currentText.length;
}
class Animation { // an animation handler class
    constructor(srcs, wPA) { // a constructor with the sources of the images, and a frames per image
        var imgs = []; // sets up an array of images
        for (var i = 0; i < srcs.length; i++) { // loops throught the image sources and sets them to their respective image
            var img = new Image();
            img.src = srcs[i];
            imgs.push(img);
        }
        this.framesPerAni = wPA; //  keeps a referance to the frames per imge
        this.imgs = imgs; // sets the images
        this.ind = 0; // prepares the curernt image index
        this.currentImg = imgs[0]; // sets the displayed image to the first one
    }
    Update() { // the update function
        if (this.ind < (this.imgs.length * this.framesPerAni) - 1) { // if the current frames past is not greater then the total amount of frames in the animation
            this.ind++; // inceases the frame index by one
            this.currentImg = this.imgs[Math.floor(this.ind / this.framesPerAni)]; // sets the current image to the correct image
            return this.currentImg; // return the displayed image
        }
        this.ind = 0; // otherwise reset the animation
        this.currentImg = this.imgs[0];
        return this.currentImg;
    }
}
class Player { // the player class
    constructor() {
        this.vel = new Vector2(); // a velocity in vector notation
        this.c1 = new Vector2(); // one corner of the square, ik it's kinda innefficiant to use 2 corners, but eh
        this.c2 = new Vector2();
        this.c1.y = sHeight - 500; // setting values...
        this.c1.x = 50; // setup the default coordinates
        this.c2.x = 122;
        // get all of the image sources
        var iImgs = ["animation/player/idle/idle1.png", "animation/player/idle/idle2.png", "animation/player/idle/idle3.png"];
        var wRImgs = ["animation/player/walking/walking1.png", "animation/player/walking/walking2.png", "animation/player/walking/walking3.png", "animation/player/walking/walking4.png", "animation/player/walking/walking5.png", "animation/player/walking/walking6.png", "animation/player/walking/walking7.png", "animation/player/walking/walking8.png"];
        var wLImgs = ["animation/player/walking/walking9.png", "animation/player/walking/walking10.png", "animation/player/walking/walking11.png", "animation/player/walking/walking12.png", "animation/player/walking/walking13.png", "animation/player/walking/walking14.png", "animation/player/walking/walking15.png", "animation/player/walking/walking16.png"];
        // create all of the animations
        this.idleAni = new Animation(iImgs, 20);
        this.walkingRAni = new Animation(wRImgs, 5);
        this.walkingLAni = new Animation(wLImgs, 5);
        this.dir = 0; // the current direction, 0=idle, 1=right, -1=left
        this.c2.y = sHeight - 400; // setup the height
        this.jumpHeight = 50; // set the jumpheight and walkspeed
        this.walkSpeed = 16;
        this.grounded = false; // set grounded to false by default
        this.vel.y = 0; //
    }
    Jump() { // jumping
        if (this.grounded) {
            this.vel.y = this.jumpHeight;
        } // check if grounded, if true then jump
    }
    Walk(dir) { // walkin around
        if (dir) { // true=right false=left
            this.dir = 1;
            this.c1.x += this.walkSpeed;
            this.c2.x += this.walkSpeed; //increases the x by walkSpeed, will be modded heavily in the future for collisions
        } else {
            this.dir = -1;
            this.c2.x -= this.walkSpeed;
            this.c1.x -= this.walkSpeed; // decreases the x by walkSpeed to move left
        }
    }
    Update(grav) { // the update
        if (heartsLeft <= 0) {
            world.GameOver();
        }
        this.c1.Add(new Vector2(this.vel.x, -this.vel.y));
        this.c2.Add(new Vector2(this.vel.x, -this.vel.y)); // apply vel w inverted y for simplicity, because higher y=lower on screen
        var loadedBlocks = world.getLoadedBlocks(this.c1, this.c2, 9); // get the nearby blocks for collision testing
        if (this.c1.y > 800) { // if the player falls out of the world
            this.c1.y = sHeight - 500; // setting values...
            this.c1.x = 50;
            this.c2.x = 122;
            this.c2.y = sHeight - 400;
            heartsLeft--; //reducint hearts
            hasHearts[heartsLeft] = false;
        }
        for (var i = 0; i < loadedBlocks.values.length; i++) { // collision testing:
            var blockC1 = loadedBlocks.values[i].c1;
            var blockC2 = loadedBlocks.values[i].c2;
            if (loadedBlocks.values[i].type !== "sky") {
                if (Coords.sqCollide(blockC1, blockC2, new Vector2(this.c1.x, this.c1.y - grav.ApplyGrav(this.vel.y, 3)), new Vector2(this.c2.x, this.c2.y - grav.ApplyGrav(this.vel.y, 3)))) { // check if it will run into the ground, again will be changed for collisions
                    //reset values
                    this.c1.y = blockC1.y - 100; // sets the y values to the ground level
                    this.c2.y = blockC1.y;
                    this.grounded = true;
                    this.c1.x += this.vel.x; // add the x vel
                    this.c2.x += this.vel.x;
                    this.vel.y = 0;
                }
            }
        }
        if (!this.grounded) {
            this.vel.y = grav.ApplyGrav(this.vel.y, 3); // if ya won't run into the ground then add the velocity
        }
        if (alive) {
            player = this; // update the referance to the player
            if (this.dir === 0) { // run different animations based upon what direction
                this.walkingRAni.ind = 0; // reset the other animation so that when they start again they start from the beginning
                this.walkingLAni.ind = 0;
                canvas.drawImage(this.idleAni.currentImg, sWidth / 2 + this.idleAni.currentImg.width, sHeight / 2 - this.idleAni.currentImg.height - 49, this.idleAni.currentImg.width * 2, this.idleAni.currentImg.height * 2);
                this.idleAni.Update();
            } else if (this.dir === 1) {
                this.idleAni.ind = 0;
                this.walkingLAni.ind = 0;
                canvas.drawImage(this.walkingRAni.currentImg, sWidth / 2 + this.walkingRAni.currentImg.width, sHeight / 2 - this.walkingRAni.currentImg.height - 49, this.walkingRAni.currentImg.width * 2, this.walkingRAni.currentImg.height * 2);
                this.walkingRAni.Update();
            } else {
                this.idleAni.ind = 0;
                this.walkingRAni.ind = 0;
                canvas.drawImage(this.walkingLAni.currentImg, sWidth / 2 + this.walkingLAni.currentImg.width, sHeight / 2 - this.walkingLAni.currentImg.height - 49, this.walkingLAni.currentImg.width * 2, this.walkingLAni.currentImg.height * 2);
                this.walkingLAni.Update();
            }
            this.dir = 0; // reset the direction
        }
    }
}
class Gravity { // the gravity class, this one is... down 2 earth... I'm terrible

    ApplyGrav(vel, mul) { // applies the gravity and returns the terminal velocity if the object would go faster
        if (this.gravityScale * mul <= this.terminalVel) {
            return vel - this.gravityScale * mul; // returns the modded vel
        } else {
            return this.terminalVel;
        }
    }
    constructor(gravityScale) {
        this.gravityScale = gravityScale;
        this.terminalVel = 50;
    }
}
class World { // the mainloop class
    GameOver() {
        if (alive) {
            canvas.closePath();
            canvas.stroke();
            canvas.beginPath();
            alive = false;
            canvas.fillStyle = "#000000";
            canvas.clearRect(0, 0, sWidth, sHeight); // clear the screen or cls
            canvas.fillStyle = "#FFFFFF";
            canvas.font = "75px Verdana";
            canvas.fillText("GAME OVER", sWidth / 2 - 180, sHeight / 2 - 25);
            canvas.font = "25px Verdana";
            canvas.fillText("You survived for " + Math.floor(this.score / 50) + " secounds", sWidth / 2 - 125, sHeight / 2 + 250);
            canvas.closePath();
            canvas.stroke();
            setTimeout(unInit, 5000);
        }
    }
    Update() {
        this.score++;
        if (alive) {
            if (keys[65]) { // if pressing key a then walk left
                this.player.Walk(false);
            }
            if (keys[32]) { // if pressing space then jump not I don't use else if so you can jump + walk simulationuslly
                this.player.Jump();
            }
            this.player.grounded = false;
            if (keys[68]) { // if you press d then you walk right
                this.player.Walk(true);
            }
            canvas.beginPath(); // create a new drawing buffer
            canvas.fillStyle = "#59ace0";
            canvas.fillRect(0, 0, sWidth, sHeight); // clear the screen or cls
            canvas.fillStyle = "#4d2600";

            for (var i = 0; i < wWidth / 25; i++) { // loop through and draw the blocks
                for (var j = 0; j < sHeight / 25; j++) {
                    if (this.blocks.getValue(i, j).type === "sky") {
                        canvas.fillStyle = "#59ace0";
                        canvas.fillRect(this.blocks.getValue(i, j).c1.x - player.c1.x + sWidth / 2, this.blocks.getValue(i, j).c1.y - player.c2.y + (sHeight / 2), 25, 25);
                    } else if (this.blocks.getValue(i, j).type === "dirt") {
                        canvas.drawImage(this.dirtI, this.blocks.getValue(i, j).c1.x - player.c1.x + sWidth / 2, this.blocks.getValue(i, j).c1.y - player.c2.y + (sHeight / 2), 25, 25);
                    } else {
                        canvas.drawImage(this.gDirtI, this.blocks.getValue(i, j).c1.x - player.c1.x + sWidth / 2, this.blocks.getValue(i, j).c1.y - player.c2.y + (sHeight / 2), 25, 25);
                    }
                }
            }
            player = this.player; // update the ref for the player
            this.player.Update(this.grav); // call the update function on the player
            this.ai.Update(this.player, this.grav); // call the update function on the ai that will in turn call it's respective projectile's updates
            if (alive) {
                for (var i = 0; i < 5; i++) { // draw the hears
                    if (hasHearts[i]) {
                        canvas.drawImage(heart, 64 * i, 0); // if the is a heart then draw a normal heart
                    } else {
                        canvas.drawImage(bHeart, 64 * i, 0); // otherwise draw a broken heart
                    }
                }
            }
            canvas.closePath(); // close off the drawing buffer
            canvas.stroke(); // stroke the buffer
        }
    }
    getLoadedBlocks(c1, c2, r) { // the system for getting loaded blocks
        var loadedBlocks = new Array2D(r, r);
        for (var i = 0; i < r; i++) {
            for (var j = 0; j < r; j++) {
                var block = this.blocks.getValue(Math.round((c1.x - 50) / 25) - Math.round((r / 4) - i), Math.round((c1.y - 50) / 25) - Math.round((r / 4) - j)); // get the block there standing on and offset it by i and j blocks
                if (block !== null && block !== undefined) {
                    loadedBlocks.push(block);
                } else {
                    loadedBlocks.push(new Block(new Vector2(0, 0), new Vector2(25, 25), "sky"));
                }
            }
        }
        return loadedBlocks;
    }
    constructor() {
        this.score = 0; // set the score to zero, this is increased by one every frame
        this.grav = new Gravity(1); // set up gravity
        this.player = new Player(); // set up player
        this.ai = new BasicRanged(450, 25); // set up the ai
        this.blocks = new Array2D(wWidth / 25, sHeight / 25); // create the block array
        this.loadedBlocks = new Array2D(10, 10); // create a loaded blocked ref
        this.dirtI = new Image(); // set up the images
        this.gDirtI = new Image();
        this.dirtI.src = "sprites/dirt.png";
        this.gDirtI.src = "sprites/gDirt.png";
        var offSet = Math.floor((Math.random() * 3) - 1); // the generation offset
        for (var i = 0; i <= wWidth / 25; i++) { // generate terrain
            for (var j = 0; j < sHeight / 25; j++) {
                if (j < ((sHeight / 25) / 3) * 2 + offSet) {
                    this.blocks.push(new Block(new Vector2(i * 25, j * 25), new Vector2((i + 1) * 25, (j + 1) * 25), "sky"));
                } else if (j === ((sHeight / 25) / 3) * 2 + offSet) {
                    this.blocks.push(new Block(new Vector2(i * 25, j * 25), new Vector2((i + 1) * 25, (j + 1) * 25), "gDirt"));
                } else {
                    this.blocks.push(new Block(new Vector2(i * 25, j * 25), new Vector2((i + 1) * 25, (j + 1) * 25), "dirt"));
                }
            }
            offSet += Math.floor((Math.random() * 3) - 1); // mod the offset
        }
    }
    SetDiff(amount) { // the difficulty controller
        this.ai.reloadTime = amount;
    }
}
class Array2D { // the 2d array substitute
    constructor(x, y) {
        this.width = x;
        this.height = y;
        this.values = [];
    }
    push(value) {
        this.values.push(value);
    }
    getValue(x, y) {
        return this.values[x * this.height + y];
    }
}

function sec(aValue) // the inverse trigimetric function of cos
{
    return 1 / Math.cos(aValue);
}
class BasicRanged { // the ai
    constructor(range, reloadT) { // the range and the reload time
        this.range = range; // setting values
        this.c1 = new Vector2(800, sHeight - 100); // setting the position
        this.c2 = new Vector2(900, sHeight);
        this.projetileCount = 0; // setting more values
        this.p = new Array(); // the projectile array
        this.reloadTime = reloadT; // the reload time
        this.oReloadTime = reloadT; // the origional reload time
        this.reloadTimer = reloadT; // the reload timer
        this.walkSpeed = 10;
        this.vel = new Vector2(0, 0);
        this.grounded = false; // setting the images up
        this.pic = new Image();
        this.projectilePic = new Image();
        this.pic.src = "sprites/rockMonster.png"
        this.projectilePic.src = "sprites/stone.png";
    }
    Update(target, grav) { // the update function
        this.reloadTime = this.oReloadTime - Math.floor(world.score / 500); // decrease the reload time the farther the player gets
        this.grounded = false; // reset the grounded variable
        cleanArray(this.p); // get rid of the deleted projectiles
        this.c1.x += this.vel.x;
        this.c2.x += this.vel.x;
        this.c1.y -= this.vel.y;
        this.c2.y -= this.vel.y;
        for (var i = 0; i < this.p.length; i++) {
            var loadedBlocks = world.getLoadedBlocks(this.p[i].c1, this.p[i].c2, 7);
            if (this.p[i] !== null) { // double check for nulls
                this.p[i].Update(canvas, grav, this.projectilePic); // update them
                if (Coords.sqCollide(this.p[i].c1, this.p[i].c2, target.c1, target.c2)) {
                    target.c1.x = 0; // if the target is hit reset their position and remove hearts
                    target.c2.x = 100;
                    target.c1.y = sHeight - 100;
                    target.c2.y = sHeight;
                    heartsLeft--;
                    hasHearts[heartsLeft] = false;
                    this.p[i] = null; // destroy the projectile
                    break;
                } else if (this.p[i].c2.y > sHeight) { // if the the projectile does to the bottom of the screen then delete it
                    this.p[i] = null;
                    break;
                }
                for (var j = 0; j < loadedBlocks.values.length;j++) { // run through the loaded blocks
                	var blockC1 = loadedBlocks.values[j].c1; // get the two block corners
                	var blockC2 = loadedBlocks.values[j].c2;
                	if (Coords.sqCollide(this.p[i].c1,this.p[i].c2,blockC1,blockC2) && loadedBlocks.values[j].type!=="sky") { // check for a collision with a block
                		this.p[i] = null; // if there is a collision then destroy that projectile and get out of the loop
                		j+=100;
                	}
                }
            }
        }
        var loadedBlocks = world.getLoadedBlocks(this.c1, this.c2, 9); // get the loaded blocks for the ai

        for (var i = 0; i < loadedBlocks.values.length; i++) { // loop through the blocks
            var blockC1 = loadedBlocks.values[i].c1; // get the block's coords
            var blockC2 = loadedBlocks.values[i].c2;
            if (loadedBlocks.values[i].type !== "sky") {
                if (Coords.sqCollide(blockC1, blockC2, new Vector2(this.c1.x, this.c1.y - grav.ApplyGrav(this.vel.y, 3)), new Vector2(this.c2.x, this.c2.y - grav.ApplyGrav(this.vel.y, 3)))) { // check if it will run into the ground, again will be changed for collisions
                    this.c1.y = blockC1.y - 100; // sets the y values to the ground level
                    this.c2.y = blockC1.y;
                    this.grounded = true;
                    this.c1.x += this.vel.x; // add the x vel
                    this.c2.x += this.vel.x;
                    this.vel.y = 0;
                }
            }
        }

        if (!this.grounded) {
            this.vel.y = grav.ApplyGrav(this.vel.y, 3); // if ya won't run into the ground then add the velocity
        }
        var xDist = ((target.c1.x + target.c2.x) / 2) - ((this.c1.x + this.c2.x) / 2); // x distance from this to target
        var yDist = ((target.c1.y + target.c2.y) / 2) - ((this.c1.y + this.c2.y) / 2) - 50; // y distance from this to target
        // !-------------------------! AIMING !------------------------------!
        // vel is 10,  grav is 0.05
        var angle = Math.atan2(yDist, xDist); // angle without grav
        if (this.reloadTimer >= this.reloadTime) { // checking for reload
            if (Math.cos(angle) * xDist <= this.range) { // check if the hypotonuse or distance is beyond the range of the ai
                var a = 0; // setting the angle with gravity to 0 for the time being
                var xSlope = 0; // sets the xSlope to 0 for the time being
				var ySlope = 0;
                if (xDist < 0) { // if the player is to the left of the ai then
                    xDist *= -1; // note this shoots a lot like artillary, becuase I had trouble doing it any other way, sorry :*(
                    a = Math.atan2(100 + Math.pow(10000 + 0.1 * (0.1 * Math.pow(xDist, 2) + 2 * yDist * 100), 0.5), (0.1 * Math.abs(xDist))) + Math.PI;
					ySlope = -Math.sin(a) * 10; // calculate the disired yVelocity by taking the cosign of angle and using 10 as the hypotonuse
                    xSlope = Math.cos(a) * 10; // get the x slope
                } else { //
                    a = Math.atan2(100 + Math.pow(10000 + 0.1 * (0.1 * Math.pow(xDist, 2) + 2 * yDist * 100), 0.5), (0.1 * Math.abs(xDist))); // use an aiming function that can be found at: http://gamedev.stackexchange.com/questions/53552/how-can-i-find-a-projectiles-launch-angle
					ySlope = Math.sin(a) * 10; // calculate the disired yVelocity by taking the cosign of angle and using 10 as the hypotonuse
                    xSlope = Math.cos(a) * 10; // get the x slope
                }


                this.p.push(new Projectile(new Vector2((this.c1.x + this.c2.x) / 2 - 10, (this.c1.y + this.c2.y) / 2 - 10), new Vector2((this.c1.x + this.c2.x) / 2 + 10, (this.c1.y + this.c2.y) / 2 + 10), new Vector2(xSlope, ySlope), this)); // new projectile....
                this.reloadTimer = 0; // reset the reload
            } else if (Math.cos(angle) * xDist > this.range) { //  move if out of range
                this.c1.x += this.walkSpeed * (xDist / Math.abs(xDist));
                this.c2.x += this.walkSpeed * (xDist / Math.abs(xDist));
            }
        } else if (Math.cos(angle) * xDist > this.range) { //  move if out of range
            this.c1.x += this.walkSpeed * (xDist / Math.abs(xDist));
            this.c2.x += this.walkSpeed * (xDist / Math.abs(xDist));
        } else {
            this.reloadTimer++;
        }
        if (alive) {
            canvas.drawImage(this.pic, this.c1.x - player.c1.x + sWidth / 2, this.c1.y - player.c1.y + sHeight / 2 - 100, 100, 100); // draw the ai
        }
    }
}

function rect(x, y, x2, y2) {
    canvas.fillRect(x - player.c1.x + sWidth / 2, y - player.c2.y + (sHeight / 2), (x2 - x), (y2 - y)); //c1.x-player.c1.x+sWidth/2,this.blocks.getValue(i,j).c1.y+player.c2.y-sHeight
}

function cleanArray(arr) { // clean array...
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == undefined || arr[i] == null) {
            arr.splice(i, 1);
        }
    }
}
class Vector2 { // vector2 class fairly simple
    Add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
class Projectile { // projectile class
    constructor(c1, c2, vel, p) { // setting values
        this.c1 = c1; // set values
        this.c2 = c2;
        this.vel = vel;
        this.parentAi = p;
    }
    Update(canvas, grav, pic) { // update
        this.vel.y = grav.ApplyGrav(this.vel.y, 0.1); // apply grav

        this.c1.Add(new Vector2(this.vel.x, -this.vel.y)); // update velocity
        this.c2.Add(new Vector2(this.vel.x, -this.vel.y));
        if (alive) {
            canvas.drawImage(pic, this.c1.x - player.c1.x + sWidth / 2, this.c1.y - player.c2.y + (sHeight / 2), 25, 25); // draw projectile
        }
    }
}

function setDiff(amount) {
    world.SetDiff(amount);
}

var keys = []; // key reader
window.addEventListener("keydown", // check for keypress and get the key if it happens
    function(e) {
        keys[e.keyCode] = true; // sets the keycode value index in the array of boolean values to true to tell the program that that key is being pressed
    },
    false);
window.addEventListener('keyup', // check for keyup
    function(e) {
        keys[e.keyCode] = false; // if tells the computer that that key is not longer being pressed
    },
false);
