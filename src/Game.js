import React, {useState, useEffect} from 'react';
import './css/Game.css';
import getCam from './components/Images';
import Functions from './Functions';
import Media from './Media';

/// COMPONENTS
import Camera from './components/Camera';
import Office from './components/Office';

///VARIAVEIS GLOBAIS
let isGameOver = false;
const OfficeProps = {
  RightDoor:false, LeftDoor:false, 
  RightLight:false, LeftLight:false,
  Bonnie: false,
  Chica: false,
  Foxy: false,
}
let camera = false;
let [BonnieLocalization, ChicaLocalization, FreddyLocalization, FoxyLocalization] = ['Stage', 'Stage', 'Stage', ''];
let [BonnieIterator, ChicaIterator, FreddyIterator, FoxyIterator] = [Functions.Bonnie(), Functions.Chica(), Functions.Freddy(), Functions.Foxy()];

/// FOR FUTURES UPDATES
const ChicaTime = 6300
const BonnieTime = 3000
const FreddyTime = 10000
const FoxyTime = 13000

const BonnieRange = 1;
const ChicaRange = 2;
const FreddyRange = 1;
const FoxyRange = 1;

let Local = '';
let ScreenWidth = window.screen.width;

let a = FreddyIterator.next().value;

function Game(props) {

  /// STATES
  const [ CameraName, setCameraName ] = useState('Stage');
  const [ situation, setSituation] = useState('normal');
  const [ IsCameraUp, setIsCameraUp] = useState(null);
  const [ animation, setAnimation] = useState(false);
  const [ isCameraOnScreen, setIsCameraOnScreen ] = useState(false);
  const [ AreAnimatronicsMoving, setAreAnimatronicsMoving ] = useState(false);
  const [ actualCamera, setActualCamera ] = useState(Media.Images.Stage);
  const [ Animatronics, setAnimatronics ] = useState({Bonnie: BonnieLocalization, Chica: ChicaLocalization, Freddy:"Stage", Foxy: FoxyLocalization})
  const [ Blackout, setBlackout ] = useState(props.blackout);

  /// ------------ ANIMATRONICS ------------ ///

  /// ||||||||    START INTERVALS    |||||||| ///

  useEffect(() => {

    Media.Sounds.Ambience.loop = 'true';
    Media.Sounds.Ambience.play();
    BonnieWillMove();
    ChicaWillMove();
    FreddyWillMove();
    FoxyWillMove();
  }, [])

  function FoxyWillMove(){
    if(!isGameOver){
      let FoxyNumber = Math.floor(Math.random() * 3);
      if(FoxyNumber < FoxyRange && FoxyLocalization !== '-3' && BonnieLocalization !== 'Stage'){
        setAreAnimatronicsMoving(true);
        FoxyLocalization = FoxyIterator.next().value;
        setAnimatronics({Bonnie: BonnieLocalization, Chica: ChicaLocalization, Freddy: FreddyLocalization, Foxy: FoxyLocalization});
        setTimeout(() => {
          setAreAnimatronicsMoving(false);
        }, 1000);
        if(FoxyLocalization === '-3'){
          setTimeout(() => {
            FoxyJumpscare();
          }, FoxyTime);
        }
      }

      setTimeout(() => {
        if(FoxyLocalization !== '-3'){
          FoxyWillMove();
        }
      }, 10000);
    }
  }

  function BonnieWillMove(){    /// CONTROLLER FOR BONNIE'S MOVIMENTS

    if(!isGameOver){
      let BonnieNumber = Math.floor(Math.random() * 5);
      if(BonnieNumber < BonnieRange && BonnieLocalization !== 'Door'){
      setAreAnimatronicsMoving(true);
      BonnieLocalization = BonnieIterator.next().value;
      setAnimatronics({Bonnie: BonnieLocalization, Chica: ChicaLocalization, Freddy: FreddyLocalization, Foxy: FoxyLocalization});
      setTimeout(() => {
        setAreAnimatronicsMoving(false);
      }, 1500); 
      }
  
      setTimeout(() => {
        if(BonnieLocalization !== 'Door'){
          BonnieWillMove();
        }
  
      }, BonnieTime);}
  }

  function ChicaWillMove(){    /// CONTROLLER FOR CHICA'S MOVIMENTS
    if(!isGameOver){

      let ChicaNumber = Math.floor(Math.random() * 5);
      if(ChicaNumber < ChicaRange && ChicaLocalization !== 'Door'){
      setAreAnimatronicsMoving(true);
      ChicaLocalization = ChicaIterator.next().value;
      setAnimatronics({Bonnie: BonnieLocalization, Chica: ChicaLocalization, Freddy: FreddyLocalization, Foxy: FoxyLocalization});

      setTimeout(() => {
        setAreAnimatronicsMoving(false);
      }, 1500);}

      setTimeout(() => {
        if(ChicaLocalization !== 'Door'){
          ChicaWillMove();
        }
  
      }, ChicaTime);
    }
  }
  
  function FreddyWillMove(){    /// CONTROLLER FOR FREDDY'S MOVIMENTS
    
    if(!isGameOver){
      let FreddyNumber = Math.floor(Math.random() * 2);
      if(FreddyNumber < FreddyRange && BonnieLocalization !== 'Stage' && ChicaLocalization !== 'Stage' && FreddyLocalization != Local && FreddyLocalization !== 'Door'){
        setAreAnimatronicsMoving(true);
        FreddyLocalization = FreddyIterator.next().value;
        setAnimatronics({Bonnie: BonnieLocalization, Chica: ChicaLocalization, Freddy: FreddyLocalization, Foxy: FoxyLocalization});
        
        setTimeout(() => {
          setAreAnimatronicsMoving(false);
        }, 1500);

        FreddyNumber = Math.floor(Math.random() * 2);
        if(FreddyNumber == 0){
          Media.Sounds.FreddyLaugh1.play();
        }
        else{
          Media.Sounds.FreddyLaugh2.play();
        }
      }
    }


    setTimeout(() => {
      if(FreddyLocalization !== 'Door'){
        FreddyWillMove();
      }

    }, FreddyTime);
  }

  const FoxyJumpscare = () => {
    if(!isGameOver){
      if(!OfficeProps.LeftDoor && FoxyLocalization === '-3'){
        
        handleButtonClick(null);
        setAreAnimatronicsMoving(true);
        OfficeProps.Foxy = true;
        isGameOver = true;
        setAreAnimatronicsMoving(false);
      }
      else{
        if(FoxyLocalization !== ''){
          Media.Sounds.FoxyPunch.play();
          FoxyLocalization = '';
          FoxyIterator = Functions.Foxy();
          setTimeout(() => {
            FoxyWillMove();
          }, 10000);
        }
      }
    }
  }

  /// |||||||| GAMEOVER |||||||| ///

  useEffect(() => {    /// IN 0% ENERGY
    if(props.blackout){
      setBlackout(true)
      Media.Sounds.Ambience.pause();
      isGameOver = true;
    }
  }, [props.blackout])

  useEffect(() => {    /// IN 6AM
    if(props.hour === 6){
      Media.Sounds.Ambience.pause();
      isGameOver = true;
    }
  }, [props.hour])

  const GameOver = () => {
    props.endgame();
    Media.Sounds.Ambience.pause();
    [BonnieIterator, FreddyIterator, ChicaIterator] = [null, null, null]; 
  }

  /// |||||||| CHANGE OFFICE |||||||| ///

  const handleCameraButton = () => {    /// OPEN AND CLOSE CAMERA
    Media.Sounds.OpenCamera.play();
    if(!animation){
      if(!IsCameraUp){
        if(OfficeProps.RightLight){
          props.time(500);
          OfficeProps.RightLight = false
        }
        if(OfficeProps.LeftLight){
          props.time(500);
          OfficeProps.LeftLight = false
        }
        camera = true; props.time(-1000);
        setIsCameraUp(true);
        setAnimation(true);
      }
      else{
        camera = false;
        props.time(1000);
        if(BonnieLocalization == 'Jumpscare'){    /// SET BONNIE'S JUMPSCARE
          isGameOver = true;
          setSituation('Bonnie');
          document.querySelector('.camera-button').style.display = 'none';
          setTimeout(() => {
            props.game()
            GameOver();
          }, 2000); 
        }
        if(ChicaLocalization == 'Jumpscare'){    /// SET CHICA'S JUMPSCARE
          isGameOver = true;
          setSituation('Chica');
          document.querySelector('.camera-button').style.display = 'none';
          setTimeout(() => {
            props.game()
            GameOver();
          }, 2000);
        }
        
        setIsCameraUp(false);
        setAnimation(true);
      }

      if(isCameraOnScreen){setIsCameraOnScreen(false);}
      setTimeout(() => {
        setAnimation(false);
        if(!isCameraOnScreen){setIsCameraOnScreen(true);}
      }, 450);
    }
  }

  const handleCameraChange = (e) => {    /// CONTROLLER FOR CAMERA'S BUTTONS
    Media.Sounds.CameraChange.play();
    let name = e.target.title;
    e.preventDefault();
    let search = Functions.checkAnimatronicsPosition(BonnieLocalization, ChicaLocalization, FreddyLocalization, name);
    if(name === 'Pirate Cove'){search = FoxyLocalization}
    Local = name;
    setCameraName(name);
 

    setActualCamera(getCam(search, name, FoxyLocalization)); 
    if(name === 'West Hall' && FoxyLocalization == '-3'){
      setTimeout(() => {
        FoxyJumpscare();
      }, 1750);
    }
  }

  const BonnieFailed = () => {     /// IN CASE BONNIE FAILS ITS ATTACK
      BonnieIterator = Functions.Bonnie(); BonnieWillMove(); BonnieLocalization = 'Dinning Area'; OfficeProps.Bonnie = false; 
  }
  const ChicaFailed = () => {    /// IN CASE CHICA FAILS ITS ATTACK
    ChicaIterator = Functions.Chica(); ChicaWillMove(); ChicaLocalization = 'Dinning Area'; OfficeProps.Chica = false; 
  }
  const FreddyFailed = () => {
    FreddyIterator = Functions.Freddy(); FreddyWillMove(); FreddyLocalization = 'Dinning Area';
  }


  const CheckDoors = (name) => {   /// CHECK ENTRANCE OF ANIMATRONICS
    if(!isGameOver){
      if(name === 'Bonnie'){
        OfficeProps.Bonnie = true; 
    
        setTimeout(() => {    
        if(OfficeProps.LeftDoor){ BonnieFailed(); }

        else{
            setTimeout(() => {
              if(OfficeProps.LeftDoor){ BonnieFailed(); }

              else{
                setTimeout(() => {
                  if(OfficeProps.LeftDoor){ BonnieFailed(); }

                  else{
                    if(BonnieLocalization === 'Door'){
                      OfficeProps.Bonnie = false;
                      BonnieLocalization = 'Jumpscare';
                    }

                }}, 3000);}
            }, 5000);}
      }, 10000);
      }
      if(name === 'Chica'){
        OfficeProps.Chica = true; 
    
        setTimeout(() => {    
        if(OfficeProps.RightDoor){ ChicaFailed(); }

        else{
            setTimeout(() => {
              if(OfficeProps.RightDoor){ ChicaFailed(); }

              else{
                setTimeout(() => {
                  if(OfficeProps.RightDoor){ ChicaFailed(); }

                  else{
                    if(ChicaLocalization === 'Door'){
                      OfficeProps.Chica = false;
                      ChicaLocalization = 'Jumpscare';
                    }
                }}, 3000);}
            }, 5000);}
      }, 10000);
      }
      if(name === 'Freddy'){
        setTimeout(() => {    
          if(OfficeProps.RightDoor){ FreddyFailed(); }
  
          else{
              setTimeout(() => {
                if(OfficeProps.RightDoor){ FreddyFailed();}
  
                else{
                  setTimeout(() => {
                    if(OfficeProps.RightDoor){ FreddyFailed(); }
  
                    else{
                      FreddyLocalization = 'Jumpscare';
                      setAnimatronics({...Animatronics, Freddy: FreddyLocalization})
                  }}, 3000);}
              }, 5000);}
        }, 10000);
      }
    }
    }

  /// CHECK ANIMATRONIC'S PLACE
  useEffect(() => {
    let search = Functions.checkAnimatronicsPosition(BonnieLocalization, ChicaLocalization, FreddyLocalization, CameraName);
    if(CameraName === 'Pirate Cove'){
      search = FoxyLocalization;
    }
    setActualCamera(getCam(search, CameraName, FoxyLocalization)); 
    if(CameraName === 'West Hall' && FoxyLocalization == '-3'){
      setTimeout(() => {
        FoxyJumpscare();
      }, 1750);
    }

    if(BonnieLocalization === "Door"){
      CheckDoors('Bonnie');
    } 
    if(ChicaLocalization === "Door"){
      CheckDoors('Chica');
    } 
    if(FreddyLocalization === "Door"){
      CheckDoors('Freddy');
    } 

    if(FreddyLocalization == 'Jumpscare'){    /// SET FREDDY'S JUMPSCARE
          let jumpscareNumber =  Math.floor(Math.random() * 3);
          if(jumpscareNumber === 0){
            isGameOver = true;
            handleButtonClick();
            setSituation('Freddy');
            document.querySelector('.camera-button').style.display = 'none';
            setTimeout(() => {
            props.game()
            GameOver();
          }, 1500);
          }
      }

  }, [Animatronics]);

  /// OPEN AND CLOSE DOORS
  const handleButtonClick = async (e) => {
    let title, alt;
    if(e){
      title =  e.target.title;
      alt = e.target.alt;
      e.preventDefault();
    }
    else{
      [title, alt] = ['Door, Left Door'];
    }
    await setIsCameraOnScreen(true);
    
    if (alt == 'Door'){
      Media.Sounds.Door.play();
      if(title == 'Right Door'){
        if(OfficeProps.RightLight){
          props.time(500);
          OfficeProps.RightLight = false
        }
        if(!OfficeProps.RightDoor){
          props.time(-1750);
          OfficeProps.RightDoor = true
        }
        else{
          props.time(1750);
          OfficeProps.RightDoor = false
        }
      }
      else{
        if(OfficeProps.LeftLight){
          props.time(500);
          OfficeProps.LeftLight = false
        }
        if(!OfficeProps.LeftDoor){
          props.time(-1750);
          OfficeProps.LeftDoor = true
        }
        else{
          props.time(1750);
          OfficeProps.LeftDoor = false
        }
      }
    }

    if(alt == 'Light'){
      if(title == 'Right Light'){
        if(!OfficeProps.RightLight  && !OfficeProps.RightDoor){
          if(OfficeProps.Chica){ Media.Sounds.Surprise.play(); }
          props.time(-500);
          OfficeProps.RightLight = true
        }
        else{
          if(!OfficeProps.RightDoor){props.time(500)}
          OfficeProps.RightLight = false
        }
      }
      else{
        if(!OfficeProps.LeftLight && !OfficeProps.LeftDoor){
          if(OfficeProps.Bonnie){ Media.Sounds.Surprise.play(); }
          props.time(-500);
          OfficeProps.LeftLight = true
        }
        else{
          if(!OfficeProps.LeftDoor){props.time(500)}
          OfficeProps.LeftLight = false
        }
      }
    }
    setIsCameraOnScreen(false)
  }





  return ( <div className="App"> { !Blackout ? <>
      { animation && IsCameraUp ? <img draggable='false' className="camera" id="camera" src={Media.Images.UpAndDown} alt="" style={{width: '100vw', height: '100vh', position: 'absolute'}} /> : null }
      { animation && !IsCameraUp ? <img draggable='false' className="camera" id="camera" src={Media.Images.Down} alt="" style={{width: '100vw', height: '100vh', position: 'absolute'}} /> : null }
      
      { !animation ? 
      <>
      <h1 className="hour" style={{position: 'absolute'}}>{props.hour == 0 ? 12 : props.hour} AM </h1> 
      <h2 className="energy" style={{position: 'absolute'}}>Power Left: {props.energy}% </h2> </>
      : null }

      { !isCameraOnScreen ? <> <Office RightDoor={OfficeProps.RightDoor} LeftDoor={OfficeProps.LeftDoor} foxy={OfficeProps.Foxy}
      
      Bonnie={OfficeProps.Bonnie} Chica={OfficeProps.Chica} LeftLight={OfficeProps.LeftLight} RightLight={OfficeProps.RightLight}
      w={ScreenWidth} sit={situation} className="office" map="#office" setGameOver={props.game}
      
      />
      
      <map name="office" style={{width: ScreenWidth}}>
        <area alt="Door" title="Left Door" href="" coords="33,284,70,345" shape="rect"  onClick={handleButtonClick} />
        <area alt="Light" title="Left Light" href="" coords="29,364,73,422" shape="rect" onClick={handleButtonClick} />
        <area alt="Door" title="Right Door" href="" coords="1279,293,1318,349"  shape="rect" onClick={handleButtonClick} /> 
        <area alt="Light" title="Right Light" href="" coords="1280,369,1320,424"  shape="rect" onClick={handleButtonClick} />
      </map>
      
      </>
      : null}    
      
      { isCameraOnScreen ? <> <Camera  src={actualCamera} name={`animatronics-${AreAnimatronicsMoving}`} alt="" className="cam" />
      {/* <div className="static" style={{display: 'none'}}></div> */}

      <img draggable="false" src={Media.Images.Map} style={{position: 'absolute'}} useMap="#map" className="map" />

      </> : null} 
      <img draggable='false' className='camera-button' alt="" src={Media.Images.CameraButton} style={{position: 'absolute'}} onMouseOver={handleCameraButton}/>   
      
      <map name="map">
            <area title="Stage" href=""  coords="113,22,161,53" shape="rect" onClick={handleCameraChange}></area>
            <area title="Dinning Area" href=""  coords="96,84,145,113" shape="rect" onClick={handleCameraChange} ></area>
            <area title="Restrooms" href="" coords="318,99,368,131" shape="rect" onClick={handleCameraChange} ></area>
            <area title="Backstage" href=""  coords="50,144,1,111" shape="rect" onClick={handleCameraChange} ></area>
            <area title="Pirate Cove" href="" id="Foxy"  coords="52,162,102,194" shape="rect" onClick={handleCameraChange} ></area>
            <area title="Supply Closet" href=""  coords="35,250,84,285" shape="rect" onClick={handleCameraChange} ></area>
            <area title="West Hall" href=""  coords="109,285,159,317" shape="rect" onClick={handleCameraChange} ></area>
            <area title="W. Hall Corner" href=""  coords="109,325,159,356" shape="rect" onClick={handleCameraChange} ></area>
            <area title="East Hall" href=""  coords="201,284,251,318" shape="rect" onClick={handleCameraChange} ></area>
            <area title="E. Hall Corner" href=""  coords="200,325,248,354" shape="rect" onClick={handleCameraChange} ></area>
            <area title="Kitchen" href=""  coords="322,237,368,266" shape="rect" onClick={handleCameraChange} ></area>
            
        </map> </> : 
        
        <Office w={ScreenWidth} setGameOver={props.game} blackout={true} className="office" />
        }
    </div>
  );
}

export default Game;
