import React, {useState} from "react"
import {useParams, useHistory} from "react-router-dom"


function CardForm({handleSubmit, handleChange, value1, value2, deckId, name1, name2, placeholder1, placeholder2}){
    // establish history and deckId
    const history = useHistory()


    return (
        <>
        <form onSubmit={handleSubmit}>
        <h3>Front</h3>
        <textarea style={{width: "100%", height: "150px"}} value={value1} required name="front" onChange={handleChange} placeholder={placeholder1} />
        <h3>Back</h3>
        <textarea style={{width: "100%", height: "150px"}} value={value2} required name="back" onChange={handleChange} placeholder={placeholder2} />
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>{name1}</button>
        <button type="submit" className="btn btn-primary">{name2}</button>
</form>
        </>
    )
}


export default CardForm