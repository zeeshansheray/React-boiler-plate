import React, { useContext, useEffect } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';

import ReactTooltip from 'react-tooltip';
import { BrandContext } from '../../context/Brand.context';
import ClickOutside from '../../utils/ClickOutside';
import BrandsDropDown from '../../components/BrandsDropDown';

import { utils } from '../../utils';
import { UserContext } from '../../context/User.context';
import { AgencyContext } from '../../context/Agency.context';
import { ColorSchemeCode } from '../../enums/ColorScheme';
import { PngIcons, SvgIcons } from '../../icons';
import { ColorScheme, User } from '../../enums';


export default function PartialSideBar({setItemsSub, items}) {

    const history = useHistory()
    const params  = useParams()
    const brand   = useContext(BrandContext)
    const user    = useContext(UserContext)
    const agency    = useContext(AgencyContext)

    const [showBrands,setShowBrands]= React.useState(false)
    const [showLogoutMenu, setShowLogoutMenu] = React.useState(false);
    const [selected, setSelected ] = React.useState('Dashboard');

    const handleClick = (element) => 
        {
            element.subMenu && setItemsSub(element.children);
            setSelected(element.name)
        }   

        const [state, setstate] = React.useState('')

    useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setstate("hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])

    useEffect(()=>{
        if(history.location.pathname.includes('/audience')) setSelected('Audience')
    },[history.location.pathname])

    return (
         <ClickOutside className="pSide" onClick={() => {setShowBrands(false); setShowLogoutMenu(false)}}>
            {/* Top Section */}
            <div>
            <div id="logo" data-for={'logo'} data-tip={'logo'} className="logo text-center text-uppercase cp border-bottom" onClick={()=>setShowBrands(!showBrands)}>
                {  
                // agency && agency.whiteLabel ?
                    <img src={brand.brandLogo} width='28px' height='28px' alt="" className={`${showBrands && 'activeLogo'} borderRadius-40`} /> //:
                    // !agency || !agency.whiteLabel ? <img src={PngIcons.walletlyLogoFull} width='40px' height='40px' alt="" className="borderRadius-40" />  :
                    // utils.getAvatar({firstName: brand.brandName})
                }
                <div>{showBrands ? <SvgIcons.ArrowUnExpand width="8px" height="8px"/> : <SvgIcons.ArrowUnExpand width="8px" height="8px"/> }</div>
            </div>
            
            <nav className="navPartial d-flex flex-column " >
                <ReactTooltip effect='solid' backgroundColor={ColorSchemeCode.neutral90} place="left" className='p_8 borderRadius-6' />
                {
                    items.map((element, idx)=>(
                        element.access &&
                        <div data-tip={element.name} className={element.border === true ? 'border-bottom' : '' } >
                        <Link className={element.className+" "} to={'/'+params._id+element.link} onClick={() => handleClick(element)}>
                            <div className={`middle cp mt_6 mb_6 active ${history.location.pathname.includes(element.unique)}`}  >
                                <element.logo color={ (element.unique === 'communication' && history.location.pathname.includes('automation')) ? ColorSchemeCode.primary50 : (element.unique === 'loyalty' && history.location.pathname.includes('deal')) ? ColorSchemeCode.primary50 : history.location.pathname.includes(element.unique) ?  ColorSchemeCode.primary50 : '' } />
                            </div>
                        </Link>
                        </div>
                    ))
                }
            </nav>
            </div>
            {/* Bottom */}
            <div className="userProfileIcon text-center cp  text-uppercase" onClick={()=>setShowLogoutMenu(!showLogoutMenu)}>
                {user.avatar&&user.avatar[0]!=='#' ?
                    <img src={user.avatar} width={28} height={28} className="borderRadius-40" alt="avatar"></img> :
                    utils.getAvatar({firstName: user.firstName, lastName: user.lastName, bgColor:"#2F80ED", className: 'm_auto fs-14', width: '28px', heigth: '28px'})
                }
            </div>

            {showLogoutMenu &&
                <div className="card borderRadius-4 logoutMenu" >
                    <div className="Body14R singleItemLogoutMenu capitalize pb_0">
                        {`${user?.firstName} ${user?.lastName} (${user?.roles[0] == User.Roles.MASTER_ADMIN ? 'Master Admin' : user.roles[0]})`}
                    </div>
                    <div className="Body14R pl_24 pr_8 color-caption pb_10">
                        {`${user.email}`}
                    </div>
                    {/* <div className="Body14R singleItemLogoutMenu borders">
                        <Link to={'/'+params._id+'/profile'} onClick={()=>{setShowLogoutMenu(!showLogoutMenu)}} className="Body14R text-dec-none hover-none cp">
                            <span className='mr_8'>
                            <SvgIcons.profileIcon/> 
                            </span>
                            Profile Settings
                        </Link>
                    </div> */}
                    <div className="Body14R singleItemLogoutMenu cp color-ButtonWarningBG" onClick={()=> utils.Logout()}>
                        Logout
                    </div>
                </div>
            }
            {showBrands && <BrandsDropDown showBrands={()=>setShowBrands(false)}/>}
                    
        </ClickOutside>
              
    )
}
