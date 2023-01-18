import React, { useState } from "react";
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

export default function FullWidthCustomAccordion({details, idx, removeAccordian, copyAccordian, formik}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={classes.root}>
      <Accordion 
        className = "bg-color-bgTextBox accordionBorder"
        elevation = {0}
        onChange  = {(e, expanded)=>setExpanded(expanded)}
      >
        <AccordionSummary
          aria-controls = "panel1bh-content"
          id            = "panel1bh-header"
          className     = "pl_0"
          style         = {{maxHeight: '50px !important'}}
        >
          <div className="col-12 pr_0">
            <div className='d-flex space-between'>
              <div className="col-10 d-flex">
                <div className='mt_2 accordinIcon'>{expanded?<SvgIcons.ArrowUnExpand/>:<SvgIcons.ArrowExpand/>}</div>
                <div className="w-100">
                  <input 
                    type        = "text"
                    className   = "Body14R color-textfieldColor border-none bg-color-bgTextBox ml_10 w-50"
                    placeholder = "Enter your rule name here"
                    name        = {`businessRules[${idx}].ruleName`}
                    onFocus     = {formik.handleBlur}
                    onChange    = {formik.handleChange}
                    value       = {formik.values.businessRules[idx].ruleName}
                    onClick     = {(e) => e.stopPropagation()}
                  />
                  <div className="error">{formik.touched.businessRules && formik.errors.businessRules && formik.errors.businessRules[idx].ruleName && formik.errors.businessRules[idx].ruleName}</div>
                </div>
              </div>
              <div className="col-2 text-right">
                    <span onClick={(e) => copyAccordian(e, idx)}>
                      <SvgIcons.CopyIcon/>
                    </span>
                    <span className="ml_14" onClick={(e)=> removeAccordian(e, idx)}>
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
    </div>
  );
}