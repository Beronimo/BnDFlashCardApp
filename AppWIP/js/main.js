//this game will have only 1 state
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
    


   // console.log(this.characterData[2]);
/*    var characterData = [
      {"character":"我","tone":"3", "pinyin":"Wǒ", "meaning":"Me, I"},
      {"character":"你","tone":"3", "pinyin":"xx", "meaning":"Me, I"},
      {"character":"男","tone":"2", "pinyin":"xx", "meaning":"Me, I"},
      {"character":"女","tone":"3", "pinyin":"xx", "meaning":"Me, I"},
      {"character":"他","tone":"1", "pinyin":"xx", "meaning":"Me, I"},
      {"character":"爸","tone":"1", "pinyin":"xx", "meaning":"Me, I"},
      {"character":"媽","tone":"1", "pinyin":"xx", "meaning":"Me, I"}
    ]
      */
   // console.log(characterData[2]);
    


    
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
      console.log("toneOne pressed")
    }, this);
   
   
  }
  
};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');