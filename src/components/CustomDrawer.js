import * as React from 'react';
import { Box, Button, Drawer, List } from '@material-ui/core';

export default function CustomDrawer({component, anchor, open, setShowDrawer}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
    setShowDrawer(false)
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '500px' }}
      role="presentation"
    >
        {component}
    </Box>
  );

  React.useEffect(()=>{
    setState({ ...state, [anchor]: open });
  },[open])

  return (
    <div>
        <React.Fragment key={anchor}>
          <Drawer
            anchor  = {anchor}
            open    = {state[anchor]}
            onClose = {toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
    </div>
  );
}