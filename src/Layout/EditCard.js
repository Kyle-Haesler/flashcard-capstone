import { useHistory, useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard({ deck }) {
  // get deckId and cardId from the URL, establish history, set all necessary states
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});
  const name1 = "Cancel";
  const name2 = "Submit";
  const initialFormState = {
    front: "",
    back: "",
    id: cardId,
    deckId: deckId,
  };
  // get formData going
  const [formData, setFormData] = useState({ ...initialFormState });
  // fetch card and set formData to the card information to display in the form initially
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCard() {
      try {
        const cardData = await readCard(cardId, abortController.signal);
        setCard(cardData);
        setFormData({
          front: cardData.front,
          back: cardData.back,
          id: cardId,
          deckId: cardData.deckId,
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchCard();

    return () => {
      abortController.abort();
    };
  }, []);
  // handle the change in the form
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(formData);
    history.push(`/decks/${deckId}`)
    history.go("0");
  };

  if (!formData || !card) {
    return "Loading...";
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">Deck {deck.name}</li>
          <li className="breadcrumb-item active">{`Edit Card ${cardId}`}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <hr />
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value1={formData.front}
        value2={formData.back}
        name1={name1}
        name2={name2}
        deckId={deckId}
      />
    </>
  );
}

export default EditCard;
