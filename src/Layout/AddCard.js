import { useHistory, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard({ deck }) {
  // first we will get the deckId from the params
  const { deckId } = useParams();
  //establish the use of history
  const history = useHistory();
  // create initalFormState and set state
  const initialFormState = {
    front: "",
    back: "",
    deckId: deckId,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  // set variables consistent with the form
  const name1 = "Done";
  const name2 = "Save";
  const placeholder1 = "Front side of card";
  const placeholder2 = "Back side of card";

  // handle change
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // handle submit event

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData({ ...initialFormState });
    history.push(`/decks/${deckId}`)
    history.go(0)
  };

  if (!deck.cards) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      <hr />
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value1={formData.front}
        value2={formData.back}
        name1={name1}
        name2={name2}
        placeholder1={placeholder1}
        placeholder2={placeholder2}
        deckId={deckId}
      />
    </>
  );
}

export default AddCard;
