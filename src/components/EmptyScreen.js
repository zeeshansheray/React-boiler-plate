import React from 'react'
import { ColorSchemeCode } from '../enums/ColorScheme'
import CustomButton from './CustomButton'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function EmptyScreen({title, otherTitle, otherCaption, btnTitle, btnClick, loader, refresh, showBtn, className}) {
    return (
        <div id="EmptyScreen" className={`w-100 ${className ? className : 'mt_100'}`}>
            <div className="middle">
                <div className="col-6 text-center">
                    <div className="Heading22R color-c000000">
                       {otherTitle ? otherTitle :  `No ${title} Found`} 
                    </div>
                    <div className="mt_12 subgititle2 color-c828282">
                        {otherCaption ? otherCaption : `You don’t have any ${title}. Click 'Add ${title}' to manually add ${title}`}.
                    </div>
                    {showBtn == false ? '' : <div className="mt_16">
                        <CustomButton 
                            btntext      = {btnTitle}
                            border       = {'1px solid ' + ColorSchemeCode.widgetEditorBorder}
                            borderRadius = {'4px'}
                            onClick      = {btnClick}
                            // height       = {36}
                            icon            = {loader && <CircularProgress size={20} color={'inherit'}/>}
                        />

                        {refresh ? refresh : ''}
                    </div>}
                </div>
            </div>
        </div>
    )
}
