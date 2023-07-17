import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeckButton() {
  // assign history as a variable
  const history = useHistory();
  // return button pushing to CreateDeck component
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push("/decks/new")}
      >
        + Create Deck
      </button>
      <hr />
    </>
  );
}

export default CreateDeckButton;
