
import React from 'react'
import SvgIcons from '../icons/svg.icon'
import {useHistory} from 'react-router-dom';

export default function SideStepper(props) {

    const history = useHistory();

    const handleSaveBtn = () => {
        history.push('/main/growth');
    }


    return (
        <div id="sideStepper">
            <div className="contentFrame">
                <div className="savebtn savetext" onClick={handleSaveBtn}>
                    save & exit
                </div>
                <br/>
                
                
                <div className="headline4">
                    Create your <br/> Widget
                </div>

                <div className="row mt_0">
                    <div className="col-3">
                        <div className="circle">
                            {props.icon}
                        </div>
                    </div>
                    <div className="col-8">
                        {props.title}
                    </div>
                </div>

                <nav className="mt_24">
                    <div className={(props.pageNo === 1) ? 'items active' : 'items'}><span className="navtext"> Basic Information </span> <span className="icons"> <SvgIcons.RightIcon/> </span></div>
                    <div className={(props.pageNo === 2) ? 'items mt_32 active' : 'items mt_32'}><span className="navtext"> Response Mapping <span className="icons"> <SvgIcons.LockIcon/> </span></span> </div>
                </nav>
            </div>
        </div>
    )
}
