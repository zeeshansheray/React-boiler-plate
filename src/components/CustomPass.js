import React from 'react';
import { Link } from 'react-router-dom';
import { ColorSchemeCode } from '../enums/ColorScheme';

import SvgIcons  from '../icons/svg.icon';

export default function CustomPass({design, qrcode, index, deletePassFunc}) {
    
    const [show, setShow] = React.useState(false);


    return (
        <div id="customPass" className="mt_32 ml_4 mr_3">
            <div 
                className    = "singleCard"
                style        = {{backgroundColor : design.backgroundColor, color : design.fontColor}}
                onMouseEnter = {()=>setShow(true)}
            >
                <div className="cardTop d-flex space-between">
                    <div className="leftPart d-flex">
                        <div className="cardLogo">
                            <img src={design.logo} alt=""/>
                        </div>
                        <div className="Body14R pt_2 ml_8 opacity-10" style={{color : design.fontColor}}>
                            {design.apple && design.apple.logoText}
                        </div>
                    </div>
                    <div className="rightPart col-4 d-flex flex-column pr_0 pt_5">
                        <div className="overline2 text-right fw-5">
                            {design.apple && design.apple.headerFields && design.apple.headerFields[0].label}
                        </div>
                        <div className="overline2 text-right fs-14 fw-5">
                            {design.apple && design.apple.headerFields && design.apple.headerFields[0].value}
                        </div>
                    </div>
                </div>
                <div className="cardCover">
                    <img src={design.cover} alt="" height="100px" width="100%"/>
                </div>
                <div className="cardContent mt_14 d-flex space-between overline2">
                    {design.apple && design.apple.secondaryFields && design.apple.secondaryFields.length > 0 && 
                        design.apple.secondaryFields.map(field => (
                            <div className="d-flex flex-column fw-5">
                                <span>
                                    { field.label }
                                </span>
                                <span className="fs-14">
                                    { field.value }
                                </span>
                            </div> 
                        ))
                    }
                </div>
                {design.qrcode &&
                    <div className="qrCode mt_14 text-center">
                        <img src={qrcode} alt=""/>
                    </div>
                }
            </div>
            {show && 
            <div className="hoverShow" onMouseLeave={()=>setShow(false)}>
                <div className="d-flex flex-column">
                    <div className='hoverText text-center'>
                        {design.designName}
                    </div>
                    <div className="d-flex actionButtons mt_16">
                        <div className="buttonBackground mr_8">
                            <Link to={{pathname: window.location.pathname + '/' + design._id, state: design}} >
                                <SvgIcons.EditIcon width="19.8px" height="19.8px" color={ColorSchemeCode.white}/>
                            </Link>
                        </div>
                        <div className="buttonBackground ml_8"  onClick={()=>deletePassFunc(index)}>
                            <SvgIcons.DeleteIcon width="19.8px" height="19.8px" color={ColorSchemeCode.white}/>
                        </div>
                    </div>
                </div>              
            </div>
            }
        </div>
    )
}
