// Starting the Game

let gameOn = false;
document.addEventListener('keydown', start);

function start(e){
  let startingCode = e.keyCode;

  if(startingCode==32 && gameOn==false){
    document.body.getElementsByClassName('time')[0].innerHTML='00 : 00';
    const hey2 = setInterval(time, 1000);
    document.body.getElementsByClassName('flex-box')[0].style.display='flex';
    document.body.getElementsByClassName('heading')[0].innerHTML = '';
    document.body.getElementsByClassName('subheading')[0].innerHTML = '';


    startingYCoordinate = 10 + Math.floor(Math.random() * 1240);
    document.body.getElementsByClassName('ball')[0].style.transform=`translate(${startingYCoordinate}px,15px)`;
    hitbar = 0;
    hitside1 = 0;
    hitside2 = 0;
    hitup = 0;
    increment = 2;
    barXCoordinate = 600;
    gameOn = true;

    document.getElementsByTagName('hr')[0].style.display='block';
    document.body.getElementsByClassName('bar')[0].style.transform="translate(600px,500px)";
    const hey1 = setInterval(ballMove, 100);
  }
}
// ---------------------------------------------------------------------------------------



// Timer

let minutesTime = '00';
let secondsTime = '00';

function time(){
  if(document.body.getElementsByClassName('subheading')[0].innerHTML ==''){
    if(Number(secondsTime)==59){
      secondsTime = '00';
      if(Number(minutesTime)<9){
        minutesTime = '0'+`${Number(minutesTime)+1}`;
        increment += 5;
      }
      else{
        minutesTime = `${Number(minutesTime)+1}`;
        increment += 5;     
      }
      
    }
    else if(Number(secondsTime)<9){
      secondsTime = '0'+`${Number(secondsTime)+1}`;
    }
    else{
      secondsTime = `${Number(secondsTime)+1}`
    }
  }

  let timing = minutesTime + ' : ' + secondsTime;

  document.body.getElementsByClassName('time')[0].innerHTML = timing;
  
}
// ---------------------------------------------------------------------------------------



// Detecting Player Pressing the Key for Moving the Bar

document.addEventListener("keydown", keyPress);

function keyPress(e) {
  let keyCode = e.keyCode;

  if (barXCoordinate > 1150) {
    document.body.getElementsByClassName('bar')[0].style.transform="translate(1150px,500px)";
  }
  else if (barXCoordinate < 0) {
    document.body.getElementsByClassName('bar')[0].style.transform="translate(0px,500px)";
  }

  barMove(keyCode);
}
// ---------------------------------------------------------------------------------------



// Handling Movement of Bar

function barMove(keyCode) {

  let barX = new Array();

  for(let i=11; i<document.body.getElementsByClassName('bar')[0].style.transform.length; i++){
    if(document.body.getElementsByClassName('bar')[0].style.transform[i]=='p'){
      for(let j=i-1; j>i-6; j--){
        if(document.body.getElementsByClassName('bar')[0].style.transform[j]=='('){
          break;
        }
        else{
          barX.push(document.body.getElementsByClassName('bar')[0].style.transform[j]);
        }
      }
      break;
    }
  }

  let s3='';
  for(let i=barX.length-1; i>-1;i--){
    s3+=barX[i];
  }

  barXCoordinate = Number(s3);

  if (keyCode == 74 || keyCode == 39) {
    barXCoordinate += increment;
  }
  else if (keyCode == 70 || keyCode == 37) {
    barXCoordinate -= increment;
  }

  if(document.body.getElementsByClassName('subheading')[0].innerHTML ==''){
  document.getElementsByClassName("bar")[0].style.transform = `translate(${barXCoordinate}px, 500px)`;
  }
}
// ---------------------------------------------------------------------------------------



// Handling Movement of Ball

function ballMove() {
    let ballX = new Array();
    let ballY = new Array();

    let testVar = 0;
    
    for(let i=11; i<document.body.getElementsByClassName('ball')[0].style.transform.length; i++){
        if(document.body.getElementsByClassName('ball')[0].style.transform[i]=='p'){
            for(let j=i-1; j>i-6; j--){
                if(document.body.getElementsByClassName('ball')[0].style.transform[j]=='(' || document.body.getElementsByClassName('ball')[0].style.transform[j]==' '){
                    testVar++;
                    break;
                }
                else if(testVar==0){
                    ballX.push(document.body.getElementsByClassName('ball')[0].style.transform[j]);
                }
                else if(testVar==1){
                    ballY.push(document.body.getElementsByClassName('ball')[0].style.transform[j]);
                }
            }
        }
    }
    let s1='';
    let s2='';
    for(let i=ballX.length-1; i>-1;i--){
      s1+=ballX[i];
    }
    for(let i=ballY.length-1; i>-1;i--){
      s2+=ballY[i];
    }
    let xCurrent = Number(s1);
    let yCurrent = Number(s2);

    let xNew = modifyx(xCurrent);
    let yNew = modifyy(xCurrent, yCurrent);

    document.body.getElementsByClassName('ball')[0].style.transform = `translate(${xNew}px, ${yNew}px)`;
}
// ---------------------------------------------------------------------------------------



// Modifying X Coordinate of Ball

function modifyx(xCoordinate){
  if(xCoordinate<=3){
    hitside1++;
  }
  else if(xCoordinate>=1272){
    hitside2++;
  }
  
  if((hitside1+hitside2)%2==0){
    return(xCoordinate+increment);
  }
  else{
    return(xCoordinate-increment);
  }
}
// ---------------------------------------------------------------------------------------



// Modifying Y Coordinate of Ball

function modifyy(xCoordinate, yCoordinate){
  if(yCoordinate<=10){
    hitup++;
  }
  else if(yCoordinate>525){
    gameOver();
  }
  else if((yCoordinate<=500) && (yCoordinate+1.1*increment>500)){
    if((xCoordinate>=barXCoordinate-40)&&(xCoordinate<=barXCoordinate+190)){
      hitbar++;
    }
  }

  if((hitup+hitbar)%2==0){
    return(yCoordinate+increment);
  }
  else{
    return(yCoordinate-increment);
  }
}
// ---------------------------------------------------------------------------------------



// Ending the Game

function gameOver(){
  document.body.getElementsByClassName('heading')[0].innerHTML = `Game Over`;  
  document.body.getElementsByClassName('subheading')[0].innerHTML = `Press 'Spacebar' to Refresh`;
  clearInterval(hey1);
}
// ---------------------------------------------------------------------------------------



// Player Trying to Refresh the Game

document.addEventListener('keydown', refresh);

function refresh(e){
  let refresh = e.keyCode;

  if(refresh==32 && document.body.getElementsByClassName('heading')[0].innerHTML=='Game Over'){
    window.location.reload();
  }
}
// ---------------------------------------------------------------------------------------


