import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';

import {SvgIcons} from '../../icons';

export default function ShopifyScreen(props) {

    const [selectShoppify, setSelectShoppify]=useState(false);
    const [show, setShow]= useState(false);

    const connectAccount = [
        {name: 'Shopify', select: false},
    ]

    const selectConnectedAccount= async(value) => {
        setSelectShoppify(value.select);
        nextScreen();
    }

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
                                
                                <span className="Heading22R mt_2">Get connected to   <span className="fw-6">Shopify: </span>
                            
                                </span>

                        <span/>


                        </div>

                        <div className="row mt_32">
                    
                    {   connectAccount.map((value,index)=>
                           
                           <div className="fw-5 text-center px-2" key={index}>
                               
                               
                               <button 
                                    className={value.select && selectShoppify ? 'singleAccountBox col-12 active' : 'singleAccountBox col-12'} 
                                    onClick={() => selectConnectedAccount(value)} >
                                   
                                    <SvgIcons.ShopifyIcon/>
                                    
                                    <span className="fw-6">{value.name}
                                    </span>
                                   
                                </button> 
                                  
                            </div>

                    )}
                        </div>


                    </div>

                </Fade>
                
            </div>

    )
}