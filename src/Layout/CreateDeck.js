import {useHistory, Link} from "react-router-dom"
import React, { useState } from "react"
import { createDeck } from "../utils/api"

function CreateDeck(){
    // establish history
    const history = useHistory()
    //set initial form state and get formData going 
    const initialFormState = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState({...initialFormState})
    // create change handler function
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    }
    // handle submission of the form
    const handleSubmit = async (event) => {
        event.preventDefault()
        const newDeck = await createDeck(formData)
        const newDeckId = newDeck.id
        setFormData({...initialFormState})
        history.push(`/decks/${newDeckId}`)
    }

    return (
    <>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item active">Create Deck</li>
        </ol>
    </nav>
    <h1>Create Deck</h1>
    <form onSubmit={handleSubmit}>
        <h4>Name</h4>
        <input style={{width: "100%", height: "auto"}} id="name" type="text" name="name" value={formData.name} onChange={handleChange} require placeholder="Deck Name" />
        <h4>Description</h4>
        <textarea style={{width: "100%", height: "150px"}} name="description" value={formData.description} onChange={handleChange} require placeholder="Brief description of the deck"></textarea>
        <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
     </form>
    </>
    )
}


export default CreateDeck