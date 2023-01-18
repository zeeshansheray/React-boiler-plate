import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import SvgIcons from '../icons/svg.icon';
import { ColorSchemeCode } from "../enums/ColorScheme";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    boxShadow: 'none',
    padding: '0px',
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

export default function CustomAccordion({expanded, details, title, handleChange, type, Sidefields, className}) {

  const classes = useStyles();

  //styleing for sidebar formik value in 
  const sidebarConnectBtnStyle = {
    padding         : '0px 16px',
    backgroundColor : ColorSchemeCode.accordiansidebarValue,
    color           : ColorSchemeCode.c47B005,
    borderRadius    : '4px'
  }

  return (
    <div className={classes.root+" "+className}>
      {type === 'rule' ? 
        <Accordion className="bg-color-bgTextBox accordionBorder" elevation={0} expanded={expanded} onChange={()=>handleChange('panel1')} > 
          <AccordionSummary
            aria-controls = "panel1bh-content"
            id            = "panel1bh-header"
            className     = "pl_0"
            style         = {{maxHeight: '50px !important'}}
          >
            <div className="col-12 pr_0">
              <div className='d-flex space-between'>
                <div className="col-10 d-flex">
                  <div className='mt_2 accordinIcon'>{(!expanded)?<SvgIcons.ArrowExpand/>: <SvgIcons.ArrowUnExpand/>}</div>
                  <input type="text" className="Body14R color-textfieldColor border-none bg-color-bgTextBox ml_10 w-50" onFocus="none" placeholder="Enter your rule name here" name="ruleName"/>
                </div>
                <div className="col-2 text-right">
                      <span>
                        <SvgIcons.CopyIcon/>
                      </span>
                      <span className="ml_14">
                        <SvgIcons.DeleteIcon color={ColorSchemeCode.neutral80}/>
                      </span>
                </div>
              </div>
              {expanded && <div className="bar col-12 mt_16"></div>}
            </div>
          </AccordionSummary>
          <AccordionDetails>
              {details}
          </AccordionDetails>
        </Accordion>

        :

        type === 'point' ?
        <Accordion className="bg-color-bgTextBox" elevation={0} expanded={expanded} onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="pl_0"
            style={{maxHeight: '50px !important'}}
          >
            <div className='d-flex col-12'>
              <div className='Heading4 expand color-c000000 white-space-pre' >{title}</div>
              <div className='ml_16 mt_2 accordinIcon'>{(!expanded)?<SvgIcons.ArrowExpand/>: <SvgIcons.ArrowUnExpand/>}</div>
              <div className="d-flex ml_60 grid-gap-16 flex-wrap-wrap">
                {!expanded &&
                  Sidefields.map((element,idx)=>
                  <div className="d-flex">
                    { element.icon && 
                      <div>
                        <img src={element.icon} alt="" height="16px" width="16px"/> 
                      </div>
                    }
                    <div className={"Body14R opacity-10 cp " + (element.style ? 'color-c47B005' : 'color-tableActionDropdownColor')} style={(element.style === 'sidebarConnectBtnStyle') ? sidebarConnectBtnStyle : {}}>{element.value}</div>
                  </div>
                  ) 
                }
              </div>
            </div>
         
          </AccordionSummary>
          <AccordionDetails className="pl_0">
              {details}
          </AccordionDetails>
        </Accordion>

        : 

        <Accordion elevation={0} expanded={expanded} onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className="pl_0"
            style={{maxHeight: '50px !important'}}
          >
            <div className='d-flex col-12'>
              <div className='Heading4 expand color-c000000 white-space-pre' >{title}</div>
              <div className='ml_16 mt_2 accordinIcon'>{(!expanded)?<SvgIcons.ArrowExpand/>: <SvgIcons.ArrowUnExpand/>}</div>
              <div className="d-flex ml_60 grid-gap-16 flex-wrap-wrap">
                {!expanded &&
                  Sidefields.map((element,idx)=>
                  <div className="d-flex">
                    { element.icon && 
                      <div>
                        <img src={element.icon} alt="" height="16px" width="16px"/> 
                      </div>
                    }
                    <div className={"Body14R opacity-10 cp " + (element.style ? 'color-c47B005' : 'color-tableActionDropdownColor')} style={(element.style === 'sidebarConnectBtnStyle') ? sidebarConnectBtnStyle : {}}>{element.value}</div>
                  </div>
                  ) 
                }
              </div>
            </div>
         
          </AccordionSummary>
          <AccordionDetails className="pl_0">
              {details}
          </AccordionDetails>
        </Accordion>
      } 
      
    </div>
  );
}