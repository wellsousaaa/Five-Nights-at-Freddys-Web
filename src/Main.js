import React, {useState, useEffect} from 'react';

import Game from './Game';

import StaticImage from './media/Textures/Static-Cam.gif';
import StaticSound from './media/Sounds/Dead.mp3';
import VictoryGIF from './media/Textures/Victory.gif'; 
import VictorySound from './media/Sounds/Clock.mp3';

let VictoryImage = VictoryGIF;

let time, defaultTime;
let Hour = 0; 
let Energy = 100;
let victory = false;

export default function Main(){

  const [ gameOver, setGameOver ] = useState(false)
  const [ GameProps, setGame ] = useState ({
    Hour: 0,
    IsPlaying: true,
    Energy: 100,
    Time: 5000,
    Blackout: false
  })

  const changeHour = () => {
    if(GameProps.IsPlaying){
      if(!gameOver){
        setTimeout(() => {
          Hour += 1;
          setGame({...GameProps, Hour: Hour});
          
          if(Hour < 6){
            changeHour();
          }
        }, 89000);
      }
    }
  }

  const changeEnergy = () => {
    if(GameProps.IsPlaying){
      setTimeout(() => {
        Energy -= 1;
        setGame({...GameProps, Energy: Energy});
        
        if(Energy > 0){
          changeEnergy();
        }
      }, time);
    }
  }

  const notPlaying = () => {
    setGame({...GameProps, IsPlaying: false});
  }

  const changeTime = (count) => {
    let newTime = time + count;

    setGame({...GameProps, Time: newTime});
    time = newTime;
  }

  const GameOver = () => {
    setGameOver(true);
  }

  useEffect(() => {
    defaultTime = 7000;
    time = 7000;
    changeHour();
    changeEnergy();
  }, [])

  useEffect(() => {
    if(gameOver){
      let audio = new Audio(StaticSound);
      audio.loop = 'true';
      audio.play();
    }
  }, [gameOver])

  useEffect(() => {
    if(Energy == 0){
      setGame({...GameProps, Blackout: true});
    }
  }, [Energy])

  useEffect(() => {
    if(Hour == 6){
      victory = true;
      let VictoryMusic = new Audio(VictorySound);
      VictoryMusic.play();
      setTimeout(() => {
        VictoryImage = null;
      }, 7000);
    }
  }, [Hour])

  return(
    
    <> 
    { !gameOver && !victory ? <> <Game game={GameOver} blackout={GameProps.Blackout} endgame={notPlaying} energy={Energy} time={changeTime} hour={Hour} /> </> 
    : !victory ? <img src={StaticImage} style={{width: '100vw'}} /> : <img src={VictoryImage} style={{marginLeft: '30vw', marginTop: '25vh'}} />  
    }
    </>
  )
}


