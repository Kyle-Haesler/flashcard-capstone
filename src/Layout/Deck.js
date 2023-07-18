import React, {useState, useEffect} from "react"
import { Switch, Route, useParams, useHistory, Link, useLocation } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Study from "./Study";
import EditDeck from "./EditDeck"
import AddCard from "./AddCard"
import EditCard from "./EditCard"

function Deck(){
// get the deck Id from the URL
const {deckId} = useParams()
const history = useHistory()
// use location to make this API call everytime the url changes to ensure we have the most uptodate information
const location = useLocation()
// use readDeck function to get proper deck utilizing useState and useEffect, dependency will be deckId. This will be passed down to multiple components.
const [deck, setDeck] = useState([])
useEffect(() => {
    const abortController = new AbortController()
    async function fetchDeck(){
        try {
            const deckData = await readDeck(deckId, abortController.signal)
            setDeck(deckData)
        } catch (error){
            console.log(error)
        }
    }
    fetchDeck()
    return () => {
        abortController.abort()
    }
}, [deckId, location.pathName])
// deal with deleting deck
const handleDeckDelete = (id) => {
    const confirmed = window.confirm("Delete this deck? You will not be able to recover it.")
    if(confirmed){
        deleteDeck(id)
        history.push("/")
        history.go(0)
    }
}
// deal with deleting a card
const handleCardDelete = (id) => {
    const confirmed = window.confirm("Delete this card? You will not be able to recover it.")
    if(confirmed){
        deleteCard(id)
        history.go(0)
    }
}
if(!deck.cards){
return <p>Loading...</p>
}    
    
return (
    <>
    <Switch>
        <Route exact path="/decks/:deckId">
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
        <li className="breadcrumb-item active">{deck.name}</li>
    </ol>
    </nav>
    <h2>{deck.name}</h2>
    <p>{deck.description}</p>
    <div className="card-body d-flex justify-content-between">
    <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
    <button type="button" className="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/study`)}>Study</button>
    <button type="button" className="btn btn-primary" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>+ Add Cards</button>
    <button type="button" className="btn btn-danger" onClick={() => handleDeckDelete(deckId)}>Delete</button>
    </div>
    <hr />
    <h2>Cards</h2>
    {deck.cards.map((card) => {
        return (
        <div key={card.id}>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}/cards/${card.id}/edit`)}>Edit</button>
            <button type="button" className="btn btn-danger" onClick={() => handleCardDelete(card.id)}>Delete</button>
            <hr />
        </div>
        )
    })}
    </Route>
    <Route exact path="/decks/:deckId/study">
        <Study deck={deck}/>
    </Route>
    <Route exact path="/decks/:deckId/edit">
        <EditDeck deck={deck} />
    </Route>
    <Route exact path="/decks/:deckId/cards/new">
        <AddCard deck={deck} />
    </Route>
    <Route exact path="/decks/:deckId/cards/:cardId/edit">
        <EditCard deck={deck} />
    </Route>
    </Switch>
    </>
    )
}

export default Deck