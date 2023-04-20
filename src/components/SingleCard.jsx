import "./SingleCard.css";
function SingleCard({ card, handleChoice }) {
  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          alt="cover"
          onClick={() => handleChoice(card)}
        />
      </div>
    </div>
  );
}

export default SingleCard;
