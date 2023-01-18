import React, { useState, useEffect, useContext } from 'react'

import {Link, useHistory, useParams} from 'react-router-dom';


import SvgIcon from '../../../icons/svg.icon';
import {ColorSchemeCode} from '../../../enums/ColorScheme';
import { BrandContext } from '../../../context/Brand.context';
import { AgencyContext } from '../../../context/Agency.context';
import { utils } from '../../../utils';
import { Brand } from '../../../enums';


export default function LoyaltyChild() {
    const params = useParams()

    const agency = useContext(AgencyContext)
    const brand = useContext(BrandContext);
    const history = useHistory();
    
    const [subItems, setSubItems] = useState([
                {
                    name: 'Earning Methods',
                    link: 'earn'
                }, 
                // {
                //     name: 'Redeem Points',
                //     link: 'redeem'
                // }, 
                {
                    name: 'Loyalty Tier',
                    link: 'tier'
                }, 
                {
                    name      : 'Sub-Brands',
                    link      : 'subbrands',
                    className : (!agency.whiteLabel || brand.brandType !== Brand.BrandTypes.SHARED_LOYALITY ) ? 'disabledbutton lockIcon display-none' : '',
                },
                {
                    name      : 'Gift Card',
                    link      : 'giftcards',
                    // className : (!agency.whiteLabel || brand.brandType !== Brand.BrandTypes.NORMAL ) ? 'disabledbutton lockIcon display-none' : '',
                },
                // {
                //     name     : 'Point System Setting',
                //     link     : 'setting',
                //     className: 'disabledbutton'
                // }, 
                {
                    name: 'Design',
                    link: 'design'
                }, 
    ])

    const subItemChange = (element, index) => {
        let items = subItems.map(item => {
            item.show = false
            return item
        })
        items[index].show = element.subMenu
        setSubItems(items)
    }   

    const [state, setstate] = React.useState('')

    useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setstate("hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])



    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Loyalty Suite</div>
            <div className="items">
                {   
                    subItems.map((element, idx)=>( 
                        <>
                            {!element.disable &&<Link className={element.className} key={idx} to={'/'+params._id+'/loyalty/points/'+element.link} onClick={()=>subItemChange(element,idx)}>
                                <div className={`navlinkFont item d-flex space-between cp ${element.className} ${ window.location.pathname.includes(element.link) && 'active'}`} style={{color : (history.location.pathname.includes(element.link)) && ColorSchemeCode.brandingPrimaryColor , backgroundColor: (history.location.pathname.includes(element.link)) && ColorSchemeCode.bgBlueSecondary}}> 
                                    <div>{element.name}</div>
                                </div>
                            </Link>}
                            {element.disable &&  <div className={`navlinkFont item cp ${element.disable && 'disabled opacity-3'} ${ window.location.pathname.includes(element.link) && 'active'}`} > 
                                    <span>{element.name}</span><span className="ml_5">{element.subMenu ? element.show  ? <SvgIcon.CustomDropDownReplacedTriangleIcon color={ColorSchemeCode.c828282} /> :  <SvgIcon.CustomDropDownReplacedTriangleIcon color={ColorSchemeCode.brandingPrimaryColor}/> : ''}</span>
                                </div>}
                                
                        </>
                    ))
                }
            </div>    
        </div>
    )
}


// {(element.show) &&
//     <div className='expand w-100'>
//         {
//             element.subChilds.map((item,index)=>(
//                 <Link key={index} to={'/'+params._id+'/loyalty/'+element.link+'/'+item.link} className={item.className && item.className} >
//                     {/* <div className={`${item.className && item.className} navlinkFont subItem cp ${window.location.pathname.includes(element.link) && window.location.pathname.includes(item.link) && 'subMenuSelected'}`} style={{color : window.location.pathname.includes(element.link) && window.location.pathname.includes(item.link) && agency.agencyColor && agency.agencyColor }}>  */}
//                     <div className={`${item.className && item.className} navlinkFont subItem cp ${window.location.pathname.includes(element.link) && window.location.pathname.includes(item.link) && 'subMenuSelected'}`} style={{color : window.location.pathname.includes(element.link) && window.location.pathname.includes(item.link) && ColorSchemeCode.brandingPrimaryColor }}> 
//                         <span>{item.name}</span>
//                         {item.className && item.className.includes('lockIcon') && <span className="ml_10"><SvgIcon.LockIcon/></span>}
//                     </div>
//                 </Link>
//             ))
//         }
//     </div>
// }