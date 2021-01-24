class Food{
    constructor(){
        this.foodStock;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
        this.sadImg = loadImage("sad emoji.png");
        this.button = createButton("Revive your dog");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }
   

    deductFood(){
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock-1
        }
    }

    display(){

        this.button.hide();

        this.button.position(545,310);
        this.button.mousePressed(()=>{
            this.button.hide();
            feedDog();
            addFood();
 
        });

        var x = 15;
        var y = 200;

        imageMode(CENTER);
        image(this.image);

        if (this.FoodStock != 0 ) {
            for (var i=0; i<this.foodStock; i++){
                if (i%5 == 0) {
                    x=15;
                    y = y + 50;
                }

                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }

    bedroom(){
        imageMode(CENTER);
        dog.addImage(bedroom_img,500,500);
    }

    garden(){
        imageMode(CENTER);
        dog.addImage(garden_img,500,500);
    }

    washroom(){
        imageMode(CENTER);
        dog.addImage(washroom_img,500,500);
    }

    dead(){
        feed.hide();
        foodAdd.hide();
        this.button.show();
        textSize(27);
        strokeWeight(3);
        stroke("black");
        fill("red");
        text("Ohh! It seems your dog is dead, because",5,100);
        text("you haven't feed him from past five hours",5,150);
        imageMode(CENTER);
        image(this.sadImg);
        image(this.sadImg,250,200,100,100);
        dog.addImage(deadImg,500,500);
    }
}