import React from "react";

const SkeletonBar = ({index}) => {
  console.log(`index==${JSON.stringify(index)}`);
  return Array(index).fill(0).map((i) => {
    return (
      <div key={i} className="skeleton-bar-container">
        <div className="skeleton-bar-image"></div>
        <div className="skeleton-bar-small-line"></div>
        <div className="skeleton-bar-line"></div>
      </div>
    );
  });
};

export default SkeletonBar;
