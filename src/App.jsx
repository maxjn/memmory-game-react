import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", match: false },
  { src: "/img/potion-1.png", match: false },
  { src: "/img/ring-1.png", match: false },
  { src: "/img/scroll-1.png", match: false },
  { src: "/img/shield-1.png", match: false },
  { src: "/img/sword-1.png", match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // Shuffling cards on new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset Choice
  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  // Comparing Choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src == choiceOne.src) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        resetChoice();
      } else {
        resetChoice();
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => shuffleCards()}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
