



  returnEventObjects(player) {

    let z = [];
    let zz = [];

    //
    // player techs
    //
    for (let i = 0; i < this.game.players_info.length; i++) {
      for (let j = 0; j < this.game.players_info[i].tech.length; j++) {
	if (this.tech[this.game.players_info[i].tech[j]] != undefined) {
	  if (!zz.includes(this.game.players_info[i].tech[j])) {
console.log("PUSHING TECH: " + this.game.players_info[i].tech[j]);
            z.push(this.tech[this.game.players_info[i].tech[j]]);
            zz.push(this.game.players_info[i].tech[j]);
	  }
	} else {
console.log("MISSING TECH: " + this.game.players_info[i].tech[j]);
	}
      }
    }

    //
    // factions in-play
    //
    for (let i = 0; i < this.game.players_info.length; i++) {
      if (this.factions[this.game.players_info[i].faction] != undefined) {
        z.push(this.factions[this.game.players_info[i].faction]);
      } else {
console.log("MISSING FACTION: " + this.game.players_info[i].faction);
      }
    }

    return z;

  }



  addEvents(obj) {

    ///////////////////////
    // game state events //
    ///////////////////////
    //
    // these events run at various points of the game, such as at the start of the game or
    // on a new turn. they should be asynchronous (not require user input) and thus do not
    // require a trigger - every function is run every time the game reaches this state..
    //
    // by convention "player" means the player in the players_info. if you mean "the player 
    // that has this tech" you should do a secondary check in the logic of the card to 
    // ensure that "player" has the right to execute the logic being coded, either by 
    // adding gainTechnology() or doesPlayerHaveTech()
    //
    //
    // runs for everyone
    //
    if (obj.initialize == null) {
      obj.initialize = function(imperium_self, player) { return 0; }
    }
    if (obj.gainTechnology == null) {
      obj.gainTechnology = function(imperium_self, gainer, tech) { return 1; }
    }
    if (obj.gainTradeGoods == null) {
      obj.gainTradeGoods = function(imperium_self, gainer, amount) { return amount; }
    }
    if (obj.gainCommodities == null) {
      obj.gainCommodities = function(imperium_self, gainer, amount) { return amount; }
    }
    if (obj.gainFleetSupply == null) {
      obj.gainFleetSupply = function(imperium_self, gainer, amount) { return amount; }
    }
    if (obj.gainStrategyCard == null) {
      obj.gainStrategyCard = function(imperium_self, gainer, card) { return card; }
    }
    if (obj.gainCommandTokens == null) {
      obj.gainCommandToken = function(imperium_self, gainer, amount) { return amount; }
    }
    if (obj.gainStrategyTokens == null) {
      obj.gainStrategyTokens = function(imperium_self, gainer, amount) { return amount; }
    }
    //
    // ALL players run upgradeUnit, so upgrades should manage who have them
    //
    if (obj.upgradeUnit == null) {
      obj.upgradeUnit = function(imperium_self, player, unit) { return unit; }
    }
    //
    // ALL players run unitDestroyed
    //
    if (obj.unitDestroyed == null) {
      obj.unitDestroyed = function(imperium_self, attacker, unit) { return unit;}
    }
    if (obj.unitHit == null) {
      obj.unitHit = function(imperium_self, attacker, unit) { return unit;}
    }
    if (obj.onNewRound == null) {
      obj.onNewRound = function(imperium_self, player, mycallback) { return 0; }
    }
    if (obj.onNewTurn == null) {
      obj.onNewTurn = function(imperium_self, player, mycallback) { return 0; }
    }


    ////////////////////
    // strategy cards //
    ////////////////////
    if (obj.strategyPrimaryEvent == null) {
      obj.strategyPrimaryEvent = function(imperium_self, player, strategy_card_player) { return 0; }
    }
    if (obj.strategySecondaryEvent == null) {
      obj.strategySecondaryEvent = function(imperium_self, player, strategy_card_player) { return 0; }
    }
    if (obj.strategyCardBeforeTriggers == null) {
      obj.strategyCardBeforeTriggers = function(imperium_self, player, strategy_card_player, card) { return 0; }
    }
    if (obj.strategyCardBeforeEvent == null) {
      obj.strategyCardBeforeEvent = function(imperium_self, player, strategy_card_player, card) { return 0; }
    }
    if (obj.strategyCardAfterTriggers == null) {
      obj.strategyCardAfterTriggers = function(imperium_self, player, strategy_card_player, card) { return 0; }
    }
    if (obj.strategyCardAfterEvent == null) {
      obj.strategyCardAfterEvent = function(imperium_self, player, strategy_card_player, card) { return 0; }
    }
    if (obj.playersChooseStrategyCardsBeforeTriggers == null) {
      obj.playersChooseStrategyCardsBeforeTriggers = function(imperium_self, player) { return 0; }
    }
    if (obj.playersChooseStrategyCardsBeforeEvent == null) {
      obj.playersChooseStrategyCardsBeforeEvent = function(imperium_self, player) { return 0; }
    }
    if (obj.playersChooseStrategyCardsAfterTriggers == null) {
      obj.playersChooseStrategyCardsAfterTriggers = function(imperium_self, player) { return 0; }
    }
    if (obj.playersChooseStrategyCardsAfterEvent == null) {
      obj.playersChooseStrategyCardsAfterEvent = function(imperium_self, player) { return 0; }
    }



    ////////////////////
    // main turn menu //
    ////////////////////
    //
    // the player here will be the user who is viewing the menu, so this only executes for the
    // active player.
    //
    if (obj.menuOption == null) {
      obj.menuOption = function(imperium_self, menu, player) { return {}; }
    }
    if (obj.menuOptionTriggers == null) {
      obj.menuOptionTriggers = function(imperium_self, menu, player) { return 0; }
    }
    if (obj.menuOptionActivated == null) {
      obj.menuOptionActivated = function(imperium_self, menu, player) { return 0; }
    }



    ///////////////////////
    // modify dice rolls //
    ///////////////////////
    //
    // executes for all technologies that are available. these functions should check if they
    // are active for either the attacker or the defender when executing.
    //
    if (obj.modifyPDSRoll == null) {
      obj.modifyPDSRoll = function(imperium_self, attacker, defender, roll) { return roll; }
    }
    if (obj.modifySpaceCombat == null) {
      obj.modifySpaceCombatRoll = function(imperium_self, attacker, defender, roll) { return roll; }
    }
    if (obj.modifyGroundCombatRoll == null) {
      obj.modifyGroundCombatRoll = function(imperium_self, attacker, defender, roll) { return roll; }
    }
    if (obj.modifyCombatRoll == null) {
      obj.modifyCombatRoll = function(imperium_self, attacker, defender, player, combat_type, roll) { return roll; }
    }
    if (obj.modifyCombatRerolls == null) {
      obj.modifyCombatRerolls = function(imperium_self, attacker, defender, player, combat_type, roll) { return roll; }
    }
    if (obj.modifyCombatTargets == null) {
      obj.modifyTargets = function(imperium_self, attacker, defender, player, combat_type, targets=[]) { return targets; }
    }




    ////////////////////
    // Victory Points //
    ////////////////////
    if (obj.canPlayerScoreVictoryPoints == null) {
      obj.canPlayerScoreVictoryPoints = function(imperium_self, player) { return 0; }
    }



    //////////////////////////
    // asynchronous eventsa //
    //////////////////////////
    //
    // these events must be triggered by something that is put onto the stack. they allow users to stop the execution of the game
    // and take arbitrary action. 
    //

    //
    // when action card is played
    //
    if (obj.playActionCardTriggers == null) {
      obj.playActionCardTriggers = function(imperium_self, player, action_card_player, card) { return 0; }
    }
    if (obj.playActionCardEvent == null) {
      obj.playActionCardEvent = function(imperium_self, player, action_card_player, card) { return 0; }
    }


    //
    // when strategy card primary is played
    //
    if (obj.playStrategyCardPrimaryTriggers == null) {
      obj.playStrategyCardPrimaryTriggers = function(imperium_self, player, card) { return 0; }
    }
    if (obj.playStrategyCardPrimaryEvent == null) {
      obj.playStrategyCardPrimaryEvent = function(imperium_self, player, card) { return 0; }
    }


    //
    // when strategy card secondary is played
    //
    if (obj.playStrategyCardSecondaryTriggers == null) {
      obj.playStrategyCardSecondaryTriggers = function(imperium_self, player, card) { return 0; }
    }
    if (obj.playStrategyCardSecondaryEvent == null) {
      obj.playStrategyCardSecondaryEvent = function(imperium_self, player, card) { return 0; }
    }


    //
    // when system is activated
    //
    if (obj.activateSystemTriggers == null) {
      obj.activateSystemTriggers = function(imperium_self, player, sector) { return 0; }
    }
    if (obj.activateSystemEvent == null) {
      obj.postSystemActivation = function(imperium_self, player, sector) { return 0; }
    }

    //
    // when pds combat starts
    //
    if (obj.pdsSpaceDefenseTriggers == null) {
      obj.pdsSpaceDefenseTriggers = function(imperium_self, attacker, player, sector) { return 0; }
    }
    if (obj.pdsSpaceDefenseEvent == null) {
      obj.pdsSpaceDefenseEvent = function(imperium_self, attacker, player, sector) { return 0; }
    }

    //
    // when space combat round starts
    //
    if (obj.spaceCombatTriggers == null) {
      obj.spaceCombatTriggers = function(imperium_self, player, sector) { return 0; }
    }
    if (obj.spaceCombatEvent == null) {
      obj.spaceCombatEvent = function(imperium_self, player, sector) { return 0; }
    }

    //
    // when bombardment starts
    //
    if (obj.bombardmentTriggers == null) {
      obj.bombardmentTriggers = function(imperium_self, player, sector) { return 0; }
    }
    if (obj.bombardmentEvent == null) {
      obj.bombardmentEvent = function(imperium_self, player, sector) { return 0; }
    }

    //
    // when planetry invasion starts
    //
    if (obj.planetaryDefenseTriggers == null) {
      obj.planetaryDefenseTriggers = function(imperium_self, player, sector, planet_idx) { return 0; }
    }
    if (obj.planetaryDefenseEvent == null) {
      obj.planetaryDefenseEvent = function(imperium_self, player, sector, planet_idx) { return 0; }
    }


    //
    // when ground combat round starts
    //
    if (obj.groundCombatTriggers == null) {
      obj.groundCombatTriggers = function(imperium_self, player, sector, planet_idx) { return 0; }
    }
    if (obj.groundCombatEvent == null) {
      obj.groundCombatEvent = function(imperium_self, player, sector, planet_idx) { return 0; }
    }

    //
    // end of player turn
    //
    if (obj.playerEndTurnTriggers == null) {
      obj.playerEndTurnTriggers = function(imperium_self, player) { return 0; }
    }
    if (obj.playerEndTurnEvent == null) {
      obj.playerEndTurnEvent = function(imperium_self, player) { return 0; }
    }

    return obj;
  
  }


