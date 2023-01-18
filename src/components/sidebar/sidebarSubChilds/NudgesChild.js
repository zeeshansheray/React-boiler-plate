import React, { useState } from 'react'

import {Link, useHistory} from 'react-router-dom';


export default function NudgesChild({mobileCheck, setMobileCheck}) {
    
    const history = useHistory();
    const [selected, setSelected] = useState('Automation');

    const items  =   [
                {
                    text            :   'Automation',
                    link            :   '.',
                },
                {
                    text            :   'Analytics',
                    link            :   'analytics',
                },   
        ]   

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text)
    }   

    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Automation</div>
            <div className="items">
                {
                    items.map((element, idx)=>(
                        <div key={idx}> 
                            <Link  to={element.link} onClick={()=> handleClick(element)}>
                                <div className={(element.text === selected) ? 'active navlinkFont item': 'navlinkFont item'}>
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

