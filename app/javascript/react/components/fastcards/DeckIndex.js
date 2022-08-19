import React, { useState, useEffect } from "react";

const DeckIndex = (props) => {
  const [decks, setDecks] = useState([]);

  const getDecks = async () => {
    try {
      const response = await fetch("/api/v1/decks");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const decksData = await response.json();
      setDecks(decksData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getDecks();
  }, []);


  const decksList = decks.map((deck) => {
    return (
      <div key={deck.id} class="cell">
        <a href={`/deck/${deck.id}`}>
          <div class="card fastcard clickable">
            <div class="card-divider">
              <h4>{deck.name}</h4>
            </div>
            <div class="card-section">
              <h5>{deck.category}</h5>
              <small>{deck.difficulty}</small><br/><br/>
              <p>{deck.description}</p>
            </div>
          </div>
        </a>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-center header-padding">Decks</h1>
      <div className="grid-container">
        <div className="grid-x grid-margin-x grid-margin-y small-up-2 medium-up-3">
          {decksList}
        </div>
      </div>
    </div>
  );
};

export default DeckIndex;
