import { CircularProgress } from '@material-ui/core'
import React from 'react'
import CustomButton from './CustomButton'

function RedeemModal(props) {
    return (
        <div className="mt_8 w-100">
            <div className="color-neutral100 Heading22M mb_16">
                Do you want to redeem this deal?
            </div>
            <div className="color-neutral60 Body14R">
              
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
                        varient = "primary"
                        btntext = "Redeem"
                        icon    = {props.icon && <CircularProgress size={20} color={'inherit'}/>}
                        onClick = {props.onDelete}
                    />
                </div>
            </div>
        </div>
    )
}


export default RedeemModal
