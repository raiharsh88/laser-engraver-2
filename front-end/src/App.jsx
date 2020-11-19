import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import SignPage from "./pages/sign";
import Entry from "./pages/entry";
import Gallery from './pages/gallery'


import { CSSTransition, TransitionGroup } from 'react-transition-group';
function App() {
  const location = useLocation();
  return (


    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames={'fade'}
      >
        <Switch>
          <Route path="/main" exact={true} component={Entry} />
          <Route path="/gallery" exact={true} component={Gallery} />
          <Route path="/create" exact={true} component={SignPage} />
        </Switch>

      </CSSTransition>

    </TransitionGroup>

  );
}

export default App;
