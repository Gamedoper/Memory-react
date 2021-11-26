import './App.css'
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';

const cardImgaes = [
  { "src": "./img/helmet-1.png", matched: false },
  { "src": "./img/potion-1.png", matched: false },
  { "src": "./img/ring-1.png", matched: false },
  { "src": "./img/scroll-1.png", matched: false },
  { "src": "./img/shield-1.png", matched: false },
  { "src": "./img/sword-1.png", matched: false }
]



function App() {

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(0)

  const [choiceone, setChoiceOne] = useState(null)
  const [choicetwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle the cards
  const shufflecards = () => {
    const shuffledcards = [...cardImgaes, ...cardImgaes]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledcards)
    setFlipped(0)
  }

  const handleChoice = (card) => {
    if (flipped === 0) {
      setChoiceOne(card)
      setFlipped(1)
    } else {
      setChoiceTwo(card)
      setFlipped(0)
    }
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setFlipped(prevFlipped => prevFlipped + 1)
    setDisabled(false)
  }

  // compare 2 selected Cards
  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true)
      if (choiceone.src === choicetwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }

    }
  }, [choiceone, choicetwo])

  // start the game

  useEffect(() => {
    shufflecards()
  }, [])


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shufflecards}>New Game</button>
      <div className="cards">
        {cards && cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceone || card === choicetwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {flipped} </p>
    </div>
  );
}

export default App