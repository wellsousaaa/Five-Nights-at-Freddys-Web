///SHOW STAGE
import Stage0 from '../media/Textures/Cams/Stage.jpg'
import Stage1 from '../media/Textures/Cams/Stage-b-c-f.jpg';
import Stage2 from '../media/Textures/Cams/Stage-b-f.jpg';
import Stage3 from '../media/Textures/Cams/Stage-c-f.jpg';
import Stage4 from '../media/Textures/Cams/Stage-f.jpg'

///DINNING AREA
import DinningArea0 from '../media/Textures/Cams/DinningArea.jpg';
import DinningArea1 from '../media/Textures/Cams/DinningArea-b.jpg';
import DinningArea2 from '../media/Textures/Cams/DinningArea-c.jpg';
import DinningArea3 from '../media/Textures/Cams/DinningArea-f.jpg';
import DinningArea4 from '../media/Textures/Cams/DinningArea-b-c.jpg';
import DinningArea5 from '../media/Textures/Cams/DinningArea-c-f.jpg';
import DinningArea6 from '../media/Textures/Cams/DinningArea-b-f.jpg';
import DinningArea7 from '../media/Textures/Cams/DinningArea-b-c-f.jpg';

///BACKSTAGE
import Backstage from '../media/Textures/Cams/Backstage.jpg';
import Backstage1 from '../media/Textures/Cams/Backstage-b.jpg';

///PIRATE COVE
import PirateCove from '../media/Textures/Cams/Pirate Cove.jpg';
import PirateCove1 from '../media/Textures/Cams/Pirate Cove-1.jpg';
import PirateCove2 from '../media/Textures/Cams/Pirate Cove-2.jpg';
import PirateCove3 from '../media/Textures/Cams/Pirate Cove-3.jpg';

///SUPPLY ROOM
import SupplyRoom0 from '../media/Textures/Cams/SupplyRoom.jpg'
import SupplyRoom1 from '../media/Textures/Cams/SupplyRoom-b.jpg'

///WEST HALL
import WestHall0 from '../media/Textures/Cams/West Hall.jpg'
import WestHall1 from '../media/Textures/Cams/West Hall-b.jpg'
import FoxyHallway from '../media/Textures/Foxy-Hallway.gif';

///WEST HALL CORNER
import WHallCorner0 from '../media/Textures/Cams/WHallCorner.jpg'
import WHallCorner1 from '../media/Textures/Cams/WHallCorner-b.jpg'

///RESTROOMS
import Restrooms0 from '../media/Textures/Cams/Restrooms.jpg';
import Restrooms1 from '../media/Textures/Cams/Restrooms-c.jpg';
import Restrooms2 from '../media/Textures/Cams/Restrooms-f.jpg';
import Restrooms3 from '../media/Textures/Cams/Restrooms-c-f.jpg';

///EAST HALL
import EastHall0 from '../media/Textures/Cams/East Hall.jpg';
import EastHall1 from '../media/Textures/Cams/East Hall-c.jpg';
import EastHall2 from '../media/Textures/Cams/East Hall-f.jpg';
import EastHall3 from '../media/Textures/Cams/East Hall-c-f.jpg';

///EAST HALL CORNER
import EHallCorner0 from '../media/Textures/Cams/EHallCorner.jpg'
import EHallCorner1 from '../media/Textures/Cams/EHallCorner-c.jpg'
import EHallCorner2 from '../media/Textures/Cams/EHallCorner-f.jpg'

export default function getCam(animatronics, camera, foxy = null){
    let result;
    if(animatronics === '-b-c-f' && camera === 'Stage'){result = Stage1}
    else if(animatronics === '-b-f' && camera === 'Stage'){result = Stage2}
    else if(animatronics === '-c-f' && camera === 'Stage'){result = Stage3}
    else if(animatronics === '-f' && camera === 'Stage'){result = Stage4}
    else if(animatronics === '' && camera === 'Stage'){result = Stage0}

    else if(animatronics === '' && camera === 'Dinning Area'){result = DinningArea0}
    else if(animatronics === '-b' && camera === 'Dinning Area'){result = DinningArea1}
    else if(animatronics === '-c' && camera === 'Dinning Area'){result = DinningArea2}
    else if(animatronics === '-f' && camera === 'Dinning Area'){result = DinningArea3}
    else if(animatronics === '-b-c' && camera === 'Dinning Area'){result = DinningArea4}
    else if(animatronics === '-c-f' && camera === 'Dinning Area'){result = DinningArea5}
    else if(animatronics === '-b-f' && camera === 'Dinning Area'){result = DinningArea6}
    else if(animatronics === '-b-c-f' && camera === 'Dinning Area'){result = DinningArea7}

    else if(animatronics === '' && camera === 'Backstage'){result = Backstage}
    else if(animatronics === '-b' && camera === 'Backstage'){result = Backstage1}
    
    else if(animatronics === '' && camera === 'Pirate Cove'){result = PirateCove}
    else if(animatronics === '-1' && camera === 'Pirate Cove'){result = PirateCove1}
    else if(animatronics === '-2' && camera === 'Pirate Cove'){result = PirateCove2}
    else if(animatronics === '-3' && camera === 'Pirate Cove'){result = PirateCove3}

    else if(animatronics === '' && camera === 'Supply Closet'){result = SupplyRoom0}
    else if(animatronics === '-b' && camera === 'Supply Closet'){result = SupplyRoom1}

    else if(animatronics === '' && foxy !== '-3' && camera === 'West Hall'){result = WestHall0}
    else if(animatronics === '-b' && foxy !== '-3' && camera === 'West Hall'){result = WestHall1}
    else if(foxy === '-3' && camera === 'West Hall'){result = FoxyHallway}

    else if(animatronics === '' && camera === 'W. Hall Corner'){result = WHallCorner0}
    else if(animatronics === '-b' && camera === 'W. Hall Corner'){result = WHallCorner1}

    else if(animatronics === '' && camera === 'Restrooms'){result = Restrooms0}
    else if(animatronics === '-c' && camera === 'Restrooms'){result = Restrooms1}
    else if(animatronics === '-f' && camera === 'Restrooms'){result = Restrooms2}
    else if(animatronics === '-c-f' && camera === 'Restrooms'){result = Restrooms3}

    else if(animatronics === '' && camera === 'East Hall'){result = EastHall0}
    else if(animatronics === '-c' && camera === 'East Hall'){result = EastHall1}
    else if(animatronics === '-f' && camera === 'East Hall'){result = EastHall2}
    else if(animatronics === '-c-f' && camera === 'East Hall'){result = EastHall3}

    else if(animatronics === '' && camera === 'E. Hall Corner'){result = EHallCorner0}
    else if(animatronics === '-c' && camera === 'E. Hall Corner'){result = EHallCorner1}
    else if(animatronics === '-f' && camera === 'E. Hall Corner'){result = EHallCorner2}
    else if(animatronics === '-c-f' && camera === 'E. Hall Corner'){result = EHallCorner2}

    else{result = ''}

    return result;
}