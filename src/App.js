import React from "react";
import { Route } from "react-router";
import Header from "./Components/Header";
import PizzaForm from "./Components/PizzaForm"

const App = () => {




  return (
    <div id="AppPg">

      <Route path="/" component={Header}/>
      <Route path="/pizza" component={PizzaForm}/>
    </div>
      
  );
};
export default App;
