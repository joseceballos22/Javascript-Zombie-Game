
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
 * 
 * 
 * - Once your time runs out It has begun (The Zombie Survival Game) (watch video on how to build this )
 * - you then switch to a zombie surivial game where all you have is the stuff you saved and your goal is to surive the wave of 100 zombies 
 * And if you do you win other wise you failed 
 * 
 * 
 * Future Things To Add: 
 * - Add sound 
 * - Add more guns to the clicker game and the zombie game 
 * - Add Zombie waves 
 * - See how long they can survive 
 * 
 */

/**
 * Things Left To Do For Clicker Game:
 * - Make it so that when the player clicks Earn Money Money Goes UP as Well 
 * - Add A Button Shop which will initially Sell 
 * - (Get another Job ) And this will exponentially grow Which will double money earned and double time lost 
 * - (Buy Ammo ) Which will Exponentially Increase As the Player buys more ammo (Supply and demand) and be stored in the players inventory 
 * - (Buy Pistol) Which can only be bought once and then just ammo for it 
 * 
 * - FUTURE THINGS
 * - Buy Lives 
 * - Buy Armor
 * - Buy AK- 47 
 * - Buy Submachine gun 
 * 
 * - Then Make it so that when the time runs out the zombie game will start and the player will join with his inventory stuff 
 * 
 * Things Left To DO For the Zombie Game: 
 * - (DO THE ENTIRE GAME WATCH VIDEO ON HOW TO DO THIS ) 
 */

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
    
    /**
     * This is like the Draw function in the sense that it refreshs the components after they have been updated 
     */
    refreshComponents() {

    }
}

/**
 * Represents the Humans
 */
class Human {
    constructor() {

    }

    /**
     * Updates all the components a human has 
     */
    updateComponents() {

    }
    
    /**
     * This is like the Draw function in the sense that it refreshs the components after they have been updated 
     */
    refreshComponents() {

    }
}

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
    updateComponents(userTime) {
        
        /**Everytime the Button Gets Clicked  */
        this.clicker.onclick = function() {
            let userNumTime = parseInt(userTime.innerHTML.split(" ")[1]); //getting the latest Time
            userNumTime--; //Subtracting one 
            userTime.innerHTML = userTime.innerHTML.split(" ")[0] + " " + userNumTime;
            console.log("User Pressed Button")
        };
    }
    
}

/**
 * The Clicker Game First Part  
 */
class ClickerGame {
    constructor() {

        //Creating a Clicker 
        this.clicker = new Clicker(); 

        //Making the User Info Elements Visible 
        document.getElementById("userInfo").style.display = "block";

        //Getting the User Info Elements 
        this.userTime = document.getElementById("userTime");
        // this.userNumTime = parseInt(this.userTime.innerHTML.split(" ")[this.userTime.innerHTML.split(" ").length -1]);//Represents the UserTime as an Integer
        this.userMoney = document.getElementById("userMoney");
        this.userInventory = document.getElementById("userInventoryList"); //Will hold the ammo, guns, etc ... 
    
    }
    /**
     * Starts the Game 
     */
    start() {

        //Turning the Background into a Happy Background 
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(images/happyBackground.jpg)";
        //Changing the title To a happy Title 
        document.getElementById("title").innerHTML = "Happy Land";

        /**Automatically Decrease the time by one second */
        setInterval(function() {
            let userNumTime = parseInt(this.userTime.innerHTML.split(" ")[1]); //Getting the Latest Time
            userNumTime--; //Subtracting one every Second
            this.userTime.innerHTML = this.userTime.innerHTML.split(" ")[0] + " " + userNumTime;
        }, 1000); 

        this.updateComponents(); //Calling the Update Function 
    }

    /**
     * Updates All the Components of the Game 
     */
    updateComponents() {

        /**Updates the User Time Every Time the User Presses the Button */
        this.clicker.updateComponents(this.userTime); //Updating all the components of the Clicker 
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

    // /**
    //  * ------------- UnComment Once You Finished the Game -------------
    //  */
    // showMainMenu(); //First it will show the main menu then go to the game
    // setTimeout(function() {

    //     //Place Game Code In Here 
    //     //First thing Doing the clicker Game 
    //     clickerGame = new ClickerGame(); 
    //     clickerGame.start(); //Starting the Clicker Game 

    //     //Second Thing Doing the Zombie Game 

    // }, 15000); //Will Start the Game After the Main Menu Screen Is Done 

    clickerGame = new ClickerGame();
    clickerGame.start(); 

}
main(); 