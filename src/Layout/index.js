import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
// Home page that will show the header (will always be shown), the createDeckButton and the DeckList
// All routes that start with deck will be routed from here
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <DeckList />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
