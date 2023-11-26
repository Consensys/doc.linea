import React from 'react';

function CardList({ items }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map((item, index) => (
        <div key={index} style={{ flex: '1 0 21%', margin: '1%', padding: '1%', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.link}>Learn more</a>
        </div>
      ))}
    </div>
  );
}

export default CardList;