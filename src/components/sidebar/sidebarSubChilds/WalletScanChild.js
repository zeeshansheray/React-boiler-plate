import React, { useState, useEffect, useContext } from 'react'

import {Link, useHistory, useParams} from 'react-router-dom';


import SvgIcon from '../../../icons/svg.icon';
import {ColorSchemeCode} from '../../../enums/ColorScheme';

import { BrandContext } from '../../../context/Brand.context';
import { AgencyContext } from '../../../context/Agency.context';
import { utils } from '../../../utils';

export default function WalletScanChild() {

    const [selected, setSelected] = useState('Barcode Scanner');
    const brand = useContext(BrandContext);
    const agency = useContext(AgencyContext)
    const history = useHistory();

    const subItems = [
                {
                    text            :   'Barcode Scanner',
                    link            :   'barcodescanner',
                    className       :   '',
                },
                // {
                //     text            :   'Camera Scanner ',
                //     link            :   'camerascan',
                // },
                // {
                //     text            :   'Customer Info',
                //     link            :   'customerinfo',
                //     className       :   '',

                // },
        ]

    const handleClick = (element,index) => {
        setSelected(element.text)
    }   

    const [state, setstate] = React.useState('')

    useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setstate("hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])


    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Redeem</div>
            <div className="items">
                {
                    subItems.map((element, idx)=>( 
                        <div > 
                            <Link to={element.link} onClick={()=>handleClick(element)}>
                                {/* <div className='navlinkFont item borderRadius-4' style={{color : (history.location.pathname.includes('walletscan')) && agency.agencyColor && agency.agencyColor , backgroundColor: (history.location.pathname.includes('walletscan')) && state && state}}> */}
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
