import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {ColorSchemeCode} from '../enums/ColorScheme'
import { AgencyContext } from '../context/Agency.context';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft  : theme.spacing(1),
    marginRight : theme.spacing(1),
    width       : props => props.width || '100%',
    border      : props => props.border || '1px solid' + ColorSchemeCode.tableActionDropdownColor,
    borderRadius: props => props.borderRadius || 8,
    padding     : props => props.padding || '10px 26px 10px 12px',
    height      : props => props.height || 46,
    margin      : props => props.margin || 0,
    fontSize    : props => props.fontSize || 14,
     color       : props => props.color || ColorSchemeCode.c828282,
    '&:hover'   : {
      backgroundColor: ColorSchemeCode.white,
      border: props => '1px solid ' + props.agency.agencyColor + '!important',
    },
    '&$focused': {
      backgroundColor: ColorSchemeCode.white,
      border: props => '1px solid ' + props.agency.agencyColor + '!important',
      borderColor: props => props.agency.agencyColor + '!important',
      color: ColorSchemeCode.textfieldColor
    },
  },
}));

export default function CustomDatePicker(props) {
  const agency = useContext(AgencyContext)

  const classes = useStyles({...props, agency : agency});
  
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={props.label}
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{style: {fontSize: props.fontSize || 11}, paddingLeft: 0, disableUnderline : true,}}
      />
    </form>
  );
}
