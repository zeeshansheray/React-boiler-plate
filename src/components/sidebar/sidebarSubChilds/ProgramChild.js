import React,{useState} from 'react'

import {Link} from 'react-router-dom';


// import SvgIcons from '../../../icons/svg.icon'

export default function ProgramChild({mobileCheck, setMobileCheck}) {

    const [selected, setSelected] = useState('Loyality Card')
 

    const items  =   [
                {
                    icon            :   '🎂',  
                    text            :   'Loyality Card',
                    link            :   'loyaltycards',
                },
                {
                    icon            :   '💳',   
                    text            :   'Punch Passes',
                    link            :   'punchpasses',
                },
                {
                    icon            :   '😘',   
                    text            :   'Subscription',
                    link            :   'subscriptions',
                },
                {
                    icon            :   '🎫',   
                    text            :   'Coupons',
                    link            :   'coupons',
                },
                {
                    icon            :   '🎤',   
                    text            :   'Events',
                    link            :   'events',
                },
                {
                    icon            :   '🎤',   
                    text            :   'Scratch Cards',
                    link            :   'scratchcards',
                },
        ]   

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text);
    }   

    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Loyalty Suite</div>
                <div className="items">
                    {
                        items.map((element, idx)=>(
                            <div> 
                                <Link to={element.link} onClick={()=>handleClick(element)}>
                                    <div className={(element.text === selected)? 'active navlinkFont item': 'navlinkFont item'}>
                                        {element.icon}
                                        <span className="pl_8">{element.text}</span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            
        </div>
    )
}
