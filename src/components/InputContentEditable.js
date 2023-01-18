import React, { useRef } from 'react';

const InputContentEditable = ({ value, onChange = () => {}, ...props }) => {
    const state = useRef({ value, prevValue: null, key: null });

    if (state.current.prevValue !== value) {
        state.current.value = value;
        state.current.key = Date.now();
    }

    const _handleInput = (event) => {
        const value = event.target.innerText;
        state.current.prevValue = value;
        onChange(value);
    };

    return (
        <div
            {...props}
            key={state.current.key}
            role="textbox"
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: state.current.value }}
            onInput={_handleInput}
        />
    );
};
export default InputContentEditable;