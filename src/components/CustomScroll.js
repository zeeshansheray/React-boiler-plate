import React, {useContext, useEffect, useState} from 'react'
import { Campaign } from '../enums';
import { SvgIcons } from '../icons';
import CustomSwitch from './CustomSwitch';
import localForage from 'localforage';
import { EarningWayService } from '../services';
import CustomButton from './CustomButton';
import { CircularProgress } from '@material-ui/core';
import {LayoutContext} from '../context/Layout.context'

export default function CustomScroll({components, formik, setEarningWays, earningWays}) {
    const [selectedComponent, setSelectedComponent] = useState(components[0].title);
    const [index, setIndex] = useState();
    const [id, setId] = useState();
    const layout = useContext(LayoutContext);
    // const [reload, setReload] = useState(false);

    useEffect(() => {
        if(earningWays&&earningWays.length>0)
        earningWays.map((value, idx)=>{
            if(value.activity===formik.values.activity){
                setIndex(idx)
                setId(value._id)
            }
        })
    }, [])
    

    const goToSection = (element) => {
        element.ref.current.scrollIntoView({ behavior: 'smooth' });
        setSelectedComponent(element.title);
    };

    return (
        <div id="CustomScrollComponent">
            <div className="row">
                <div className="col-2">
                <div className="leftSection">
                    <div className="scrollspy">
                        {components.map((element, idx)=>
                            <div>
                                <li className="d-flex space-between" key={idx}>
                                    <a onClick={()=>goToSection(element)}  className={`singleItem Link14M cp color-unselectTextColor pb_20 
                                    ${ (selectedComponent == element.title) && 'isCurrent'}
                                    `} >{element.title}</a>
                                    {element.filled && <div><SvgIcons.TickIconSub /></div>}
                                </li>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
                <div className="col-10 mb_100">
                    <div className='row'>
                        <div className='col-7'>
                            {components.map((element,idx)=>
                                <div>
                                    {/* <div className="topSpaceDiv" ref={element.ref}>
                                    </div> */}
                                    <div key={idx}>
                                        {element.component}
                                    </div>
                                    {/* <div className="bottomSpaceDiv">
                                    </div> */}
                                </div>
                            )}
                        </div>
                        {formik&&formik.values&&formik.values.earningType&&<div className='col'>
                            <div className='earningFormBox mt_0'>
                                <div className="Body16R color-neutral100 mb_16">Summary</div>  
                                {formik.values.earningType===Campaign.EarningTypes.INCREMENTAL&&<div className='Body14R color-neutral60'>{"• Customer will earn "+formik.values.earningValue+" points for every $1 spent."}</div>}
                                {formik.values.earningType===Campaign.EarningTypes.FIXED&&<div className='Body14R color-neutral60'>{"• Customer will earn 1 points on every "+ formik.values.earningValue + "$ shopping through" + formik.values.activity+"."}</div>}
                                {formik.values.earningType===Campaign.EarningTypes.RANGE&&
                                    formik.values.earningValueRange&&formik.values.earningValueRange.length>0&&
                                    formik.values.earningValueRange.map((value, index)=>(
                                        <>
                                            {
                                                value.check ?
                                                    <div className='Body14R color-neutral60'>{"• Customer will earn "+value.points+" points if spent between "+value.minValue+" to "+value.maxValue+"."}</div>
                                                    :
                                                    <div className='Body14R color-neutral60'>{"• Customer will earn "+value.points+" points if spent equal to or more than "+value.minValue+"."}</div>
                                            }
                                        </>
                                    ))
                                }

                                <div className='d-flex space-between align-items-center mt_24'>
                                    <div className="imageBox middle p_0 ">
                                        <img src={
                                            (formik.values.activity === Campaign.Activities.EARNING.BIRTHDAY) ? '/images/loyalty/birthday.png' :
                                                (formik.values.activity === Campaign.Activities.EARNING.SIGNUP) ? '/images/loyalty/signup.png' :
                                                    (formik.values.activity === Campaign.Activities.EARNING.SPENDING) ? '/images/loyalty/onspend.png'
                                        : '/images/loyalty/Pos.png'} 
                                        width={32} alt=""/>
                                        <div className={"activeCircle " + (formik.values.active ? 'bg-color-activeColor' : 'bg-color-cAFAEAE')}></div>
                                    </div>

                                    <div>
                                    <CustomSwitch 
                                        checked={formik.values.active}
                                        value={formik.values.active}
                                        onChange={async(e) => {
                                            if(formik.values.active){
                                                const payload = {_id: id, active: false}
                                                console.log('payload',payload);
                                                const {error, response} = await EarningWayService.Update({toaster: true, payload})
                                                console.log(error, response);
                                                if(response){
                                                    earningWays[index] = response.data
                                                    let selectedLoyalityEarningWays = await localForage.getItem('selectedLoyalityEarningWays');
                                                    selectedLoyalityEarningWays[index] = response.data
                                                    localForage.setItem('selectedLoyalityEarningWays', selectedLoyalityEarningWays);
                                                    formik.setValues({...formik.values, active: false})
                                                    setEarningWays([...earningWays])
                                                }
                                            }
                                            else{
                                                const payload = {_id: id, active: true}
                                                console.log('payload',payload);
                                                const {error, response} = await EarningWayService.Update({toaster: true, payload})
                                                console.log(error, response);
                                                if(response){
                                                    earningWays[index] = response.data
                                                    let selectedLoyalityEarningWays = await localForage.getItem('selectedLoyalityEarningWays');
                                                    selectedLoyalityEarningWays[index] = response.data
                                                    localForage.setItem('selectedLoyalityEarningWays', selectedLoyalityEarningWays);
                                                    formik.setValues({...formik.values, active: true})
                                                    setEarningWays([...earningWays])}
                                            }
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
