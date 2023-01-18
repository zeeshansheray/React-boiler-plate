import React, { useContext } from 'react'

import CustomSelect from './CustomSelect';
import CustomTextField from './CustomTextField';
import ClickOutside from '../utils/ClickOutside';

import { SvgIcons } from '../icons'
import { ColorSchemeCode } from '../enums/ColorScheme';
import {ChromePicker} from 'react-color';
import { AgencyContext } from '../context/Agency.context';

export default function CustomTextEditor() {
    const EditorComponents = {
        symbols : [
            {
                name    : 'alignleft',
                icon    : SvgIcons.AliginLeftEditorIcon,
                selected: false             
            },
            {
                name    : 'aligncenter',
                icon    : SvgIcons.AliginCenterEditorIcon,
                selected: false
            },
            {
                name    : 'alignright',
                icon    : SvgIcons.AliginRightEditorIcon,
                selected: false
            },
            {
                name    : 'bold',
                icon    : SvgIcons.BoldEditorIcon,
                selected: false
            },
            {
                name    : 'italic',
                icon    : SvgIcons.ItalicEditorIcon,
                selected: false
            },
            {
                name    : 'underline',
                icon    : SvgIcons.UnderlineEditorIcon,
                selected: false
            },
            {
                name    : 'link',
                icon    : SvgIcons.LinkEditorIcon,
                selected: false
            },
            {
                name    : 'strike',
                icon    : SvgIcons.StrikeEditorIcon,
                selected: false
             },
        ],
        inputValues:{
            textColor: '#000000',
            size     : '12',
            line     : '2',
            spacing  : '1',
        }
    }

    const agency = useContext(AgencyContext)
        
    const [state, setState] = React.useState(EditorComponents);

    const [showColorPallette, setShowColorPallette] = React.useState(false);

    const selectSymbolFunc = (index) => {
        state.symbols[index].selected = !(state.symbols[index].selected)
        setState({...state})
    }

    const handleInputChangeFunc = (key, value) => {
      state.inputValues[key] = value;
      setState({...state});
    }   

    const handleShowFunc = () => {
        setShowColorPallette(!showColorPallette);
    }

    return (
        <div id="CustomTextEditor" className="container">
            <div className="card">
                <div className="row editorTop">
                    {state.symbols.map((element,index)=>
                        <div className="d-flex">
                            <div className={`symbol ${element.selected && 'selected'}`} onClick={()=>selectSymbolFunc(index)}>
                                {element.selected ?
                                    <element.icon color={agency.agencyColor} /> :
                                    <element.icon color={ColorSchemeCode.neutral80}/> 
                                }
                            </div>
                            {(index === 2 || index=== 6) && 
                                <div className="divider ml_8"></div>}
                        </div>
                    )}      
                </div>
                <div className="bar mt_5"></div>
                <div className="editorMiddle mt_8 d-flex">
                    <div className="w-45">
                        <CustomSelect
                            className = "w-100"
                            label     = "Font"
                        />
                    </div>
                    <div className="size w-25">
                        <CustomTextField 
                            type       = "number"
                            label      = "Size"
                            value      = {state.inputValues.size}
                            inputProps = {{ maxLength: 2 }}
                            hideArrow  = {'show'}
                            onChange   = {(e)=>handleInputChangeFunc('size', e.target.value)}
                        />
                    </div>
                    <div className="line w-25">
                        <CustomTextField 
                            type       = "number"
                            label      = "Line"
                            value      = {state.inputValues.line}
                            inputProps = {{ maxLength: 2 }}
                            hideArrow  = {'show'}
                            onChange   = {(e)=>handleInputChangeFunc('line', e.target.value)}
                        />
                    </div>
                </div>
                <div className="bar mt_8 mb_8"></div>
                <div className="editorBottom space-between">
                    <div className="Spacing w-25">
                        <CustomTextField 
                            type       = "number"
                            label      = "Spacing"
                            value      = {state.inputValues.spacing}
                            hideArrow  = {'show'}
                            inputProps = {{ minLength: 2 }}
                            onChange   = {(e)=>handleInputChangeFunc('spacing', e.target.value)}
                        />
                    </div>
                    <div className="textColor w-40 position-relative">
                        <ClickOutside onClick={()=> setShowColorPallette(false)}>
                        <CustomTextField 
                            type       = "text"
                            label      = "Text Color"
                            className  = "position-relative"
                            onClick    = {()=> handleShowFunc()}
                            value      = {state.inputValues.textColor}
                            inputProps = {{ maxLength: 7 }}
                            onChange   = {(e)=>handleInputChangeFunc('textColor', e.target.value)}
                        />
                        {showColorPallette &&
                            <ChromePicker 
                                className = "pallette position-absolute z-index-1"
                                color     = {state.inputValues.textColor}
                                onChange  = {(e)=> handleInputChangeFunc('textColor',e.hex)}
                            />
                        }  
                        <div className="colorBoxShow position-absolute" style={{backgroundColor : state.inputValues.textColor}}>
                        </div> 
                        </ClickOutside>
                        </div>
                        <div className="w-30">
                            <CustomSelect 
                                className = "w-80"
                                label     = "Merge Tags"
                            />
                        </div>
                    </div>
                </div>
                <div className="textArea mt_16 Body14R color-textfieldColor" contentEditable={true}></div>
                
        </div>
    )
}
