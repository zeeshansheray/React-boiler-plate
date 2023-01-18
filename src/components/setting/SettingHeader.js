import React, { useContext, useRef, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import SvgIcons from '../../icons/svg.icon';
import { LayoutContext } from '../../context/Layout.context';

import CustomTextField from '../CustomTextField';
import CustomModal from '../CustomModal';
import CustomButton from '../CustomButton';



export default function SettingHeader(props) {
    const history = useHistory();
    const layout = useContext(LayoutContext)

    const [show, setShow]  = useState({
        modal : false,
    });

    const goBackFunc = (e,index) => {
        e.preventDefault();
        let location = history.location.pathname;
        location =location.split('/');
        console.log('location ', location, index);
        if(location[location.length-1]==='deal'){
            location.pop();
            location = location.join('/');
            history.push(location+'/loyalty');
        }
        else if(location[location.length-1]==='add'&& (location[location.length-2]==='tier'||location[location.length-2]==='subbrands')&&index===1){
            location.pop();
            location = location.join('/');
            history.push(location);
        }
        else if((location[location.length-1]==='add'&&location[location.length-2]==='deal')||location[location.length-1]==='addflow'&&location[location.length-2]==='deal'){
            if(index===1){
                location.pop();
                location = location.join('/');
                history.push(location);
            }
            else{
                location.pop();
                location.pop();
                location = location.join('/');
                history.push(location+'/loyalty');
            }
        }
        else{
            index = index + 3
            location = location.splice(0,index);
            location = location.join('/');
            console.log('new location ', location , index);
            history.push(location);
        }
        // location = location.splice
        // location = location[0];
        // console.log('layout ', layout.elements.backUrl);

        // if(location[location.length-1]==='tier'){
        //     location.pop();
        //     location.pop();
        //     location=location.join('/');
        //     history.push(location);
        // }
        // else if(location[location.length-1]==='deal'){
        //     location.pop();
        //     location=location.join('/');
        //     console.log('window.location.pathname ', location);
        //     history.push(location+'/loyalty');
        // }
        // else{
        //     location.pop();
        //     location=location.join('/');
        //     console.log('window.location.pathname ', location);
        //     history.push(location);
        // }
        // history.goBack();
    }   

    return (
        <div id="settingHeader" className={`expandSideBar ${(layout.elements.scrollShadow || layout.elements.borderBottom) && 'box-shadow-header'}` }>
            <div className='d-flex h-100'>
                <div className={`d-flex w-100 align-items-center space-between pl_40 pr_40`}>
                    <div>
                        {layout.elements.borderBottom ? <div className='d-flex align-items-center cp' 
                        >
                            {
                                layout.elements.backTitles.map((element, idx)=>
                                    <div className='d-flex backTitlesRow align-items-center' key={idx}>
                                        <div className="Body14R color-neutral60 mr_8 backTitle" onClick={(e)=>goBackFunc(e,idx)}>
                                            {element}
                                        </div>
                                        <div className="mr_8 ">
                                            <SvgIcons.backSlash/>
                                        </div>
                                    </div>
                                )
                            }
                        {!layout.elements.edit && <div 
                            className       = {`color-neutral100 ${layout.elements.borderBottom ? 'Heading20M' : 'Heading20M'} capitalize`}>
                                {layout.elements.title}
                        </div>
                        }
                            {layout.elements.edit && <div>
                                <div 
                                className = {`fs-18 fitContentInputField` }
                                id        = "inputField"
                                onClick   = {()=>setShow({...show, modal : true})}
                            >
                                {layout.elements.editTitle || layout.elements.placeholder + ' Name'} 
                            </div>
                            <div className='mt_1 titleBar' ></div>
                            <CustomModal
                                component = {<EditComponent setShow={setShow} show={show}/>}
                                open      = {show.modal}
                                minWidth  = {'450px'}
                                padding   = "16px"
                            />
                        </div>
                        }
                        </div>
                        : <div 
                            className       = {`color-neutral100 ${layout.elements.borderBottom ? 'Heading20M' : 'Heading24M'} capitalize`}>
                                {layout.elements.title}
                        </div>
                        }
                    </div>
                    <div className=''>
                        {layout.elements.button && 
                            layout.elements.button
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const EditComponent = ({setShow , show}) => {
    const layout = useContext(LayoutContext)

    const handleConfirm = () => {
        if(layout.elements.editTitle.length > 1)  setShow({...show, modal : false})
    }

    return(
        <div className="">
            <div className='Heading18M color-neutral100 mb_24 capitalize'>
                {layout.elements.placeholder} title
            </div>
            <CustomTextField
                onChange    = {(e)=>layout.setLayout({editTitle : e.target.value})}
                value       = {layout.elements.editTitle}
                placeholder = {`Enter ${layout.elements.placeholder} Name`}
                label       = {layout.elements.placeholder + ' Name'}
            />
            <div className="d-flex justify-flex-end mt_16">
                <CustomButton
                    btntext = {'Confirm'}
                    onClick = {handleConfirm}
                    disabled= {layout.elements.editTitle.length < 1 && true}
                />
            </div>
        </div>
    )
}
