import React from "react";

const HomePage = () => {
  return (
    <div className="grid-x grid-padding-x grid-padding-y align-center">
      <div className="cell small-6">
        <h1 className="text-center">Fastcards</h1>
        <p className="text-center">
          Create, view, and practice flashcards made by yourself or others. Study alone, or make it a competition and go against friends, family, or classmates.
        </p>
        <a className="button expanded bar-shadow" href="/decks">View Decks</a>
        <a className="button expanded bar-shadow" href="/decks/new">Create Decks</a>
      </div>
    </div>
  )
}

export default HomePage