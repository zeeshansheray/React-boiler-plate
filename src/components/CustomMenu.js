import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function CustomMenu({open,handleClose, items, menuEvent}) {
    const [event, setEvent] = React.useState()
    React.useEffect(()=>{
        if(menuEvent) {
            setEvent(menuEvent)
        }
    },[menuEvent])
        
    return (
      <div>
        <Menu
          anchorEl={event || menuEvent}
          open={open}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
            {
                items.map((value, index)=>(
                    <MenuItem onClick={value.onClick}>{value.name}</MenuItem>

                ))
            }
        </Menu>
      </div>
    );
  }
  