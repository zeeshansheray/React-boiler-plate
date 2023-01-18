import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';

import CustomSlider from '../CustomSlider';
import CustomInput from '../CustomTextField';
import CustomButton from '../CustomButton';
import CustomSwitch from '../CustomSwitch';

import SvgIcons from '../../icons/svg.icon';

export default function Options(props) {

    const [section, setSection] = useState('');

    const AutomateOptions = [
        '(Optional) Blacklist email addresses, IP addresses, and countries ',
        '(Optional) Whitelist email addresses, IP addresses, and countries ',
        '(Optional) Enable reCAPTCHA',
    ]

    const checkboxWalletlyEvents = [
        'New Participant Reward',
        'New Participant (non-referred)',
        'New Participant (referred)',
        'Campaign Ended',
    ]

    useEffect(()=>{
        sectionCompletedCheck();
        setSection(props.section);
    },[props.section])

    const sectionCompletedCheck = () =>{
        if(section === 1){
            props.setPage(5);
        }
    }

    return (
        <div id="optionsReferral">
            <div className="row">
                
                <div className="col-12">

                    <div className="Heading22R col-12">
                            Automate Reward Approval
                    </div>
                    
                    <div className="card mt_16 col-12">

                        <div className="slider">
                            <CustomSlider/>
                        </div>

                        <div className="Body14R mt_25">
                            Automatically approve rewards: Automatically approve all rewards, but manually mark them as fulfilled. Why?
                        </div>
                
                    </div>

                </div>
            </div>
            
            <div className="row mt_30">
                <div className="col-12">

                    <div className="Heading22R col-12">
                            Automate Fraud Prevention
                    </div>

                    <div className="card mt_16 col-12">

                        <div className="slider">
                            <CustomSlider/>
                        </div>
                        
                        <div className="Body14R mt_25">
                            <b>Loose Anti-Fraud:</b> Allow any new participant to join your campaign, even if identified as having a high or medium fraud risk level (fraudsters will always be visibly marked in your dashboard). 
                            <Link className="color-themeColor">Why</Link>
                        </div>

                        <div className="bar mt_16"></div>

                        <div className="automateOptions">
                           
                           {
                          
                           AutomateOptions.map((value)=>
                           <div>
                                <div className="singleOption Body14R color-themeColor mt_16 pb_16">
                                    <Link>{value}</Link>
                                </div>
                                
                                <div className="bar"></div>
                                
                                </div>
                           )}
                        </div>

                    </div>

                </div>

            </div>
                
                
            <div className="mt_30">
                <div className="Heading22R col-12">
                        Set Credit Expiration window
                </div>
                
                <div className="card mt_16 col-12">

                        <div className="customInput col-10">
                            <CustomInput label={'Lable'} placeholder={'1 Month'} className="w-80"/>
                        </div>
                </div>

            </div>

            <div className="mt_30">
                
                <div className="Heading22R col-12">
                        Require participants to authenticate
                </div>

                <div className="card mt_16">

                    <div className="d-flex">
                            
                            <CustomSwitch/>
                            
                            <div className="Body14R ml_10 mt_5">
                                        Currently : Disabled
                            </div>
                    </div>

                </div>
            </div>
                
            <div className="mt_30">
                
                <div className="Heading22R col-12">
                        Get Notified of Walletly events
                </div>

                <div className="card mt_16">

                     <div className="customInput col-10">

                            <CustomInput 
                                label={'Lable'} 
                                placeholder={'you@company.com, emily@company.com, bob@company.com'} 
                                className="w-80"
                            />

                    </div>

                    <div className="checkboxes mt_16">

                        {   checkboxWalletlyEvents.map((value, index)=>
                            <div className="questionBox Body14R mt_8" key={index}>

                                <input type="checkbox" className="checkBox" name="" value=""/>

                                <span className="Body14R ml_10">{value}</span>

                            </div>
                        )}

                    </div>
                </div>
            </div>

            <div className="mt_30">

                <div className="Heading22R col-12">
                        Import your email list to kickstart your campaign
                </div>

                <div className="card mt_16 mb_120">
                       
                        <div className="col-7 pl_0 pr_0">
                               
                                <CustomButton 
                                    className="w-100 fs-14" 
                                    icon={<SvgIcons.UploadIcon/>}  
                                    btntext="Import Participants"
                                />

                        </div>
                </div>
           
            </div>

        </div>

    )
}
