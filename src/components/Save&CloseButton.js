import React, {useState} from 'react'

import { CircularProgress } from '@material-ui/core';

import CustomSelect from './CustomSelect';
import CustomButton from './CustomButton';
import CustomModal from './CustomModal';
import ClickOutside from '../utils/ClickOutside';
import FitContentInput from './FitContentInput'

import SvgIcons from '../icons/svg.icon'

import { ColorSchemeCode } from '../enums/ColorScheme'
import {getMoreOptions, getProgramActiveStatus} from '../utils/Options';


export default function SaveCloseButtons({formik, name, state}) {

    const [deleteDoc, setDeleteDoc] = useState(false)

    return (
        <div id="InputHeaderWithButtons" className={"d-flex space-between w-100"}>
            <div className="middle">
                <FitContentInput 
                    onClick       = {()=>{}}
                    className     = {'fs-18 fw-6 color-neutral80 border-none'}
                    value         = {formik.values[name]}
                    onChange      = {(value)=>formik.setValues({...formik.values, [name]: value})}
                    icon          = {{color: ColorSchemeCode.neutral80, class: 'ml_10 middle'}}
                />
            </div>
            <div className="col-5 d-flex justify-flex-end align-items-center pr_0">
                <div className="">
                    <CustomSelect 
                        options         = {getMoreOptions()}
                        className       = "color-textfieldColor fw-5"
                        fontSize        = {12}
                        padding         = {0}
                        label           = "More"
                        border          = {'0px'}
                        backgroundColor = {ColorSchemeCode.white}
                        icon            = {<SvgIcons.ViewMoreIcon/>}
                    />
                     { deleteDoc &&
                        <ClickOutside onClick={()=>setDeleteDoc(false)}>
                            <CustomModal component={<ModalComponent/>} maxWidth="430px" open={deleteDoc}/>
                        </ClickOutside>
                    }
                </div>
                <div className='fs-12 outline-none saveButtons color-textfieldColor d-flex fw-5 pt_12'> 
                    <button 
                        type      = "submit"
                        className = {`saveAndCloseBtn border-none outline-none bg-transparent ${state.processing || !formik.isValid && 'disabled'}`}
                        disabled  = {state.processing || !formik.isValid}
                    >
                        {state.processing ? 
                            <CircularProgress size={20} color={'inherit'}/> :
                            <>
                                <span className="mr_10"><SvgIcons.IconTick color={ColorSchemeCode.textfieldColor}/></span>
                                <span>Save & Close</span>
                            </>
                        }
                    </button>
                </div>
                <div className="ml_12">
                    <CustomSelect 
                        className       = "color-white bg-color-greenDropDown borderRadius-5 greenDrop"
                        options         = {getProgramActiveStatus()}
                        fontSize        = {12}
                        label           = "Active Status"
                        padding         = {'6px 8px 6px 16px'}
                        color           = {ColorSchemeCode.white}
                        backgroundColor = {ColorSchemeCode.selectGreenBackgroundColor}
                        name            = "active"
                        value           = {formik.values.active}
                        onChange        = {formik.handleChange}
                    />
                </div>
            </div>
        </div> 
    )
}


const ModalComponent = () => {
    return(
        <div className="  text-center">
            <div className="Heading22R">
                Delete Venue
            </div>
            <div className="Body14R mt_16 color-c828282 fs-16">
                Are you sure you want to delete this venue?
            </div>
            <div className="d-flex justify-flex-end mt_24">
                <div>
                    <CustomButton 
                        btntext         = "Cancel"
                        borderRadius    = "8px"
                        backgroundColor = {ColorSchemeCode.white}
                        color           = {ColorSchemeCode.c000000}
                        hover           = {ColorSchemeCode.white}
                        // height          = {'48px'}
                    />
                </div>
                <div className="ml_5">
                    <CustomButton 
                        btntext         = "Delete"
                        borderRadius    = "8px"
                        color           = {ColorSchemeCode.white}
                        backgroundColor = {ColorSchemeCode.redColorButton}
                        hover           = {ColorSchemeCode.redColorButton}
                        // height          = {'48px'}
                    />
                </div>
            </div>
        </div>
    )
}