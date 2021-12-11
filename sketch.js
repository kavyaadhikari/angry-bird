const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot,bg;
var gs = "onsling"

function preload() {
  
    getTime();
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,590,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(740,545);
    box2 = new Box(860,545);
    pig1 = new Pig(810, 555);
    log1 = new Log(810,500,300, PI/2);

    box3 = new Box(740,455);
    box4 = new Box(860,455);
    pig3 = new Pig(810, 465);

    log3 =  new Log(810,410,300, PI/2);

    box5 = new Box(810,365,70,70);
    log4 = new Log(760,365,150, PI/7);
    log5 = new Log(870,365,150, -PI/7);

    bird = new Bird(200,250);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:250});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    else{
        background("lightblue");
    }
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if(gs !== "launched"){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gs = "launched"
}

function keyPressed(){
    if(keyCode === 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body, {x: 200 , y: 250});
        slingshot.attach(bird.body);
        gs = "onsling"
    }
}

async function getTime(){
    var tlink = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var tjson = await tlink.json();
    var dt = tjson.datetime;
    var hr = dt.slice(11,13);
    console.log(hr);

    if(hr>=06 && hr<=18){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/night.jpg";
    }
    
    backgroundImg = loadImage(bg);
}