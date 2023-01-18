import React from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { ColorScheme } from '../enums';

const BootstrapInput = withStyles((theme) =>({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
      fontSize: 16,
    },
    input: {
      borderRadius: props => props.style.borderRadius,
      position: 'relative',
      height: props => props.height,
      width: props => props.width,
      backgroundColor: props => props.style.backgroundColor,
      border: props => props.style.border,
      fontSize: props => props.style.fontSize,
      padding: props => props.style.padding,  
      // '16px 26px 16px 24px'
      color: props => props.style.color,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 32,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  


export default function DropdownSelect(props) {

    const classes = useStyles(props);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };  

    return (
        <div>
            <FormControl className={classes.margin}>
                <NativeSelect
                id="demo-customized-select-native"
                className={classes.root + ' ' + props.className} 
                value={age}
                onChange={handleChange}
                input={<BootstrapInput style={props} />}
                > 
                    {
                      props.fields ?
                      props.fields.map((value)=>
                        <option value={value} className="dropdownFieldItem">{value.field}</option>
                    )
                    :
                    <>
                      <option value='One' className="dropdownFieldItem">One</option>
                      <option value='One' className="dropdownFieldItem">Two</option>
                      <option value='One' className="dropdownFieldItem">Three</option>
                    </>
                    }
                </NativeSelect>
            </FormControl>


            
        </div>
    )
}
