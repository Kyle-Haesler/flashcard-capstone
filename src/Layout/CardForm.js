import React, {useState} from "react"
import {useParams, useHistory} from "react-router-dom"


function CardForm({initialFormState, handleSubmit, deckId, name1, name2, placeholder1, placeholder2}){
    // establish history and deckId
    const history = useHistory()
    
    const [formData, setFormData] = useState({...initialFormState})

    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value})
    }

    const handleSubmitForm= (event) => {
        event.preventDefault()
        handleSubmit(formData)
    }

    return (
        <>
        <form onSubmit={handleSubmitForm}>
        <h3>Front</h3>
        <textarea style={{width: "100%", height: "150px"}} value={formData.front} required name="front" onChange={handleChange} placeholder={placeholder1} />
        <h3>Back</h3>
        <textarea style={{width: "100%", height: "150px"}} value={formData.back} required name="back" onChange={handleChange} placeholder={placeholder2} />
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>{name1}</button>
        <button type="submit" className="btn btn-primary">{name2}</button>
</form>
        </>
    )
}


export default CardForm