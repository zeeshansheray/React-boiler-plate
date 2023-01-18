import React,{useState, useEffect} from 'react'

import {Link} from 'react-router-dom';

import PngIcons from '../../icons/png.icon'


export default function RewardType(props) {
    
    const [section, setSection] = useState('');

    useEffect(()=>{
        sectionCompletedCheck();
        setSection(props.section);
    },[props.section])

    const sectionCompletedCheck = () =>{
        if(section === 4){
            props.setPage(2);
        }
    }

    return (
        <div id="rewardsReferral">
                
                {section === 2 ? 
                       
                       <div className="row">

                                <div className="Heading22R col-12">
                                    Add  rewards for campaign(s)
                                </div>

                                <div className="color-placeholder fs-32 fw-3 col-12 mt_200 text-left">

                                    I want to create a <Link className="subtitle1 fs-32">program name</Link> 
                                    for campaign <Link className="subtitle1 fs-32">select campaign</Link>
                                    
                                </div>
                            

                        </div>
                          

                           
                    :   

                        section === 3 ?     

                        <div className="row">
                            
                            <div className="Heading22R col-12 ml_53">
                                Add  rewards for campaign(s)
                            </div>


                            <div className="color-placeholder fs-32 fw-3 col-12 mt_200 text-left">
                                
                                I want to offer <Link  className="subtitle1 fs-32">points refferal type </Link> of 
                                <Link  className="subtitle1 fs-32">amount </Link>
                                and then <Link  className="subtitle1 fs-32">limit/decrease</Link> 
                                the points after reaching <Link  className="subtitle1 fs-32">amount</Link> 
                                to  <Link  className="subtitle1 fs-32">points</Link>
                            
                            </div>
                    

                        </div>
                  
                    :

                        section === 4 ? 

                        <div className="row">
                            
                            <div className="Heading22R col-12 ml_53">
                                Add  rewards for campaign(s)
                            </div>

                            <div className="color-placeholder fs-32 fw-3 col-12 mt_200 text-left">
                                    
                                    I want to offer <Link  className="subtitle1 fs-32">points refferal type </Link> of 
                                    <Link  className="subtitle1 fs-32">amount </Link>
                                    and then <Link  className="subtitle1 fs-32">limit/decrease</Link> 
                                    the points after reaching <Link  className="subtitle1 fs-32">amount</Link> 
                                    to  <Link  className="subtitle1 fs-32">points</Link>
                            
                            </div>
                    

                        </div> 
                    
                    :

                        <div>
                        <div className="row singleReward">
                            
                            <div className="rewardName col-4 pt_24 pl_24 pr_24 pb_24">
                                
                                <div className="headline3 fw-8 fs-24">Milestone Reward
                                </div>
                                                    
                                <div className="body1 mt_10">
                                    
                                    Reward a participant when they reach a specific referral goal.
                                
                                </div>
                           
                            </div>
                            
                            <div className="col-7 pt_24 pl_24 pr_24 pb_24">
                               
                                <div className="subtitle1">
                                    Example
                                </div>
                                
                                <div className="Body14R">
                                    <div className="mt_16">
                                        <img src={PngIcons.MornginBrewIcon} alt=""/>
                                    </div>
                                    
                                    <div className="detail mt_10">
                                                * Refer 3 friends and receive our Premium Sunday Newsletter <br/>
                                                * Refer 5 friends and get free stickers <br/>
                                                * Refer 10 friends and get exclusive access to our community <br/>
                                                * Refer 15 friends and get a free phone wallet
                                    </div>

                                </div>


                            </div>

                        </div>
                                 

                                    {/* secondBox */}

                             
                        <div className="row singleReward mt_32">
                            <div className="rewardName col-4 pt_24 pl_24 pr_24 pb_24">
                                               
                                <div className="headline3 fw-8 fs-24">
                                    Single-sided Reward
                                </div>
                                                    
                                <div className="body1 mt_10">
                                    Reward a participant when they refer a friend.
                                </div>
                                         
                            </div>
                            
                            <div className="col-7 pt_24 pl_24 pr_24 pb_24">
                                
                                <div className="subtitle1">
                                    Example
                                </div>
                                
                                <div className="blocks">
                                    
                                    <div className="Body14R col-6">
                                        
                                        <div className="mt_16">
                                            <img src={PngIcons.GoogleIcon} alt=""/>
                                        </div>
                                        
                                        <div className="detail mt_10">
                                            Receive up to $30 for every person you refer that signs up to G Suite.
                                        </div>
                                    
                                    </div>
                                    
                                    <div className="Body14R col-6 ml_60">
                                        <div className="mt_16">
                                            <img src={PngIcons.EventBriteIcon} alt=""/>
                                        </div>
                                                
                                        <div className="detail mt_10">
                                            Receive up to $30 for every person you refer that signs up to G Suite.
                                        </div>
                                    
                                    </div>
                                
                                </div>

                            </div>

                                        

                        </div>
                              


                                    {/* thirdbox */}
                             
                        <div className="row singleReward mt_32">
                            <div className="rewardName col-4 pt_24 pl_24 pr_24 pb_24">
                                                
                                                    <div className="headline3 fw-8 fs-24">
                                                         Double-sided Reward
                                                    </div>
                                                    <div className="body1 mt_10">
                                                        Reward both participants when a referral happens.   
                                                    </div>
                                            
                                        </div>
                                
                                <div className="col-7 pt_24 pl_24 pr_24 pb_24">
                                        
                                        <div className="subtitle1">
                                            Example
                                        </div>
                                        
                                        <div className="blocks">
                                            
                                            <div className="Body14R col-6">
                                               
                                                <div className="mt_16">
                                                        <img src={PngIcons.AirBnbIcon} alt=""/>
                                                </div>
                                                
                                                <div className="detail mt_10">
                                                    Send a friend $40 in Airbnb credit. You’ll get $20 when they travel and $75 when they host.
                                                </div>

                                            </div>

                                            <div className="Body14R col-6 ml_60">

                                                <div className="mt_16">
                                                        <img src={PngIcons.DropBoxIcon} alt=""/>
                                                </div>

                                                <div className="detail mt_10">
                                                     For every friend you refer, you’ll both receive an extra 250MB in cloud storage.
                                                </div>

                                            </div>

                                        </div>


                                        <div className="blocks">
                                            <div className="Body14R col-6">
                                                
                                                <div className="mt_16">
                                                        <img src={PngIcons.UberIcon} alt=""/>
                                                </div>
                                                
                                                <div className="detail mt_10">
                                                    For every friend you refer who takes their first ride with us, we'll give you both a free ride up to $20.
                                                </div>

                                            </div>

                                            <div className="Body14R col-6 ml_60">

                                                <div className="mt_16">
                                                        <img src={PngIcons.CoinBaseIcon} alt=""/>
                                                </div>
                                                
                                                <div className="detail mt_10">
                                                    Refer a friend and you’ll both get $10 in Bitcoin when they buy or sell at least $100 of digital currency.
                                                </div>

                                            </div>

                                        </div>

                                </div>

                            </div>

                        </div>

                    }

        </div>
    )
}
