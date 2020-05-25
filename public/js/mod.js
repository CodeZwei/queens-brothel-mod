/**
 * This example mod will teach you how to:
 * Change Queen's default clothes to a new image
 * Add new clothes
 * Add a new Quest
 * Add dialogue trees
 * Change dialogues
 * Create your own battles
 */

// Please keep your code inside this function to prevent messing with global variables.
(() => {
    let mod = new Mod("MyMod");
    mod.name = "My Mod";

    /**
     * How to load your own images.
     * This code changes Queen's default clothes to a new asset, which I put in the asset directory
     * Mod's images are loaded before the default game's images are loaded so our mod's clothes won't be overwritten
     */
    mod.loadImage("Queen-Clothes-DefaultQueen", "assets/Queen-Clothes-DefaultQueen.png");
    // Loading the images needed for our new clothes
    mod.loadImage('Queen-Clothes-TitFlapQueen', 'assets/Queen-Clothes-TitFlapQueen.png');
    mod.loadImage('TitFlapQueen', 'assets/TitFlapQueen.png');


    /**
     * The init() function is called when after the default game's variables are initialized
     */
    mod.init = () => {
        /**
         * Here we will create new clothes with the ID "TitFlapQueen"
         * We are going to put them in the shop so we setShop(true)
         * They will cost 100 gold so we setCost(100)
         * We are going to have them be visible right at the start of the game so we setVisible(true)
         *
         * If we wanted to add a visibility condition we would do something like:
         * .setVisible(() => {return mod.girl.Queen.getLevel() > 1;})
         * This would make it so that the clothes are only visible if Queen is over level 1
         */
        let clothes = new Clothes('TitFlapQueen', 'Queen', false)
            .setName("Tit Flap")
            .setDescription("Clothes that let people easily access Queen's bosom.")
            .setShop(true)
            .setCost(100)
            .setVisible(true)
            .setLevel(0)
            .setStat({Tits: 3});
        mod.clothes.add(clothes);

        /**
         * Here we will create a new quest and subquests.
         * setCondition - The quest will only be available if this function/boolean returns true
         * setProgress - The quest will be available, but the player won't be able to complete it unless this function/boolean returns true
         * setMapKey - See the tips at the bottom of this .js file to find mapKeys
         */
        let quest = mod.quest.addQuest('easthollowFuck', "Easthollow Fuck", false)
            .setStart('Start')
            .setEnd('End');
        quest
            .addSubQuest('Start')
            .setCondition(true)
            .setProgress(true)
            .setMapKey('TownSquare')
            .setDialogueTree('easthollowFuck')
            .setDialogueBranch('easthollowFuckStart');
        quest
            .addSubQuest('End')
            .setCondition(() => {
                return mod.quest.isComplete('easthollowFuck', 'Start');
            })
            .setProgress(true)
            .setMapKey('TownSquare')
            .setDialogueTree('easthollowFuck')
            .setDialogueBranch('easthollowFuckEnd')
            .setLogDescription("Visit the town square for some more epic cockage.")
            .setOnComplete(() => {
                mod.addGold(100);
                mod.girl.getGirl('Queen').gainExp(80);
            });

        /**
         * Here we will create a new battle with Queen as our only girl
         * We will add two clients, one who is passive and one who is a cummer
         */
        let battle = new Battle(['Queen']);

        let client1 = new BattleClient('', 3,[new BattleClientTypePassive()],'Throat',10000)
            .setGold(10);

        let client2 = new BattleClient('', 5,[new BattleClientTypeCummer()],'Pussy',6000)
            .setGold(20);

        battle.addClient(client1);
        battle.addClient(client2);

        /**
         * Here we will create our dialogue
         * I am using the same tree, named easthollowFuck, for all of our quest's dialogue, but you do not have to.
         * Trees have branches, and branches can have branches
         * See all the DialogueSteps in DialogueManager.js to find all the methods you can use during dialogues
         */
        let tree = mod.dialogue.addDialogueTree("easthollowFuck");
        let easthollowFuckStart = tree
            .addBranch('easthollowFuckStart')
            .talk('Mayor', "Hey Queen, wouldn't it be cool if you had sex with some guys right now?")
            .question(["Yes I would love to.", "No thanks!"], false, "Should Queen have sex with some guys?", "Queen")
            .ifLastAnswer(1, 'yes')
            .ifLastAnswer(2, 'no');
        let easthollowFuckYes = easthollowFuckStart
            .addBranch('yes')
            .talk('Queen', "Yes Mayor, I am a whore after all.")
            .talk('Mayor', "Yes, you do partake in the sexual intercourse with other people for monetary purposes.")
            .talk('Queen', "Commencing clothes removal. Beep boop.")
            .setNaked('Queen', true)
            .talk('Queen', "Oh look! Here comes the men and their big dongs!")
            .battle(battle)
            .ifLastAnswer(true, 'win')
            .ifLastAnswer(false, 'lose');
        easthollowFuckStart
            .addBranch('no')
            .talk('Queen', "No Mayor, I am not a whore.")
            .talk('Mayor', "Very well, have a great day.");

        easthollowFuckYes
            .addBranch('win')
            .Flash()
            .talk('Queen', "Yes, I have successfully made liquid come out of the men's genitals.")
            .talk('Mayor', "Excellent cockage boys, have a great day.")
            .talk('Queen', "Goodbye Mayor of Easthollow.")
            .completeQuest('easthollowFuck', 'Start');
        easthollowFuckYes
            .addBranch('lose')
            .talk('Queen', "Oh man I sure do suck at having sex!");

        let easthollowFuckEnd = tree
            .addBranch('easthollowFuckEnd')
            .talk('Mayor', "Queen, the boys need some more cock drainage.")
            .talk('Queen', "I am the perfect receptacle for that.")
            .Flash()
            .cumOn('Queen', 'Throat', 3)
            .talk('Queen', "My face has been drenched.")
            .cumOn('Queen', 'Tits', 3)
            .talk('Queen', "And now my breasts.")
            .cumOn('Queen', 'Pussy', 3)
            .talk('Queen', "But alas, I have become a cum dumpster.")
            .talk('Mayor', "Keep up the great work Queen.")
            .talk('Mayor', "Why did DPMaker make our dialogue so weird?")
            .Fade()
            .completeQuest('easthollowFuck', 'End')
            .popUp("Congrats! Queen has been drenched.")
            .popUp("This is a yes/no pop up.", true)
            .ifLastAnswer(true, 'endYes')
            .ifLastAnswer(false, 'endNo');
        easthollowFuckEnd
            .addBranch('endYes')
            .talk('Queen', "Yes");
        easthollowFuckEnd
            .addBranch('endNo')
            .talk('Queen', "No");
    };

    /**
     * The boot() function is called after the game has loaded / when the player is able to play the game
     */
    mod.boot = () => {

    };
})();

/**
 * Tips
 *
 * How to find maps & buildings
 * mod.map.getMap() will bring you all of the maps
 * mod.map.getBuildings(mapID) will return all of the buildings and their keys
 * Example:
 * mod.map.getBuildings('Town') will return the town of Easthollow. You can use the key value for quest's .setMapKey() function
 *
 *
 */