import React, {useState, useEffect} from 'react';
import Default from '../media/Textures/Office/Default.jpg' 

import Blackout from '../media/Textures/Office/304.jpg';
import BlackoutSound from '../media/Sounds/powerdown.mp3';
import MusicBox from '../media/Sounds/music box.mp3';
import FreddyBlackout from '../media/Textures/Freddy.gif';

import Jumpscare from '../media/Sounds/jumpscare.mp3'
import BonnieJumpscare from '../media/Textures/Bonnie-Jumpscare.gif';
import ChicaJumpscare from '../media/Textures/Chica-Jumpscare.gif';
import FreddyJumpscare1 from '../media/Textures/Freddy-Jumpscare1.gif';
import FreddyJumpscare2 from '../media/Textures/Freddy-Jumpscare.gif';
import FoxyJumpscare from '../media/Textures/Foxy-Jumpscare.gif';

import LD from '../media/Textures/Office/LD.jpg';
import RD from '../media/Textures/Office/RD.jpg';
import RD_LD from '../media/Textures/Office/RD_LD.jpg';
import LD_RL from '../media/Textures/Office/LD_RL.jpg';
import RD_LL from '../media/Textures/Office/RD_LL.jpg'; 

import RD_LL_BONNIE from '../media/Textures/Office/RD_LL_BONNIE.jpg';
import LD_RL_CHICA from '../media/Textures/Office/LD_RL_CHICA.jpg';
import RL from '../media/Textures/Office/RL.jpg';

import RL_LL_BONNIE from '../media/Textures/Office/RL_LL_BONNIE.jpg';
import LL from '../media/Textures/Office/LL.jpg';
import LL_BONNIE from '../media/Textures/Office/LL_BONNIE.jpg'; 
import RL_LL from '../media/Textures/Office/RL_LL.jpg'
import RL_CHICA from '../media/Textures/Office/RL_CHICA.jpg';
import RL_LL_CHICA from '../media/Textures/Office/RL_LL_CHICA.jpg' 
import RL_LL_BONNIE_CHICA from '../media/Textures/Office/RL_LL_BONNIE_CHICA.jpg'

let musicBox = new Audio(MusicBox)
musicBox.loop = 'true';


export default function Office(props){
    const [ situation, setSituation ] = useState(props.sit);
    const [ background, setBackground ] = useState(Default);
    const w = props.w 

    useEffect(() => {
        let image;
        switch (situation) {
            case 'normal':
                image = Default
                break;
        
            default:
                break;
        }

    }, [situation])

    useEffect(() => {
        if(!props.blackout){
            if(props.foxy){
                setBackground(FoxyJumpscare);
                let audio = new Audio(Jumpscare);
                audio.play();
                setTimeout(() => {
                    props.setGameOver();
                }, 900);
            }
            else{
                let back = '';

                /// CHECKDOORS
                if(props.LeftDoor && !props.RightDoor){
                    back += 'l';
                }
                else if (props.RightDoor && !props.LeftDoor){
                    back += 'r';
                }
                else if (props.LeftDoor && props.RightDoor){
                    back += '2';
                }
                else{ back += '-'; }
        
                ///CHECKLIGHTS
                if(props.LeftLight && !props.RightLight){
                    back += '-l'
                }
                else if(props.RightLight && !props.LeftLight){
                    back += '-r'
                }
                else if(props.RightLight && props.LeftLight){
                    back += '-2'
                }
                else{ back += '-'}
        
                /// CHECK ANIMATRONICS
                if(props.Bonnie && !props.Chica){
                    back += '-b'
                }
                else if(props.Chica && !props.Bonnie){
                    back += '-c'
                }
                else if(props.Chica && props.Bonnie){
                    back += '-b-c'
                }
        
        
                switch (back) {
                    case 'r-': setBackground(RD); break;
                    case 'l-': setBackground(LD); break;
                    case 'l-r': setBackground(LD_RL); break;
                    case 'r-l': setBackground(RD_LL); break;
                    case 'r-l-b': setBackground(RD_LL_BONNIE); break;
                    case 'l-r-c': setBackground(LD_RL_CHICA); break;
                    case '-r-c': setBackground(RL_CHICA); break;
                    case '--l-b': setBackground(LL_BONNIE); break;
                    case '--l': setBackground(LL); break;
                    case '--r': setBackground(RL); break;
                    case '-2': setBackground(RL_LL); break;
                    case '2-':  setBackground(RD_LD); break;
                    case 'l--b': setBackground(LD); break;
                    case '2--b': setBackground(RD_LD); break;
                    case '2--c':  setBackground(RD_LD); break;
                    case '2--b-c': setBackground(RD_LD); break;
                    case '--2-b':  setBackground(RL_LL_BONNIE); break;
                    case '--2-b-c': setBackground(RL_LL_BONNIE_CHICA); break;
                    case '--2-c': setBackground(RL_LL_CHICA); break;
                    case '--2': setBackground(RL_LL); break;
                    case '--l-b-c': setBackground(LL_BONNIE); break;
                    case 'r-l-b-c': setBackground(RD_LL_BONNIE); break;
                    case '--r-b-c': setBackground(RL_CHICA); break;
                    case 'l-r-b-c': setBackground(LD_RL_CHICA); break;
                    case '--r-c': setBackground(RL_CHICA); break;
                    case 'r--c': setBackground(RD); break;
                    case 'l--c': setBackground(LD); break;
                    case '--l-c': setBackground(LL); break;
                    case 'l-r-b': setBackground(LD_RL); break;
                    case 'r-l-c': setBackground(RD_LL); break;
                    case '--r-b': setBackground(RL); break;
                    default:
                        break;
                }
        
                if(props.sit == "Bonnie"){
                    setBackground(BonnieJumpscare);
                    let audio = new Audio(Jumpscare);
                    audio.play();
                }
                if(props.sit == "Chica"){
                    setBackground(ChicaJumpscare);
                    let audio = new Audio(Jumpscare);
                    audio.play();
                }
                if(props.sit == "Freddy"){
                    setBackground(FreddyJumpscare2);
                    let audio = new Audio(Jumpscare);
                    audio.play();
                }
            }

    }

    else{
        setBackground(Blackout)
        let audio = new Audio(BlackoutSound);
        audio.play();

        setTimeout(() => {
            setBackground(FreddyBlackout);
            musicBox.play();
            setTimeout(() => {
                defineJumpscare(); 
            }, 7000);
        }, 7000);
    }
        
    }, [])

    const defineJumpscare = (audio) => {
        let jumpscareNumber = Math.floor(Math.random() * 9);
        if( jumpscareNumber == 0 ){

            setBackground(null);
            musicBox.pause();
            setTimeout(() => {
                FreddyJumpscare();

            }, 5000);
        }
        else{setTimeout(() => {
 
            defineJumpscare(); 
        }, 1000);}
         
    }

    const FreddyJumpscare = () => {
        let jumpscareNumber = Math.floor(Math.random() * 9);
        if( jumpscareNumber < 4 ){
            setBackground(FreddyJumpscare1);
            let audio = new Audio(Jumpscare);
            audio.play();
            setTimeout(() => {
                props.setGameOver();
            }, 1250);
        }
        else{
            setTimeout(() => {
                FreddyJumpscare();
            }, 2000);
        }
    }

    return(
        <div className="area" style={{width: 1000}} >
            <img draggable='false' src={background} style={{width: w}} useMap={props.map}/>
        </div>
    )
} 