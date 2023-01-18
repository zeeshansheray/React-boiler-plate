import React, { useState, useEffect, useContext } from 'react'

import {Link, useHistory, useParams} from 'react-router-dom';

import { AgencyContext } from '../../../context/Agency.context';
import { BrandContext } from '../../../context/Brand.context';
import { Brand } from '../../../enums';
import { utils } from '../../../utils';

import {SvgIcons} from'../../../icons'
import { ColorSchemeCode } from '../../../enums/ColorScheme';
import { RedemptionType } from '../../../enums/enums';

export default function SettingSubChild({mobileCheck, setMobileCheck}) {

    const [selected, setSelected] = useState('General');
 
    const agency = useContext(AgencyContext)
    const brand = useContext(BrandContext);
    const history = useHistory();


    const items  =   [
                {
                    icon            :   '',  
                    text            :   'General',
                    link            :   'general',
                    className       :   '',
                },
                // {
                //     icon            :   '',   
                //     text            :   'Notification',
                //     link            :   'notification',
                //     className       :   '',
                // },
                {
                    icon            :   '',   
                    text            :   'Tags',
                    link            :   'tags',
                    className       :   '',
                },
                {
                    icon            :   '',   
                    text            :   'Custom Fields',
                    link            :   'customfield',
                    className       :   '',
                },
                {
                    icon            :   '',   
                    text            :   'Billing',
                    link            :   'billing',
                    className       :   (brand.brandType === Brand.BrandTypes.DEMO || brand.brandType === Brand.BrandTypes.SHARED_LOYALITY || brand.brandType === Brand.BrandTypes.SUB_BRAND || (agency.whiteLabel && !brand.agency.subscribed)) ? 'disabledbutton lockIcon'  : '',
                },
                // brand.brandRedemptionType === RedemptionType.ORDER ||  
                {
                    icon            :   '',   
                    text            :   'Integration',
                    link            :   'integration',
                    className       :   '',
                },
                {
                    icon            :   '',   
                    text            :   'Users',
                    link            :   'staff',
                    className       :   '',
                },
                {
                    icon            :   '',   
                    text            :   'API',
                    link            :   'api',
                    className       :   '',
                },
                {
                    icon            :   '',   
                    text            :   'Logs',
                    link            :   'logs',
                    className       :   '',
                },
                // {
                //     icon            :   '',   
                //     text            :   'Redemption',
                //     link            :   'redemtiontype',
                //     className       :   ((brand.brandType === Brand.BrandTypes.DEMO || brand.brandType === Brand.BrandTypes.SHARED_LOYALITY || brand.brandType === Brand.BrandTypes.SUB_BRAND) || brand.brandRedemptionType === RedemptionType.ORDER) ? 'disabledbutton lockIcon'  : '',
                // },
        ]   

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text);
    }   

    const [state, setstate] = React.useState('')

    useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setstate("hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])

    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Settings</div>
            <div className="items">
                {
                    items.map((element, idx)=>(
                        <div 
                        className={
                            // idx === (items.length - 1)
                            //  && 
                            // !agency.whiteLabel
                            // ||
                            //     (brand && brand.brandType && brand.brandType !== "sharedLoyality") ? ' disabledbutton cn ' : element.className
                            element.className
                            }
                            > 
                            <Link to={element.link} onClick={()=>handleClick(element)}>
                                {/* <div className='navlinkFont item borderRadius-4' style={{color : (history.location.pathname.includes(element.link)) && agency.agencyColor && agency.agencyColor , backgroundColor: (history.location.pathname.includes(element.link)) && state && state}}> */}
                                <div className='navlinkFont item borderRadius-4' style={{color : (history.location.pathname.includes(element.link)) && ColorSchemeCode.brandingPrimaryColor , backgroundColor: (history.location.pathname.includes(element.link)) && ColorSchemeCode.bgBlueSecondary}}>
                                    {element.icon}
                                    <span className="pl_8">{element.text}</span>
                                    {element.className && element.className.includes('lockIcon') && <span className="ml_10"><i class="bi bi-lock-fill"></i></span>}
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}
