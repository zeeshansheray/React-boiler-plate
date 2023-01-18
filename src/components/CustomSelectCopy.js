import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import { FormControl, FormHelperText, MenuItem, Select, styled } from '@material-ui/core';

import { ColorSchemeCode } from '../enums/ColorScheme';
import { SvgIcons } from '../icons';
import { AgencyContext } from '../context/Agency.context';

const BootstrapInput = withStyles((theme) => ({
  root : {
    fontSize: 14,
    lineHeight : "1.28em"
  },

  input: {
    borderRadius   : props => props.borderRadius || 4,
    color          : ColorSchemeCode.neutral100,
    backgroundColor: '#FAFBFF',
    border         : '1px solid ' + ColorSchemeCode.neutral20 +  '!important',
    fontSize       : props => props.fontSize || 14,
    padding        : '10px 16px',
    transition     : 'all 0.1s ease-in',
    width          : props => props.width || '100%',
    justifyContent : 'center',
    textTransform  : 'capitalize',
    transition     : theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover'      : {
      backgroundColor: props => props.backgroundColor ||  ColorSchemeCode.bgTextBox,
      border         : '1px solid ' + ColorSchemeCode.themeColor,
    },
    '&:focus': {
      backgroundColor: props => props.backgroundColor ||  ColorSchemeCode.bgTextBox,
      borderRadius   : props => props.borderRadius || 4,
      border         : '2px solid ' + ColorSchemeCode.themeColor,
      color          : ColorSchemeCode.textFieldTextActiveColor,
    },
  }, 
}))(InputBase);

const useStyleInputLabelElement = makeStyles(() => ({
    root: {
      fontFamily    : 'Graphik',
      fontWeight    : 600,
      paddingBottom : 4,
      fontSize      : 16,
      color         : ColorSchemeCode.neutral80,
      whiteSpace    : 'nowrap',
      textTransform: 'capitalize'
  
    }
}))

const useStyleHelperTextElement = makeStyles(() => ({
    root: {
      fontSize     : '1.1rem',
      textTransform: 'capitalize'
    },
    contained: {
      marginLeft: '0px',
    },
}))

const useStylesInputElement = makeStyles((props) => ({
  root: {
    backgroundColor: ColorSchemeCode.bgTextBox,
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
    fontSize   : '14px',                    //Body14R
    fontWeight : '400',                     //Body14R
    lineHeight : '16px',                    //Body14R
    fontFamily : 'Graphik',                 //Body14R
    color      : ColorSchemeCode.Paragraph
    
  }
}));

export default function CustomSelect({options, helperText, defaultValue, error, id, label, value, className,placeholder, onChange, ...props}) {
    const inputLabel        = useStyleInputLabelElement({...props})
    const helperTextClasses = useStyleHelperTextElement()

    const agency = useContext(AgencyContext)
  
    const MyNativeSelect = withStyles({
      icon: {
        color: props => props.color || 'black',
        fontSize: '25px'
      }
    })(Select);

    const inputClasses = useStylesInputElement(props);
    const labelClasses = useStylesLabelElement();

  return (
    <div id="CustomSelect">
    <FormControl className="w-100 position-relative" error>
      <MyNativeSelect
        inputProps      = {{ className: inputClasses.root, ...props.inputProps }}
        InputLabelProps = {{ className: labelClasses.root }}
        input           = {<BootstrapInput agency={agency} props={props}/>}
        label           = {label}
        variant         = "outlined"
        id              = {id && id}
        className       = {"w-inherit capitalize "+ className}
        defaultValue    = {value || defaultValue}
        onChange        = {onChange}
      >
        {
          options.props.children.length >= 1 ? 
            options.props.children.map((value, index)=>(
              <MenuItem value={value.props.value}>{value.props.children}</MenuItem>
            ))
            :
            <MenuItem value={options.props.value}>{options.props.children}</MenuItem>
        }
      </MyNativeSelect>
      {error && 
        <FormHelperText classes={helperTextClasses}>
          {helperText && <div className="d-flex"><SvgIcons.HelperTextIcon/><div className="ml_8">{helperText}</div></div>}
        </FormHelperText>}
    </FormControl>
    </div>
  );
}
