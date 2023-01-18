// import { CircularProgress } from '@material-ui/core'
import React from 'react'
import CustomButton from './CustomButton'

function LeaveModal(props) {
    return (
        <div className="mt_8">
            <div className="color-neutral100 Heading22M mb_16">
                Discard Changes
            </div>
            <div className="color-neutral60 Body14R">
                If you leave, your edits won't be saved.
            </div>
            <div className="d-flex justify-flex-end mt_24">
                <div>
                    <CustomButton 
                        varient = "secondary"
                        btntext = "Cancel"
                        onClick = {props.onCancel}
                        />
                </div>
                <div className="ml_8">
                    <CustomButton 
                        varient = "warning"
                        btntext = "Discard"
                        // icon    = {props.icon && <CircularProgress size={20} color={'inherit'}/>}
                        onClick = {props.onDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default LeaveModal
