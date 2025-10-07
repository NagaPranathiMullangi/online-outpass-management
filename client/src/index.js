import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import Reducers from "./reducers";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* compose: This is a utility function that combines multiple store enhancers into one.
In this case, it is used to combine middleware (via applyMiddleware) 
and any other enhancers (e.g., Redux DevTools).*/

/*applyMiddleware :  is used to add middleware to the Redux store.
thunk  : is a middleware that allows you to write asynchronous logic 
(e.g., API calls) in your Redux actions.
 */

/*The createStore : function initializes the Redux store with:
The Reducers to manage the state.
The middleware (thunk) to handle asynchronous actions.
The compose function ensures that if you need to add more enhancers 
(e.g., Redux DevTools), they can be combined easily.

*/

const store = createStore(Reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
        transition={Slide}
        closeOnClick={true}
      />
    </React.StrictMode>
  </Provider>
);
