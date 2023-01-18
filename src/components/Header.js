import React from 'react'

import {Link} from 'react-router-dom';

import CustomButton from './CustomButton'
import {ColorScheme} from '../enums'
import SvgIcons from '../icons/svg.icon'
import PngIcons from '../icons/png.icon'

import SettingHeader from './setting/SettingHeader';

export default function Header(props) {
   
    const icon = <SvgIcons.AddIcon/>
    return (
        <div className={props.bgColor ? props.bgColor + ' header' : 'header'}>
            
       
            
            <div className='row'>
                <div className='col-lg-8'>
                    <div className="headerMainHead">
                        <div className="row">
                            <div className="d-flex col-lg-12 text-left">
                            <span className="Heading2 mb_8"> {props.title} </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex col-lg-12 text-left">
                            <span className="subtitle1"> {props.description} </span>
                            </div>
                            <div className="d-flex col-lg-12 text-left">
                            <span className="Body14R mb_15 text-left color-cFFCCDE opacity-10">{props.steps}</span>
                            </div>
                        </div>
                        {(props.btnTitle) ? 
                        <div className="row">
                            <div className="d-flex col-lg-12 text-left">
                             <Link to={props.path} className="text-dec-none">
                                <CustomButton
                                    backgroundColor = {ColorScheme.ColorSchemeCode.white}
                                    hover           = {ColorScheme.ColorSchemeCode.cF2F2F2}
                                    focus           = {ColorScheme.ColorSchemeCode.cF2F2F2}
                                    color           = {props.textColor}
                                    className       = "w-228 buttonText"
                                    btntext         = {props.btnTitle}
                                    handleClick     = {props.handleClick}
                                    // height          = {'45px'}
                                    borderRadius    = {'12px'}
                                />
                            </Link>
                            </div>
                        </div>
                        : ''}
                    </div>
                    
                    
                </div>
                {
                    (props.title === 'Home') ? 
                    <div className='col-lg-5'>
                        <img src={PngIcons.Home} alt='' className='vectorImg'/>
                    </div>
                    : ''
                }

            </div>

            <div className="bottomBorder"></div>
        </div>
    )
}
