//this game will have only 1 state
var currentCharIndex = 0;
var currentWord;
var currentDisplayWord;
var currentAnswerResult;
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

/*
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
*/

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

        this.load.text('chineseCharacters', 'assets/data/character.json');

    },
    //executed after everything is loaded
    create: function() {

        this.background = this.game.add.sprite(0, 0, 'background');

     //   this.createOnscreenControls();
        // console.log(this.game.cache.getText('chineseCharacters'));

        this.characterLibraryData = JSON.parse(this.game.cache.getText('chineseCharacters'));

        this.characterLibraryData.characterData.forEach(function(element) {
            console.log('character = ' + element.character + ', tone = ' + element.tone + ', pinyin = ' + element.pinyin + ', meaning = ' + element.meaning);
        }, this);
        currentWord = this.characterLibraryData.characterData[currentCharIndex];
        console.log("the current word is = " + currentWord.character + ', tone = ' + currentWord.tone + ', pinyin = ' + currentWord.pinyin + ', meaning = ' + currentWord.meaning);
        currentAnswerResult = this.add.text(-100, -250, "", styleCorrect);
        currentDisplayWord = this.add.text(-100, -250, "", styleCorrect);
        console.log("localstoragela = "+localStorage.getItem('highscore')[0]);
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
            
            if (currentCharIndex + 1 == this.characterLibraryData.characterData.length) {
                currentCharIndex = 0;
                alert("back to the start of the deck");
            } else {
                currentCharIndex++;

            };
            
            //do something about it being correct

            this.displayRatingOptions();


        } else {
            //wrong answer
            // currentAnswerResult.destroy();
            this.displayCharResult(false);

        }

    },
    destroyRatingOptions: function() {
        this.btnEasy.destroy();
        this.btnMedium.destroy();
        this.btnHard.destroy();
        currentAnswerResult.destroy();
        
    },
    //destroy 1,2,3,4 buttons and replace with difficulty rating
    displayRatingOptions: function() {
        this.toneOne.destroy();
        this.toneTwo.destroy();
        this.toneThree.destroy();
        this.toneFour.destroy();
        //alert('destroyed');
        
        this.btnEasy = this.add.button(10, 580, 'toneOneButton');
        this.btnMedium = this.add.button(100, 580, 'toneTwoButton');
        this.btnHard = this.add.button(190, 580, 'toneThreeButton');
        
        
        this.btnEasy.events.onInputDown.add(function() {
            console.log("easy pressed");
            this.destroyRatingOptions();
             this.displayCurrentWord();
            
        }, this);

        this.btnMedium.events.onInputDown.add(function() {
            console.log("medium pressed");
            this.destroyRatingOptions();
             this.displayCurrentWord();
        }, this);

        this.btnHard.events.onInputDown.add(function() {
            console.log("hard pressed");
            this.destroyRatingOptions();
             this.displayCurrentWord();
        }, this);
       

        
        
    },

    displayCharResult: function(passFail) {

        if (passFail) {
            currentAnswerResult.destroy();
            currentAnswerResult = this.add.text(100,250, "Correct", styleCorrect);
            //alert('correct :) next word');

        } else {
            currentAnswerResult.destroy();
            currentAnswerResult = this.add.text(100, 250, "Incorrect", styleIncorrect);

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
        this.storeWordLocally();

    },
    storeWordLocally: function() {
        var blah=[{"wo":12}];
        localStorage.setItem('highscore',blah);
    
        
    },


};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');