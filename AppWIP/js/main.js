//this game will have only 1 state
var currentCharIndex = 0;
var currentWord;
var currentDisplayWord;
var currentAnswerResult;
var currentDisplayPinYin;
var currentDisplayDef;
var charStyle = {
    font: "64px Arial",
    fill: "#fff"
};
var styleCorrect = {
    font: "44px Arial",
    fill: "green"
};
var styleIncorrect = {
    font: "44px Arial",
    fill: "red"
};

//functions to use when writing data to local storage to convert to strings
//Use localStorage.setObj(key, value) to save an array or object and localStorage.getObj(key) to retrieve it.
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}


var GameState = {

    init: function() {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();

    },

    //load the game assets before the game starts
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('toneOneButton', 'assets/images/btnTone1.png');
        this.load.image('toneTwoButton', 'assets/images/btnTone2.png');
        this.load.image('toneThreeButton', 'assets/images/btnTone3.png');
        this.load.image('toneFourButton', 'assets/images/btnTone4.png');
        this.load.image('easyButton', 'assets/images/btn_easy.png');
        this.load.image('medButton', 'assets/images/btn_med.png');
        this.load.image('hardButton', 'assets/images/btn_hard.png');


        this.load.text('chineseCharacters', 'assets/data/character.json');

    },
    //executed after everything is loaded
    create: function() {

        this.background = this.game.add.sprite(0, 0, 'background');

        //   this.createOnscreenControls();
        // console.log(this.game.cache.getText('chineseCharacters'));

        this.characterLibraryData = JSON.parse(this.game.cache.getText('chineseCharacters'));
        var deckarray = [];
        this.characterLibraryData.characterData.forEach(function(element) {
            console.log('character = ' + element.character + ', tone = ' + element.tone + ', pinyin = ' + element.pinyin + ', meaning = ' + element.meaning);

            deckarray.push([element.character, 0]);
            // blah.push([element.character,0]);
            // this.storeWordLocally(blah);



        }, this);
        this.storeWordLocally(deckarray);
        currentWord = this.characterLibraryData.characterData[currentCharIndex];
        console.log("the current word is = " + currentWord.character + ', tone = ' + currentWord.tone + ', pinyin = ' + currentWord.pinyin + ', meaning = ' + currentWord.meaning);
        currentAnswerResult = this.add.text(-100, -250, "", styleCorrect);
        currentDisplayWord = this.add.text(-100, -250, "", styleCorrect);
        console.log("localstoragela = " + localStorage.getObj('Deck1'));
        this.displayCurrentWord();
    },
    //this is executed multiple times per second
    update: function() {},
    createOnscreenControls: function() {
        this.toneOne = this.add.button(10, 580, 'toneOneButton');
        this.toneTwo = this.add.button(100, 580, 'toneTwoButton');
        this.toneThree = this.add.button(190, 580, 'toneThreeButton');
        this.toneFour = this.add.button(280, 580, 'toneFourButton');

        this.toneOne.events.onInputDown.add(function() {
            console.log("toneOne pressed");
            this.validateTone(1);
        }, this);

        this.toneTwo.events.onInputDown.add(function() {
            console.log("toneTwo pressed")
            this.validateTone(2);
        }, this);

        this.toneThree.events.onInputDown.add(function() {
            console.log("toneThree pressed")
            this.validateTone(3);
        }, this);

        this.toneFour.events.onInputDown.add(function() {
            console.log("toneFour pressed")
            this.validateTone(4);
        }, this);

    },

    validateTone: function(toneNumber) {
        console.log("currentWord.character = " + currentWord.character + "\ncurrentWord.tone = " + currentWord.tone + "\ntoneNumberPressed = " + toneNumber);
        if (currentWord.tone == toneNumber) {
            //right answer
            this.displayCharResult(true);
            //do something about it being correct
            this.displayRatingOptions();
            this.showPinYin();
            this.showDefinition();


        } else {
            //wrong answer
            // currentAnswerResult.destroy();
            this.displayCharResult(false);
            this.displayRatingOptions();
            this.showPinYin();
            this.showDefinition();

        }

    },
    destroyRatingOptions: function() {
        this.btnEasy.destroy();
        this.btnMedium.destroy();
        this.btnHard.destroy();
        currentAnswerResult.destroy();

    },
    destroyMeaningAndPinyin: function(){
        if (currentDisplayDef === undefined || currentDisplayDef === null) {
            //do something
            console.log('currentDisplayDef doesn\'t exist');
        }
        else{
            console.log('currentDisplayDef exist');
            currentDisplayDef.destroy();
        }
        if (currentDisplayPinYin === undefined || currentDisplayPinYin === null) {
            //do something
            console.log('currentDisplayPinYin doesn\'t exist');
        }
        else{
            console.log('currentDisplayPinYin exist');
            currentDisplayPinYin.destroy();
        }   
    },
    
    //destroy 1,2,3,4 buttons and replace with difficulty rating
    displayRatingOptions: function() {
        this.toneOne.destroy();
        this.toneTwo.destroy();
        this.toneThree.destroy();
        this.toneFour.destroy();
        //alert('destroyed');

        this.btnEasy = this.add.button(10, 580, 'easyButton');
        this.btnMedium = this.add.button(100, 580, 'medButton');
        this.btnHard = this.add.button(190, 580, 'hardButton');


        this.btnEasy.events.onInputDown.add(function() {
            console.log("easy pressed");
            this.destroyRatingOptions();
            this.destroyMeaningAndPinyin();
            this.displayCurrentWord();

        }, this);

        this.btnMedium.events.onInputDown.add(function() {
            console.log("medium pressed");
            this.destroyRatingOptions();
            this.destroyMeaningAndPinyin();
            this.displayCurrentWord();
        }, this);

        this.btnHard.events.onInputDown.add(function() {
            console.log("hard pressed");
            this.destroyRatingOptions();
            this.destroyMeaningAndPinyin();
            this.displayCurrentWord();
        }, this);




    },

    displayCharResult: function(passFail) {

        if (currentCharIndex + 1 == this.characterLibraryData.characterData.length) {
            currentCharIndex = 0;
            alert("back to the start of the deck");
        } else {
            currentCharIndex++;

        };

        if (passFail) {
            currentAnswerResult.destroy();
            currentAnswerResult = this.add.text(100, 400, "Correct", styleCorrect);
            //alert('correct :) next word');

        } else {
            currentAnswerResult.destroy();
            currentAnswerResult = this.add.text(100, 400, "Incorrect", styleIncorrect);

        };

    },

    displayCurrentWord: function() {
        //if(currentAnswerResult!=undefined){
        //    console.log("currentAnswerResult="+currentAnswerResult);
        currentDisplayWord.destroy();
        //}
        currentWord = this.characterLibraryData.characterData[currentCharIndex];
        console.log("the current word is = " + currentWord.character + ', tone = ' + currentWord.tone + ', pinyin = ' + currentWord.pinyin + ', meaning = ' + currentWord.meaning);

        currentDisplayWord = this.add.text(100, 150, currentWord.character, charStyle);
        console.log("currentCharIndex is " + currentCharIndex + " of " + this.characterLibraryData.characterData.length);
        this.createOnscreenControls();


    },
    storeWordLocally: function(wordDeck) {
        //var blah
        //localStorage.setItem('highscore',blah);
        localStorage.setObj('Deck1', wordDeck);

    },
    showPinYin: function() {
        currentDisplayPinYin = this.add.text(100, 200, currentWord.pinyin, charStyle);
       
    },
    showDefinition: function() {
        currentDisplayDef = this.add.text(100, 250, currentWord.meaning, charStyle);
       
    },

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');