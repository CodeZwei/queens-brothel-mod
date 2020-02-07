/**
 * @typedef {object} MapManager.map
 * @property {boolean|string} north - id of the map north of this map or false
 * @property {boolean|string} south - id of the map south of this map or false
 * @property {boolean|string} east - id of the map eest of this map or false
 * @property {boolean|string} west - id of the map west of this map or false
 * @example
 * {
 *     "north": false,
 *     "south": false,
 *     "east": "Greenhaven",
 *     "west": false
 * }
 */

/**
 * @typedef {object} MapManager.building
 * @property {string} key - texture key of the building
 * @property {number} x - x location of the building
 * @property {number} y - y location of the building
 * @property {function} callback - function called when clicking the building
 * @property {function|boolean} [visible] - If you want to display this building only when a condition is met. The function should return true or false. It is called each time the map is created.
 * @example
 * {
 *     key: "House",
 *     x: 375,
 *     y: 486,
 *     callback: () => {
 *          GAME.menu.openMenu('house');
 *     }
 * }
 * @example
 * {
 *     key: "Brothel",
 *     x: 375,
 *     y: 486,
 *     callback: () => {
 *          GAME.menu.openMenu('brothel');
 *     },
 *     visible: () => {
 *          // This building will only be visible if the townFuckQuest 'Complete' subquest is true
 *          return GAME.quest.isComplete('townFuckQuest','Completed');
 *     }
 * }
 */

/**
 * Use this to manage the map
 * @class MapManager
 */
class MapManager {
    constructor() {
        this._queue = [];
        this._regions = ['Easthollow', 'Greenhaven', 'MoaningMorass', 'Avia', 'Mountains'];
        this._map = {
            "Easthollow": {
                "north": 'Mountains',
                "south": false,
                "east": 'Greenhaven',
                "west": false
            },
            "Greenhaven": {
                "north": false,
                "south": 'MoaningMorass',
                "east": false,
                "west": 'Easthollow'
            },
            "MoaningMorass": {
                "north": 'Greenhaven',
                "south": 'Crossroad',
                "east": false,
                "west": false
            },
            "Crossroad": {
                "north": "MoaningMorass",
                "south": false,
                "east": "Avia",
                "west": false
            },
            "Avia": {
                "north": false,
                "south": false,
                "east": false,
                "west": "Crossroad"
            },
            "Mountains": {
                "north": false,
                "south": "Easthollow",
                "east": false,
                "west": false
            }
        };
        this._mapConditions = {};
        this._buildings = {
            "Easthollow": {
                "House": {
                    key: "House",
                    x: 375,
                    y: 486,
                    callback: () => {
                        GAME.menu.openMenu('house')
                    }
                },
                "Brothel": {
                    key: "Brothel",
                    x: 630,
                    y: 496,
                    callback: () => {
                        GAME.menu.openMenu('brothel')
                    }
                },
                "Town": {
                    key: "Town",
                    x: 1150,
                    y: 134,
                    callback: () => {
                        GAME.map.switchMap('Town');
                    }
                }
            },
            "Town": {
                "TownSquare": {
                    key: "TownSquare",
                    x: 519,
                    y: 567,
                    callback: () => {
                        GAME.dialogue.playDialogue('TownSquare');
                    }
                },
                "ClothesShop": {
                    key: "TownClothesShop",
                    x: 729,
                    y: 142,
                    callback: () => {
                        GAME.menu.openMenu('townClothesShop');
                    }
                },
                "School": {
                    key: "school",
                    x: 1385,
                    y: 0,
                    callback: () => {
                        GAME.map.switchMap('School');
                    }
                },
                "Geoff": {
                    key: "TownGeoff",
                    x: 0,
                    y: 48,
                    callback: () => {
                        GAME.dialogue.playDialogue('Geoff');
                    }
                },
                "Mayor": {
                    key: "TownMayor",
                    x: 1118,
                    y: 259,
                    callback: () => {
                        GAME.dialogue.playDialogue('TownMayor');
                    }
                },
                "Exit": {
                    key: 'exit',
                    x: 600,
                    y: 963,
                    callback: () => {
                        GAME.map.switchMap('Easthollow');
                    }
                }
            },
            "School": {
                "Cafeteria": {
                    key: "CafeteriaButton",
                    x: 1200,
                    y: 150,
                    callback: () => {
                        GAME.dialogue.playDialogue('SchoolCafeteria');
                    }
                },
                "Janitors": {
                    key: "JanitorsClosetButton",
                    x: 1400,
                    y: 720,
                    callback: () => {
                        GAME.dialogue.playDialogue('janitorsCloset');
                    }
                },
                "Principals": {
                    key: "PrincipalsOfficeButton",
                    x: 800,
                    y: 730,
                    callback: () => {
                        GAME.dialogue.playDialogue('principalsOffice');
                    }
                },
                "Exit": {
                    key: 'exit',
                    x: 20,
                    y: 963,
                    callback: () => {
                        GAME.map.switchMap('Town');
                    }
                }
            },
            "Greenhaven": {
                "Nirvokk": {
                    key: "NirvokkHut",
                    x: 311,
                    y: 150,
                    callback: () => {
                        GAME.dialogue.playDialogue('Nirvokk');
                    }
                },
                "Darrak": {
                    key: "DarrakHut",
                    x: 1129,
                    y: 213,
                    callback: () => {
                        GAME.dialogue.playDialogue('Darrak');
                    }
                },
                "Boris": {
                    key: "BorisHut",
                    x: 1403,
                    y: 242,
                    callback: () => {
                        GAME.dialogue.playDialogue('Boris');
                    }
                },
                "Hangout": {
                    key: "VillageHangout",
                    x: 405,
                    y: 0,
                    callback: () => {
                        GAME.dialogue.playDialogue('VillageHangout');
                    }
                }
            },
            "MoaningMorass": {
                "Inn": {
                    key: "Inn",
                    x: 1500,
                    y: 620,
                    callback: () => {
                        GAME.dialogue.playDialogue('MorassInn');
                    }
                },
                "Pond": {
                    key: "Pond",
                    x: 1450,
                    y: 400,
                    callback: () => {
                        GAME.dialogue.playDialogue('MorassPond');
                    }
                },
                "House1": {
                    key: "House1",
                    x: 345,
                    y: 350,
                    callback: () => {
                        GAME.dialogue.playDialogue('MorassHouse1');
                    }
                }
            },
            "Crossroad": {},
            "Avia": {
                "Castle": {
                    key: "AviaCastleKeep",
                    x: 500,
                    y: 250,
                    callback: () => {
                        GAME.dialogue.playDialogue('AviaCastleKeep');
                    }
                },
                "Slums": {
                    key: "AviaSlums",
                    x: 400,
                    y: 840,
                    callback: () => {
                        GAME.dialogue.playDialogue('AviaSlums');
                    }
                }
            },
            "Mountains": {
                "CampSite": {
                    key: "CampSite",
                    x: 500,
                    y: 250,
                    callback: () => {
                        GAME.dialogue.playDialogue('mountainCampSite');
                    },
                    visible: () => {
                        return GAME.quest.isComplete('worldQuests', 'naknuAfterBattleOrcs');
                    }
                }
            }
        };

        /**
         * @name MapManager#_arrowConditions
         * @type {Object}
         * @private
         */
        this._arrowConditions = {
            "Easthollow": [function () {
                if (GAME.quest.isComplete('greenhaven', 'Start') === false) {
                    GAME.map.disableArrow('east');
                }
                // if (GAME.quest.isComplete('battleOrcs', 'askKing') === false) {
                GAME.map.disableArrow('north');
                // }
            }],
            "Greenhaven": [function () {
                if (GAME.quest.isComplete('mushroomQuest', 'BuildBoat') === false) {
                    GAME.map.disableArrow('south');
                }
            }],
            "MoaningMorass": [function () {
                GAME.map.disableArrow('south');
            }]
            // "MoaningMorass2": [function () {
            //     if (GAME.quest.isComplete('worldQuests', 'naknuAfterMorassDoor') === false) {
            //         GAME.map.disableArrow('south');
            //     }
            // }]
        };

        this._mapGroup = null;

        /**
         * The id of the current map the player is on.
         * @name MapManager#currentMap
         * @type {string}
         */
        this.currentMap = 'Easthollow';
    }

    _initMapConditions() {
        GAME.map.addMapCondition('Town', function () {
            if (GAME.quest.isComplete('worldQuests', 'firstVisitTown') === false) {
                return new Promise((resolve) => {
                    GAME.dialogue.playDialogue('TownMayor', 'firstVisitTown').then(() => {
                        resolve();
                    });
                });
            }
        });

        GAME.map.addMapCondition("School", function () {
            if (GAME.quest.isComplete('sukiQuest', 'Start') === false) {
                return new Promise((resolve) => {
                    GAME.dialogue.playDialogue('schoolEntrance').then(() => {
                        resolve();
                    })
                });
            }
        });

        GAME.map.addMapCondition("School", function () {
            if (GAME.quest.isComplete('sukiQuest', 'Start') === true && GAME.girl.Queen.getClothes().getID() !== 'SchoolgirlQueen' && GAME.quest.isComplete('sukiQuest', 'End') === false) {
                return new Promise((resolve) => {
                    GAME.dialogue.playDialogue('schoolEntrance', 'clothes').then(() => {
                        resolve();
                    })
                });
            }
        });

        GAME.map.addMapCondition('Greenhaven', function () {
            if (GAME.quest.isComplete('greenhaven', 'End') === false) {
                return new Promise((resolve) => {
                    GAME.dialogue.playDialogue('TownMayor', 'greenhavenEnd').then(() => {
                        resolve();
                    })
                });
            }
        });

        // GAME.map.addMapCondition('MoaningMorass', function () {
        //     if (GAME.quest.isComplete('enterMorassQuest', 'Completed') === false) {
        //         return new Promise((resolve) => {
        //             let sprite = GAME.add.image(0, 0, 'MoaningMorassBackground').setOrigin(0);
        //             GAME.dialogue.playDialogue('enterMoaningMorass').then(() => {
        //                 sprite.destroy();
        //                 resolve();
        //             })
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('MoaningMorass', function () {
        //     if (GAME.quest.isComplete('swampBeastQuest', 'RecruitEsxea') === true && GAME.quest.isComplete('swampBeastQuest', 'GoblinsAngry') === false) {
        //         return new Promise((resolve) => {
        //             let sprite = GAME.add.image(0, 0, 'MoaningMorassBackground').setOrigin(0);
        //             GAME.dialogue.playDialogue('goblinsAngryMorass').then(() => {
        //                 sprite.destroy();
        //                 resolve();
        //             })
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Crossroad', function () {
        //     if (GAME.quest.isComplete('worldQuests', 'aviaUnlock') === false) {
        //         return new Promise((resolve) => {
        //             let sprite = GAME.add.image(0, 0, 'CrossroadBackground').setOrigin(0);
        //             GAME.dialogue.playDialogue('aviaUnlock').then(() => {
        //                 sprite.destroy();
        //                 resolve();
        //             })
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Avia', function () {
        //     if (GAME.quest.isComplete('kingsQuest', 'Started') === true && GAME.quest.isComplete('kingsQuest', 'NaknuDialogue') === false) {
        //         return new Promise((resolve) => {
        //             let sprite = GAME.add.image(0, 0, 'CrossroadBackground').setOrigin(0);
        //             GAME.popUpBoard("Queen is too embarrassed to go back to Avia right now. Try again tomorrow.").then(() => {
        //                 sprite.destroy();
        //                 GAME.map.switchMap('Crossroad');
        //                 resolve();
        //             })
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Avia', function () {
        //     if (GAME.quest.isComplete('kingsQuest', 'FuckPeasants') === true && GAME.quest.isComplete('kingsQuest', 'NaknuDialogue2') === false) {
        //         return new Promise((resolve) => {
        //             let sprite = GAME.add.image(0, 0, 'CrossroadBackground').setOrigin(0);
        //             GAME.popUpBoard("Avia is too dangerous to go to right now. Try again tomorrow.").then(() => {
        //                 sprite.destroy();
        //                 GAME.map.switchMap('Crossroad');
        //                 resolve();
        //             })
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Town', function () {
        //     if (GAME.quest.isComplete('returnDathea', 'Complete') === true && GAME.quest.isComplete('battleOrcs', 'Start') === false) {
        //         return new Promise((resolve) => {
        //             GAME.dialogue.playDialogue('battleOrcsStart').then(() => {
        //                 resolve();
        //             });
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Mountains', function () {
        //     if (GAME.quest.isComplete('battleOrcs', 'askKing') === true && GAME.quest.isComplete('battleOrcs', 'checkBattle') === false) {
        //         return new Promise((resolve) => {
        //             GAME.dialogue.playDialogue('battleOrccheckBattle').then(() => {
        //                 resolve();
        //             });
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Mountains', function () {
        //     if (GAME.quest.isComplete('battleOrcs', 'checkBattle') === true && GAME.quest.isComplete('battleOrcs', 'naknuPoison') === false) {
        //         return new Promise((resolve) => {
        //             let sprite = GAME.add.image(0, 0, 'MountainsBackground').setOrigin(0);
        //             GAME.popUpBoard("Come back tomorrow to check on the soldier's morale").then(() => {
        //                 sprite.destroy();
        //                 GAME.map.switchMap('Easthollow');
        //                 resolve();
        //             })
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Mountains', function () {
        //     if (GAME.quest.isComplete('battleOrcs', 'naknuPoison') === true && GAME.quest.isComplete('battleOrcs', 'getAnal') === false) {
        //         return new Promise((resolve) => {
        //             GAME.dialogue.playDialogue('battleOrcsgetAnal').then(() => {
        //                 resolve();
        //             });
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Mountains', function () {
        //     if (GAME.quest.isComplete('battleOrcs', 'getAnal') === true && GAME.quest.isComplete('battleOrcs', 'fuckSoldiers') === false) {
        //         return new Promise((resolve) => {
        //             GAME.dialogue.playDialogue('battleOrcsfuckSoldiers').then(() => {
        //                 resolve();
        //             });
        //         });
        //     }
        // });
        //
        // GAME.map.addMapCondition('Mountains', function () {
        //     if (GAME.quest.isComplete('battleOrcs', 'Complete') === true && GAME.quest.isComplete('worldQuests', 'naknuAfterBattleOrcs') === false) {
        //         return new Promise((resolve) => {
        //             GAME.popUpBoard("Queen is tired. Come back tomorrow!").then(() => {
        //                 GAME.map.switchMap('Easthollow');
        //             })
        //         });
        //     }
        // });
    }

    /**
     * Returns an array of all the regions in the game
     * @method getRegions
     * @memberOf MapManager
     * @instance
     * @returns {array}
     */
    getRegions() {
        return this._regions;
    }

    /**
     * @method getMap
     * @memberOf MapManager
     * @instance
     * @param {string} mapID=undefined - If no id is given, it will return the entire game map
     * @return {MapManager.map|boolean}
     */
    getMap(mapID) {
        if (mapID === undefined) {
            return this._map;
        } else {
            if (this._map.hasOwnProperty(mapID)) {
                return this._map[mapID]
            } else {
                return false;
            }
        }
    }

    /**
     * @getBuildings
     * @memberOf MapManager
     * @param {string} mapID - Get all of the buildings for the map
     * @return {object<MapManager.building>|boolean}
     */
    getBuildings(mapID) {
        if (this._buildings.hasOwnProperty(mapID)) {
            return this._buildings[mapID];
        } else {
            return false;
        }
    }

    /**
     * Add a new building to the map
     * @method addBuilding
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @param {string} buildingID
     * @param {MapManager.building} building
     */
    addBuilding(mapID, buildingID, building) {
        if (this._buildings.hasOwnProperty(mapID) === false) {
            this._buildings[mapID] = {};
        }
        this._buildings[mapID][buildingID] = building;
    }

    /**
     * Removes the building from the game entirely
     * @method removeBuilding
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @param {string} buildingID
     */
    removeBuilding(mapID, buildingID) {
        delete this._buildings[mapID][buildingID];
    }

    /**
     * @method _addToQueue
     * @memberOf MapManager
     * @instance
     * @private
     * @param {Promise} callback
     */
    _addToQueue(callback) {
        this._queue.push(callback);
    }

    /**
     * @method _playMapConditions
     * @memberOf MapManager
     * @instance
     * @private
     */
    _playMapConditions(currentMap) {
        return new Promise((resolve) => {
            if (this._mapConditions.hasOwnProperty(currentMap)) {
                for (let i in this._mapConditions[currentMap]) {
                    if (typeof this._mapConditions[currentMap][i] === "function") {
                        this._addToQueue(this._mapConditions[currentMap][i]);
                    }
                }
                this._popQueue(resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * @method _popQueue
     * @memberOf MapManager
     * @instance
     * @private
     * @param {function} resolve
     */
    _popQueue(resolve) {
        if (this._queue.length > 0) {
            let functionType = (this._queue.shift())();
            if (typeof functionType === "object") {
                functionType.then(() => {
                    this._popQueue(resolve);
                })
            } else {
                this._popQueue(resolve);
            }
        } else {
            resolve();
        }
    }

    /**
     * Map conditions are functions called whenever a player goes to that map. For example, when the girls go to the Morass after recruiting Esxea, a dialogue plays. That is a map condition.
     * The callback function should return a promise function if the condition is met to prevent two conditions from playing at the same time.
     * @method addMapCondition
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @param {Promise} callback - Should return a promise if the condition is met
     */
    addMapCondition(mapID, callback) {
        if (this._mapConditions.hasOwnProperty(mapID) === false) {
            this._mapConditions[mapID] = [];
        }
        this._mapConditions[mapID].push(callback);
    }

    /**
     * Use {@link MapManager.getMapConditions} to find the index of the condition you want to remove
     * @method removeMapCondition
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @param {number} index
     */
    removeMapCondition(mapID, index) {
        this._mapConditions[mapID].splice(index, 1);
    }

    /**
     * Returns the array of map conditions.
     * @method getMapConditions
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @return {Array}
     */
    getMapConditions(mapID) {
        return this._mapConditions[mapID];
    }

    /**
     * Switches to a map
     * @method switchMap
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @param {boolean} [silent=false] - Silent means no map conditions will be played when switching maps
     */
    switchMap(mapID, silent) {
        silent = silent || false;
        this.clearQueue();
        GAME.map.currentMap = mapID;
        GAME.createMap(silent);
    }

    /**
     * Clears the map condition queue, preventing the remaining conditions to play
     * @method clearQueue
     * @memberOf MapManager
     * @instance
     */
    clearQueue() {
        this._queue = [];
    }

    /**
     * @method _doArrowConditions
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @private
     */
    _doArrowConditions(mapID) {
        if (this._arrowConditions.hasOwnProperty(mapID)) {
            for (let i in this._arrowConditions[mapID]) {
                this._arrowConditions[mapID][i]();
            }
        }
    }

    /**
     * Sets the arrow visibility to false.
     * All arrows are visible by default if there is a map location available there. You will only ever need to disable them temporarily for quests or other conditions
     * @method setArrow
     * @memberOf MapManager
     * @instance
     * @param {'north'|'south'|'east'|'west'} direction - Direction of the arrow
     */
    disableArrow(direction) {
        this._mapGroup.getByName(direction).setVisible(false);
    }

    /**
     * Adds an arrow condition to the map. Anything you need to do to the arrows should be inside the callback function. Use {@link MapManager#_arrowConditions} as a template
     * @method setArrowCondition
     * @memberOf MapManager
     * @instance
     * @param {string} mapID
     * @param {function} callback - This function should disable arrows inside of it. Use the default values as a template.
     */
    setArrowCondition(mapID, callback) {
        if (this._arrowConditions.hasOwnProperty(mapID) === false) {
            this._arrowConditions[mapID] = [];
        }
        this._arrowConditions[mapID].push(callback);
    }
}