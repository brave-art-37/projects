// Initial Settings

document.getElementsByClassName('bird')[0].style.transform = `translate(300px, 200px)`;
let number = 0;
let birdMoveable = false;
let gameStartOnce = false;
let increment = 20;
// --------------------------------------------------------------------------------------------------



// Starting the Game

document.addEventListener("keydown", start);

function start(e){
  keyCode = e.keyCode;
  if(keyCode==32 && gameStartOnce == false){
      document.body.getElementsByClassName('bird')[0].style.transform=`translate(300px, 200px)`;
      gameStartOnce = true;
      birdMoveable = true;
      hey1 = setInterval(makeBuildings, 500);
      hey2 = setInterval(move, 300);
      document.getElementsByClassName('heading')[0].innerHTML = ``;
      document.getElementsByClassName('subheading')[0].innerHTML = ``;
      document.body.getElementsByClassName('time')[0].innerHTML='00 : 00';
      setInterval(time, 1000);
      document.getElementsByTagName('hr')[0].style.display = 'block';
  }
}
// --------------------------------------------------------------------------------------------------



// Time

let minutesTime = '00';
let secondsTime = '00';

function time(){
  if(document.body.getElementsByClassName('subheading')[0].innerHTML == ''){
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
// --------------------------------------------------------------------------------------------------



// Making Buildings

let buildings = new Array();

function makeBuildings(){

    buildings.push(`${190+Math.floor(250*Math.random())}`);

    let temp = document.createElement('div');
    let YShiftNew = 0;
    for(let j = buildings.length-2; j>=0; j--){
        YShiftNew += Number(buildings[j]);
    }
    temp.className = 'building';
    temp.style.height = `${Number(buildings[buildings.length-1])}px`;
    temp.style.transform = `translate(1000px, ${500-YShiftNew-Number(buildings[buildings.length-1])}px)`;
    document.getElementsByTagName("body")[0].appendChild(temp);

    number++;

    if(number>13){
        buildings.shift();
        document.getElementsByClassName('building')[0].remove();


        for(let k=0; k<buildings.length-1; k++){

            let YShift = 0;
            for(let j = k-1; j>=0; j--){
                YShift += Number(buildings[j]);
            }
            document.body.getElementsByClassName('building')[k].style.transform = `translate(${1000-60*(buildings.length-k)}px, ${500-YShift-Number(buildings[k])}px)`;
        }
    }
    else{
        for(let k=0; k<buildings.length-1; k++){
            let barY = new Array();
        
            for(let j=document.body.getElementsByClassName('building')[k].style.transform.length-4; j>0; j--){
                if(document.body.getElementsByClassName('building')[k].style.transform[j] == ' '){
                    break;
                }
                else{
                    barY.push(document.body.getElementsByClassName('building')[k].style.transform[j]);
                }
            }


            s2 = '';

            for(let i=barY.length-1; i>-1;i--){
              s2+=barY[i];
            }
            let yCurrent = Number(s2);
        
            document.body.getElementsByClassName('building')[k].style.transform = `translate(${1000-60*(buildings.length-k)}px, ${yCurrent}px)`;
        }
    }
}
// --------------------------------------------------------------------------------------------------



// Movement of Bird 

function move(){

  let birdY = new Array();

  for(let i=document.body.getElementsByClassName('bird')[0].style.transform.length-1; i>=0; i--){
    if(document.body.getElementsByClassName('bird')[0].style.transform[i]=='p'){
      for(let j=i-1; j>i-6; j--){
        if(document.body.getElementsByClassName('bird')[0].style.transform[j]==' '){
          break;
        }
        else{
          birdY.push(document.body.getElementsByClassName('bird')[0].style.transform[j]);
        }
      }
      break;
    }
  }

  let s1='';
  for(let i=birdY.length-1; i>-1;i--){
    s1+=birdY[i];
  }

  YCoordinate = Number(s1);

  for(let m=0; m<buildings.length; m++){

      if(YCoordinate >=  500-Number(buildings[m])){

          let buildX = new Array();

          for(let i=11; i<document.body.getElementsByClassName('building')[m].style.transform.length; i++){
              if(document.body.getElementsByClassName('building')[m].style.transform[i]=='p'){
                for(let j=i-1; j>i-6; j--){
                  if(document.body.getElementsByClassName('building')[m].style.transform[j]=='('){
                    break;
                  }
                  else{
                    buildX.push(document.body.getElementsByClassName('building')[m].style.transform[j]);
                  }
                }
                break;
              }
            }
        
          let s3='';
          for(let i=buildX.length-1; i>-1;i--){
              s3+=buildX[i];
          }
      
          buildXCoordinate = Number(s3);

          if(buildXCoordinate>=260 && buildXCoordinate<=300){
              gameOver();
          }
      }
  }

  if(YCoordinate<=0){
      gameOver();
  }

  YCoordinate += increment;

  document.body.getElementsByClassName('bird')[0].style.transform=`translate(300px, ${YCoordinate}px)`;
}
// --------------------------------------------------------------------------------------------------



// Player Pressing the Key for Moving the Bird Up

document.addEventListener("keydown", moveup);

function moveup(e){
    keyCode = e.keyCode;

    if(keyCode==38 && birdMoveable==true){

      let birdY = new Array();

      for(let i=document.body.getElementsByClassName('bird')[0].style.transform.length-1; i>=0; i--){
        if(document.body.getElementsByClassName('bird')[0].style.transform[i]=='p'){
          for(let j=i-1; j>i-6; j--){
            if(document.body.getElementsByClassName('bird')[0].style.transform[j]==' '){
              break;
            }
            else{
              birdY.push(document.body.getElementsByClassName('bird')[0].style.transform[j]);
            }
          }
          break;
        }
      }
    
      let s1='';
      for(let i=birdY.length-1; i>-1;i--){
        s1+=birdY[i];
      }
    
      YCoordinate = Number(s1);

        YCoordinate -= 2*increment;
        document.body.getElementsByClassName('bird')[0].style.transform=`translate(300px, ${YCoordinate}px)`;
    }
}
// --------------------------------------------------------------------------------------------------



// Game Over

function gameOver(){
    clearInterval(hey1);
    clearInterval(hey2);
    birdMovable = false;
    
    document.getElementsByClassName('heading')[0].innerHTML = `Game Over`;
    document.getElementsByClassName('subheading')[0].innerHTML = `Press 'Spacebar' to Refresh`;
}
// --------------------------------------------------------------------------------------------------



// Refreshing the Game

document.addEventListener('keydown', refresh);

function refresh(e){
    if(e.keyCode == 32 && gameStartOnce == true && birdMovable == false){
        window.location.reload();
    }
}
// --------------------------------------------------------------------------------------------------