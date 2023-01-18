import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ColorSchemeCode } from '../../../enums/ColorScheme';


export default function GrowthToolChild({mobileCheck, setMobileCheck}) {
    
    const history = useHistory();
    const [selected, setSelected] = useState('Channels');

    const params = useParams()

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text)
    }   

    const items =  [
        {
            // icon            :  <SvgIcons.SubNavGeoPushIcon/>,   
            text            :   'Channels',
            link            :   '',
            className       :   ''
        },
        {
            // icon            :  <SvgIcons.SubNavGeoPushIcon/>,   
            text            :   'Referrals',
            link            :   'referrals',
            className       :   'disabledbutton'

        }
    ]
      
    return (
        <div>
               <div class="Heading22R sidebarHeading pl_16">Dashboard</div>
            <div className="items">
                {
                    items.map((element, idx)=>( 
                        <Link to={'/'+params._id+'/growthtools/'+element.link} onClick={()=>handleClick(element)}>
                            {/* <div className='navlinkFont item borderRadius-4' style={{color : (history.location.pathname.includes(element.link)) && agency.agencyColor && agency.agencyColor , backgroundColor: (history.location.pathname.includes(element.link)) && state && state}}> */}
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
