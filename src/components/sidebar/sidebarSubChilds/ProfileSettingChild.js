import React, { useState } from 'react'

import {Link, useHistory} from 'react-router-dom';


export default function ProfileSettingChild({mobileCheck, setMobileCheck}) {
    
    const history = useHistory();
    const [selected, setSelected] = useState('Personal information');

    const items  =   [
                {
                    text            :   'Personal information',
                    link            :   '/profile',
                },
                // {
                //     text            :   '',
                //     link            :   '',
                // },   
        ]   

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text)
    }   

    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Profile</div>
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

