import React, {createRef, useCallback, useEffect, useState} from "react"
import { MixedTags } from "@yaireo/tagify/dist/react.tagify"
import Tagify from "@yaireo/tagify"
//import {MixedTags} from "./tagify/react.tagify"

// Tagify settings object
const settings = {
  pattern: /@/,  // <- must define "patten" in mixed mode
  dropdown: {
    enabled: 0,
    position: "text"
  },
  keepInvalidTags     : true,         // do not remove invalid tags (but keep them marked as invalid)
  editTags            : {
      clicks: 1,              // single click to edit a tag
      keepInvalid: false      // if after editing, tag is invalid, auto-revert
  },
  templates: {
    dropdownItemNoMatch: (data) => `No suggestion found for: ${data.value}`
  },
  whitelist: [
    {id: 100, value: "FirstName", title: "FirstName"},
    {id: 101, value: "LastName", title: "LastName"},
    {id: 102, value: "Email", title: "Email"},
    {id: 103, value: "Phone", title: "Phone"},
    {id: 104, value: "Url", title: "Url"},
  ]
}

const MixedModeTagify = () => {

  const onChange = useCallback(e => {
    console.log("CHANGED:", e.detail.value)
  }, [])

  const [value, setValue] = useState(`
  This is a textarea which mixes text with [[{"value":"tags"}]].
  To add a [[{"value":"tag"}]], type <em>@</em> and a (Latin) character
  <br>
  <small>(Only tags from the <em>whitelist</em> are allowed. <em>Whitelist</em> contains names of Southpark characters.)</small
  <br>
  <small>(Open this demo in a full-window to be able to type new-line returns)</small>
          `)


  return (
    <>
      <MixedTags
        autoFocus = {true}
        settings  = {settings}
        className = "myTags"
        onChange  = {onChange}
        value     = {value}
      />
    </>
  )
}

export default MixedModeTagify
