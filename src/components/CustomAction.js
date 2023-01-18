import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { ColorSchemeCode } from '../enums/ColorScheme';
import { SvgIcons } from '../icons';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid '+ColorSchemeCode.dividerColor,
    boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const useStyles = makeStyles((theme) => ({
    button: {
        '&:focus': {
            outline: 'none'
        }
    }
  }));

export default function CustomAction({options, rotate}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={classes.button}
      >
        <div className={rotate ? 'rotate-180' : ''}><SvgIcons.ViewMoreIcon color="black" /></div>
      </div>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={"p_0"}
      >
          {
              options.map((value,index)=>(
                <MenuItem onClick={value.function}>
                    <div>
                      {value.icon}
                    </div>
                    <div className="ml_16">{value.name} </div>
                </MenuItem>
              ))
          }
      </StyledMenu>
    </div>
  );
}
