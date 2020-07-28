import React from "react";

const Like = ({ onLike, movie }) => {
  let classes = "fa fa-heart";
  if (!movie.flag) classes += "-o";

  return (
    <i
      onClick={() => onLike(movie)}
      style={{ cursor: "pointer" }}
      className={classes}
    ></i>
  );
};

export default Like;
