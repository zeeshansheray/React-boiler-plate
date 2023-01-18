import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import CustomButton from '../CustomButton'
import CustomSelect from '../CustomSelect';

import SvgIcons from '../../icons/svg.icon';

import { ColorSchemeCode } from '../../enums/ColorScheme'

import {getProgramActiveStatus} from '../../utils/Options';
import { AgencyContext } from '../../context/Agency.context';

import CustomsModal from '../CustomModal';
import Loader from '../Loader';
import { BrandContext } from '../../context/Brand.context';
import { LayoutContext } from '../../context/Layout.context';
import { Brand, Campaign } from '../../enums';
import { ClickOutside, utils } from '../../utils';
import CustomSwitch from '../CustomSwitch';
import ReactTooltip from 'react-tooltip';
import localForage from 'localforage';
import { RedemptionType } from '../../enums/enums';
import Spinner from '../Spinner';
// import { ElementContainer } from 'html2canvas/dist/types/dom/element-container';

export default function LoyaltyMainComponent({details, selectedCampaign, list, updateActiveStatus, processingElement, activities , addEarningWays, setAddEarningWays, show}){
    
    return (
        <div id="Loyaltymaincomponent">
            <div className=" ways">

                {/* <AddWaysButton 
                    list              = {list}
                    selectedCampaign  = {selectedCampaign}
                    details           = {details}
                    activities        = {activities}
                    addEarningWays    = {addEarningWays}
                    setAddEarningWays = {setAddEarningWays}
                />  */}
                <WaysList 
                    list               = {list}
                    selectedCampaign   = {selectedCampaign}
                    updateActiveStatus = {updateActiveStatus}
                    processingElement  = {processingElement}
                />
            </div>

        </div>
    )
}

const AddWaysButton = ({list, selectedCampaign, details, setAddEarningWays , addEarningWays, activities}) => {
    
    const agency = useContext(AgencyContext)
    const brand = useContext(BrandContext)

    const [tooltipText, setTooltipText] = useState('copy');

    const handleCopy = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const content = selectedCampaign.campaignCode
        navigator.clipboard.writeText(content)
        ReactTooltip.show(document.getElementById('tooltip'+selectedCampaign.campaignCode))
        setTooltipText('copied')
    }

    return (
        <div>
            <div className='d-flex ways'>
                <div className='col-md-6 col-12 text-left ways'>
                    {/* <div className='headline4'>{details.title}</div> */}
                        <div className="Body12R color-neutral60">
                            {/* {'WAYS TO EARN ('+ activities.length+ ')'}  */}
                        </div>
                    {/* <div className='Body14R mt_8'>
                        <span>{details.subHead}</span>
                        <Link href="">{details.link}</Link>
                    </div> */}
                </div>
                <div className='col-6 d-flex flex-column Addprograms align-self-center'>
                    {/* <div>
                        <CustomButton 
                            btntext         = {'Add ways to earn'}
                            // hover           = {agency.agencyColor}
                            color           = {ColorSchemeCode.white}
                            // focus           = {agency.agencyColor}
                            // border          = {'1px solid ' + agency.agencyColor}
                            onClick         = {() => setAddEarningWays(!addEarningWays)}
                        />
                    </div> */}
                    {addEarningWays && <EarningPrograms list={list} selectedCampaign={selectedCampaign} activities={activities} setAddEarningWays={setAddEarningWays}/>}
                </div>         
            </div>
            {/* {addEarningWays && <div onClick={() => setAddEarningWays(false)} className="backDrop"></div>} */}
            {addEarningWays && <div onClick={() => setAddEarningWays(false)} ></div>}
        </div>
    )
}

const EarningPrograms = ({list, selectedCampaign, activities, setAddEarningWays}) => {

    const history = useHistory()

    const gotToCreateWay = (element) => {
        history.push({
            pathname: window.location.pathname + '/create',
            state: { selectedActivityType: element, ways: list, campaign: selectedCampaign }
        })
    }

    return(
        <div id="Earnpointmodal" className="dropdown-box element borderRadius-6 mt_0 z-index-7 pb_8 pt_8">
            <ClickOutside onClick={()=>setAddEarningWays(false)}>
                {/* <div className='col-12 Heading22R mb_16 text-left'> Activity Type </div>  */}
                <div className="container">
                    <div className={`row align-items-center `} style={{
                        padding: '10px 12px 10px 12px',
                        borderBottom:  '0.5px solid color(neutral10)'
                    }}>
                        <div className="dropdownBody Link14M color-neutral60 mr_50">
                            {'Activity Type'}
                        </div>
                    </div>
                </div>
                <div className="activity-list">
                    {activities && activities.map((element, idx)=>(
                        !element.exist &&
                        <div className="container disabled">
                            <div className={`row align-items-center singleItem cp`} onClick={()=>gotToCreateWay(element)}>
                                {element.icon && <span className="iconPart mr_8">
                                    <img src={element.icon} alt='' width='16px' height='16px'/>   
                                </span>}
                                <div key={idx} className="Body14R dropdownBody color-neutral100">
                                    {element.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>     
            </ClickOutside>
        </div>
    )
}

const WaysList = ({list, updateActiveStatus, selectedCampaign, processingElement }) => {

    const layout = useContext(LayoutContext);

    const [brandForage, setBrandForage] = useState()
    const [loader, setLoader] = useState(true)
    useEffect(async() => {
        setLoader(true)
        const brandData = await localForage.getItem('brand')
        setBrandForage(brandData)
        setLoader(false)
    }, [])

   

    const brand = useContext(BrandContext)
    const history = useHistory()

    const gotToUpdateWay = (element) => {
        let temp = []
        if(element.earningValueRange&&element.earningValueRange.length>0){
            element.earningValueRange.map((value, index)=>{
                if(value.maxValue) temp.push({...value, check: true})
                else temp.push({...value, check: false})
            })
            history.push({
                pathname: window.location.pathname + '/' + element._id,
                state: { ways: list, selectedWay: {...element, earningValueRange: temp}, campaign: selectedCampaign, edit: true }
            })
        }
        else{
            history.push({
                pathname: window.location.pathname + '/earn',
                state: { ways: list, selectedWay: element, campaign: selectedCampaign, edit: true }
            })
        }
    }

    return (
        <div className="">
            {
                !loader &&
            list && list.map((element, idx)=>
            // element.activity !== Campaign.Activities.EARNING.CHECKIN&&
            <div div className={element.activity===Campaign.Activities.EARNING.CHECKIN ? 'd-none' : ''}>
                <div key={idx} className={"row align-items-center tableRowHover singleProgram cp"} onClick={() => gotToUpdateWay(element)}>
                    {/* <div key={idx} className={(element.earningName !== "spending" && brand && brand.brandRedemptionType && brand.brandRedemptionType === RedemptionType.ORDER) ? "row singleProgram cp disabled":"row singleProgram cp"} onClick={() => gotToUpdateWay(element)}> */}
                        <div className="col-1 d-flex align-items-center ways">
                            {/* <div className="mr_16">
                                <div className="deleteIconLoyality" onClick={(e)=>e.stopPropagation()}>
                                    <SvgIcons.DeleteIcon height="12" width="9.3" color={ColorSchemeCode.Paragraph}/>
                                </div>
                            </div> */}
                            {
                                processingElement===idx?
                                <div className='mt_20 ml_20'><Spinner/></div>
                                :
                                <CustomSwitch checked={element.active}
                                
                                onClick={(e)=>e.stopPropagation()}
                                onChange={(e) => {
                                    element.active ?
                                    updateActiveStatus({e:false, _id:element._id, idx})
                                    :
                                    updateActiveStatus({e:true, _id:element._id, idx})
                                }}/>
                                }
                        </div>
                        <div className="col-10 pl_0">
                            <div className="d-flex align-items-center">
                                <div className="imageBox middle p_0">
                                    <img src={
                                        (element.activity === Campaign.Activities.EARNING.BIRTHDAY) ? '/images/loyalty/birthday.png' :
                                            (element.activity === Campaign.Activities.EARNING.SIGNUP) ? '/images/loyalty/signup.png' :
                                                (element.activity === Campaign.Activities.EARNING.SPENDING) ? '/images/loyalty/onspend.png'
                                    : '/images/loyalty/Pos.png'} 
                                    width={37} className={!element.active ? 'greyscale borderRadius-4' : ' borderRadius-4'} alt=""/>
                                    {/* <div className={"activeCircle " + (element.active ? 'bg-color-activeColor' : 'bg-color-cAFAEAE')}></div> */}
                                </div>
                                <div className="ml_16 align-self-center">
                                    {/* <div className="subtitle1 text-capitalize"> */}
                                    <div >
                                        <div className="Heading15M color-neutral100 text-capitalize">{(element.activity===Campaign.Activities.EARNING.CHECKIN?'POS Integration':utils.capitalize(element.activity))}</div>
                                        <div className='Link13R color-neutral70'>
                                            {
                                                (element.earningValue) ? <> 
                                                            {(element.activity === Campaign.Activities.EARNING.SPENDING || element.activity === Campaign.Activities.EARNING.CHECKIN) ? (element.earningType === 'fixed' ?  '1 Points for every $'+ element.earningValue + ' Spent' : element.earningValue + ' Points for every $1 Spent') : element.earningValue + ' Points'}
                                                        </>
                                                    :
                                                'Range Bucket Set'
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="paragraphsm fs-14 color-neutral60 InputColor">
                                        {element.subHead}
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="col-1 pl_0 d-flex flex-row-reverse">
                            {/* <ReactTooltip id="up" backgroundColor={ColorSchemeCode.Paragraph} className="opacity-8 p_8 borderRadius-6 Caption12R w-20" id="visit" getContent={()=>"Set on how much visits you want to perform the action."} effect='solid' place="left"/> */}
                            <ReactTooltip backgroundColor={ColorSchemeCode.Paragraph} className="opacity-8 p_8 borderRadius-6 Caption12R w-20" id={'tip'+idx} 
                                        getContent={()=>{
                                            if(element.activity === Campaign.Activities.EARNING.BIRTHDAY) return 'Give point to customer on their birthday.'
                                            else if(element.activity === Campaign.Activities.EARNING.SPENDING) return 'Customers who come to store for shopping.'
                                            else if(element.activity === Campaign.Activities.EARNING.SIGNUP) return 'Customers who signup for your business.'
                                            else if(element.activity === Campaign.Activities.EARNING.CHECKIN) return 'Customer who use self-checkin to do shopping.'
                                            else return ''
                                        }} 
                            place="left"/>
                            <div id={'tip'+idx} data-for={'tip'+idx} data-tip={'tip'+idx} ><SvgIcons.InfoIconEarnPoint/></div>
                        </div>
                        {/* <div className="col-5 d-flex actionButtons pr_0">
                            <div className="align-self-center">
                                {processingElement === idx ? 
                                    <CircularProgress size={20} color={'inherit'}/> 
                                    :
                                    <CustomSelect 
                                        options         = {getProgramActiveStatus()}
                                        backgroundColor = {ColorSchemeCode.selectBackgroundColor}
                                        height          = {'26px'}
                                        borderRadius    = {"24px"}
                                        border          = {'0px'}
                                        padding         = {'4px 8px'}
                                        color           = {ColorSchemeCode.paragraphInputColor}
                                        value           = {element.active}
                                        onChange        = {(e) => updateActiveStatus({e, _id:element._id, idx})}
                                    />
                                }
                            </div>
                            <div className="ml_20 mt_13">
                                <SvgIcons.ViewMoreIcon color={ColorSchemeCode.paragraphInputColor} />
                            </div>
                            <div onClick={() => gotToUpdateWay(element)} className="ml_20 mt_13">
                                <SvgIcons.EditIcon color={ColorSchemeCode.paragraphInputColor} />
                            </div>
                        </div>
                    */}
                </div>
                <div className='bar'></div>
            </div>
            )}
            {list.length < 1 && <Loader baseHeight={'60vh'}  width={120} height={120} />}
        </div> 
    )
}
