//this game will have only 1 state
var currentCharIndex = 0;
var currentWord;
var currentDisplayWord;
var currentAnswerResult;
var charStyle = {font: "64px Arial", fill: "#fff"};
var styleCorrect = {font: "44px Arial", fill: "green"};
var styleIncorrect = {font: "44px Arial", fill: "red"};


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
    
    this.createOnscreenControls();
   // console.log(this.game.cache.getText('chineseCharacters'));
    
    this.characterLibraryData =     JSON.parse(this.game.cache.getText('chineseCharacters'));
    
    this.characterLibraryData.characterData.forEach(function(element){
      console.log('character = '+ element.character
                  +', tone = '+ element.tone
                  +', pinyin = '+ element.pinyin
                  +', meaning = '+ element.meaning);
    }, this);
      currentWord = this.characterLibraryData.characterData[currentCharIndex];
      console.log("the current word is = " + currentWord.character
                   +', tone = '+ currentWord.tone
                  +', pinyin = '+ currentWord.pinyin
                  +', meaning = '+ currentWord.meaning);
     
      
      this.displayCurrentWord();
    




    
  },
  //this is executed multiple times per second
  update: function() {
  },
 createOnscreenControls: function(){
    this.toneOne = this.add.button(10, 580, 'toneOneButton');
    this.toneTwo = this.add.button(100, 580, 'toneTwoButton');
    this.toneThree = this.add.button(190, 580, 'toneThreeButton');
    this.toneFour = this.add.button(280, 580, 'toneFourButton');
    
    this.toneOne.events.onInputDown.add(function(){
      console.log("toneOne pressed");
      this.validateTone(1);
    }, this);
    
     this.toneTwo.events.onInputDown.add(function(){
      console.log("toneTwo pressed")
      this.validateTone(2);
    }, this);
     
    this.toneThree.events.onInputDown.add(function(){
      console.log("toneThree pressed")
       this.validateTone(3);
    }, this);
     
    this.toneFour.events.onInputDown.add(function(){
      console.log("toneFour pressed")
        this.validateTone(4);
    }, this);
 },
    
    validateTone: function(toneNumber){
        console.log("currentWord.character = "+currentWord.character+"\ncurrentWord.tone = "+currentWord.tone+"\ntoneNumber = "+toneNumber);
        if(currentWord.tone==toneNumber){
            //right answer
            this.displayCharResult(true);
            currentDisplayWord.destroy();
            if (currentCharIndex+1 == this.characterLibraryData.characterData.length){
                currentCharIndex = 0;
                alert ("back to the start of the deck");
            }
            else{
                currentCharIndex++;
                
            };
            
            this.displayCurrentWord();
            
        }
        else{
            //wrong answer
           // currentAnswerResult.destroy();
            this.displayCharResult(false);
        }
           
    },
    
    displayCharResult: function(passFail){

        if (passFail){
            currentAnswerResult = "Correct";
            this.add.text(100,250, currentAnswerResult, styleCorrect);

        }else{
            currentAnswerResult = "Incorrect";
            this.add.text(100,250,currentAnswerResult, styleIncorrect);

        };
        
    },
    
    displayCurrentWord: function(){
        
        currentWord = this.characterLibraryData.characterData[currentCharIndex];
        console.log("the current word is = " + currentWord.character
                   +', tone = '+ currentWord.tone
                  +', pinyin = '+ currentWord.pinyin
                  +', meaning = '+ currentWord.meaning);      
   
        currentDisplayWord = this.add.text(100,150,currentWord.character,charStyle);
        console.log("currentCharIndex is " + currentCharIndex +" of "+ this.characterLibraryData.characterData.length);
    },
    
  
};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');