import React, { useState, useEffect } from "react";
import CreateCardTile from "./CreateCardTile";

const DeckShow = (props) => {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  const getDeck = async () => {
    try {
      const response = await fetch(`/api/v1/decks/${props.match.params.id}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const deckData = await response.json();
      setDeck(deckData);
      setCards(deckData.cards);
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
        let deck_id = props.match.params.id;
        const response = await fetch(`/api/v1/decks/${deck_id}/cards`, {
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
          setCards([cardData, ...cards])
        }
      } catch (error) {
        console.log("error in fetch:", error);
      }
    }

  const onCardClicked = (e) => {
    setNewCardForm();
  };

  let cardsList;
  if (deck.hasOwnProperty("cards")) {
    cardsList = cards.map((card) => {
      return (
        <div key={card.id} className="cell">
          <a onClick={onCardClicked}>
            <div className="card fastcard-card clickable-card">
              <div className="card-section">
                <small>Difficulty: {card.difficulty}</small>
                <br />
                <br />
                <p>{card.clue}</p>
                <p>Q: {card.question}</p>
                <p>A: Click the card to see the answer...</p>
              </div>
            </div>
          </a>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="grid-x grid-padding-x grid-padding-y align-center">
        <div className="cell small-10">
          <h1>{deck.name}</h1>
          <p>{deck.description}</p>
          <p>{deck.category}</p>
          <p>{deck.difficulty}</p>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x grid-margin-y small-up-4 medium-up-5">
          <CreateCardTile submitCard={submitCard} />
          {cardsList}
        </div>
      </div>
    </div>
  );
};

export default DeckShow;
