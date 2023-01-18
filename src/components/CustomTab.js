import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ColorSchemeCode } from '../enums/ColorScheme';
import { useEffect } from 'react';


const AntTabs = withStyles({
  root: {
    minHeight: 0,
  },
  indicator: {
    backgroundColor : ColorSchemeCode.brandingPrimaryColor,
  },
  flexContainer: {
    display: 'block'
  }
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'capitalize',
    fontWeight   : 500,
    minWidth     : 'fit-content',
    fontFamily  : 'Inter',
    padding      : 0,
    minHeight    : 0,
    marginLeft   : props=> props.flowbuilder ? '24px': '24px',
    lineHeight   : 'normal',
    paddingBottom: '8px',
    opacity      : 1,
    color        : ColorSchemeCode.captionColor,
    fontSize     : '14px',
    '&:hover'    : {
      color: ColorSchemeCode.brandingPrimaryColor,
      opacity: 1,
    },
    '&$selected': {
      color: ColorSchemeCode.themeColor,
    },
    '&:focus': {
      color: ColorSchemeCode.c1274E0,
      outline: 'none'
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function getProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
}));

export default function CustomTab({labels, components, selectedTab, changeTab, className, ...props}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(selectedTab || 0)

  useEffect(() => setValue(selectedTab || 0), [selectedTab])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    changeTab && changeTab(newValue)
  }

  return (
    <div className={classes.root+" "+className}>
      <AntTabs
        variant    = "fullWidth"
        value      = {value}
        onChange   = {handleChange}
        aria-label = "nav tabs example"
        className  = ""
      >
        {labels.map((label, index) => (
          <AntTab className={props=> props.flowbuilder ? "" : "pt_8 pr_24 pb_8 pl_24"} key={index} label={label} {...props} {...getProps(index)}/>
        ))} 
      <div className="customTabBar" ></div>
      </AntTabs>
      {components.map((component, index) => (
        <TabPanel value={value} key={index} index={index}>{component}</TabPanel>
      ))} 
    </div>
  );
}