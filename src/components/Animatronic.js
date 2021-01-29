import React, { useState, useEffect } from "react";
import Functions from "./Functions";
import Media from "./Media";
import { connect } from "react-redux";

let FreddyIterator = Functions.Freddy();
let BonnieIterator = Functions.Bonnie();
let ChicaIterator = Functions.Chica();
let FoxyIterator = Functions.Foxy();

FreddyIterator.next();

let FreddyTime = 10000;
let BonnieTime = 3000;
let ChicaTime = 6300;
let FoxyTime = 13000;

let FreddyRange = 1;
let BonnieRange = 1;
let ChicaRange = 2;
let FoxyRange = 1;

let isBlackout = false;
let isGameOver = false;

function Animatronic({
  animatronics,
  config,
  handleJumpscare,
  isThisDoorOpen,
  dispatch,
}) {
  const { hour, gameOver, blackout } = config;

  useEffect(() => {
    willMove("Bonnie", BonnieRange, BonnieIterator, BonnieTime);
    willMove("Chica", ChicaRange, ChicaIterator, ChicaTime);
    willMove("Foxy", FoxyRange, FoxyIterator, FoxyTime, true);
    willMove("Freddy", FreddyRange, FreddyIterator, FreddyTime, true);

    return () => {
      FreddyIterator = Functions.Freddy();
      BonnieIterator = Functions.Bonnie();
      ChicaIterator = Functions.Chica();
      FoxyIterator = Functions.Foxy();

      FreddyIterator.next();

      FreddyTime = 10000;
      BonnieTime = 3000;
      ChicaTime = 6300;
      FoxyTime = 13000;
      FreddyRange = 1;
      BonnieRange = 1;
      ChicaRange = 2;
      FoxyRange = 1;

      isBlackout = false;
      isGameOver = false;
    };
  }, []);

  useEffect(() => {
    if (hour === 2) {
      FreddyTime = 9500;
      BonnieTime = 2700;
      ChicaTime = 5800;
      FoxyTime = 10000;

      BonnieRange += 1;
      ChicaRange += 1;
    } else if (hour === 4) {
      BonnieRange += 1;
      ChicaRange += 1;
      FreddyRange += 1;
      FoxyRange += 1;
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

      if (character === "Bonnie") {
        BonnieIterator = Functions.Bonnie();
        willMove("Bonnie", BonnieRange, BonnieIterator, BonnieTime);
      } else if (character === "Chica") {
        ChicaIterator = Functions.Chica();
        willMove("Chica", ChicaRange, ChicaIterator, ChicaTime);
      } else if (character === "Foxy") {
        FoxyIterator = Functions.Foxy();
        Media.Sounds.FoxyPunch.play();
        willMove("Foxy", FoxyRange, FoxyIterator, FoxyTime, true);
      } else if (character === "Freddy") {
        FreddyIterator = Functions.Freddy();
        FreddyIterator.next();
        willMove("Freddy", FreddyRange, FreddyIterator, FreddyTime, true);
      }
    });
  };

  const freddyLaugh = () => {
    if (isBlackout) return;
    let FreddyNumber = Math.floor(Math.random() * 2);
    if (FreddyNumber == 0) {
      Media.Sounds.FreddyLaugh1.play();
    } else {
      Media.Sounds.FreddyLaugh2.play();
    }
  };
  useEffect(() => {
    if (blackout) isBlackout = true;
  }, [blackout]);

  const willMove = (character, range, iterator, animaTime) => {
    const thisInterval = setInterval(() => {
      let luckyNumber = Math.floor(Math.random() * 5);

      let condition = luckyNumber < range && !animatronics[character].door;

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

        if (character === "Freddy") freddyLaugh();
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
      character === "Bonnie" || character === "Foxy" ? "leftDoor" : "rightDoor";

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
