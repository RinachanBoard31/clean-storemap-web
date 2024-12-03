import React, { useState } from "react";

type Props = {
  isFavorite: boolean;
  onHandleFavoriteButtonClick: () => void;
};

export const StoreFavoriteButton: React.FC<Props> = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  function handleFavoriteButtonClick() {
    setIsFavorite(true);
    props.onHandleFavoriteButtonClick();
  }

  return (
    <>
      {isFavorite ? (
        <p>お気に入り登録済</p>
      ) : (
        <button onClick={handleFavoriteButtonClick}>お気に入りに登録</button>
      )}
    </>
  );
};
