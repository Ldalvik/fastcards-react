import React, { useState, useEffect } from "react"

const DeckShow = (props) => {
  const [deck, setDeck] = useState([])

  const getDeck = async () => {
    try {
      const response = await fetch(`/api/v1/decks/${props.match.params.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const deckData = await response.json()
      setDeck(deckData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getDeck()
  }, [])

  const onCardClicked = (e) => {

  }

  let cardsList
  if (deck.hasOwnProperty("cards")) {
    cardsList = deck.cards.map((card) => {
      return (
        <div key={card.id} className="cell">
          <a onClick={onCardClicked}>
            <div className="card fastcard-card clickable-card">
              <div className="card-section">
                <small>Difficulty: {card.difficulty}</small><br/><br/>
                {/* <a data-dropdown="drop2" aria-controls="drop2" aria-expanded="false">
                  Click here for a clue
                </a> */}
                <div id="drop2" data-dropdown-content className="f-dropdown content" aria-hidden="true" tabIndex="-1">
                  <p>{card.clue}</p>
                </div>
                <p>Q: {card.question}</p>
                <p>A: Click the card to see the answer...</p>
              </div>
            </div>
          </a>
        </div>
      )
    })
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
      
        <div className="cell">
          <a data-dropdown="drop2" aria-controls="drop2" aria-expanded="false">

          <div className="card fastcard-card clickable-card">
            <div className="card-section">
              <p>Click to add a new card...</p>
            </div>
          </div>
          </a>
        </div>

        {cardsList}
        </div>
      </div>
    </div>
  )
}

export default DeckShow
