import React, { useContext, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import { ColorSchemeCode } from '../enums/ColorScheme';
import { AgencyContext } from '../context/Agency.context';
import { utils } from '../utils';
import { SvgIcons } from '../icons';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color      : ColorSchemeCode.themeColor,
    fontSize   : '14px',                       //Link14M
    fontWeight : '500',                        //Link14M
    lineHeight : '16px',                       //Link14M
    fontFamily : 'Graphik',                    //Link14M
    textTransform: 'capitalize',
  },
  '& .MuiInputAdornment-root':{
    zIndex: 1
  },
  '& .MuiInputAdornment-positionStart':{
    zIndex: 1
  },
  '& .MuiOutlinedInput-input':{
    zIndex: 1
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: ColorSchemeCode.themeColor,
  },
  '& .MuiOutlinedInput-root': {
    // font
    caretColor : ColorSchemeCode.themeColor,
    fontSize   : '14px',                       //Body14R
    fontWeight : '400',                        //Body14R
    lineHeight : '16px',                       //Body14R
    fontFamily : 'Graphik',                    //Body14R
    color      : ColorSchemeCode.Heading,

    height: props=>props.height || '36px',
    '& fieldset': {
      borderColor     : ColorSchemeCode.OtherBorder,
      backgroundColor : ColorSchemeCode.bgTextBox
    },
    '&:hover fieldset': {
      borderColor: ColorSchemeCode.themeColor,
    },
    '&.Mui-focused fieldset': {
      border: '2px solid '+ColorSchemeCode.themeColor,
    },
  },
});


const useStylesElement = makeStyles((props) => ({
  root: {
    fontWeight     : 400,
    fontSize       : props => props.fontSize || '14px',
    padding        : props => props.padding,
    width          : props=>props.width || '100%',
    maxWidth       : props=>props.maxWidth,
    minWidth       : props=>props.minWidth,
    fontFamily     : "Inter",
  },
  'input': {
    '&::placeholder': {
      fontSize   : '14px',                    //Body14R
      fontWeight : '400',                     //Body14R
      lineHeight : '16px',                    //Body14R
      fontFamily : 'Graphik',                 //Body14R
      color      : ColorSchemeCode.Paragraph
      // color        : props => props.placeholderColor ? props.placeholderColor : ColorSchemeCode.textFieldPlaceHolderColor,
    }
  },
  // error: {
  //   border: '1px solid #f44336 !important',
  // },
  focused: {},
}));

const useStylesInputElement = makeStyles((props) => ({
  root: {
    // padding: "10px 16px",
    width: '100%',
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    paddingLeft: props => props.paddingLeft ? props.paddingLeft : "12px",
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': props => props.hideArrow ? '' : 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': props => props.hideArrow ? '' : 'none',
      margin: 0,
    },
  }
  
}));

const useStylesLabelElement = makeStyles(() => ({
  root: {
    // paddingLeft: '0px !important',
    fontSize   : '14px',                    //Body14R
    fontWeight : '400',                     //Body14R
    lineHeight : '16px',                    //Body14R
    fontFamily : 'Graphik',                 //Body14R
    color      : ColorSchemeCode.Paragraph
    
  }
}));

const useStyleHelperTextElement = makeStyles(() => ({
  root: {
    fontSize     : '1.1rem',
  },
  contained: {
    marginLeft   : '0px',
  }
}))

const useStyleInputLabelElement = makeStyles(() => ({
  root: {
    fontFamily    : "Inter",
    fontWeight    : 600,
    // paddingBottom : 4,
    fontSize      : 16,
    color         : props=> props.labelColor || ColorSchemeCode.neutral80,
  }
}))

const InputAdorment = (props) => {
  return (
    <InputAdornment className={props.link && " mr_0"} position={props.position}>
      {props.icon}
    </InputAdornment>
  )
}

export default function CustomTextField({label, ...props}) {

  const agency = useContext(AgencyContext)

  // let boxShadow = utils.hexTohsl(agency.agencyColor);

  // const classes      = useStylesElement({...props, agency : agency, boxShadow: "0px 0px 0px 4px hsl("+boxShadow.h+","+boxShadow.s+"%,"+boxShadow.l+"%,"+0.1+")"});
  const classes      = useStylesElement({...props, agency : agency});
  const inputClasses = useStylesInputElement(props);
  const labelClasses = useStylesLabelElement();
  const helperText   = useStyleHelperTextElement()
  const inputLabel   = useStyleInputLabelElement({...props})

  const InputProps = {
    classes,
    disableUnderline : true,
    startAdornment   : props.icon && props.position === 'both' ? <InputAdorment className="z-index-100" style={{zIndex: '1'}} link={props.link} position={'start'} icon={props.icon}/> : props.position === 'start' ? <InputAdorment style={{zIndex: '1'}} link={props.link} position={props.position} icon={props.icon} className="z-index-100"/>                : '',
    endAdornment     : props.icon && props.position === 'both' ? <InputAdorment style={{zIndex: '1'}} link={props.link} position={'start'} icon={props.icon} className="z-index-1"/> : props.position === 'end' ? <InputAdorment style={{zIndex: '1'}} link={props.link} position={props.position} icon={props.icon} className="copy z-index-1"/> : ''
  }

  const [state, setstate] = useState(false)

  return <>
  <CssTextField 
    {...props}
    autoComplete        = "off"
    label               = {label}
    variant             = "outlined"
    className           = {props.className}
    size                = "small"
    type                = {props.type}
    defaultValue        = {props.defaultValue}
    placeholder         = {props.placeholder ? props.placeholder : label}
    onClick             = {props.onClick}
    onChange            = {props.onChange}
    inputProps          = {{ className: inputClasses.root, ...props.inputProps }}
    InputLabelProps     = {{ className: labelClasses.root }}
    InputProps          = {InputProps}
    FormHelperTextProps = {{classes: helperText}}
    onBlur              = {(e) => {props.onBlur && props.onBlur(e); setstate(true);}}
    onFocus             = {() => setstate(false)}
    error               = {state && props.error}
    required            = {props.required}
    onWheel             = {(e) => e.target.blur()}
    helperText          = {state && props.helperText &&
                            <div className="d-flex">
                              <SvgIcons.HelperTextIcon/>
                              <div className="ml_8">
                                {props.helperText}
                              </div>
                            </div>}
    />
    {/* <InputLabel classes = {inputLabel} shrink htmlFor = "bootstrap-input">{label}</InputLabel> */}
    {/* <TextField
      {...props}
      variant             = "filled"
      autoComplete        = "off"
      type                = {props.type}
      defaultValue        = {props.defaultValue}
      placeholder         = {props.placeholder}
      onClick             = {props.onClick}
      onChange            = {props.onChange}
      inputProps          = {{ className: inputClasses.root, ...props.inputProps }}
      InputLabelProps     = {{ className: labelClasses.root }}
      InputProps          = {InputProps}
      FormHelperTextProps = {{classes: helperText}}
      onBlur              = {(e) => {props.onBlur && props.onBlur(e); setstate(true);}}
      onFocus             = {() => setstate(false)}
      error               = {state && props.error}
      helperText          = {state && props.helperText &&
                              <div className="d-flex">
                                <SvgIcons.HelperTextIcon/>
                                <div className="ml_8">
                                  {props.helperText}
                                </div>
                              </div>}
    /> */}
  </>;
}



