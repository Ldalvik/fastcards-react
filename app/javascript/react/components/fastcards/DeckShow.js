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

  let cardsList
  if (deck.hasOwnProperty("cards")) {
    cardsList = deck.cards.map((card) => {
      return (
        <li>
          <p>
            {card.question}, {card.answer}
          </p>
        </li>
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
          <ul>{cardsList}</ul>
        </div>
      </div>
    </div>
  )
}

export default DeckShow
