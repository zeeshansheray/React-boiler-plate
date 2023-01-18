import React, { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
// import mentionStyles from "./mentionStyles";
import mentionInputStyles from "./mentionInputStyles";
import classNames from "../assets/css/component/example.module.css"

function NewTagComponent({suggestions, onChange, value}) {
  return (
    <div>
      <div className="Body13M lh-16 mb_8 capitalize color-neutral80">Input SMS</div>
      <MentionsInput
        style={mentionInputStyles}
        value={value}
        onChange={onChange}>

        <Mention
        className = {classNames.mentions__mention}
        data      = {suggestions}
        />
      </MentionsInput>
    </div>
  );
}
export default NewTagComponent;