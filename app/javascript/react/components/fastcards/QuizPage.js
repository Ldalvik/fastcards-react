import React, { useState, useEffect } from "react";

const QuizPage = (props) => {
  const deckId = props.match.params.id;
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);

  const [score, setScore] = useState({
    right: 0,
    wrong: 0,
    cardId: 0,
    answer: "",
    wasWrong: false,
    wasRight: false,
    isComplete: false,
  });

  const getDeck = async () => {
    try {
      const response = await fetch(`/api/v1/decks/${deckId}/`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const deckData = await response.json();
      setCards(deckData.cards);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getDeck();
  }, []);

  const handleChange = (event) => {
    setScore({
      ...score,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onAnswerSubmit = () => {
    if (cards[score.cardId].answer === score.answer) {
      const currentScore = score.right + 1;
      setScore({ ...score, right: currentScore, wasRight: true });
    } else {
      const currentScore = score.wrong + 1;
      setScore({ ...score, wrong: currentScore, wasWrong: true });
    }
  };

  const nextCardClicked = () => {
    const newId = score.cardId + 1;
    if (newId >= cards.length) {
      setScore({
        ...score,
        isComplete: true,
        wasRight: false,
        wasWrong: false,
        answer: "",
      });
    } else {
      setScore({
        ...score,
        cardId: newId,
        wasRight: false,
        wasWrong: false,
        answer: "",
      });
    }
  };

  let cardContent = (
    <div className="card fastcard-card clickable-card">
      <div className="card-section">
        <h5>Would you like to begin?</h5>
        <button className="hollow button" onClick={() => setGameStarted(true)}>
          Start
        </button>
      </div>
    </div>
  );

  if (score.wasRight) {
    cardContent = (
      <div className="card fastcard-card clickable-card">
        <div className="card-section">
          <h5>You got it right! Click next to continue.</h5>
          <p>Answer: {cards[score.cardId].answer}</p>
          <button className="hollow button" onClick={nextCardClicked}>
            Continue
          </button>
        </div>
      </div>
    );
  } else if (score.wasWrong) {
    cardContent = (
      <div className="card fastcard-card clickable-card">
        <div className="card-section">
          <h5>Sorry, that was incorrect. Click next to continue.</h5>
          <p>Answer: {cards[score.cardId].answer}</p>
          <button className="hollow button" onClick={nextCardClicked}>
            Continue
          </button>
        </div>
      </div>
    );
  } else if (score.isComplete) {
    cardContent = (
      <div className="card fastcard-card clickable-card">
        <div className="card-section front">
          <h5>
            You completed the deck! Final score: {score.right}/{cards.length}
          </h5>
          <a className="hollow button" href={`/decks/${deckId + 1}/`}>
            Next Deck
          </a>
        </div>
      </div>
    );
  } else if (gameStarted && !score.isComplete) {
    cardContent = (
      <div className="card fastcard-card clickable-card">
        <div className="card-section front">
          <small>Difficulty: {cards[score.cardId].difficulty}</small>
          <h4>{cards[score.cardId].question}</h4>
          <label>
            <input
              name="answer"
              type="text"
              onChange={handleChange}
              value={score.answer}
              placeholder="Answer here..."
            />
          </label>
          <button className="hollow button" onClick={onAnswerSubmit}>
            Submit Answer
          </button>
        </div>
        <div className="card-section back">
          <p>{cards[score.cardId].answer}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center header-padding">Decks</h1>
      <div className="grid-container">
        <div className="grid-x grid-margin-x grid-margin-y align-center small-up-3 medium-up-4">
          <div className="cell">
            <p>
              Score: {score.right}/{cards.length}
            </p>
            <a>{cardContent}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
