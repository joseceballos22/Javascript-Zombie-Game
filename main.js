
/**
 * My Game Idea: 
 * 
 * (Main Menu ) It will show these things Every At the beginning in the main function and will show each text every 5 seconds and then start the game
 * Initially: 
 * - Everyone thinks you're crazy
 * - But you know the Truth 
 * - the government is hiding something .... 
 * - And you know something big is coming 
 * 
 * - Starting the Game:
 * - You start with Time equals 86400 Seconds (One Day Real Life)
 * - Every Real Second One Second Goes Down 
 * 
 * - All you have is a button which says (Earn Money) which everytime you click on it it removes 1 second time from the clock and gives you money 
 * - Every time you click it saves your money 
 * - Then you will have options to buy guns waste money but expensive 
 * - Buy Ammo  
 * - Work another job (which will cost you time) but will get you more money faster 
 * 
 * - For the clicker game the user will need money, time, and inventory which is a un ordered list of things the user bought 
 * - These things in the inventory will be taken to the file boss round 
 * 
 * 
 * - Once your time runs out It has begun (The Zombie Survival Game) (watch video on how to build this )
 * - you then switch to a zombie surivial game where all you have is the stuff you saved and your goal is to surive the wave of 100 zombies 
 * And if you do you win other wise you failed 
 * 
 * 
 * Future Things To Add: 
 * - Fix the initial prices of the game 
 * - Add sound (priortize this) (music)
 * - Replace All Classes into separate files and just export them (And have a Main Game Class which will do work main function doing)
 * - Add more guns to the clicker game and the zombie game 
 * - FUTURE SHOP THINGS 
 *      - Buy Player Speed so they can play it in a different way 
 *      - Buy Lives 
 *      - Buy Armor
 *      - Buy AK- 47 
 *      - Buy Submachine gun 
 * - Add Zombie waves 
 * - See how long they can survive 
 * 
 */

/**
 * Due Friday MVP STUFF 
 * Things Left To DO For the Zombie Game: 
 * - The entire game will be done on a canvas element 
 * 
 * Things Left for the overall game 
 * - Read the Introduction to the player (record it and use the sound in it )
 * - Add Inviduial Multiplier for bullet , workers, get job, guns (In Clicker Game to give it a better strategy feel)
 * - Submit Game to itch io 
 */

/**
 * Represents the Economy Of the Clicker Game
 * 
 */
const USER_MULTIPLIER_FACTOR = 2; //User Will get twice as strong 
const USER_PRICE_FACTOR = 2; //While prices get Twice As Strong 

const USER_WEAPON_FACTOR = 10; //Makes it so that they can only Buy 1 Of each 


/**
 * Canvas Element Used For Zombie Game
 */
const zombieGameCanvas = document.getElementById("zombieGameCanvas");

/**Selecting our Canvas Context which is needed to create entities on the canvas (Canvas API to draw on canvas) 
 * 
 * Calling it Something simple since will be using alot 
 * c for context 
*/
const context = zombieGameCanvas.getContext('2d');

/**
 * Allows us to record the Survivor To Move 
 */
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup" , keyUp);
const keys = {}; //Keeps track of the keys pressed { key, boolean }

function keyDown(e) {
    // console.log("Player Pressed: " + e.keyCode);
	keys[e.keyCode] = true; //Key is pressed 
}

function keyUp(e) {
    // console.log("Player Pressed: " + e.keyCode);
	keys[e.keyCode] = false; //No longer pressed
}

//Gives Random Number 
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

/**
 * Defining Constants 
 */
const screenW = 1200;
const screenH = 800; 



/**
 * Represents the Zombie Game 
 */
class ZombieGame {
    constructor() {
        //Creating a Survivor
        this.survivor = new Survivor(); 

        //Creating a list which will contain all the little zombies 
        this.zombieList = []; //Initially Empty


        
        /**
         * will spawn zombies every 10 seconds 
         */
        this.zombieSpawnRate = 100; //Every Second it will spawn a zombie  

        this.zombieSpawnCounter = 0; //Initially Zero 

    }

    /**
     * Enables the Components of the Game 
     */
    enableComponents() {
        //Hiding all the Clicker Game Stuff 
        document.getElementById("battleBackground").style.display = "block"; //Showing the Battle background
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/whiteBackground.png)"; //Just going to use a white background
        document.getElementById("title").style.display = "none";

        //Enabling the Go Home Button 
        document.getElementById("switchToClickerGame").style.display = "block";

        /**Showing The Survivor Title */
        document.getElementById("survivorTitle").style.display = "block"

        /** Showing Instructions  */
        document.getElementById("zombieGameInstructions").style.display = "block";

        /** Showing the Canvas On the screen */
        document.getElementById("zombieGameCanvas").style.display = "block";

        /**Enabling the Survivor Components */
        this.survivor.enableComponents(); 
    }
    /**
     * Disables the Components of the Game 
     */
    disableComponenets() {
        //Hiding all the Zombie Game Stuff
        document.getElementById("battleBackground").style.display = "none"; 
        // document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/happyBackground.png)"; //Switching to the clicker Background
        // document.getElementById("title").style.display = "block"; //Enabling the Title 

        //Disabling the Go Home Button 
        document.getElementById("switchToClickerGame").style.display = "none";

        /**Disabling The Survivor Title */
        document.getElementById("survivorTitle").style.display = "none"

        /** Hiding Instructions  */
        document.getElementById("zombieGameInstructions").style.display = "none";

        /** Hiding the Canvas On the screen */
        document.getElementById("zombieGameCanvas").style.display = "none";

        /**Hiding the Survivor Components */
        this.survivor.disableComponenets(); 
    }

    /**
     * Starts the Zombie Game
     */
    start() {
        this.updateComponents(); //Updating all the components in the zombie game 
        this.draw(); //Draws all the components of the game
    }

    /**
     * Updates all the components of the Zombie Game 
     */
    updateComponents() {
        this.survivor.updateComponents();

        this.zombieList.forEach((zombie, zombieIndex) => {
            zombie.updateComponents(); //Updating the Zombies 

            //Zombie Out of Map Remove it 
            if(zombie.isInMap === false) {
                this.zombieList.splice(zombieIndex, 1);
            }
        });

        this.spawnZombies(); //Spawn Zombies 

        console.log("Zombie Count On Screen: " +  this.zombieList.length);

        this.zombieSpawnCounter += 1; //Incrementing the Zombie Counter 

    }

    /**
     * Spawns zombies to the screen Depending on the zombie Spawn rate 
     * Randomly From Right To Left  
     */
    spawnZombies() {

        console.log(this.zombieSpawnCounter);

        if(this.zombieSpawnCounter >= this.zombieSpawnRate) {
            console.log("Called")
            let zombiePosY = getRandomInt(screenH - 100);
            let zombiePosX = screenW; 
            this.zombieList.push(new Zombie(zombiePosX, zombiePosY));

            this.zombieSpawnCounter = 0; //Resetting the Counter 
        }


    }
    
    /**
     * Draws all the components of the Zombie Game On the canvas 
     */
    draw() {
        context.clearRect(0, 0, zombieGameCanvas.width, zombieGameCanvas.height)  //Clearing First 
        this.survivor.draw();

        //Drawing all the zombies on the screen 
        if(this.zombieList.length > 0) {
            for(const i in this.zombieList) {
                this.zombieList[i].draw(); //Drawing every zombie in the list 
            }
        }

    }
}

/**
 * Represents the Zombie
 * 
 * Zombies Can Only Move From Right To Left 
 */
class Zombie {
    constructor(posX, posY ,health=1, speed=5, width=100, height=100) {
        /**Getting the Zombies Image  */
        this.zombieImage = document.getElementById("zombieImage");
        
        /**Defining the Zombies Rect */
        this.posX = posX;
        this.posY = posY;
        this.width = width; 
        this.height = height;

        /**Zombie Health */
        this.health = health; 

        /**Determines if the zombie is still in the map */
        this.isInMap = true; //Initially true

        /**Determines the zombie speed */
        this.speed = speed;

    }

    /**
     * Updates all the components a Zombie has 
     */
    updateComponents() {
        this.moveZombie(); //Constantly Moving the Zombie 
        this.checkIfInMap(); //Constantly Checks if the zombie is still in the map 
    }

    /**
     * Constantly Moves the Zombie to From Right To Left 
     */
    moveZombie() {
        this.posX -= this.speed;
    }

    /**
     * Determines if the zombie is still in the map 
     */
    checkIfInMap() {
        if(this.posX <= 0) {
            this.isInMap = false; 
        }
    }

    /** Draws the Zombies On the screen */
    draw() {
        context.drawImage(this.zombieImage, this.posX,this.posY, this.width, this.height); //THIS DRAWS THE Zombie On the Screen 
    }
    
}

/**
 * Represents the Survivor
 */
class Survivor {
    constructor() {

        /**Getting A Reference to the Survivor Inventory Stuff*/
        this.survivorPistol = document.getElementById("survivorPistol");
        this.survivorAmmo = document.getElementById("survivorAmmo");
        this.survivorSpeed = document.getElementById("survivorSpeed");
        this.bulletSpeed = document.getElementById("bulletSpeed");
        this.bulletDamage = document.getElementById("bulletDamage");

        /**Updating Survivor Inventory Elements With Clicker Stuff */
        this.updateInventoryElements();

        //Updating the Survivors Inventory Nums With the latest things from clicker game 
        this.updateInventoryNums(); 

        /**Getting the Survivor Image  */
        this.survivorImage = document.getElementById("survivorImage");
        
        /**Defining the Survivors position */
        this.posX = 400; 
        this.posY = 400;
        this.width = 100; 
        this.height = 100;
    }

    /**
     * Enables the Componenets of the Survivor
     */
    enableComponents() {
        /**Showing the Survivor Inventory */
        document.getElementById("survivorInventory").style.display = "block";
    }

    /**
     * Disables The Components of the Survivor
     */
    disableComponenets() {
        /**Hiding the Survivor Inventory */
        document.getElementById("survivorInventory").style.display = "none";
    }


    /**
     * Updates all the components a Survivor has 
     */
    updateComponents() {
        this._movePlayer(); //Moving the player
        // console.log("Player X Pos: " + this.posX);
        // console.log("Player Y Pos: " + this.posY);
        this._checkBoundaries(); //Ensures we are within the border
        
        /**Updating Survivor Inventory Elements With Clicker Stuff */
        this.updateInventoryElements();

        //Updating the Survivors Inventory Nums With the latest things from clicker game 
        this.updateInventoryNums(); 

    }
    /** Limits The player so that he can't go outside the border 
	 * 
	 */
	_checkBoundaries() {
		
		//Limits going out right 
		if(this.posX >= screenW - this.width) {
			this.posX = screenW - this.width;
		}
		//Limits going out left 
		if(this.posX <= 0) {
			this.posX = 0;
		}
		//Limits going out down
		if(this.posY >= screenH - this.height) {
			this.posY = screenH - this.height;
		}
		
		//Limits going out up
		if(this.posY <= 0) {
			this.posY = 0;
		}

    }
    /**
     * Moves the Survivor
     */
    _movePlayer() {
		// W
		if(keys["87"])
		{
			this.posY -= this.speed;
		}
		//A
		if(keys["65"])
		{
			this.posX -= this.speed;
		}
		//S
		if(keys["83"])
		{
			this.posY += this.speed;
		}
		//D
		if(keys["68"])
		{
			this.posX += this.speed;
		}
	}

    /** Draws the Survior On the screen */
    draw() {
        context.drawImage(this.survivorImage, this.posX,this.posY, this.width, this.height); //THIS DRAWS THE Survivor On the Screen 
    }

    
    /**
     * Updates Surivivor Html Elements with Clicker Game Stuff
     */
    updateInventoryElements() {
        /**Updating Survivor Pistol with Clicker Game Inventory */
        let pistolAmount = parseInt(document.getElementById("userPistol").innerHTML.split(" ")[2]);
        this.survivorPistol.innerHTML = this.survivorPistol.innerHTML.split(" ")[0] + " " + pistolAmount;
        /**Updating Survivor Ammo With Clicker Game Inventory */
        let ammoAmount = parseInt(document.getElementById("userAmmo").innerHTML.split(" ")[2]);
        this.survivorAmmo.innerHTML = this.survivorAmmo.innerHTML.split(" ")[0] + " " + ammoAmount;
        
        /**Updating Survivor Speed With Clicker Game Inventory */
        let survivorSpeed = parseInt(document.getElementById("userSpeed").innerHTML.split(" ")[2]);
        this.survivorSpeed.innerHTML = this.survivorSpeed.innerHTML.split(" ")[0] + " " + survivorSpeed;

        /**Updating Bullet Speed With Clicker Game Inventory */
        let bulletSpeed = parseInt(document.getElementById("userBulletSpeed").innerHTML.split(" ")[3]);
        this.bulletSpeed.innerHTML = this.bulletSpeed.innerHTML.split(" ")[0] + " " + bulletSpeed;

        /**Updating Bullet Damage With Clicker Game Inventory */
        let bulletDamage = parseInt(document.getElementById("userBulletDamage").innerHTML.split(" ")[3]);
        this.bulletDamage.innerHTML = this.bulletDamage.innerHTML.split(" ")[0] + " " + bulletDamage;
    }

    /**
     * Updates Survivor Inventory Numswith Clicker Game Stuff
     */
    updateInventoryNums() {
        /**
         * Updates User Inventory With Clicker Game Stuff
         */
        this.userHasPistol = parseInt(this.survivorPistol.innerHTML.split(" ")[1]) > 0 ? true : false; //Determines if the user Has A Pistol Or Not
        this.ammo = parseInt(this.survivorAmmo.innerHTML.split(" ")[1]);
        this.speed = 5 + parseInt(this.survivorSpeed.innerHTML.split(" ")[1]);  
        this.bulletSpeedNum = 1 + parseInt(this.bulletSpeed.innerHTML.split(" ")[1]); 
        this.bulletDamageNum = 1 + parseInt(this.bulletDamage.innerHTML.split(" ")[1]);
    }
}


/**
 * Simple Collision Detection 
 */
class CollisionDetection {
    constructor(first, second) {
       this.first = first;
       this.second = second; 
    }
    /**
     * Simple Collision Method Which 
     * Returns True if colliding 
     * Returns False If Not 
     */
    checkForCollision() {
        let isColliding = false; //Initially Not colliding 

        /**
         * Getting the positions of the first and second surfaces 
         */
        
    }
}

/**
 * ----------------- Everything Above Here Represents the Zombie Game ---------------------
 * Everything Below Here Represents the Clicker Game 
 */

/**
 * Represents the Clicker 
 */
class Clicker {
    constructor() {
        this.clicker = document.getElementById("clicker");
        this.clicker.style.display = "block"; //Enabling the Clicker 
    }
    /**
     * Updates All the components a clicker has
     */
    updateComponents(user) {

        const {
            userTime,
            userMoney,
            userMultiplier,
        } = user;
        
        /**Everytime the Button Gets Clicked  */
        this.clicker.onclick = function() {

            //Ensuring the Time is Not Zero 
            let getCurrentTime = parseInt(userTime.innerHTML.split(" ")[1]);
            if(getCurrentTime > 0) {
                //Time is Gets affected by money made therefore we will subtract the same from both 
                let factor =  parseInt(userMultiplier.innerHTML);

                //Updating latest time 
                let userNumTime = parseInt(userTime.innerHTML.split(" ")[1]); //getting the latest Time
                userNumTime -= factor; //Subtracting one 
                userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + userNumTime;
                console.log("User Pressed Button")

                //Updating Money 
                let userNumMoney = parseInt(userMoney.innerHTML.split(" ")[1]); //Getting the latest Money 
                userNumMoney += factor; //Adding one dollar times the factor for every click 
                userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + userNumMoney;  //Incrementing the Money Label

            }
            getCurrentTime = parseInt(userTime.innerHTML.split(" ")[1]); //Getting Current Time Again 
            //Ensures no Negative Time 
            if(getCurrentTime <= 0) {
                userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + 0;

                //Still Can Earn Money 
                //Updating Money 
                let factor =  parseInt(user.userMultiplier.innerHTML);
                let userNumMoney = parseInt(userMoney.innerHTML.split(" ")[1]); //Getting the latest Money 
                userNumMoney += factor; //Adding one dollar times the factor for every click 
                userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + userNumMoney;  //Incrementing the Money Label

            }
        };
    }
    /**
     * Hides all the Html elements of the clicker
     */
    terminate() {
        this.clicker.style.display = "none";
    }

    /**
     * Enables all the Html elements of the clicker
     */
    enable() {
        this.clicker.style.display = "block";
    }
    
}

/**
 * Represents the User Shop 
 */
class UserShop {
    constructor() {
        //Making the User Shop Elements Visible 
        document.getElementById("userShop").style.display = "block";

        //Getting the User Shop Elements 
        this.userGetAnotherJob = document.getElementById("getAnotherJob");
        this.userHireWorker = document.getElementById("hireWorker");
        this.userBuyAmmo = document.getElementById("buyAmmo");
        this.userBuyPistol = document.getElementById("buyPistol");
        this.userBuyPlayerSpeed = document.getElementById("buyPlayerSpeed");
        this.buyBulletSpeed = document.getElementById("buyBulletSpeed");
        this.buyBulletDamage = document.getElementById("buyBulletDamage");
    }

    /**
     * Updates all the components of the user shop 
     */
    updateComponents(user) {

        const {
            userTime,
            userMoney,
            userInventory,
        } = user;

        //Needed Since (This variable not allowed in dynamic function calls)
        const userGetAnotherJobTag = this.userGetAnotherJob;
        const userHireWorkerTag = this.userHireWorker;
        const userBuyAmmoTag = this.userBuyAmmo;
        const userBuyPistolTag = this.userBuyPistol;

        const userBuyPlayerSpeedTag = this.userBuyPlayerSpeed;
        const buyBulletSpeedTag = this.buyBulletSpeed;
        const buyBulletDamageTag = this.buyBulletDamage;

        /**Checking If User Wants to Double the Money Multipler */
        this.userGetAnotherJob.onclick = function() {
            /**First Check if the user Has the money for it  */
            let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
            let oldPrice = parseInt(userGetAnotherJobTag.innerHTML.split(" ")[3]);
            
            const userHasMoney = (oldMoney >= oldPrice) ? true : false;
            console.log(userHasMoney)
            if(userHasMoney) {
                //Updating the User Multiplier
                let oldMultiplier = parseInt(user.userMultiplier.innerHTML);
                let newMultiplier = Math.round(oldMultiplier * USER_MULTIPLIER_FACTOR);

                user.userMultiplier.innerHTML = newMultiplier.toString();

                //Updating the user money Tag And the Price of the Upgrade 
                let newMoney = oldMoney - oldPrice;
                user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 

                let newPrice = oldPrice * USER_PRICE_FACTOR; 
                let tempLst = userGetAnotherJobTag.innerHTML.split(" ");
                let firstPartMsg = "";
                //Don't want the last element
                for(let i = 0; i < tempLst.length - 1; i++) {
                    firstPartMsg += tempLst[i] + " "; 
                }
                userGetAnotherJobTag.innerHTML = firstPartMsg + newPrice;
            }

        }
        /**
         * Checking if the user Wants to hire a worker 
         */
        this.userHireWorker.onclick = function() {
             /**First Check if the user Has the money for it  */
             let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
             let oldPrice = parseInt(userHireWorkerTag.innerHTML.split(" ")[3]);
             
             const userHasMoney = (oldMoney >= oldPrice) ? true : false;
             console.log(userHasMoney)
             if(userHasMoney) {
                //Setting a Worker To Click Every Second Using the Players Multiplier 
                setInterval(function() {
                    
                    //Ensuring the Time is Not Zero 
                    let getCurrentTime = parseInt(userTime.innerHTML.split(" ")[1]);
                    if(getCurrentTime > 0) {
                        //Subtracting the Time 
                        let userNumTime = parseInt(userTime.innerHTML.split(" ")[1]); //Getting the Latest Time
                        let factor =  parseInt(user.userMultiplier.innerHTML);
                        userNumTime -= factor; //Using the Players Multipler 
                        this.userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + userNumTime;

                        //Getting Money From the worker and updating tag 
                        let userNumMoney = parseInt(userMoney.innerHTML.split(" ")[1]); //Getting the latest Money 
                        userNumMoney += factor; //Adding one dollar times the factor for every click 
                        userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + userNumMoney;  //Incrementing the Money Label
                        
                        console.log("Time Wasted " + userNumTime);
                        console.log("Getting Money: " + userNumMoney);
                    }

                    getCurrentTime = parseInt(userTime.innerHTML.split(" ")[1]); //Getting Current Time Again 
                    //Ensures no Negative Time 
                    if(getCurrentTime <= 0) {
                        userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + 0;
                        
                        console.log("Called")
                        //Still Can Do Work After Time to Earn Money 
                        //Updating Money 
                        let factor =  parseInt(user.userMultiplier.innerHTML);
                        let userNumMoney = parseInt(userMoney.innerHTML.split(" ")[1]); //Getting the latest Money 
                        userNumMoney += factor; //Adding one dollar times the factor for every click 
                        userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + userNumMoney;  //Incrementing the Money Label

                    }

                 }, 1000);

                 //Subtracting Money And Changing Price Money Of Worker 
                 //Updating the user money Tag And the Price of the Upgrade 
                let newMoney = oldMoney - oldPrice;
                user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 

                let newPrice = oldPrice * USER_PRICE_FACTOR; 
                let tempLst = userHireWorkerTag.innerHTML.split(" ");
                let firstPartMsg = "";
                //Don't want the last element
                for(let i = 0; i < tempLst.length - 1; i++) {
                    firstPartMsg += tempLst[i] + " "; 
                }
                userHireWorkerTag.innerHTML = firstPartMsg + newPrice;
             }
        }
        /**
         * Checking if the user wants to Buy Ammo 
         */
        this.userBuyAmmo.onclick = function() {
            /**First Check if the user Has the money for it  */
            let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
            let oldPrice = parseInt(userBuyAmmoTag.innerHTML.split(" ")[2]);

            const userHasMoney = (oldMoney >= oldPrice) ? true : false;
            console.log(userHasMoney)
            if(userHasMoney) {
                //Updating the User Ammo Count to include an extra one 
                let oldAmmoCount = parseInt(user.userAmmo.innerHTML.split(" ")[2]); 
                let newAmmoCount = oldAmmoCount + 1; 
                //Getting the First Part 
                let userAmmoLst = user.userAmmo.innerHTML.split(" ");
                let userAmmoFirstPart = "";
                for(let i = 0; i < userAmmoLst.length - 1; i++)
                {
                    userAmmoFirstPart += userAmmoLst[i] + " ";
                }
                //Updating the User Ammo Tag With the Newly Added Bullet 
                user.userAmmo.innerHTML = userAmmoFirstPart + newAmmoCount;

                 //Updating the user money Tag And the Price of the Upgrade 
                 let newMoney = oldMoney - oldPrice;
                 user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 
 
                 let newPrice = oldPrice * USER_PRICE_FACTOR; 
                 let tempLst = userBuyAmmoTag.innerHTML.split(" ");
                 let firstPartMsg = "";
                 //Don't want the last element
                 for(let i = 0; i < tempLst.length - 1; i++) {
                     firstPartMsg += tempLst[i] + " "; 
                 }
                 userBuyAmmoTag.innerHTML = firstPartMsg + newPrice;

            } 
        }
        /**
         * Checking if the user wants to buy a Pistol
         */
        this.userBuyPistol.onclick = function() {
            /**First Check if the user Has the money for it  */
            let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
            let oldPrice = parseInt(userBuyPistolTag.innerHTML.split(" ")[2]);

            const userHasMoney = (oldMoney >= oldPrice) ? true : false;
            console.log(userHasMoney)
            if(userHasMoney) {

                //Updating the User Pistol Count to include an extra one 
                let oldPistolCount = parseInt(user.userPistol.innerHTML.split(" ")[2]); 
                let newPistolCount = oldPistolCount + 1; 
                //Getting the First Part 
                let userPistolLst = user.userPistol.innerHTML.split(" ");
                let userPistolFirstPart = "";
                for(let i = 0; i < userPistolLst.length - 1; i++)
                {
                    userPistolFirstPart += userPistolLst[i] + " ";
                }
                //Updating the User Pistol Tag With the Newly Added Pistol
                user.userPistol.innerHTML = userPistolFirstPart + newPistolCount;

                //Updating the user money Tag And the Price of the Upgrade 
                let newMoney = oldMoney - oldPrice;
                user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 

                let newPrice = oldPrice * USER_WEAPON_FACTOR; 
                let tempLst = userBuyPistolTag.innerHTML.split(" ");
                let firstPartMsg = "";
                //Don't want the last element
                for(let i = 0; i < tempLst.length - 1; i++) {
                    firstPartMsg += tempLst[i] + " "; 
                }
                userBuyPistolTag.innerHTML = firstPartMsg + newPrice;

            }
        }
        /** Checking if the user wants to buy Player Speed */
        this.userBuyPlayerSpeed.onclick = function() {
            /**First Check if the user Has the money for it  */
            let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
            let oldPrice = parseInt(userBuyPlayerSpeedTag.innerHTML.split(" ")[3]);

            const userHasMoney = (oldMoney >= oldPrice) ? true : false;
            console.log(userHasMoney)
            if(userHasMoney) {
                //Updating the User Speed Count to include an extra one 
                let oldCount = parseInt(user.userSpeed.innerHTML.split(" ")[2]); 
                let newCount = oldCount + 1; 
                //Getting the First Part 
                let lst = user.userSpeed.innerHTML.split(" ");
                let firstPart = "";
                for(let i = 0; i < lst.length - 1; i++)
                {
                    firstPart += lst[i] + " ";
                }
                //Updating the User Speed Tag With the Newly Added Speed
                user.userSpeed.innerHTML = firstPart + newCount;


                //Updating the user money Tag And the Price of the Upgrade 
                let newMoney = oldMoney - oldPrice;
                user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 

                let newPrice = oldPrice * USER_PRICE_FACTOR; 
                let tempLst = userBuyPlayerSpeedTag.innerHTML.split(" ");
                let firstPartMsg = "";
                //Don't want the last element
                for(let i = 0; i < tempLst.length - 1; i++) {
                    firstPartMsg += tempLst[i] + " "; 
                }
                userBuyPlayerSpeedTag.innerHTML = firstPartMsg + newPrice;

            }
        };
        /**
         * Checking If the user wants to buy Bullet Speed
         */
        this.buyBulletSpeed.onclick = function() {
            /**First Check if the user Has the money for it  */
            let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
            let oldPrice = parseInt(buyBulletSpeedTag.innerHTML.split(" ")[3]);
            
            const userHasMoney = (oldMoney >= oldPrice) ? true : false;
            console.log(userHasMoney)
            if(userHasMoney) {
                //Updating the Bullet Speed Count to include an extra one 
                let oldCount = parseInt(user.userBulletSpeed.innerHTML.split(" ")[3]); 
                let newCount = oldCount + 1; 
                //Getting the First Part 
                let lst = user.userBulletSpeed.innerHTML.split(" ");
                let firstPart = "";
                for(let i = 0; i < lst.length - 1; i++)
                {
                    firstPart += lst[i] + " ";
                }
                //Updating the Bullet Speed Tag With the Newly Added Speed
                user.userBulletSpeed.innerHTML = firstPart + newCount;

                //Updating the user money Tag And the Price of the Upgrade 
                let newMoney = oldMoney - oldPrice;
                user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 

                let newPrice = oldPrice * USER_PRICE_FACTOR; 
                let tempLst = buyBulletSpeedTag.innerHTML.split(" ");
                let firstPartMsg = "";
                //Don't want the last element
                for(let i = 0; i < tempLst.length - 1; i++) {
                    firstPartMsg += tempLst[i] + " "; 
                }
                buyBulletSpeedTag.innerHTML = firstPartMsg + newPrice;
            }
        };
        /**
         * Checking If The user wants to buy Bullet Damage 
         */
        this.buyBulletDamage.onclick = function() {
            /**First Check if the user Has the money for it  */
            let oldMoney = parseInt(userMoney.innerHTML.split(" ")[1]);
            let oldPrice = parseInt(buyBulletDamageTag.innerHTML.split(" ")[3]);
            
            //Used For Debugging
            console.log("MONEY" + oldMoney); 
            console.log("PRICE " + oldPrice);

            const userHasMoney = (oldMoney >= oldPrice) ? true : false;
            console.log(userHasMoney)
            if(userHasMoney) {
                //Updating the Bullet Damage Count to include an extra one 
                let oldCount = parseInt(user.userBulletDamage.innerHTML.split(" ")[3]); 
                let newCount = oldCount + 1; 
                //Getting the First Part 
                let lst = user.userBulletDamage.innerHTML.split(" ");
                let firstPart = "";
                for(let i = 0; i < lst.length - 1; i++)
                {
                    firstPart += lst[i] + " ";
                }
                //Updating the Bullet Damage Tag With the Newly Added Damage
                user.userBulletDamage.innerHTML = firstPart + newCount;

                //Updating the user money Tag And the Price of the Upgrade 
                let newMoney = oldMoney - oldPrice;
                user.userMoney.innerHTML = userMoney.innerHTML.split(" ")[0] + " " + newMoney; 

                let newPrice = oldPrice * USER_PRICE_FACTOR; 
                let tempLst = buyBulletDamageTag.innerHTML.split(" ");
                let firstPartMsg = "";
                //Don't want the last element
                for(let i = 0; i < tempLst.length - 1; i++) {
                    firstPartMsg += tempLst[i] + " "; 
                }
                buyBulletDamageTag.innerHTML = firstPartMsg + newPrice;
            }
        };
    }

    /**
     * Hides all the html elements from the screen 
     */
    terminate() {
        document.getElementById("userShop").style.display = "none";
    }
    /**
     * Re enables all html elements from the screen
     */
    enable() {
        document.getElementById("userShop").style.display = "block";
    }

}

/**
 * Represents the User Of the Clicker Game 
 */
class User {
    constructor() {
        //Making the User Info Elements Visible 
        document.getElementById("userInfo").style.display = "block";

        //Getting the User Info Elements 
        this.userTime = document.getElementById("userTime");
        // this.userNumTime = parseInt(this.userTime.innerHTML.split(" ")[this.userTime.innerHTML.split(" ").length -1]);//Represents the UserTime as an Integer
        this.userMoney = document.getElementById("userMoney");
        this.userInventory = document.getElementById("userInventoryList"); //Will hold the ammo, guns, etc ... 
        //Getting the User Ammo
        this.userAmmo = document.getElementById("userAmmo");
        //Getting the User Pistol Tag
        this.userPistol = document.getElementById("userPistol");

        //Getting the User Speed 
        this.userSpeed = document.getElementById("userSpeed");
        
        //Getting the User Bullet Speed
        this.userBulletSpeed = document.getElementById("userBulletSpeed");

        //Getting the User Bullet Damage 
        this.userBulletDamage = document.getElementById("userBulletDamage");
        
        this.userMultiplier = document.getElementById("userMultiplier"); //Initially Multiplying by one 

        //Defining the Actual Javascript Representations Of the Html elements 
        this.userNumTime = parseInt(this.userTime.innerHTML.split(" ")[1]);
        this.userNumMoney = parseInt(this.userMoney.innerHTML.split(" ")[1]);

    }
    /**
     * Updates all the components a user has 
     */
    updateComponents() {
        // //Constantly Updates the UserTime With the Latest Time 
        // this.userTime.innerHTML = this.userTime.innerHTML.split(" ")[0] + " " + this.userNumTime;
        // this.userMoney.innerHTML = this.userMoney.innerHTML.split(" ")[0] + " " + this.userNumMoney;
    }
    /**
     * Hides All the Html Elements From the screen 
     */
    terminate() {
        this.userTime.style.display = "none";
        this.userMoney.style.display = "none";
        document.getElementById("userInfo").style.display = "none";
    }
    /**
     * Re Enables the Html Elements 
     */
    enable() {
        this.userTime.style.display = "block";
        this.userMoney.style.display = "block";
        document.getElementById("userInfo").style.display = "block";
    }
}

/**
 * The Clicker Game First Part  
 */
class ClickerGame {
    constructor() {

        //Creating a Clicker 
        this.clicker = new Clicker(); 

        //Creating a User Shop 
        this.userShop = new UserShop(); 

        //Creating a User 
        this.user = new User(); 

        //Is Game Over 
        this.isClickerGameOver = document.getElementById("isClickerGameOver"); //Initially False

        //Switch Game Button 
        this.switchGameButton = document.getElementById("switchGameButton");

    }
    /**
     * Starts the Game 
     */
    start() {

        //Turning the Background into a Happy Background 
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/happyBackground.jpg)";
        //Changing the title To a happy Title 
        document.getElementById("title").innerHTML = "Happy Land";

        const userTime = this.user.userTime;
        const isClickerGameOverTag = this.isClickerGameOver;
        const switchGameButtonTag = this.switchGameButton;
        /**Automatically Decrease the time by one second */
        setInterval(function() {

            //Ensuring the Time is Not Zero 
            let getCurrentTime = parseInt(userTime.innerHTML.split(" ")[1]);
            if(getCurrentTime > 0) {
                let userNumTime = parseInt(userTime.innerHTML.split(" ")[1]); //Getting the Latest Time
                userNumTime--; //Subtracting one every Second
                this.userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + userNumTime;
            }

            getCurrentTime = parseInt(userTime.innerHTML.split(" ")[1]); //Getting Current Time Again 
            //Ensures no Negative Time 
            if(getCurrentTime <= 0) {
                userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + 0;
                isClickerGameOverTag.innerHTML = "true"; //Game Is Over
            }


        }, 1000); 

        /**
         * Checks Every Second if the Clicker Game Has Finished 
         * IF So A button will appear 
         * IF The User Presses That Button it Will Hide All The Clicker Stuff 
         * And Start the Zombie Game 
         * 
         */
        setInterval(function() {
            //The Clicker Game Is Over
            if(isClickerGameOverTag.innerHTML == "true") {
                switchGameButtonTag.style.display = "block"; //Making the Button Visible 
            }
        });




        this.updateComponents(); //Calling the Update Function 
    }

    /**
     * Updates All the Components of the Game 
     */
    updateComponents() {

        /**Updates the User Time Every Time the User Presses the Button */
        this.clicker.updateComponents(this.user); 

        /**Updates the User Shop  */
        this.userShop.updateComponents(this.user); 

        /**Updates the User */
        this.user.updateComponents(); 
    }

    /**
     * Hides all the clicker Game Html Elements From the Screen
     */
     disableGame() {
        this.clicker.terminate();
        this.userShop.terminate();
        this.user.terminate();
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/whiteBackground.png)"; //Just going to use a white background
        document.getElementById("title").style.display = "none"; //Disabling Title 
        this.switchGameButton.style.display = "none"; //Disabling Button 
     }

     /**
      * ReEnables Game
      */
     enableGame() {
        this.clicker.enable();
        this.userShop.enable(); 
        this.user.enable();
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/happyBackground.jpg)"; 
        document.getElementById("title").style.display = "block"; //Enabling Title 
        this.switchGameButton.style.display = "block"; //Enabling The Button So they Can Go Back and fourth
     }
}

/**
 * The Main Menu Which Will show the introduction text first and then disappear 
 */
function showMainMenu() {

    let main_menu_text_1 = document.getElementById("main_menu_1");
    let main_menu_text_2 = document.getElementById("main_menu_2");
    let main_menu_text_3 = document.getElementById("main_menu_3");
    let main_menu_text_4 = document.getElementById("main_menu_4");

    //Adding Audio 
    let introMusic = new Audio('sounds/introMusic.mp3');

    introMusic.play();

    /**Intially Hide All the Elements  */
    hideText(["main_menu_1","main_menu_2","main_menu_3","main_menu_4"]);

    setTimeout(function() {
        main_menu_text_1.style.display = "block";
    }, 2000);
    
    setTimeout(function() {
        hideText(["main_menu_1"]);
        main_menu_text_2.style.display = "block";
    }, 5000);
    setTimeout(function() {
        hideText(["main_menu_2"]);
        main_menu_text_3.style.display = "block";
    }, 8000);
    setTimeout(function() {
        hideText(["main_menu_3"]);
        main_menu_text_4.style.display = "block";
    }, 11000);
    setTimeout(function() {
        hideText(["main_menu_4"]);
    }, 15000);

}

/**Hides the Text Of Html Elements */
function hideText(lstOfElementsIds) {

    console.log(lstOfElementsIds);
    for(const i in lstOfElementsIds) {
        document.getElementById(lstOfElementsIds[i]).style.display = "none";
    }
}


/**
 * Main Function Which Will Start the Game 
 */
function main() {

    /**
     * ------------- Finished Version (Uncomment Once Done) -------------
     */
    // showMainMenu(); //First it will show the main menu then go to the game
    // setTimeout(function() {

        /**Creating the Clicker Game */
        const clickerGame = new ClickerGame(); 

        /**Creating and Starting the Zombie Game */
        const zombieGame = new ZombieGame();

        /**Getting a Reference to the HTML Game Switching Buttons */
        const switchGameButton = document.getElementById("switchGameButton");
        const goToClickerGameButton = document.getElementById("switchToClickerGame");

        let isClickerGameRunning = true; //This will determine if the clicker game is currently running 

        clickerGame.start(); //Initially The Clicker Game will be running

        //This Button is Only Visible While in the Clicker Game And the Clicker Game is time is Over 
        switchGameButton.onclick = function() {
            console.log("Going to the Zombie Game");
            /**Clicker Game is No Longer Running  */
            isClickerGameRunning = false; 

            clickerGame.disableGame();

            zombieGame.enableComponents();//Enabling the Zombie Game Components

            /**
             * Updating all the components of the zombie Game And Drawing Them on the Canvas 
             * As long as the ClickerGame is Not Running
             */
            setInterval(function() {
                if(isClickerGameRunning === false) {
                    zombieGame.start();
                }
            }, 33);// 33 milliseconds = 30 frames per sec

        };

        //This Button is Only visible While in the Zombie Game 
        goToClickerGameButton.onclick = function() {
            console.log("Going To the Clicker Game");
            isClickerGameRunning = true; //Clicker Game is Now Running 

            zombieGame.disableComponenets(); //Disabling the Components of the Zombie Game 

            clickerGame.enableGame(); //Enabling the Clicker Game

        };
        


    // }, 15000); //Will Start the Game After the Main Menu Screen Is Done 


}
main(); 