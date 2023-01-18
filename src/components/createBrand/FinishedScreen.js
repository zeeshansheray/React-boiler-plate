import React, {useEffect, useState} from 'react';
import Fade from 'react-reveal/Fade';

import CustomButton from '../CustomButton';

export default function FinishedScreen(){

    const [show, setShow] = useState(false);


    useEffect(()=>{

        setShow(true);

    }, [])


    return(

        <div id="finishedScreen">
           
           <Fade bottom duration={500} opposite when={show}>
                    
                    <div className="cards">

                        <div className="row">
                                
                                <span className="Heading22R mt_2">Perfect! Now you can experience 🎉 a great journey with Walletly.
                            
                                </span>

                        <span/>


                        </div>

                        <div className="row mt_32">
                        
                        <div>
                            
                            <CustomButton className="finishBtn" btntext="Lets Begin!"/>
                            
                        </div>  


                        </div>


                    </div>


                    </Fade>

                </div>


    )

}