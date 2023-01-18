
import React, {useState} from 'react'
import SvgIcons from '../../icons/svg.icon';

import {useHistory} from 'react-router-dom';

import Reward from './Rewards';
import Design from './Desgin';
import Email from './Email';
import Options from './Options';
import Installation from './Installation';

import CustomButton from '../CustomButton'
import {ColorScheme} from '../../enums'


export default function Layout(props) {

    const history = useHistory();

    const handleSaveBtn = () => {
        history.push('/main/referral');
    }

    const [pageNo, setPageNo] = useState(1);
    const [section, setSection] = useState(1);
    const [nextClicked, setnextClicked] = useState(false);


    const setPage = (page) =>{
        if(nextClicked){
            setPageNo(page);
            setSection(1);
        }
    }

    const handleNext = async() => {
        setnextClicked(true);
        setSection(section+1)
    }

    const handleBack = async() => {
        if(section !== 1){
            setSection(section-1)
        }
        else if(section === 1 ){
            setPage(pageNo-1);
            setSection(components[pageNo-1].Totalsections);
    }   


    }
    const components = [
        {
             Totalsections: 4, component: <Reward setPage={setPage} section={section}/>,
        },
        {
             Totalsections: 1, component: <Design setPage={setPage} section={section}/>,
        },
        {
             Totalsections: 1, component: <Email setPage={setPage} section={section}/>,
        },
        {
             Totalsections: 1, component: <Options setPage={setPage} section={section}/>,
        },
        {
             Totalsections: 1, component: <Installation setPage={setPage} section={section}/>,
        }

    ]
    
    return (
        <div className="d-flex">
            <div id="sideStepperReferral">

                <div className="contentFrame">

                    <div className="savebtn savetext" onClick={handleSaveBtn}>
                        save & exit
                    </div>
                    
                    <br/>

                    <div className="headline4 col-12 mt_16">
                        {props.title}
                    </div>  

                    <nav className="mt_24">
                        <div className={(pageNo === 1) ? 'items active' : 'items'}><span className="navtext"> Rewards </span><span className="icons"> <SvgIcons.RightIcon/> </span></div>
                        <div className={(pageNo === 2) ? 'items mt_32 active' : 'items mt_32'}><span className="navtext"> Design <span className="icons"> {pageNo <= 2  ? <SvgIcons.LockIcon/> : <SvgIcons.RightIcon/>}</span></span> </div>
                        <div className={(pageNo === 3) ? 'items mt_32 active' : 'items mt_32'}><span className="navtext"> Email <span className="icons"> {pageNo <= 3  ? <SvgIcons.LockIcon/> : <SvgIcons.RightIcon/>} </span></span> </div>
                        <div className={(pageNo === 4) ? 'items mt_32 active' : 'items mt_32'}><span className="navtext"> Option <span className="icons">{pageNo <= 4  ? <SvgIcons.LockIcon/> : <SvgIcons.RightIcon/>}</span></span></div>
                        <div className={(pageNo === 5) ? 'items mt_32 active' : 'items mt_32'}><span className="navtext"> Installation <span className="icons"> {pageNo <= 5 ? <SvgIcons.LockIcon/> : <SvgIcons.RightIcon/>}</span></span> </div>
                    </nav>

                </div>

            </div>
           
            <div id="createprogram">
            
                <div id="layout" className="container">

                {
                    components[pageNo-1].component
                }

                </div>
                        
                <div className="row footerPart">
                    <div className={''+ (section === 1) ? 'bar col-12' : 'barblue col-12'}></div>
                        
                         <div className="col-4 text-left pl_40">
                         <CustomButton
                            className   =   {(pageNo===1) ? "backbtndis Heading4" : "backbtn Heading4"}
                            disabled    =   {(pageNo === 1 && section===1) ? true : false}
                            textColor   =   {ColorScheme.ColorSchemeCode.c1AC4D1    }
                            color       =   {ColorScheme.ColorSchemeCode.white}
                            hover       =   {ColorScheme.ColorSchemeCode.cF7F7F7}
                            focus       =   {ColorScheme.ColorSchemeCode.cF7F7F7}
                            border      =   '0.5px solid #1AC4D1;'
                            // height      =   {'42px'}
                            btntext     =   {"Back"}
                            handleClick =   {handleBack}
                        />
                        </div>

                        <div className="col-4 text-center mt_10"> {section}/{components[pageNo-1].Totalsections} </div>
                        
                        <div className="col-4 text-right  footerButtons pr_40">
                        
                        <CustomButton
                            className         =   "nextbtn Heading4"
                            textColor         =   {ColorScheme.ColorSchemeCode.white}
                            hovertextColor    =   {ColorScheme.ColorSchemeCode.c1AC4D1}
                            color             =   {ColorScheme.ColorSchemeCode.c1AC4D1}
                            hover             =   {ColorScheme.ColorSchemeCode.cF7F7F7}
                            focus             =   {ColorScheme.ColorSchemeCode.cF7F7F7}
                            border            =   '0.5px solid #1AC4D1;'
                            disabled          =   {(pageNo === 5 && section === components[4].Totalsections) ? true : false}
                            // height            =   {'42px'}
                            btntext           =   {(pageNo === 5 && section === components[4].Totalsections) ? "Save" : 'Next'}
                            handleClick       =   {handleNext}
                        />
                        </div>

                    </div>
                   
    </div>
    </div>
    )
}
