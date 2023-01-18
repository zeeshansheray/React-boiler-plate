import React, {useEffect, useState} from 'react'

import CustomSwitch from '../CustomSwitch';
import CustomButton from '../CustomButton';

export default function Email(props) {

    const [section, setSection] = useState('');

    useEffect(()=>{
        sectionCompletedCheck();
        setSection(props.section);
    },[props.section])

    const sectionCompletedCheck = () =>{
        if(section == 1){
            props.setPage(4);
        }
    }

    const contents = [
        {
            title: 'New Participant (to referred)',
            detail: 'Email newly referred participants when they are added to the referral campaign.',
        },
        {
            title: 'New Participant (to non-referred)',
            detail: 'Email newly non-referred participants when they are added to the referral campaign (includes direct signups and participants added/imported via dashboard).',
        },
        {
            title: 'Referral Credit Received',
            detail: 'Email referrers when they receive referral credit because someone they referred performed a Custom Event.',
        },
        {
            title: 'New Participant Reward',
            detail: 'Email participants when they unlock a new reward (if the reward is double-sided, the referred participant will also be emailed).',
        },
        {
            title: 'Campaign Ended (to winners)',
            detail: 'Email winners when the campaign ends.',
        },
        {
            title: 'Monthly Progress Update',
            detail: 'Email all participants at the end of the month to promote your referral campaign.',
        },
    ]

    return (
        <div id="emailReferral">
                <div className="row"> 
                            
                            <div className="Heading22R col-12">
                                Customize emails  
                            </div>

                    </div>

                    
                    <div className="row">
                            
                        <div className="card mt_16 col-9 ml_15">
                               
                                <div className="subtitle1">  

                                    Promotional Email

                                </div>
                        

                    <div className="bar mt_16"></div>



                    {contents.map((value,index)=> 

                      <><div className="d-flex singleRow" key={index}>
                            
                            <div className="col-2">
                                    <CustomSwitch/>
                            </div>

                            
                            <div className="col-8">

                                    <div className="Body14R">
                                        {value.title}
                                    </div>

                                    <div className="Body14R">
                                        {value.detail}
                                    </div>

                            </div>


                            <div className="col-2">
                                
                                <CustomButton 
                                    className="fs-14 bg-color-cE0E0E0 color-neutral80"
                                    btntext="edit"
                                    width={'60px'}
                                    // height={'45px'}
                                    borderRadius={'12px'}
                                />

                            </div>
                            
                        </div>
                        
                        <div className="bar mt_16"></div>
            
                        </>  
                        )}
                        </div>

                        
                        <div className="card mt_24 col-9 ml_15">
                            <div className="subtitle1">
                                
                                Transitional Email

                            </div>

                    
                            <div className="bar mt_16"></div>


                            <div className="d-flex singleRow">

                                <div className="col-2">
                                        <CustomSwitch/>
                                </div>

                                <div className="col-8">
                                        <div className="Body14R">

                                            One-Time Login Link

                                        </div>

                                        <div className="Body14R">

                                            Email the participant a one-time login link (only applies if Require participants to authenticate is enabled in the Options step).
                                        
                                        </div>

                                </div>

                                <div className="col-2">
                                    <CustomButton 
                                        className="fs-14 bg-color-cE0E0E0 color-neutral80"
                                        btntext="edit"
                                        width={'60px'}
                                        // height={'45px'}
                                        borderRadius={'12px'}
                                    />

                                </div>
                                
                            </div>

                            <div className="bar mt_16"></div>

                        </div>
                
                </div>
        </div>
    )
}
