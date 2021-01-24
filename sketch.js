var dog,dogImg, happyDog, database, foodS, foodA, foodStock,foodAdd,bottleMilk;
var start, startImg;
var milk,milkImg;
var bg,bg2;
var bark;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var feedThePet,addFood;
var fedTime,lastFed;
var foodObj;
var dogAreaImg;
var click;
var input;
var PlayState;
var garden_img,bedroom_img,washroom_img;
var lazyDogImg;
var bath;
var nap;
var back;
var house;
var deadImg;

function preload()
{
  //load images here
  bg = loadImage("images/dog_house.jpg");
  bg2 = loadImage("images/bg2.jpg");
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  startImg = loadImage("images/start_icon.png");
  milkImg = loadImage("images/milk_bowl.png");
  bark = loadSound("bark.mp3");
  dogAreaImg = loadImage("images/Dog_Area.jpg");
  bottleMilk = loadImage("images/Milk.png");
  click = loadSound("click.wav");
  garden_img = loadImage("../virtual pet images/Garden.png");
  bedroom_img = loadImage("../virtual pet images/Bed Room.png");
  washroom_img = loadImage("../virtual pet images/Wash Room.png");
  lazyDogImg = loadImage("../virtual pet images/Lazy.png");
  deadImg = loadImage("../virtual pet images/deadDog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  back = createSprite(250,150,500,500);

  foodObj = new Food();

  start = createSprite(250,250,50,50);
  start.addImage(startImg);
  start.scale = 0.3;

  milk = createSprite(650,650,20,20);
  milk.addImage(bottleMilk);
  milk.scale = 0.04;

  dog = createSprite(400,440,20,30);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  PlayState = database.ref('playstate');
  PlayState.on("value",function (data) {
    playstate = data.val();
  });

  input = createInput("Ramesh Shuturmurgh");
  input.position(460,70);

  feed = createButton("Feed To Your Pet");
  feed.position(370,105);
  feed.mousePressed(feedDog);

  foodAdd = createButton("Add Milk");
  foodAdd.position(500,105);
  foodAdd.mousePressed(addFood);

  // bath = createButton("Take Bath");
  // bath.position(500,130);
  // bath.mousePressed();

  // nap = createButton("Take A Nap");
  // nap.position(370,130);
  // nap.mousePressed();

  // house =createButton("Dog House");
  // house.position(250,240);
  // house.mousePressed(dogHouse);
}

function draw() {
  background("orange");

  if (gameState === PLAY){

    background(bg2);
    start.visible = true;
    dog.visible = false;
    milk.visible = false;
    bottleMilk.visible = false;
    back.visible = false;
    feed.hide();
    foodAdd.hide();
    input.hide();
    foodObj.button.hide();
    // bath.hide();
    // nap.hide();

    textSize(19);
    fill("black");
    strokeWeight("2");
    stroke("grey");
    text("HELLO! I am your virtual pet dog ",130,40);
    text("I am just like as a real pet",150,70);
    text("so, don't forgot to feed me.",150,100);
    fill("red");
    text("Your pet is excited to meet his new owner",80,160);
  
    if (mousePressedOver(start)){
      gameState=END;
      // play();
    }

  }

  if (gameState === END){
    background(200,mouseX,mouseY);
    start.visible = false;
    dog.visible = true;
    milk.visible = true;
    bottleMilk.visible = true;
    foodAdd.show();
    feed.show();
    input.show();
    // bath.show();
    // nap.show();

    textSize(20);
    fill("black");
    strokeWeight("2");
    stroke("grey");
    text("Milk Left: "+foodS + "/20",360,70);
    text("Pet Name- ",10,35);

    fedTime = database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed = data.val();
    });
  
    textSize(20);
    fill("black");
    strokeWeight("2");
    stroke("grey");

  
    if(lastFed>=12) {
      text("Last Fed: "+lastFed%12+" PM", 350, 30);
    } else if(lastFed===0) {
      text("Last Fed: 12 AM",350, 30);
    } else {
      text("Last Fed: "+lastFed + " AM", 350, 30);
    }

    foodObj.display();

    // if (PlayState != "Hungry"){
    //   feed.hide();
    //   foodAdd.hide();
    //   dog.addImage(lazyDogImg);
    // }else{
    //   feed.show();
    //   foodAdd.show();
    //   dog.addImage(dogImg);
    // }

    textSize(25);
    fill("black");
    strokeWeight("2");
    stroke("grey");

    currentTime = hour();
    if (currentTime == lastFed+0){
      text("Hunger Level:- Best",5,120);
    }else if (currentTime == (lastFed+1)){
      foodObj.garden();
      text("Hunger Level:- Average",5,120);
    }else if(currentTime==(lastFed+2)){
      foodObj.bedroom();
      text("Hunger Level:- Bad",5,120);
    }else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
      foodObj.washroom();
      text("Hunger Level:- Need Food",5,120);
    }else if(currentTime>(lastFed+5)){
      foodObj.dead();
    }
    // else{
    //   foodObj.display();
    // }

  }

  if (foodS<=0){
    dog.addImage(dogImg);
    feed.hide();
    // bottleMil.visible = false;

    bark.pause();

    textSize(25);
    fill("black");
    strokeWeight("2");
    stroke("grey");
    text("Ops!! There is no more milk left",70,490);
    drawSprites();
  }

  if (foodS >= 21){
    writeStock(foodS);
  }

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x) {
  if (x<=0) {
    x=0
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })

}

function addFood(){
  click.play();
  // dog.addImage(dogImg);
  foodS = foodS + 1;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){ 
  dog.visible = true; 
  writeStock(foodS);
  dog.addImage(happyDog);

  bark.play();
  milk.visible = true;

  foodObj.updateFoodStock(foodObj.getFoodStock()); 
  database.ref('/').update({
    FeedTime:hour(),
    Food:foodObj.getFoodStock()
  })

}

// function takeBath(){
//   if (takeBath){
//     back.visible = true;
//     input.remove();
//     bath.remove();
//     back.addImage(washroom_img);
//     dog.removeImage(dogImg);
//     feed.remove();
//     foodAdd.remove();
//     textSize(20);
//     text("sgcshvjdb",250,250);
//   }
//   // else{
//   //   back.visible = false;
//   //   input.show();
//   //   bath.show();
//   //   // back.addImage(washroom_img);
//   //   feed.show();
//   //   foodAdd.show();
//   // }
// }

// function dogHouse(){
//     back.visible = false;
//     dog.display();
//     dog.visible = true;
//     // dog.show();
//     dog.addImage(dogImg);
// }