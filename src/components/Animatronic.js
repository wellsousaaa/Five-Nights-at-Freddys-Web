import React, { useState, useEffect } from "react";
import Functions from "./Functions";
import Media from "./Media";
import { connect } from "react-redux";

let MicahJrIterator = Functions.MicahJr();
let EmmettIterator = Functions.Emmett();
let ImposterIterator = Functions.Imposter();
let MWMFreddyIterator = Functions.MWMFreddy();

MicahJrIterator.next();

let MicahJrTime = 10000;
let EmmettTime = 5000;
let ImposterTime = 7300;
let MWMFreddyTime = 13000;

const ranges = {
  MicahJr: 1,
  Emmett: 1,
  Imposter: 2,
  MWMFreddy: 1,
}

let isBlackout = false;
let isGameOver = false;

function Animatronic({
  animatronics,
  config,
  handleJumpscare,
  isThisDoorOpen,
  dispatch,
  stages
}) {
  const { hour, gameOver, blackout } = config;

  useEffect(() => {
    ranges["MicahJr"] = stages.MicahJr;
    ranges["Emmett"] = stages.Emmett;
    ranges["Imposter"] = stages.Imposter;
    ranges["MWMFreddy"] = stages.MWMFreddy;

    if(stages.Emmett) willMove("Emmett", EmmettIterator, EmmettTime);
    if(stages.Imposter) willMove("Imposter", ImposterIterator, ImposterTime);
    if(stages.MWMFreddy) willMove("MWMFreddy", MWMFreddyIterator, MWMFreddyTime, true);
    if(stages.MicahJr && stages.Imposter && stages.Emmett)willMove("MicahJr", MicahJrIterator, MicahJrTime, true);

    return () => {
      MicahJrIterator = Functions.MicahJr();
      EmmettIterator = Functions.Emmett();
      ImposterIterator = Functions.Imposter();
      MWMFreddyIterator = Functions.MWMFreddy();

      MicahJrIterator.next();

      MicahJrTime = 10000;
      EmmettTime = 5000;
      ImposterTime = 7300;
      MWMFreddyTime = 13000;
      ranges["MicahJr"] = stages.MicahJr;
      ranges["Emmett"] = stages.Emmett;
      ranges["Imposter"] = stages.Imposter;
      ranges["MWMFreddy"] = stages.MWMFreddy;

      isBlackout = false;
      isGameOver = false;
    };
  }, []);

  useEffect(() => {
    if (hour === 2) {
      MicahJrTime = 9500;
      EmmettTime = 4700;
      ImposterTime = 6800;
      MWMFreddyTime = 10000;

      
      ranges["Emmett"] = ranges["Emmett"] + 1;
      ranges["Imposter"] = ranges["Imposter"] + 1;
    } else if (hour === 4) {
      ranges["Emmett"] = ranges["Emmett"] + 2;
      ranges["Imposter"] = ranges["Imposter"] + 2;
      ranges["MicahJr"] = ranges["MicahJr"] + 1;
      ranges["MWMFreddy"] = ranges["MWMFreddy"] + 1;
    } else if (hour === 5) {
      ranges["Emmett"] = ranges["Emmett"] + 2;
      ranges["Imposter"] = ranges["Imposter"] + 2;
      ranges["MicahJr"] = ranges["MicahJr"] + 2;
      ranges["MWMFreddy"] = ranges["MWMFreddy"] + 2;
    }
  }, [hour]);

  useEffect(() => {
    if (gameOver) isGameOver = gameOver;
  }, [gameOver]);

  const changeAnimatronic = (func) => {
    dispatch({ type: "CHANGE_ANIMATRONICS_MOVING", content: true });

    func();

    setTimeout(() => {
      dispatch({
        type: "CHANGE_ANIMATRONICS_MOVING",
        content: false,
      });
    }, 1500);
  };

  const animatronicFailed = (character) => {
    changeAnimatronic(() => {
      dispatch({
        type: "CHANGE_ANIMATRONIC",
        animatronic: character,
        animatronicState: {
          door: false,
          camera:
            character === "Freddy"
              ? "Stage"
              : character === "Foxy"
              ? ""
              : "Dinning Area",
          jumpscare: false,
        },
      });

      if (character === "Emmett") {
        EmmettIterator = Functions.Emmett();
        willMove("Emmett", EmmettIterator, EmmettTime);
      } else if (character === "Imposter") {
        ImposterIterator = Functions.Imposter();
        willMove("Imposter", ImposterIterator, ImposterTime);
      } else if (character === "MWMFreddy") {
        MWMFreddyIterator = Functions.MWMFreddy();
        Media.Sounds.FoxyPunch.play();
        willMove("MWMFreddy", MWMFreddyIterator, MWMFreddyTime, true);
      } else if (character === "MicahJr") {
        MicahJrIterator = Functions.MicahJr();
        MicahJrIterator.next();
        willMove("MicahJr", MicahJrIterator, MicahJrTime, true);
      }
    });
  };

  const freddyLaugh = () => {
    if (isBlackout) return;
    let MicahJrNumber = Math.floor(Math.random() * 2);
    if (MicahJrNumber == 0) {
      Media.Sounds.FreddyLaugh1.play();
    } else {
      Media.Sounds.FreddyLaugh2.play();
    }
  };
  useEffect(() => {
    if (blackout) isBlackout = true;
  }, [blackout]);

  function willMove (character, iterator, animaTime) {
    const thisInterval = setInterval(() => {
      const max = character === "Bonnie" || character === "Chica" ? 22 : 30;
      let luckyNumber = Math.floor(Math.random() * max);

      let condition = luckyNumber < ranges[character] && !animatronics[character].door;

      let newPlace;
      if (condition) {
        changeAnimatronic(() => {
          newPlace = iterator.next().value;

          const newState = {
            door: newPlace === "Door" || newPlace === "_3",
            jumpscare: false,
            camera: newPlace,
          };
          dispatch({
            type: "CHANGE_ANIMATRONIC",
            animatronic: character,
            animatronicState: newState,
          });
        });

        if (character === "MicahJr") freddyLaugh();
      }

      if (isBlackout || isGameOver) clearInterval(thisInterval);

      if (newPlace === "Door" || newPlace === "_3") {
        if (!isBlackout) checkDoors(character);
        clearInterval(thisInterval);
      }
    }, animaTime);
  };

  async function checkDoors(character) {
    const door =
      character === "Emmett" || character === "MWMFreddy" ? "leftDoor" : "rightDoor";

    setTimeout(async () => {
      const isDoorOpen = await isThisDoorOpen(door);
      if (!isDoorOpen) {
        setTimeout(async () => {
          const isDoorOpen = await isThisDoorOpen(door);
          if (!isDoorOpen) {
            setTimeout(async () => {
              const isDoorOpen = await isThisDoorOpen(door);
              if (!isDoorOpen) {
                handleJumpscare(character);
              } else animatronicFailed(character);
            }, 3000);
          } else animatronicFailed(character);
        }, 5000);
      } else animatronicFailed(character);
    }, 10000);
  }

  return <></>;
}

const mapStateToProps = (state) => {
  return {
    leftDoor: state.officeReducer.leftDoor,
    rightDoor: state.officeReducer.rightDoor,
    animatronics: state.animatronicsReducer,
    config: state.configReducer,
  };
};

export default connect(mapStateToProps)(Animatronic);
