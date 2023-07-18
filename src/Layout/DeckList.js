import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckList({allData}) {
  // establish history 
  const history = useHistory();

  // handleDelete function
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmed) {
      deleteDeck(id);
      history.go(0);
    }
  };

  if (!allData) {
    return "Loading...";
  }

  return (
    <>
      {allData.map((deck) => (
        <div className="card">
          <div key={deck.id}>
            <h2 className="card-title">{deck.name}</h2>
            <p className="card-text">{deck.description}</p>
            <p>{deck.cards.length} cards</p>
            <div className="card-body d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deck.id}`)}
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => history.push(`/decks/${deck.id}/study`)}
              >
                Study
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
            <hr />
          </div>
        </div>
      ))}
    </>
  );
}

export default DeckList;
