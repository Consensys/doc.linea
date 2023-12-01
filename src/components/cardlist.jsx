import React, { useState } from "react";
import Link from '@docusaurus/Link'; // Correct import

function Card({ title, items }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={items[0].link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "10px",
          margin: "1em",
          padding: "1em",
          transition: "0.3s",
          boxShadow: isHovered ? 
          "0 8px 16px 0 rgba(0,0,0,0.2)" : "0 4px 8px 0 rgba(0,0,0,0.2)",
          height: "200px",
          width: "200px",
          overflow: "scroll",
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 style={{ fontWeight: isHovered ? "bold" : "normal" }}>{title}</h3>
      </div>
    </Link>
  );
}

function CardList({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}
export default CardList;