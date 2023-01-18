import React,{useState, useEffect} from 'react'

import {Link} from 'react-router-dom';


// import SvgIcons from '../../../icons/svg.icon'

export default function RedemptionChild({mobileCheck, setMobileCheck}) {

    const [selected, setSelected] = useState('Create Redemption');

    const items  =   [
                {
                    icon            :   '',     
                    text            :   'Create Redemption',
                    link            :   'CreateRedemption',
                },
                {
                    icon            :   '',   
                    text            :   'Option 2',
                    link            :   'option2',
                },
                {
                    icon            :   '',   
                    text            :   'Option 3',
                    link            :   'option3',
                },
        ]   

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text);
    }   

    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Redemption</div>
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
