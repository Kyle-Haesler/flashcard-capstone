import React, {useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route, useLocation } from "react-router-dom";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";
import { listDecks } from "../utils/api";
// Home page that will show the header (will always be shown), the createDeckButton and the DeckList
// All routes that start with deck will be routed from here
function Layout() {
  // establish state and then call listDecks to get the deck information and pass that down to DeckList
  const [allData, setAllData] = useState([])
  // establish location in order to refresh page when url changes
  const location = useLocation()
  useEffect(() => {
    const abortController = new AbortController
    async function fetchAllData(){
      try {
        const data = await listDecks(abortController.signal)
        setAllData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllData()
    return () => {
      abortController.abort()
    }
  }, [location.pathname])
  
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <DeckList allData={allData} />
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
