class QuestManager {
    /**
     * @constructor
     * @property {{Quest}} quests
     */
    constructor() {
        this.quests = {};
    }

    _initQuests() {
        /**
         * All SubQuests that I think don't need a whole Quest for I put in worldQuests
         */
        (() => {
            let worldQuests = this.addQuest('worldQuests', "World Quest", true)
                .setStart('newGame')
                .setEnd('newGame');
            worldQuests
                .addSubQuest('newGame')
                .setCondition(true)
                .setProgress(true)
                .setOnComplete(() => {
                    gameData.newGame = false;
                });
            worldQuests
                .addSubQuest('firstVisitTown')
                .setCondition(true)
                .setProgress(true);
            worldQuests
                .addSubQuest('introduceAntagonist')
                .setCondition(() => {
                    return GAME.quest.isComplete('townFuckQuest', 'Start');
                })
                .setProgress(true)
                .setDialogueTree("onSleep")
                .setDialogueBranch("introduceAntagonist");
            worldQuests
                .addSubQuest('naknuAfterHornyBoris')
                .setCondition(() => {
                    return GAME.quest.isComplete('hornyBoris');
                })
                .setProgress(true)
                .setDialogueTree("onSleep")
                .setDialogueBranch("naknuAfterHornyBoris");
        })();

        (() => {
            let upgradeHouse = this.addQuest('upgradeHouse', "Upgrade House", true)
                .setStart('upgradeHouse')
                .setEnd('upgradeHouse');
            upgradeHouse
                .addSubQuest('upgradeHouse')
                .setCondition(() => {
                    return GAME.getUpgradePayment() !== false;
                })
                .setProgress(true)
                .setMapKey('GeoffShop')
                .setMapIcon(false)
                .setDialogueTree('Geoff')
                .setDialogueBranch('upgradeHouse');
        })();

        (() => {
            let townFuckQuest = this.addQuest('townFuckQuest', "Welcome to Easthollow", true)
                .setStart('Start')
                .setEnd('End');
            townFuckQuest
                .addSubQuest('Start')
                .setCondition(true)
                .setProgress(true)
                .setMapKey('TownMayor')
                .setDialogueTree("TownMayor")
                .setDialogueBranch("townFuckQuestStart")
                .setLogDescription("Find some clients for your brothel");
            townFuckQuest
                .addSubQuest('End')
                .setCondition(() => {
                    return GAME.quest.isComplete('townFuckQuest', 'Start');
                })
                .setProgress(() => {
                    return GAME.quest.isComplete('worldQuests', 'introduceAntagonist');
                })
                .setMapKey('TownMayor')
                .setDialogueTree("TownMayor")
                .setDialogueBranch("townFuckQuestEnd")
                .setLogDescription("Come back and talk to the Mayor tomorrow")
                .setOnComplete(() => {
                    GAME.addGold(100);
                });
        })();

        (() => {
            let townMorals = this.addQuest('townMorals', "Queen's Morals", true)
                .setStart('Start')
                .setEnd('Start');
            townMorals
                .addSubQuest('Start')
                .setCondition(() => {
                    return GAME.quest.isComplete('townFuckQuest', 'End');
                })
                .setProgress(true)
                .setMapKey('TownSquare')
                .setDialogueTree('TownSquare')
                .setDialogueBranch('townMoralsStart')
                .setOnComplete((parameter) => {
                    if (parameter === true) {
                        GAME.girl.Queen.increaseMorals(1);
                        GAME.addGold(100);
                    } else {
                        GAME.girl.Queen.decreaseMorals(1);
                    }
                });
        })();

        (() => {
            let alphaBlack = this.addQuest('alphaBlack', "New Clothes", false)
                .setStart('Start')
                .setEnd('End');
            alphaBlack
                .addSubQuest('Start')
                .setCondition(() => {
                    return GAME.quest.isComplete('townFuckQuest') === true;
                })
                .setProgress(true)
                .setMapKey('TownMayor')
                .setDialogueTree('TownMayor')
                .setDialogueBranch('alphaBlackStart');
            alphaBlack
                .addSubQuest('End')
                .setCondition(() => {
                    return GAME.quest.isComplete('alphaBlack', 'Start');
                })
                .setProgress(() => {
                    return GAME.girl.Queen.getClothes().getID() === "DefaultQueen" && GAME.girl.Queen.getClothes().getPlayerStyle() === "AlphaBlack";
                })
                .setMapKey('TownMayor')
                .setDialogueTree('TownMayor')
                .setDialogueBranch('alphaBlackEnd')
                .setLogDescription("Go to the clothes shop and equip Queen's transparent black style")
                .setOnComplete(function () {
                    GAME.addGold(8);
                });
        })();

        (() => {
            let greenhaven = GAME.quest.addQuest('greenhaven', "Greenhaven", true)
                .setStart('Start')
                .setEnd('End');
            greenhaven
                .addSubQuest('Start')
                .setCondition((() => {
                    return GAME.quest.isComplete('townMorals');
                }))
                .setProgress(true)
                .setMapKey('TownMayor')
                .setDialogueTree('TownMayor')
                .setDialogueBranch('greenhavenStart');
            greenhaven
                .addSubQuest('End')
                .setCondition((() => {
                    return GAME.quest.isComplete('greenhaven', 'Start');
                }))
                .setProgress(true)
                .setLogDescription("Visit Greenhaven, east of Easthollow.")
                .setOnComplete(() => {
                    GAME.addGold(20);
                });
        })();

        (() => {
            let hornyBoris = GAME.quest.addQuest('hornyBoris', "Horny Boris", true)
                .setStart('Start')
                .setEnd('End');
            hornyBoris
                .addSubQuest('Start')
                .setCondition(() => {
                    return GAME.quest.isComplete('greenhaven');
                })
                .setProgress(true)
                .setMapKey('BorisHut')
                .setDialogueTree('Boris')
                .setDialogueBranch('hornyBorisStart');
            hornyBoris
                .addSubQuest('AskNirvokk')
                .setCondition(() => {
                    return GAME.quest.isComplete('hornyBoris', 'Start');
                })
                .setProgress(true)
                .setMapKey('NirvokkHut')
                .setDialogueTree('Nirvokk')
                .setDialogueBranch('hornyBorisAskNirvokk')
                .setLogDescription("Ask Nirvokk for permission to have sex with the residents of Greenhaven.");
            hornyBoris
                .addSubQuest('WhoreGreenhaven')
                .setCondition(() => {
                    return GAME.quest.isComplete('hornyBoris', 'AskNirvokk');
                })
                .setProgress(true)
                .setMapKey('VillageHangout')
                .setDialogueTree('VillageHangout')
                .setDialogueBranch('hornyBorisWhoreGreenhaven')
                .setOnComplete(() => {
                    GAME.addGold(250);
                })
                .setLogDescription("Have sex with the Greenhaven residents to gain popularity.");
            hornyBoris
                .addSubQuest('NaknuDialogue')
                .setCondition(() => {
                    return GAME.quest.isComplete('hornyBoris', 'WhoreGreenhaven');
                })
                .setProgress(true)
                .setDialogueTree('onSleep')
                .setDialogueBranch('hornyBorisNaknuDialogue')
                .setLogDescription("Go to sleep and try to find a new girl for your brothel tomorrow.");
            hornyBoris
                .addSubQuest('End')
                .setCondition(() => {
                    return GAME.quest.isComplete('hornyBoris', 'NaknuDialogue');
                })
                .setProgress(() => {
                    return GAME.quest.isComplete('sukiQuest', 'End');
                })
                .setMapKey('NirvokkHut')
                .setDialogueTree('Nirvokk')
                .setDialogueBranch('hornyBorisEnd')
                .setOnComplete(() => {
                    GAME.addGold(200);
                })
                .setLogDescription("Find another girl to join your brothel.");
        })();

        (() => {
            let sukiQuest = GAME.quest.addQuest('sukiQuest', "Find Another Girl", true)
                .setStart('Start')
                .setEnd('End');
            sukiQuest
                .addSubQuest('Start')
                .setCondition(() => {
                    return GAME.quest.isComplete('hornyBoris', 'NaknuDialogue');
                })
                .setProgress(true)
                .setMapKey('TownMayor')
                .setDialogueTree('TownMayor')
                .setDialogueBranch('sukiQuestStart');
            sukiQuest
                .addSubQuest('FindSuki')
                .setCondition(() => {
                    return GAME.quest.isComplete('sukiQuest', 'Start');
                })
                .setProgress(true)
                .setMapKey('JanitorsClosetButton')
                .setDialogueTree('janitorsCloset')
                .setDialogueBranch('sukiQuestFindSuki')
                .setLogDescription("Find a girl worthy enough to join Queen's brothel.");
            sukiQuest
                .addSubQuest('FindDaniel')
                .setCondition(() => {
                    return GAME.quest.isComplete('sukiQuest', 'FindSuki');
                })
                .setProgress(true)
                .setMapKey('CafeteriaButton')
                .setDialogueTree('SchoolCafeteria')
                .setDialogueBranch('sukiQuestFindDaniel')
                .setLogDescription("Find Daniel in the cafeteria.");
            sukiQuest
                .addSubQuest('FuckDaniel')
                .setCondition(() => {
                    return GAME.quest.isComplete('sukiQuest', 'FindDaniel');
                })
                .setProgress(true)
                .setMapKey('JanitorsClosetButton')
                .setDialogueTree('janitorsCloset')
                .setDialogueBranch('sukiQuestFuckDaniel')
                .setLogDescription("Go to the janitor's closet.")
                .setOnComplete(() => {
                    GAME.addGold(50);
                });
            sukiQuest
                .addSubQuest('End')
                .setCondition(() => {
                    return GAME.quest.isComplete('sukiQuest', 'FuckDaniel');
                })
                .setProgress(() => {
                    return GAME.checkMax() === false;
                })
                .setMapKey('CafeteriaButton')
                .setDialogueTree('SchoolCafeteria')
                .setDialogueBranch('sukiQuestEnd')
                .setLogDescription("Ask Geoff to upgrade your house to recruit Suki.")
                .setOnComplete(() => {
                    GAME.girl.Suki.unlock();
                })
        })();

        (() => {
            let mushroomQuest = GAME.quest.addQuest('mushroomQuest', "Magic Mushrooms", true)
                .setStart('Start')
                .setEnd('End');
            mushroomQuest
                .addSubQuest('Start')
                .setCondition(() => {
                    return GAME.quest.isComplete('worldQuests', 'naknuAfterHornyBoris');
                })
                .setProgress(true)
                .setMapKey('NirvokkHut')
                .setDialogueTree('Nirvokk')
                .setDialogueBranch('mushroomQuestStart');
            mushroomQuest
                .addSubQuest('BuildBoat')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'Start');
                })
                .setProgress(true)
                .setMapKey('VillageHangout')
                .setDialogueTree('VillageHangout')
                .setDialogueBranch('mushroomQuestBuildBoat')
                .setLogDescription("Help build a boat to cross the morass.");
            mushroomQuest
                .addSubQuest('Introduce')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'BuildBoat');
                })
                .setProgress(true)
                .setMapKey('Inn')
                .setDialogueTree('MorassInn')
                .setDialogueBranch('mushroomQuestIntroduce')
                .setLogDescription("Visit the Morass.");
            mushroomQuest
                .addSubQuest('Perform')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'Introduce');
                })
                .setProgress(true)
                .setMapKey('Inn')
                .setDialogueTree('MorassInn')
                .setDialogueBranch('mushroomQuestPerform')
                .setLogDescription("Perform at the Inn to earn a mushroom.");
            mushroomQuest
                .addSubQuest('NaknuSoil')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'Perform');
                })
                .setProgress(true)
                .setDialogueTree('onSleep')
                .setDialogueBranch('mushroomQuestNaknuSoil')
                .setLogDescription("Get some rest before giving Thisa the mushrooms.");
            mushroomQuest
                .addSubQuest('ReturnThisa')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'NaknuSoil');
                })
                .setProgress(true)
                .setMapKey('NirvokkHut')
                .setDialogueTree('Nirvokk')
                .setDialogueBranch('mushroomQuestReturnThisa')
                .setLogDescription("Give the mushroom to Thisa.");
            mushroomQuest
                .addSubQuest('Boss')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'ReturnThisa');
                })
                .setProgress(true)
                .setMapKey('Pond')
                .setDialogueTree('MorassPond')
                .setDialogueBranch('mushroomQuestBoss')
                .setLogDescription("Visit the morass.")
                .setOnComplete(() => {
                    GAME.addGold(300);
                });
            mushroomQuest
                .addSubQuest('End')
                .setCondition(() => {
                    return GAME.quest.isComplete('mushroomQuest', 'Boss');
                })
                .setProgress(() => {
                    return GAME.checkMax() === false;
                })
                .setMapKey('House1')
                .setDialogueTree('MorassHouse1')
                .setDialogueBranch('mushroomQuestEnd')
                .setLogDescription("Recruit Esxea into your brothel.")
                .setLogProgress(() => {
                    if (GAME.checkMax() === true) {
                        return "Talk to Geoff to upgrade your house!"
                    } else {
                        return "";
                    }
                })
                .setOnComplete(() => {
                    GAME.girl.Esxea.unlock();
                });
        })();
    }

    /**
     * @method addQuest
     * @memberOf QuestManager
     * @instance
     * @param {string} id
     * @param {string} name
     * @param {boolean} [important=false]
     * @returns {Quest}
     */
    addQuest(id, name, important) {
        important = important || false;
        if (gameData.quests.hasOwnProperty(id) === false) {
            gameData.quests[id] = {};
        }

        this.quests[id] = new Quest(id, name, important);

        return this.quests[id];
    }

    /**
     * Completing a quest sets the quest status to true and runs the onComplete function if there is one.
     * @method complete
     * @memberOf QuestManager
     * @instance
     * @param {string} questID
     * @param {string} subquestID
     * @param {*} [onCompleteParameter] - If you need to pass anything into the onCompleteParameter function
     */
    complete(questID, subquestID, onCompleteParameter) {
        this.getQuest(questID, subquestID).complete(onCompleteParameter);
    }

    /**
     * @method isComplete
     * @memberOf QuestManager
     * @instance
     * @param {string} questID
     * @param {string} [subquestID]
     * @returns {boolean}
     */
    isComplete(questID, subquestID) {
        if (subquestID) {
            return this.quests[questID].getSubQuests(subquestID).isComplete();
        } else {
            return this.quests[questID].isComplete();
        }
    }

    /**
     * @method getAllQuests
     * @memberOf QuestManager
     * @instance
     * @returns {object}
     */
    getAllQuests() {
        return this.quests;
    }

    /**
     * @method getQuest
     * @memberOf QuestManager
     * @instance
     * @param {string} questID
     * @param {string} [subquestID]
     * @returns {Quest|SubQuest}
     */
    getQuest(questID, subquestID) {
        if (subquestID) {
            return this.quests[questID].getSubQuests(subquestID);
        } else {
            return this.quests[questID];
        }
    }

    /**
     * Returns subquests
     * @method getActiveQuests
     * @memberOf QuestManager
     * @instance
     * @param {string} [mapKey]
     * @returns {Array<SubQuest>}
     */
    getActiveQuests(mapKey) {
        let questArray = [];

        let quests = this.getAllQuests();

        for (let questID in quests) {
            let quest = quests[questID];
            let subquests = quests[questID].getSubQuests();

            for (let subquestID in subquests) {
                let subquest = subquests[subquestID];
                if (subquest.isAvailable() === true && subquest.getStatus() === false) {
                    if (mapKey) {
                        if (subquest.getMapKey() === mapKey) {
                            questArray.push(subquest);
                        }
                    } else {
                        questArray.push(subquest);
                    }
                }
            }
        }

        return questArray;
    }

    /**
     * @method isActive
     * @memberOf QuestManager
     * @instance
     * @param questID
     * @param subquestID
     * @returns {boolean}
     */
    isActive(questID, subquestID) {
        let activeQuests = this.getActiveQuests();

        for (let subquest of activeQuests) {
            let quest = subquest.getQuest();

            if (quest.getID() === questID) {
                if (subquestID) {
                    if (subquest.getID() === subquestID) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }

        return false;
    }
}

class Quest {
    /**
     * @constructor
     * @param {string} id
     * @param {string} name
     * @param {boolean} [important=false] - If the quest log should show this as a pink or grey heart
     * @property {string} start - The ID of the SubQuest that is the start of the quest
     * @property {string} end - The ID of the SubQuest that is the end of the quest
     * @property {boolean} completed - Is the quest completed
     * @returns {Quest}
     */
    constructor(id, name, important) {
        this.id = id;
        this.name = name;
        this.important = important || false;

        this.subquests = {};
        this.start = "";
        this.end = "";

        this.completed = false;
    }

    /**
     * Checks to see if subquest this.end is complete
     * @method isComplete
     * @memberOf Quest
     * @instance
     * @returns {boolean}
     */
    isComplete() {
        this.completed = this.getSubQuests(this.end).isComplete();

        return this.completed;
    }

    /**
     * @method addSubQuest
     * @memberOf Quest
     * @instance
     * @param {string} id
     * @returns {SubQuest}
     */
    addSubQuest(id) {
        if (gameData.quests[this.id].hasOwnProperty(id) === false) {
            gameData.quests[this.id][id] = false;
        }

        this.subquests[id] = new SubQuest(id)._setQuest(this);

        return this.subquests[id];
    }

    /**
     * @method setID
     * @memberOf Quest
     * @instance
     * @param id
     * @returns {Quest}
     */
    setID(id) {
        this.id = id;
        return this;
    }

    /**
     * @method getID
     * @memberOf Quest
     * @instance
     * @returns {string}
     */
    getID() {
        return this.id;
    }

    /**
     * @method setName
     * @memberOf Quest
     * @instance
     * @param name
     * @returns {Quest}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * @method getName
     * @memberOf Quest
     * @instance
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @method setImportant
     * @memberOf Quest
     * @instance
     * @param boolean
     * @returns {Quest}
     */
    setImportant(boolean) {
        this.important = boolean;
        return this;
    }

    /**
     * @method getImportant
     * @memberOf Quest
     * @instance
     * @returns {boolean}
     */
    getImportant() {
        return this.important;
    }

    /**
     * @method getSubQuests
     * @memberOf Quest
     * @instance
     * @param {string} [subquestID]
     * @returns {{}|*}
     */
    getSubQuests(subquestID) {
        if (subquestID) {
            return this.subquests[subquestID];
        } else {
            return this.subquests;
        }
    }

    /**
     * @method setStart
     * @memberOf Quest
     * @instance
     * @param {string} subquestID
     * @returns {Quest}
     */
    setStart(subquestID) {
        this.start = subquestID;

        return this;
    }

    /**
     * @method getStart
     * @memberOf Quest
     * @instance
     * @returns {string}
     */
    getStart() {
        return this.start;
    }

    /**
     * @method setEnd
     * @memberOf Quest
     * @instance
     * @param {string} subquestID
     * @returns {Quest}
     */
    setEnd(subquestID) {
        this.end = subquestID;

        return this;
    }

    /**
     * @method getEnd
     * @memberOf Quest
     * @instance
     * @returns {string}
     */
    getEnd() {
        return this.end;
    }
}

class SubQuest {
    constructor(id) {
        this._QUEST = {};
        this.id = id;
        this.condition = false;
        this.progress = false;
        this.mapKey = "";
        this.mapIcon = true;
        this.dialogueTree = "";
        this.dialogueBranch = "";
        this.onComplete = function (parameter) {
        };
        this.log = {
            description: "",
            progress: ""
        };

        this.completed = false;

        return this;
    }

    _setQuest(quest) {
        this._QUEST = quest;

        return this;
    }

    /**
     * @method getQuest
     * @memberOf SubQuest
     * @instance
     * @returns {Quest}
     */
    getQuest() {
        return this._QUEST;
    }

    /**
     * @method isStart
     * @memberOf SubQuest
     * @instance
     * @returns {boolean}
     */
    isStart() {
        return this.getQuest().getStart() === this.getID();
    }

    /**
     * Checks if the quest status is true
     * @method isComplete
     * @memberOf SubQuest
     * @instance
     * @returns {boolean}
     */
    isComplete() {
        return this.getStatus() === true;
    }

    /**
     * Sets the quest status to true
     * @method complete
     * @memberOf SubQuest
     * @instance
     * @param {*} onCompleteParameter
     * @returns {SubQuest}
     */
    complete(onCompleteParameter) {
        this.setStatus(true);
        this.onComplete(onCompleteParameter);

        return this;
    }

    /**
     * Assign any value to the gameData save value
     * @method setStatus
     * @memberof SubQuest
     * @instance
     * @param {*} status
     * @returns {SubQuest}
     */
    setStatus(status) {
        gameData.quests[this.getQuest().getID()][this.getID()] = status;

        this.completed = gameData.quests[this.getQuest().getID()][this.getID()];

        return this;
    }

    /**
     * @method getStatus
     * @memberOf SubQuest
     * @instance
     * @returns {*}
     */
    getStatus() {
        this.completed = gameData.quests[this.getQuest().getID()][this.getID()];

        return this.completed;
    }

    /**
     * @method setID
     * @memberOf SubQuest
     * @instance
     * @param {string} id
     * @returns {SubQuest}
     */
    setID(id) {
        this.id = id;
        return this;
    }

    /**
     * @method getID
     * @memberOf SubQuest
     * @instance
     * @returns {string}
     */
    getID() {
        return this.id;
    }

    /**
     * @method setCondition
     * @memberOf SubQuest
     * @instance
     * @param {function|boolean} condition - Function that returns a boolean
     * @returns {SubQuest}
     */
    setCondition(condition) {
        this.condition = condition;

        return this;
    }

    /**
     * @method isAvailable
     * @memberOf SubQuest
     * @instance
     * @returns {boolean|*}
     */
    isAvailable() {
        if (typeof this.condition === "boolean") {
            return this.condition && (this.getStatus() === false);
        } else {
            return this.condition();
        }
    }

    /**
     * @method getProgress
     * @memberOf SubQuest
     * @instance
     * @returns {boolean}
     */
    getProgress() {
        if (typeof this.progress === "boolean") {
            return this.progress;
        } else {
            return this.progress();
        }
    }

    /**
     * @method setProgress
     * @memberOf SubQuest
     * @instance
     * @param {function|boolean} progress
     * @returns {SubQuest}
     */
    setProgress(progress) {
        this.progress = progress;

        return this;
    }

    /**
     * @method setMapKey
     * @memberOf SubQuest
     * @instance
     * @param {string} mapKey
     * @returns {SubQuest}
     */
    setMapKey(mapKey) {
        this.mapKey = mapKey;

        return this;
    }

    /**
     * @method getMapKey
     * @memberOf SubQuest
     * @instance
     * @returns {string}
     */
    getMapKey() {
        return this.mapKey;
    }

    /**
     * @method setMapIcon
     * @memberOf SubQuest
     * @instance
     * @param {boolean} mapIcon
     * @returns {SubQuest}
     */
    setMapIcon(mapIcon) {
        this.mapIcon = mapIcon;

        return this;
    }

    /**
     * @method getMapIcon
     * @memberOf SubQuest
     * @instance
     * @returns {boolean}
     */
    getMapIcon() {
        return this.mapIcon;
    }

    /**
     * @method setDialogueTree
     * @memberOf SubQuest
     * @instance
     * @param {string} dialogueTreeID
     * @returns {SubQuest}
     */
    setDialogueTree(dialogueTreeID) {
        this.dialogueTree = dialogueTreeID;

        return this;
    }

    /**
     * @method getDialogueTree
     * @memberOf SubQuest
     * @instance
     * @returns {string}
     */
    getDialogueTree() {
        return this.dialogueTree;
    }

    /**
     * @method setDialogueBranch
     * @memberOf SubQuest
     * @instance
     * @param {string} branchID
     * @returns {SubQuest}
     */
    setDialogueBranch(branchID) {
        this.dialogueBranch = branchID;

        return this;
    }

    /**
     * @method getDialogueBranch
     * @memberOf SubQuest
     * @instance
     * @returns {string}
     */
    getDialogueBranch() {
        return this.dialogueBranch;
    }

    /**
     * @method setOnComplete
     * @memberOf SubQuest
     * @instance
     * @param {function} callback
     * @returns {SubQuest}
     */
    setOnComplete(callback) {
        this.onComplete = callback;

        return this;
    }

    /**
     * @method getOnComplete
     * @memberOf SubQuest
     * @instance
     * @returns {function}
     */
    getOnComplete() {
        return this.onComplete();
    }

    /**
     * @method setLogDescription
     * @memberOf SubQuest
     * @instance
     * @param {string} text
     * @returns {SubQuest}
     */
    setLogDescription(text) {
        this.log.description = text;
        return this;
    }

    /**
     * @method getLogDescription
     * @memberOf SubQuest
     * @instance
     * @returns {string}
     */
    getLogDescription() {
        return this.log.description;
    }

    /**
     * @method getLogProgress
     * @memberOf SubQuest
     * @instance
     * @returns {string}
     */
    getLogProgress() {
        if (typeof this.log.progress === "function") {
            return this.log.progress();
        } else {
            return this.log.progress;
        }
    }

    /**
     * @method setLogProgress
     * @memberOf SubQuest
     * @instance
     * @param {string|function} text
     * @returns {SubQuest}
     */
    setLogProgress(text) {
        this.log.progress = text;
        return this;
    }
}