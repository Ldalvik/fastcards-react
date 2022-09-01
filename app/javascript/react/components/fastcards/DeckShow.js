import React, { useState, useEffect } from "react";
import CreateCardTile from "./CreateCardTile";
import { Link } from "react-router-dom";

const DeckShow = (props) => {
  const deckId = props.match.params.id;
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const getDeck = async () => {
    try {
      const response = await fetch(`/api/v1/decks/${deckId}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const deckData = await response.json();
      setDeck(deckData);
      setCards(deckData.cards);
      setGames(deckData.games);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getDeck();
  }, []);

  const submitCard = async (event, formPayload) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/v1/decks/${deckId}/cards`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const cardData = await response.json();
        setCards([cardData, ...cards]);
      }
    } catch (error) {
      console.log("error in fetch:", error);
    }
  };

  const onCardClicked = (id) => {
    setSelectedId(id);
  };

  let cardsList;
  if (deck.hasOwnProperty("cards")) {
    cardsList = cards.map((card) => {
      let isFlipped;
      if (selectedId === card.id) {
        isFlipped = "flipped";
      }
      return (
        <div key={card.id} className={"cell " + isFlipped}>
          <a onClick={() => onCardClicked(card.id)}>
            <div className="card fastcard-card clickable-card">
              <div className="card-section front">
                <small>Difficulty: {card.difficulty}</small>
                <br />
                <br />
                <p>Q: {card.question}</p>
                <p>A: Click the card to see the answer...</p>
              </div>
              <div className="card-section back">
                <p>{card.answer}</p>
              </div>
            </div>
          </a>
        </div>
      );
    });
  }

  let decks;
  if (props.location.state != null) {
    decks = props.location.state.decks;
  }

  let gamesList;
  gamesList = games.map((game) => {
    const date = game.created_at.split('T')[0]
    const time = game.created_at.split('T')[1]
    return (
      <div key={deck.id} className="cell">
        <div className="card fastcard-gamecard clickable-gamecard">
          <div className="card-divider">
            <h5>GAME {game.id}</h5>
          </div>
          <div className="card-section front">
            <p>Score: {parseInt(game.score).toFixed(2)}%</p>
            <p>Right: {game.right}</p>
            <p>Wrong: {game.wrong}</p>
            <p>Quizzed at: {date}, {time}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="grid-x grid-padding-x grid-padding-y align-center">
        <div className="cell small-10">
          <h1>{deck.name}</h1>
          <p><em>{deck.description}</em></p><br/>
          <p><b>Category:</b> {deck.category}</p>
          <p><b>Difficulty:</b> {deck.difficulty}</p>
          <Link
            className="button"
            to={{
              pathname: `/decks/${deckId}/quiz`,
              state: { decks },
            }}
          >
            Quiz Yourself!
          </Link>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x grid-margin-y small-up-3 medium-up-5">
          <CreateCardTile submitCard={submitCard} />
          {cardsList}
        </div>
      </div>
      <div className="grid-container">
      <h1 className="header-padding">Quiz History</h1>
        <div className="grid-x grid-margin-x grid-margin-y small-up-4 medium-up-5">
            {gamesList}
        </div>
      </div>
    </div>
  );
};

export default DeckShow;
