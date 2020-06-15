import React, {useState, useEffect} from 'react';
import AnimatronicsMoving from '../media/Sounds/garble1.mp3'
import AnimatronicsMoving2 from '../media/Sounds/garble2.mp3';
import Static from '../media/Textures/Static-Cam.gif';


export default function Camera(props){
    const [Image, setImage ] = useState(props.src);

    useEffect(() => {

        if(props.name === "animatronics-true"){
            let MusicNumber = Math.floor(Math.random() * 2);
            let Sound;
            if(MusicNumber == 1 || MusicNumber == 2){
                Sound = new Audio(AnimatronicsMoving);
            }
            else{
                Sound = new Audio(AnimatronicsMoving2);
            }
            Sound.play();
        }
    }, [props.name])

   

    return(
        <div>
            {props.name !== "animatronics-true" ? <img src={props.src} alt="" style={{height: '100vh', position: 'absolute'}}/>
            : <img draggable='false' src="" alt="" className="animatronics-true"style={{height: '100vh', width: '100vw', backgroundColor: 'black', position: 'absolute'}} />}
            <img src={Static} style={{opacity: '0.1', width: '100vw', height: '100vh'}} draggable='false' />    
        </div>
    )
}