import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tour from "./Tour";
import Tours from "./Tours";
import GigInput from "./GigInput";
import SalesItemInput from "./SalesItemInput";
import "../styles/App.css";
import GigSummary from "./GigSummary";
import Header from "./Header";

function App() {
  return (
    <main>
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>         
          <Tours />
        </Route>
        <Route exact path='/tour/:tourId'>
          <Tour />
        </Route>
        <Route exact path='/gig/:gigId/input'>
          <GigInput />
        </Route>
        <Route exact path='/sales/:gigId/:productId/:itemId'>
          <SalesItemInput />
        </Route>
        <Route exact path='/gig/:gigId/summary'>
          <GigSummary />
        </Route>
      </Switch>
    </Router>
    </main>
  );
}

export default App;
