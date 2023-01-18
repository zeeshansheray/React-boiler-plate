import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Checkbox, TextField } from '@material-ui/core';
import { SvgIcons } from '../icons';
import { ColorSchemeCode } from '../enums/ColorScheme';
import Paper from "@material-ui/core/Paper";

export default function CheckboxesTags({data, onChange, defaultValues}) {

    const [value, setValue] = React.useState([]);

    const handleChange = (e,value) =>{
       setValue(value)
    }

    console.log('default ', defaultValues)



     return (
      <div id="customAutoCompleteCheckBox">
        <Autocomplete
            multiple
            id      = "customAutoCompleteCheckBox"
            options = {data}        
            disableCloseOnSelect
            getOptionLabel = {(option) => option.name}
            value          = {defaultValues}
            onChange       = {onChange}
            PaperComponent = {({ children }) => (
                <Paper style={{ fontSize:'14px' }}>{children}</Paper>
            )}
            renderOption   = {(props, option, selected ) => (
                <li className="Body14R color-neutral100" {...props}>
                {/* <Checkbox
                    icon        = {<SvgIcons.CheckBoxUnCheckIcon/>}
                    checkedIcon = {<SvgIcons.CheckBoxCheckIcon/>}
                    style       = {{ marginRight: 16 }}
                    checked     = {selected}
                /> */}
                {props.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    variant     = "outlined"
                    placeholder = "Select Tier"
                    className   = "w-100 textField"
                    style       = {{border:'none'}}
                />
            )}
        />
    </div>
  );
}
