import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import * as localForage from 'localforage'

export default function ProtectedRoute({component: Component, show, setShow, ...restProps}) {
    return (
        <Route 
            {...restProps}  render={(props) => {
                    return <Component {...props} show={show} setShow={setShow}/>
            }   
        }/>
    )
}