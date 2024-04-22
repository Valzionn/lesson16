import { useState } from "react";

const GameReview = ({ name, desc, review, image }) => {
  return <>Name: {name}</>;
};

export default () => {
  const [reviews, setReviews] = [
    { name: "fifa", desc: "football game", review: 10, image: null },
  ];
  const [showReview, setShowReview] = useState(false);
  return (
    <>
      <GameReview name={reviews.name} />
      <div>
        <button
          style={{ border: "1px solid #eee" }}
          onClick={() => setShowReview(true)}
        >
          New review
        </button>
      </div>
      {showReview ? (
        <>
          <div>
            Name: <input style={{ border: "1px solid #eee" }}></input>
          </div>
          <div>
            Desc: <input style={{ border: "1px solid #eee" }}></input>
          </div>
          <div>
            Score: <input style={{ border: "1px solid #eee" }}></input>
          </div>
        </>
      ) : null}
    </>
  );
};
