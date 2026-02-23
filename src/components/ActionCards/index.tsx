import React from "react";
import BaseCard from "@site/src/components/BaseCard";
import styles from "./styles.module.css";

type ActionCard = {
  text: string;
  href: string;
  image?: string;
};

type Props = {
  cards: ActionCard[];
};

export default function ActionCards({ cards }: Props): React.ReactNode {
  return (
    <div className={styles.grid}>
      {cards.map((card, idx) => (
        <BaseCard key={idx} {...card} />
      ))}
    </div>
  );
}
