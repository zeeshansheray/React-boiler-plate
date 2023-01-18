import React,{useState} from 'react'

import {Link, useHistory} from 'react-router-dom';


import SvgIcons from '../../../icons/svg.icon';
import PngIcons from '../../../icons/png.icon';

export default function GrowthToolChild({mobileCheck, setMobileCheck}) {
    
    const history = useHistory();
    const [selected, setSelected] = useState('Your Tools');

    const handleClick = (element) => {
        setMobileCheck(false);
        setSelected(element.text)
    }   

    const items =  [
        {
            icon            :  <SvgIcons.SubNavGeoPushIcon/>,   
            text            :   'Your Tools',
            link            :   '/main/growth/yourtool'
        },
    ]
      
    return (
        <div>
            <div class="Heading22R sidebarHeading pl_16">Growth Tools</div>
            <div className="items">
                {
                    items.map((element, idx)=>(
                        <div> 
                            <Link to={element.link} onClick={()=>handleClick(element)}>
                                <div className={(selected === element.text)? 'active navlinkFont item': 'navlinkFont item'}>
                                    {element.icon}
                                    <span className="pl_8">{element.text}</span>
                                </div>
                            </Link>
                            {
                                (element.text === 'Your Tools') ? 
                                    <div className="filters mt_22 pl_16">
                                        <div className="paragraphsm mt_17">
                                            Filters:
                                        </div>
                                        <div className="row">
                                            <div className="col-3 mt_16 filterItem">
                                                <div className="circle" onClick={()=> history.push("/main/growthtool/qrcode")}>
                                                    <SvgIcons.QrCodeIcon width="35" height="35"/>
                                                </div>
                                            </div>    
                                            <div className="col-3 mt_16 filterItem">
                                                <div className="circle1" onClick={()=> history.push("/main/growthtool/manychat")}>
                                                    <img src={PngIcons.ManyChat} className="img" alt=""  width="18" height="18"/>
                                                </div>
                                            </div>    
                                            <div className="col-3 mt_16 filterItem">
                                                <div className="circle">
                                                    <SvgIcons.UrlIcon width="35" height="35"/>
                                                </div>
                                            </div>    
                                        </div>
                                        <div className="row">
                                            <div className="col-3 mt_16 filterItem">
                                                <div className="circle" onClick={()=> history.push("/main/growthtool/twilio")}>
                                                    <SvgIcons.SmsIcon width="35" height="35"/>
                                                </div>
                                            </div>    
                                            <div className="col-3 mt_16 filterItem">
                                                <div className="circle" onClick={()=> history.push("/main/growthtool/api")}>
                                                    <SvgIcons.ApiIcon width="35" height="35"/>
                                                </div>
                                            </div>    
                                            <div className="col-3 mt_16 filterItem" onClick={()=> history.push("/main/growthtool/silferbot")}>
                                                <div className="circle2">
                                                    <img src={PngIcons.Silferbot} className="img" alt=""  width="18" height="18"/>
                                                </div>
                                            </div>    
                                        </div>
                                    </div>
                                :
                                    ''
                                    
                            }
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}
