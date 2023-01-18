import React, {useContext, useEffect, useState} from 'react'

import {Link, useHistory, useParams} from 'react-router-dom';
import { AgencyContext } from '../../../context/Agency.context';
import { ColorSchemeCode } from '../../../enums/ColorScheme';


import SvgIcons from '../../../icons/svg.icon'
import { utils } from '../../../utils';

export default function CommunicationChild() {

    const params = useParams()

    const [selected, setSelected] = useState('Customer Email');


    const [subItems, setSubItems] = useState([
                // {
                //     icon            :  <SvgIcons.SubNavWalletPushIcon/>,   
                //     text            :   'Customer Email',
                //     link            :   'email'
                // },
                {
                    icon            :  <SvgIcons.SubNavGeoPushIcon/>,   
                    text            :   'SMS',
                    link            :   'sms'
                },
                {
                    icon            :  <SvgIcons.SubNavIBeaconIcon/>,   
                    text            :   'Notification',
                    link            :   'notification'
                },
        ] )

    const subItemChange = (element, index) => {
        let items = subItems.map(item => {
            item.show = false
            return item
        })
        items[index].show = element.subMenu
        setSubItems(items)
    }  

    const agency = useContext(AgencyContext)
    const history = useHistory();
    const [state, setstate] = useState('')

    useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setstate("hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])
    

    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Communication</div>
            <div className="items">
                {
                    subItems.map((element, idx)=>( 
                        <Link to={'/'+params._id+'/communication/'+element.link} onClick={()=>subItemChange(element,idx)}>
                            <div className='navlinkFont item borderRadius-4' style={{color : (history.location.pathname.includes(element.link)) && ColorSchemeCode.brandingPrimaryColor , backgroundColor: (history.location.pathname.includes(element.link)) && ColorSchemeCode.bgBlueSecondary}}>
                                <span className="pl_8">{element.text}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
            
        </div>
    )
}
