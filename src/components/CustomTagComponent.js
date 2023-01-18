import React, {useEffect} from "react";

import Tags from "@yaireo/tagify/dist/react.tagify";

function TagField({ label, name, initialValue , suggestions = [], baseTagifySettings, handleChange }) {

  const settings = {
    ...baseTagifySettings,
    whitelist: suggestions,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      edit: handleChange,
      invalid: handleChange,
      click: handleChange,  
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange
    }
  };
  return (
    <div className="form-group">
      <label style={{fontSize : 12, fontWeight : 'normal'}} htmlFor={"field-" + name}>{'Message'}</label>
      <Tags  
          InputMode    = "textarea"
          className    = "borderRadius-4 pl_8 pr_8 pt_14 pb_14 Body14R color-neutral100 lineheight-0"
          settings     = {settings}
          value        = {initialValue}
      />
    </div>
  );
}

export default function CustomTagComponent({placeholder, suggestions, onChange, value}) {
    const baseTagifySettings = {
      blacklist: [],
      maxTags: 6,
      backspace: "edit",
      placeholder: "type something",
      editTags: 1,
      mode: "mix", // <--  Enable mixed-content
      pattern: /@|#/,
      tagTextProp: "text",
      enforceWhitelist: true,
      duplicates: true,
      dropdown: {
        enabled: 1
      },
      callbacks: {}
    };



  return (
    <div className="App">
      <TagField 
        initialValue       = {value}
        suggestions        = {suggestions}
        baseTagifySettings = {baseTagifySettings}
        handleChange       = {onChange}
      />
    </div>
  );
}