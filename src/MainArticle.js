import React from 'react';

const MainArticle = ({ callToAction, backgroundImgUrl }) => (
  <div
    style={{
      background: `url(${backgroundImgUrl}) no-repeat center center`,
      backgroundSize: 'cover',
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1>{callToAction}</h1>
    </div>
  </div>
);

export default MainArticle;
