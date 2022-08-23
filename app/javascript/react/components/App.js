import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./fastcards/HomePage"
import DeckIndex from "./fastcards/DeckIndex"
import DeckShow from "./fastcards/DeckShow"

export const App = () => {  
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/decks' component={DeckIndex} />
          <Route exact path='/decks/:id' component={DeckShow} />
        </Switch>
      </BrowserRouter>
    )
  }

export default App
