import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import App from './app.component';

//The "*" has special meaning here. It will match only when no other routes do.

reactDom.render(
    <BrowserRouter >
       <App/>
    </BrowserRouter>,
    document.getElementById('root'));