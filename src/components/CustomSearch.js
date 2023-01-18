import React, { useContext, useState } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import { ColorSchemeCode } from "../enums/ColorScheme";
import { AgencyContext } from "../context/Agency.context";
import { utils } from "../utils";
import { SvgIcons } from "../icons";
import zIndex from "@material-ui/core/styles/zIndex";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: ColorSchemeCode.themeColor,
    fontSize: "16px", //Body16R
    fontWeight: "400", //Body16R
    lineHeight: "24px", //Body16R
    fontFamily: "Graphik", //Body16R
    textTransform: "capitalize",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: ColorSchemeCode.themeColor,
  },
  "& .MuiInputAdornment-positionStart": {
    zIndex: 1,
  },
  "& .MuiOutlinedInput-input": {
    zIndex: 1,
  },
  "& .MuiOutlinedInput-root": {
    // font
    caretColor: ColorSchemeCode.themeColor,
    fontSize: (props) => props.fontSize || "16px", //Body16R
    fontWeight: "400", //Body16R
    lineHeight: (props) => props.lineHeight || "24px", //Body16R
    fontFamily: "Inter", //Body16R
    color: ColorSchemeCode.neutral100,

    borderRadius: (props) => props.borderRadius || "6px",
    "&:focus": {
      backgroundColor: ColorSchemeCode.white,
    },
    height: (props) => props.height || "36px",
    "& fieldset": {
      backgroundColor: ColorSchemeCode.white,
      borderColor: ColorSchemeCode.neutral20,
    },
    "&:hover fieldset": {
      borderColor: ColorSchemeCode.primary50,
    },
    "&.Mui-focused fieldset": {
      backgroundColor: ColorSchemeCode.white,
      border: "2px solid " + ColorSchemeCode.primary50,
    },
    "&.Mui-focused": {
      backgroundColor: ColorSchemeCode.white,
    },
  },
});

const useStylesElement = makeStyles((props) => ({
  root: {
    fontWeight: 400,
    fontSize: (props) => props.fontSize || "16px",
    lineHeight: (props) => props.lineHeight || "20px",
    padding: (props) => props.padding,
    width: (props) => props.width || "100%",
    maxWidth: (props) => props.maxWidth,
    minWidth: (props) => props.minWidth,
    fontFamily: "Inter",
  },
  input: {
    "&::placeholder": {
      fontSize: (props) => props.fontSize || "16px", //Body16R
      fontWeight: "400", //Body16R
      lineHeight: "24px", //Body16R
      fontFamily: "Graphik", //Body16R
      color: ColorSchemeCode.Paragraph,
      // color        : props => props.placeholderColor ? props.placeholderColor : ColorSchemeCode.textFieldPlaceHolderColor,
    },
  },
  focused: {},
}));

const useStylesInputElement = makeStyles((props) => ({
  root: {
    // padding: "10px 16px",
    width: "100%",
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
    paddingLeft: (props) => (props.paddingLeft ? props.paddingLeft : ""),
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": (props) => (props.hideArrow ? "" : "none"),
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": (props) => (props.hideArrow ? "" : "none"),
      margin: 0,
    },
  },
}));

const useStylesLabelElement = makeStyles(() => ({
  root: {
    // paddingLeft: '0px !important',
    fontSize: "16px", //Body16R
    fontWeight: "400", //Body16R
    lineHeight: "24px", //Body16R
    fontFamily: "Graphik", //Body16R
    color: ColorSchemeCode.Paragraph,
  },
}));

const useStyleHelperTextElement = makeStyles(() => ({
  root: {
    fontSize: "1.1rem",
  },
  contained: {
    marginLeft: "0px",
  },
}));

const useStyleInputLabelElement = makeStyles(() => ({
  root: {
    fontFamily: "Graphik",
    fontWeight: 600,
    fontSize: 16,
    color: (props) => props.labelColor || ColorSchemeCode.neutral80,
    zIndex: 1,
    // paddingBottom : 4,
  },
}));

const InputAdorment = (props) => {
  return (
    <InputAdornment
      className={props.link && " mr_0 "}
      position={props.position}
    >
      {props.icon}
    </InputAdornment>
  );
};

export default function CustomSearch({
  label,
  filterShow,
  onClickFilter,
  disableEndIcon,
  ...props
}) {
  const agency = useContext(AgencyContext);
  const classes = useStylesElement({ ...props, agency: agency });
  const inputClasses = useStylesInputElement(props);
  const labelClasses = useStylesLabelElement();
  const helperText = useStyleHelperTextElement();
  const inputLabel = useStyleInputLabelElement({ ...props });

  const InputProps = {
    classes,
    disableUnderline: true,
    startAdornment: (
      <InputAdorment
        style={{ zIndex: "1" }}
        link={props.link}
        position={"start"}
        icon={
          <SvgIcons.IconSearch
            className=""
            height={14}
            width={14}
            fill={ColorSchemeCode.neutral60}
          />
        }
        className="z-index-100"
      />
    ),
    endAdornment: disableEndIcon ? (
      ""
    ) : (
      <InputAdorment
        link={props.link}
        position={"end"}
        icon={
          <SvgIcons.FilterSearch
            onClick={onClickFilter}
            color={filterShow ? ColorSchemeCode.themeColor : "#202124"}
            className="z-index-1 cp"
          />
        }
        className="copy"
      />
    ),
  };

  const [state, setstate] = useState(false);

  return (
    <>
      <CssTextField
        {...props}
        autoComplete="off"
        variant="outlined"
        className={props.className}
        size="small"
        type={props.type}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder ? props.placeholder : label}
        onClick={props.onClick}
        onChange={props.onChange}
        inputProps={{ className: inputClasses.root, ...props.inputProps }}
        InputLabelProps={{ className: labelClasses.root }}
        InputProps={InputProps}
        FormHelperTextProps={{ classes: helperText }}
        onBlur={(e) => {
          props.onBlur && props.onBlur(e);
          setstate(true);
        }}
        onFocus={() => setstate(false)}
        error={state && props.error}
        helperText={
          state &&
          props.helperText && (
            <div className="d-flex">
              <SvgIcons.HelperTextIcon />
              <div className="ml_8">{props.helperText}</div>
            </div>
          )
        }
      />
    </>
  );
}
