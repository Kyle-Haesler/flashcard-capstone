import { useHistory, Route, Switch, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { updateDeck } from "../utils/api";

function EditDeck({ deck }) {
  // establish history
  const history = useHistory();
  // get deckId
  const { deckId } = useParams();
  //set initial form state and get formData going
  const initialFormState = {
    id: deckId,
    name: deck.name,
    description: deck.description,
  };
  const [formData, setFormData] = useState({...initialFormState})
  // create change handler function
  const handleChange = ({target}) => {
      setFormData({...formData, [target.name]: target.value})
  }
// handle submission of the form
const handleSubmit = (event) => {
    event.preventDefault()
    updateDeck(formData)
    history.push(`/decks/${deckId}`)
    history.go(0)
}

if(!deck){
   return "Loading..."
}
  return (
    <>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item">{deck.name}</li>
            <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
    </nav>
    <h1>Edit Deck</h1>
    <hr />
    <form onSubmit={handleSubmit}>
        <h4>Name</h4>
        <input style={{width: "100%"}} id="name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <h4>Description</h4>
        <textarea style={{width: "100%", height: "150px"}} name="description" value={formData.description} onChange={handleChange}></textarea>
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
     </form>
    </>
    )
}

export default EditDeck;
