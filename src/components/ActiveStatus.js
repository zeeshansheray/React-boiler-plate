import React from 'react'

function ActiveStatus({active}) {
    return  <div id="ActiveStatus" className={active ? 'active' : 'inactive'}></div>
}

export default ActiveStatus
