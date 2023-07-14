import { useHistory, useParams, Link } from "react-router-dom";
import React, { useState } from "react";

function Study({ deck }) {
  // first get the deck Id using useParams. Also we are going to set up all the necessary states here
  const { deckId } = useParams();
  const [cardNumber, setCardNumber] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const history = useHistory();
  // handle cardSide in order to flip it back and forth
  const handleCardSide = (cardSide) => {
    if (cardSide === "front") {
      setCardSide("back");
    } else {
      setCardSide("front");
    }
  };
  // handle cardnumber to go to to the next card in the deck and set it to front. Also handling last card in deck scenario here.
  const handleCardNumber = (cardNumber) => {
    if (cardNumber !== deck.cards.length - 1) {
      setCardNumber(cardNumber + 1);
      setCardSide("front");
    } else {
      const confirmed = window.confirm(
        `Restart cards? Click "Cancel" to return to home page.`
      );
      if (confirmed) {
        setCardNumber(0);
        setCardSide("front");
      } else {
        history.push("/");
      }
    }
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
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <hr />
      <div className="card">
        {deck.cards.length > 2 ? (
          <>
            <h2 className="card-title">
              Card {cardNumber + 1} of {deck.cards.length}
            </h2>
            <p className="card-text" style={{ height: "150px" }}>
              {deck.cards[cardNumber][cardSide]}
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleCardSide(cardSide)}
            >
              Flip
            </button>
            {cardSide === "back" && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleCardNumber(cardNumber)}
              >
                Next
              </button>
            )}
          </>
        ) : (
          <>
            <h2>Not enough cards.</h2>
            <p>{`You need atleast 3 cards to study. There are ${deck.cards.length} cards in this deck`}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => history.push(`/decks/${deckId}/cards/new`)}
            >
              + Add Cards
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Study;
