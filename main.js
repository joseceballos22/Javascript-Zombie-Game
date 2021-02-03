
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
 * - Add sound (priortize this)
 * - Replace All Classes into separate files and just export them (And have a Main Game Class which will do work main function doing)
 * - Add more guns to the clicker game and the zombie game 
 * - FUTURE SHOP THINGS 
 *      - Buy Lives 
 *      - Buy Armor
 *      - Buy AK- 47 
 *      - Buy Submachine gun 
 * - Add Zombie waves 
 * - See how long they can survive 
 * - Fix hardcoded array usuage throughout the program (Make it so that it depends on length )
 */

/**
 * Things Left To Do For Clicker Game:
 * 
 * - Then Make it so that when the time runs out 
 * A button will appear which will close the Clicker game (It Has Begun ) 
 * Open the zombie game with the players inventory stuff 
 * 
 * Things Left To DO For the Zombie Game: 
 * - (DO THE ENTIRE GAME WATCH VIDEO ON HOW TO DO THIS ) 
 */

/**
 * Represents the Economy Of the Clicker Game
 */
const USER_MULTIPLIER_FACTOR = 2; //User Will get twice as strong 
const USER_PRICE_FACTOR = 2; //While prices get Twice As Strong 

const USER_WEAPON_FACTOR = 10; //Makes it so that they can only Buy 1 Of each 


/**
 * Represents the Zombie
 */
class Zombie {
    constructor() {

    }

    /**
     * Updates all the components a Zombie has 
     */
    updateComponents() {

    }
    
}

/**
 * Represents the Survivor
 */
class Survivor {
    constructor() {
        /**Showing the Survivor Inventory */
        document.getElementById("survivorInventory").style.display = "block";

        /**Getting A Reference to the Survivor Inventory Stuff*/
        this.survivorPistol = document.getElementById("survivorPistol");
        this.survivorAmmo = document.getElementById("survivorAmmo");

        /**Updating Survivor Inventory with Clicker Game Inventory */
        let pistolAmount = parseInt(document.getElementById("userPistol").innerHTML.split(" ")[2]);
        this.survivorPistol.innerHTML = this.survivorPistol.innerHTML.split(" ")[0] + " " + pistolAmount;

        let ammoAmount = parseInt(document.getElementById("userAmmo").innerHTML.split(" ")[2]);
        this.survivorAmmo.innerHTML = this.survivorAmmo.innerHTML.split(" ")[0] + " " + ammoAmount;
    }

    /**
     * Updates all the components a Survivor has 
     */
    updateComponents() {

    }

}

/**
 * Represents the Zombie Game 
 */
class ZombieGame {
    constructor() {
        //Hiding all the Clicker Game Stuff 
        document.getElementById("battleBackground").style.display = "block"; //Showing the Battle background
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/whiteBackground.png)"; //Just going to use a white background
        document.getElementById("title").style.display = "none";

        /**Showing The Survivor Title */
        document.getElementById("survivorTitle").style.display = "block"

        /** Showing Instructions  */
        document.getElementById("zombieGameInstructions").style.display = "block";
        //Creating a Survivor
        this.survivor = new Survivor(); 


    }
    /**
     * Starts the Zombie Game
     */
    start() {

        this.updateComponents(); //Updating all the components in the zombie game 
    }
    /**
     * Updates all the components of the Zombie Game 
     */
    updateComponents() {
        this.survivor.updateComponents();
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
            }
        };
    }
    /**
     * Hides all the Html elements from the screen
     */
    terminate() {
        this.clicker.style.display = "none";
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

        /**Checking If User Wants to Get another Job */
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
            
            //Used For Debugging
            console.log("MONEY" + oldMoney); 
            console.log("PRICE " + oldPrice);

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
    }

    /**
     * Hides all the html elements from the screen 
     */
    terminate() {
        document.getElementById("userShop").style.display = "none";
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
     terminateGame() {
        this.clicker.terminate();
        this.userShop.terminate();
        this.user.terminate();
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/whiteBackground.png)"; //Just going to use a white background
        document.getElementById("title").style.display = "none"; //Disabling Title 
        this.switchGameButton.style.display = "none"; //Disabling Button 
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
     * ------------- UnComment Once You Finished the Game -------------
     */
    showMainMenu(); //First it will show the main menu then go to the game
    setTimeout(function() {

        //Place Game Code In Here 
        //First thing Doing the clicker Game 
        const clickerGame = new ClickerGame(); 
        clickerGame.start(); //Starting the Clicker Game 

        //Second Thing Doing the Zombie Game 

        //This Button is Only Visible Once the Clicker Game Is Over 
        const switchGameButton = document.getElementById("switchGameButton");
        switchGameButton.onclick = function() {
        //Hide all the clickerGame Html Elements
        clickerGame.terminateGame(); //Hides All the Elements 
        
        /**Creating and Starting the Zombie Game */
        const zombieGame = new ZombieGame();
        zombieGame.start(); 
        
    };

    }, 15000); //Will Start the Game After the Main Menu Screen Is Done 

    // const zombieGame = new ZombieGame();

    // zombieGame.start(); 
    

}
main(); 