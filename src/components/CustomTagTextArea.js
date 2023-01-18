import React from "react";
import ReactDOM from "react-dom";

// import Tags from "@yaireo/tagify/dist/react.tagify";
// local import. Inreality use the above example
import Tags from "@yaireo/tagify/dist/react.tagify";
import Tagify from "@yaireo/tagify";


// this is an example React component which implemenets Tagify within
// itself. This example is a bit elaborate, to demonstrate what's possible.
export default class CustomTagTextArea extends React.PureComponent {
  // setting which won't get changed
  tagifySettings = {
    mode: "mix",
    mixTagsInterpolator: ["{", "}"],
    pattern: /{|%/, // <--  Text starting with @ or # (if single, String can be used here)
    // autocomplete: true,
    duplicates: true,
    // backspace: true,
    placeholder: "Type your Message",
    dropdown: {
      enabled: 0 // a;ways show suggestions dropdown
    }
  };

  // lets set here any of Tagify settings
  state = {
    value: '',
    whitelist: ["FirstName", "LastName", "Email", "Phone", "URL"]
  };

  componentDidMount() {
    const { whitelist } = this.state;

    const input = document.querySelector("[name=mix]");
    const tagify = new Tagify(input, {
      whitelist,
      ...this.tagifySettings,
    });
  }


  callback(e) {
    console.log(`%c ${e.type}: `, "background: #222; color: #bada55", e.detail);
    console.log('callback is called')
  }

  // callbacks props (for this demo, the same callback reference is assigned to every event type)
  mapTagifyCallbacks = {
    add: this.callback,
    remove: this.callback,
    input: this.callback,
    edit: this.callback,
    invalid: this.callback,
    click: this.callback
  };

  render() {
    // `{{{"value":"LastName","prefix":"{"}}}`
    // this.props.onChange(e.target.value)
    // initial value
    const { value } = this.props.value;
   console.log('Value is ', value)
    return  <div id="">
              <textarea name="mix" rows="5" value={value} onChange={(e)=>console.log(e.target.value)} />
            </div>
  }
}
