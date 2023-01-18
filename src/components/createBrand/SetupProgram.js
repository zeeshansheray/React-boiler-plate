import React,{useState, useEffect, useContext} from 'react'

import CustomButton from '../CustomButton';

import { AgencyContext } from '../../context/Agency.context';

import { PngIcons } from '../../icons';

export default function WelcomeScreen({formik, setActivePage, index, state}) {

    const agency = useContext(AgencyContext)

    const handleSumbit = () => {
            setTimeout(()=>{setActivePage(index,'next')},500)
    }

    return (
        <div className="row ml_0 mr_0 middle animationComponent" id="SetupProgram">
            <div className="userDetailBox middle">
                <img src={PngIcons.loveAvatar} height={87} width={87} alt="" />
                <div className="color-neutral100 text-center Heading22M fs-32 mt_24">
                    Let’s set up your <br/> loyalty program for your business
                </div>
                {/* <div className="mt_24">
                    <CustomButton 
                        btntext = {'Lets Go!'}
                        onClick = {handleSumbit}
                        height  = {'44px'}
                    />
                </div> */}
            </div>
        </div>
    )
}
