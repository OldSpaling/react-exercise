import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { worker } from './api/server'
import { fetchUsers } from './features/users/user-slice';
worker.start({
   onUnhandledRequest: "bypass"
}).then(() => {
   //! store 初始化，不能在component里使用
   //!加载用户信息到store
   store.dispatch(fetchUsers());
   ReactDOM.render(
      <React.StrictMode>
         <Provider store={store}>
            <App />
         </Provider>
      </React.StrictMode>,
      document.getElementById('root')
   );

   // If you want your app to work offline and load faster, you can change
   // unregister() to register() below. Note this comes with some pitfalls.
   // Learn more about service workers: https://bit.ly/CRA-PWA
   serviceWorker.unregister();
})


