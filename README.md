# FlashCard Application

## Project Description
Application that allows the user to create, edit, and delete decks and cards within them.

## Instructions
- Download files
- Run npm install
- Run npm start to run the project locally
- Application is deployed on Render: https://flashcard-capstone-xfod.onrender.com

## Application Layout
### Home	/
- Shows a list of decks with options to create, study, view, or delete a deck
### Study	/decks/:deckId/study
- Allows the user to study the cards from a specified deck
### Create Deck	/decks/new
- Allows the user to create a new deck
### Deck	/decks/:deckId
- Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck
### Edit Deck	/decks/:deckId/edit
- Allows the user to modify information on an existing deck
### Add Card	/decks/:deckId/cards/new
- Allows the user to add a new card to an existing deck
### Edit Card	/decks/:deckId/cards/:cardId/edit
- Allows the user to modify information on an existing card
## Technologies Used
- JavaScript
- React
- Express
- Knex
- HTML
- CSS
- Versions tracked with Git



