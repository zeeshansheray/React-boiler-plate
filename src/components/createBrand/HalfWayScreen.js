import React, {useEffect, useState} from 'react';
import Fade from 'react-reveal/Fade';

import {SvgIcons} from '../../icons';

import CustomButton from '../CustomButton';

export default function HalfWayScreen(props) {

    const [show, setShow] = useState(false);

    const nextScreen = () =>{   
        setShow(false);
        setTimeout(()=>{props.setActivePage(props.index)},500)
    }

    useEffect(()=>{

        setShow(true);

    }, [])


    return(

            <div id="shopifyScreen">

                <Fade bottom duration={500} opposite when={show}>

                    <div className="cards">

                        <div className="row">
                                
                                <span className="Heading22R mt_2">You are 

                                    <span className="fw-6"> Half Way </span>

                                    There! 🥳
                                    
                                    </span>

                                <span/>

                        </div>

                        <div className="row mt_32">
                        
                        <div>
                            
                            <CustomButton className="nextBtn" btntext="Next" handleClick={nextScreen}/>
        
                            <span className="caption">&nbsp;&nbsp;&nbsp;press Enter &nbsp; <SvgIcons.NextarrowIcon/></span>
                            
                        </div>  


                        </div>
                    
                      

                    </div>

                 </Fade>
                
            </div>

    )
}