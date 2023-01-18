import React, { useState } from "react";
import { ColorSchemeCode } from "../enums/ColorScheme";

export default function CustomTextFieldAuth({ label, ...props }) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      id="TextfieldUpdated"
      className={props.className + " position-relative"}
    >
      {label && (
        <label
          className="Body13R lh-20 mb_4 fs-14 fw-5 control-label capitalize"
          style={{
            color: props.helperText
              ? ColorSchemeCode.danger30
              : focus
              ? ColorSchemeCode.primary50
              : ColorSchemeCode.neutral80,
            letterSpacing: 0.1,
            transition: "ease-in-out 0.2s",
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        value={props.value || props.defaultValue}
        id={props.id ? props.id : "TextField_v1"}
        name={props.name}
        ref={props.inputRef}
        type={props.type ? props.type : "text"}
        onChange={props.onChange || props.onBlur}
        style={{
          padding:
            props.position === "start"
              ? "0px 16px"
              : "0px 16px",
              height:"52px",
              
          border: props.helperText && "1px solid " + ColorSchemeCode.danger30,
          paddingLeft: props.paddingLeft
            ? props.paddingLeft
            : props.position === "start"
            ? "32px"
            : "16px",
          background: props.helperText && ColorSchemeCode.danger0,
          transition: "ease-in-out 0.2s",
        }}
        // style        = {{ padding : props.position == 'start' ? console.log('start') : console.log('end') , border : props.helperText && ('1px solid ' + ColorSchemeCode.danger30), paddingLeft : props.paddingLeft, background : props.helperText && (ColorSchemeCode.danger0) }}
        disabled={props.disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete="on"
        placeholder={props.placeholder}
        onKeyUp={props.onKeyUp}
        inputProps={props.inputProps}
        className={props.className + " borderRadius-6 Body16R"}
      ></input>
      {props.icon && props.position == "start" && (
        <div
          className={`position-absolute Body14R ${focus && "FocusedIcon"}`}
          style={{ left: 16, top: props.top ? props.top : 40 }}
        >
          {props.icon}
        </div>
      )}
      {props.icon && props.position == "end" && (
        <div
          className={`position-absolute Body14R ${focus && "FocusedIcon"}`}
          style={{ right: 16, top: props.top ? props.top : 38 }}
        >
          {props.icon}
        </div>
      )}
      {props.helperText && <div className="error">{props.helperText}</div>}
    </div>
  );
}
