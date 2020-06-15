
function* Bonnie(){
    yield* [ 'Dinning Area', 'Backstage','Supply Closet', 'West Hall', 'W. Hall Corner', 'Door'];
}
  
function* Chica(){
    yield* [ 'Dinning Area', 'Restrooms', 'Kitchen', 'East Hall', 'E. Hall Corner', 'Door'];
}
  
function* Freddy(){
    yield* ['Dinning Area', 'Restrooms', 'Kitchen', 'East Hall', 'E. Hall Corner', 'Door'];
}

function* Foxy(){
    yield* ['-1', '-2', '-3'];
} 

const changeAnimatronic = (Localization, iterator, setAnimatronics, change) => {  
    Localization = iterator.next().value;
    setAnimatronics(change);
  }

const checkAnimatronicsPosition = (BonnieLocal, ChicaLocal, FreddyLocal, search) => {
    let res = '';
    if(BonnieLocal == search){res += '-b'}
    if(ChicaLocal == search){ res += '-c'}
    if(FreddyLocal == search){res += '-f'}

    return res;
}

/// FOR FUTURES UPDATES
const ChicaTime = 6300
const BonnieTime = 3000
const FreddyTime = 10000
const FoxyTime = 13000

const BonnieRange = 1;
const ChicaRange = 2;
const FreddyRange = 1;
const FoxyRange = 1;

const Variables = {
    BonnieTime,
    ChicaTime,
    FreddyTime,
    FoxyTime,
    BonnieRange,
    ChicaRange,
    FreddyRange,
    FoxyRange,
}



const Functions = {
    Freddy,
    Chica,
    Bonnie,
    Foxy,
    changeAnimatronic,
    checkAnimatronicsPosition,
    Variables,

}

module.exports = Functions;