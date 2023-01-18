export default {
  control: {
    backgroundColor: '#F5F7FC',
    fontSize: 14,
    lineHeight: "24px"
  },
  '&multiLine': {
    control: {
      fontFamily: 'Inter',
      minHeight: 63,
    },
    highlighter: {
      padding: "8px 12px",
      border: '1px solid transparent',
    },
    input: {
        borderRadius: 6,
        padding     : "8px 12px",
        border      : '1px solid #D6DAE9',
    },
  },
  '&singleLine': {
    display: 'inline-block',
    width: 180,
    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },
  suggestions: {
    list: {
      backgroundColor: 'white',
      boxShadow: '0px 3px 6px rgba(15, 15, 15, 0.1), 0px 9px 24px rgba(15, 15, 15, 0.2)',
      borderRadius: '6px',
      padding: '4px',
      border: '0.5px solid #D6DAE9',
      fontSize: 14,
    },
    item: {
      padding: '10px 12px',
      borderRadius: '6px',
      '&focused': {
        backgroundColor: '#F2F6FF',
      },
    },
  },
}