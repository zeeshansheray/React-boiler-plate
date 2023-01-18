import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import SvgIcons from '../icons/svg.icon';
import PngIcons from '../icons/png.icon'

import { ColorSchemeCode } from "../enums/ColorScheme";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    padding: '0px !important',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
}));

export default function CustomAccordion({details, title, sideValues, className, disabled, subTitle}) {
  const classes = useStyles();

  const sidebarConnectBtnStyle = {
    padding         : '0px 16px',
    backgroundColor : ColorSchemeCode.accordiansidebarValue,
    color           : ColorSchemeCode.c47B005,
    borderRadius    : '4px'
  }

  const [expanded, setExpanded] = useState(false)

  return (
    <div className={classes.root + ' ' + disabled + className}>
      <Accordion 
        elevation = {0}
        onChange  = {(e, expanded)=>setExpanded(expanded)}
      >
        <AccordionSummary
          aria-controls = "panel1bh-content"
          id            = "panel1bh-header"
          className     = "p_0"
          style         = {{maxHeight: '50px !important', padding: '0px !important'}}
        >
          <div className={'d-flex flex-row'}>
            <div className=' expand d-flex' >
              <div className="Heading4 color-c000000">
                {title}
              </div>
              <div className="ml_8 color-neutral60 Link14M mt_4">
                  {subTitle}
              </div>
            </div>
            <div className={`ml_16 mt_2 ${expanded && 'rotate-top'}`}>{expanded ? <SvgIcons.ArrowUnExpand/> : <SvgIcons.ArrowUnExpand/> }</div>
            <div className="d-flex ml_60">
              {!expanded && sideValues && sideValues.map((element,idx)=>
                element &&
                <div key={idx} className="d-flex">
                  {element.icon && <div><img src={element.icon} alt="" height="16px" width="16px"/></div>}
                  <div 
                    className={`Body14R ml_4 mt_2 mr_50 opacity-10 cp text-capitalize ${element.style ? 'color-c47B005' : 'color-tableActionDropdownColor'}`} 
                    style={(element.style === 'sidebarConnectBtnStyle') ? sidebarConnectBtnStyle : {}}
                  >
                    {element.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        
        </AccordionSummary>
        <AccordionDetails className="p_0">
          {details}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}