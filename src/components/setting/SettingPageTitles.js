import React, {useContext} from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

import {ColorSchemeCode} from '../../enums/ColorScheme';
import CustomButton from '../CustomButton';
import { BrandContext } from '../../context/Brand.context';
import CopyText from '../CopyText';
import { AgencyContext } from '../../context/Agency.context';


export default function SettingPageTitles({formik, state, btnText, ...props}) {
        const brand  = useContext(BrandContext)
        const agency = useContext(AgencyContext)
        return (
            <div className="title">
               <div className="row subHeader pl_15 pr_15">
                        <div className="col-12 col-md-3 col-lg-7 d-flex settingTitles">
                            <div className="Heading22M color-neutral100 middle">
                                {props.title}
                            </div>
    
                            { props.title === 'General' &&
                                <div className = "brandId d-flex bg-color-cF6F6F9 ml_24">
                                    <div className = "Body14R fw-5 opacity-10 color-textfieldColor d-flex">
                                            Brand Id :<span className = "Body14R ml_5 color-c828282 opacity-10"><CopyText content={brand._id} /></span> 
                                    </div>
                                </div>
                            }
                        </div>
    
                        { (props.title === 'General' || props.title === 'Sub-Brand' || props.title === 'General Information' ||  props.title === 'Add Venue' ||  props.title === 'Policy' || props.title ===  'Billing' || props.title ===  'Tier' || props.title ===  'Add Sub-Brand') && 
                            <div className="col-4 offset-2 col-md-4 col-lg-3 text-right saveChangesButton">
                                <CustomButton 
                                    className       = "fs-14"
                                    btntext         = {btnText ? btnText : "Save changes"}
                                    backgroundColor = {ColorSchemeCode.white}
                                    // color           = {agency.agencyColor}
                                    // border          = {'1px solid '+agency.agencyColor}
                                    color           = {"#000000"}
                                    border          = {'1px solid '+ColorSchemeCode.borderColor}
                                    // height          = {"40px"}
                                    borderRadius    = {"4px"}
                                    hover           = {ColorSchemeCode.white}
                                    type            = "submit"
                                    disabled        = {state.loader
                                         || !formik.isValid
                                        }
                                    icon            = {state.loader && <CircularProgress size={20} color={'inherit'}/>}
                                />
                        </div>  
                        }
                    </div>
                    <div className="Body14R col-12 color-neutral60">
                        {props.subTitle}
                    </div>
            </div>
        )
    }
