import React,{useState, useEffect, useContext} from 'react'

import CustomButton from '../../components/CustomButton';

import { AgencyContext } from '../../context/Agency.context';
import localforage from 'localforage'

import { PngIcons, SvgIcons } from '../../icons';

export default function WelcomeScreen({formik, setActivePage, index, state}) {
    const [User, setUser] = useState('');
    const agency = useContext(AgencyContext)

    const handleSumbit = () => {
            setTimeout(()=>{setActivePage(index,'next')},500)
    }

    useEffect(async()=>{
        const user = await localforage.getItem('user')
        setUser(user)
    },[])

    return (
        <div className="row middle animationComponent" id="welcomeScreen">
            <div className="userDetailBox middle">
                <SvgIcons.WelcomeAvatarIcon/>
                <div className="color-neutral100 text-center Heading22M fs-32 mt_24">
                    Hey <span className="capitalize">{User.firstName}</span>! Let’s set up your <br/> account in just a few easy steps 
                </div>
                <div className="color-neutral60 Body16R mt_24"> 
                    We’ll  help you get started based on your responses
                </div>
                <div className="mt_24">
                    <CustomButton 
                        btntext = {'Lets Go!'}
                        onClick = {handleSumbit}
                        height  = {'44px'}
                    />
                </div>
            </div>
        </div>
    )
}
