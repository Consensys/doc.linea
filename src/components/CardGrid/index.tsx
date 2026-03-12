import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { ArrowIcon } from "@site/src/components/icons";
import styles from "./styles.module.css";

type CardItem = {
  title: string;
  link: string;
  description: React.ReactNode;
  iconSrc?: string;
};

function Card({ title, link, description, iconSrc }: CardItem) {
  return (
    <div className={clsx("col", "col--4", "margin-top--md")}>
      <Link to={link} className={styles.cardLink}>
        <div className={clsx("card", styles.card)}>
          {iconSrc && (
            <div className={clsx("card__header", styles.cardHeader)}>
              <img src={iconSrc} alt="" className={styles.cardIcon} />
            </div>
          )}
          <div className={clsx("card__body", styles.cardBody)}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.arrowButton}>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

type Props = {
  heading: string;
  cards: CardItem[];
  equalizeHeights?: boolean;
};

export default function CardGrid({
  heading,
  cards,
  equalizeHeights = true,
}: Props): React.ReactNode {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setEqualHeight = () => {
      const row = rowRef.current;
      if (!row) return;
      if (!equalizeHeights) return;

      const cardElements = Array.from(
        row.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>,
      );

      if (cardElements.length === 0) return;

      cardElements.forEach((card) => {
        card.style.height = "auto";
      });

      const cardHeights = cardElements.map((card) => card.offsetHeight);
      const maxHeight = Math.max(...cardHeights);

      cardElements.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);

    return () => {
      window.removeEventListener("resize", setEqualHeight);
    };
  }, [equalizeHeights]);

  return (
    <section
      className={clsx("margin-top--lg", "margin-bottom--lg", styles.section)}>
      <div className={styles.cardContainer}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className="row" ref={rowRef}>
          {cards.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
