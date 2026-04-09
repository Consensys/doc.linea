import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

function Card({ title, items }) {
  return (
    <Link to={items[0].link} className={styles.link}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
    </Link>
  );
}

function CardList({ items }) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}

export default CardList;
