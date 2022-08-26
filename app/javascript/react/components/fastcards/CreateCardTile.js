import React, { useState } from "react";

const CreateCardTile = ({ submitCard }) => {
  const [currentCard, setCurrentCard] = useState({
    question: "",
    answer: "",
    difficulty: "",
  });

  const handleChange = (event) => {
    setCurrentCard({
      ...currentCard,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onCardSubmit = (event) => {
    let formPayload = { card: currentCard };
    submitCard(event, formPayload);
    setCurrentCard({
      question: "",
      answer: "",
      difficulty: "",
    });
  };

  return (
    <div className="cell">
      <a>
        <div className="card fastcard-card clickable-card">
          <div className="card-section">
            <div className="grid-x grid-padding-x align-center">
              <form onSubmit={onCardSubmit}>
                <div className="row">
                  <div className="large-12 columns">
                    <label>
                      <input
                        name="difficulty"
                        type="text"
                        onChange={handleChange}
                        value={currentCard.difficulty}
                        placeholder="Difficulty here..."
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="large-12 columns">
                    <label>
                      <input
                        name="question"
                        type="text"
                        onChange={handleChange}
                        value={currentCard.question}
                        placeholder="Question here..."
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="large-12 columns">
                    <label>
                      <input
                        name="answer"
                        type="text"
                        onChange={handleChange}
                        value={currentCard.answer}
                        placeholder="Answer here..."
                      />
                    </label>
                  </div>
                </div>
                <button className="hollow button" type="submit">
                  Add Card
                </button>
              </form>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CreateCardTile;
