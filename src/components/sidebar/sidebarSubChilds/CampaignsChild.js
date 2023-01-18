import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { ColorSchemeCode } from '../../../enums/ColorScheme';
import { SvgIcons } from '../../../icons';

import { utils } from '../../../utils';
import {AgencyContext} from '../../../context/Agency.context'

function CampaignsChild({mobileCheck, setMobileCheck}) {

    const params = useParams();
    let history = useHistory();
    const agency    = useContext(AgencyContext)

    const [subItems, setSubItems] = useState([
        { 
            link            :   'coupon',
            text            :   'Coupons',
            subMenu         :   true,
            show            :   true,
            className       :   '',
            subChilds       :   [
                {
                    name: 'Detail',
                    link: '/detail'
                }, 
                {
                    name: 'Design',
                    link: '/design'
                }, 
            ]
        }, 
        {
            text            :   'Analytics',
            link            :   'analytics',
            subMenu         :   false,
            className       :   'disabledbutton'
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

    const handleSubItemSelect = (parent, child) => {
        history.push('/'+params._id+'/campaigns/'+parent.link+child.link);  
    }


    const [state, setstate] = React.useState('')

    useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setstate("hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])


    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Campaigns</div>
            <div className="items">
                {   
                    subItems.map((element, idx)=>( 
                        <>
                            <Link className={element.className} key={idx} to={'/'+params._id+'/campaigns/'+element.link} onClick={()=>subItemChange(element,idx)}>
                                <div className={`Body14R item ${element.className} cp pl_12 ${ window.location.pathname.includes(element.link) && 'active'}`} style={{backgroundColor: (history.location.pathname.includes(element.link)) && state && state}}> 
                                    <span>{element.text}</span><span className="ml_5">{element.subMenu ? element.show  ? <SvgIcons.DropDownTriangleIcon color={ColorSchemeCode.c828282}/> :  <SvgIcons.DropDownTriangleHorizontalIcon color={ColorSchemeCode.c828282}/> : ''}</span>
                                </div>
                            </Link>
                            {(element.show) &&
                                <div className='expand w-100'>
                                    {
                                        element.subChilds.map((item,index)=>(
                                            <Link key={index} onClick={()=>handleSubItemSelect(element,item)} >
                                                <div className={`Body14R subItem cp ${window.location.pathname.includes(element.link) && window.location.pathname.includes(item.link) && 'subMenuSelected'}`}> 
                                                    <span>{item.name}</span>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default CampaignsChild
