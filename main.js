
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
 * - You start with Time equals 30 Days 
 * - All you have is a button which says (go to work) which everytime you click on it it removes time from the clock and gives you money 
 * - Every time you click it saves your money 
 * - Then you will have options to buy guns
 * - Buy Ammo  
 * - Work another job (which will cost you time) but will get you more money faster 
 * 
 * - Once your time runs out It has begun 
 * 
 * - you then switch to a zombie surivial game where all you have is the stuff you saved and your goal is to surive the wave of 100 zombies 
 * And if you do you win other wise you failed 
 * 
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
}

/**
 * The Actual Game 
 */
class Game {
    constructor() {

    }
    /**
     * Starts the Game 
     */
    start() {

    }

    /**
     * Updates All the Components of the Game 
     */
    update() {

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
    }, 13000);

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

    showMainMenu(); //First it will show the main menu then go to the game
    setTimeout(function() {

        //Place Game Code In Here 
    }, 13000); //Will Start the Game After the Main Menu Screen Is Done 
}
main(); 