import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';

import * as localForage from 'localforage'

import SvgIcons from  '../../../icons/svg.icon';

import { ColorScheme, enums } from '../../../enums'
import { AgencyContext } from '../../../context/Agency.context';
import CustomButton from '../../CustomButton';
import { utils } from '../../../utils';


export default function Header() {

    var pathname = window.location.pathname;

    const history = useHistory();

    const agency = useContext(AgencyContext)

    return (
        
            <div className="row ml_0 mr_0 pl_24 pr_24" id="SignupHeader">  
            
                <div className="logoBox col-2 col-md-6 text-left">   
                    {/* <SvgIcons.WalletlyHeaderLogoIcon/> */}
                    <img className={'borderRadius-50'} src = {agency.logo} alt={"logo"} width={"40px"} height={"40px"} />
                
                </div>

                {pathname === '/signup' ? 
                    <div className="col-md-6 col-12 text-right">
                    <div className="textButton row text-right">

                        <div className="col-md-5 offset-md-4 col-8 contents">
                            <div className='row'>
                                <div className="caption2 col-md-12 col-12" id="firstText">
                                        Already have an account?
                                            {/* {agency.agencyName}  */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12 col-12">  
                                    <Link to="/forget" className="caption2 cp" id="secondText">I forgot my User ID or Password</Link> 
                                </div>
                            </div>
                        </div>

                        <div className="button col-md-3 col-4 middle">
                        
                        <Link to="/" className="text-dec-none">
                            <CustomButton 
                                className="fs-14 fw-5" 
                                width   = {110}
                                btntext = "Login"
                            />
                        </Link>
                        </div>
                       

                    </div> 
                    </div>

                    :   
                    
                    pathname === '/' ?
                    <div className="col-md-6 col-12 text-right">
                        <div className="textButton row text-right">

                            <div className="col-md-5 offset-md-4 col-8 contents">
                                <div className='row'>
                                    <div className="caption2 col-md-12 col-12" id="firstText">
                                            Don't have an account?
                                            {/* {agency.agencyName}  */}

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-md-12 col-12">  
                                        <Link to="/forget" className="caption2" >I forgot my User ID or Password</Link> 
                                    </div>
                                </div>
                            </div>

                            {/* to='signup' */}
                            <div className="button col-md-3 col-4 middle">
                            <Link to='signup' className="text-dec-none">
                                <CustomButton 
                                    // disabled  = {agency && agency.whiteLabel ? true : false}
                                    className = "fs-14 fw-5"
                                    // height='52px' 
                                    width   = {110}
                                    btntext="Get Started"
                                />
                            </Link>
                            
                            </div>

                        </div> 
                        </div>
                        :

                        <span className="buttonBox col-12 col-md-6">
                            <CustomButton 
                                varient = {'secondary'}
                                btntext = {'Sign Out'}
                                onClick = {utils.Logout}
                            />
                        </span>


                    
                }
                {/* {
                    pathname === '/brand' || pathname === '/onboard' ?
                    <span onClick={hanldeLogout}>Logout</span>
                    : ''
                } */}
        </div>
        

        
    )
}

