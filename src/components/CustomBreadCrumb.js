import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';

export default function CustomBreadCrumb(props) {
  const goToLink = (element, idx) =>{
    //inorder to disable the click for last breadcrumb element as its already opened!
    (props.heading.length !== idx+1) && (window.location.href='/'+window.location.pathname.split('/')[1]+element.value);
  }

  return (
    <Breadcrumbs>
       

        <div>
          {window.location.pathname.split('/').map((path, idx) => (
            <Link to={window.location.pathname.split(path)[0]+path} >
              <span 
                className={(idx === 2 ? 'Heading4 opacity-10' : 'Body14R opacity-8') + " color-c828282 fw-6 capitalize togglebtn text-dec-none"}
              >{idx > 1 && path + '/ '}</span>
            </Link>
          ))}
        </div>
    </Breadcrumbs>
  );
}