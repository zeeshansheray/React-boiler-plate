import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ColorSchemeCode } from '../enums/ColorScheme'
import Button from '@material-ui/core/Button';

const getHoverColor = (color) => {
  switch (color) {
    case ColorSchemeCode.c56CCF2:
      return ColorSchemeCode.c25BDEE

    case ColorSchemeCode.c716B67:
      return ColorSchemeCode.c55514E

    default:
      return color
  }
}


const getFocusColor = (color) => {
  switch (color) {
    case ColorSchemeCode.c56CCF2:
      return ColorSchemeCode.c10A2D0

    case ColorSchemeCode.c716B67:
      return ColorSchemeCode.c3B3836

    default:
      return color
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: props => props.color,
    borderRadius: '5px',
    border: props => props.border,
    boxShadow: 'none',
    height: props => props.height,
    color: props => props.textColor,
    textTransform: 'capitalize',
    padding: '15px 20px',
    '&:hover': {
      backgroundColor: props => props.hover,
      boxShadow: 'none',
      color: props => props.hovertextColor
    },
    '&:focus': {
      backgroundColor: props => props.focus,
      color: props => props.hovertextColor,
      boxShadow: 'none',
      outline: 'none'
    },
  },
}));

export default function IconButton(props) {
  const propsObj = {
    className: props.className,
    hover: getHoverColor(props.color),
    focus: getFocusColor(props.color),
    ...props
  }
  const classes = useStyles(propsObj);
  const customClass = propsObj.className

  delete propsObj.className

  return <Button {...propsObj} onClick={props.handleClick} variant="contained" color="primary" className={classes.root + ' ' + customClass} >
    <div>{props.icon}</div>
  </Button>
}
