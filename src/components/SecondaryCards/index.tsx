import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
  buttonName: JSX.Element; // Updated to allow JSX.Element for SVG
  buttonType:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link";
};

const CardList: CardItem[] = [
  {
    title: "Create your builder profile",
    link: "https://names.linea.build/",
    description: <>Claim your Linea Name to establish your onchain identity.</>,
    buttonName: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9358 0.0886693L15.8627 3.01557V11.6618L13.6272 11.6618L13.6272 3.94154L13.6089 3.92331L2.2039 15.3284L0.623169 13.7476L12.0282 2.34257L12.0098 2.32416L4.22512 2.32412L4.22513 0.088623L12.9358 0.0886693Z"
          fill="currentColor"></path>
      </svg>
    ),
    buttonType: "primary",
  },
  {
    title: "Get funded",
    link: "https://linea.build/linea-ecosystem-investment-alliance",
    description: (
      <>
        Get rewarded, secure grants and funding opportunities to bring your
        projects to life on Linea.
      </>
    ),
    buttonName: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9358 0.0886693L15.8627 3.01557V11.6618L13.6272 11.6618L13.6272 3.94154L13.6089 3.92331L2.2039 15.3284L0.623169 13.7476L12.0282 2.34257L12.0098 2.32416L4.22512 2.32412L4.22513 0.088623L12.9358 0.0886693Z"
          fill="currentColor"></path>
      </svg>
    ),
    buttonType: "success",
  },
  {
    title: "Get noticed",
    link: "https://consensys-software.typeform.com/to/kSYGqACt?typeform-source=linea.build",
    description: (
      <>
        Get amplified and showcase your work to the Linea community and beyond.
      </>
    ),
    buttonName: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9358 0.0886693L15.8627 3.01557V11.6618L13.6272 11.6618L13.6272 3.94154L13.6089 3.92331L2.2039 15.3284L0.623169 13.7476L12.0282 2.34257L12.0098 2.32416L4.22512 2.32412L4.22513 0.088623L12.9358 0.0886693Z"
          fill="currentColor"></path>
      </svg>
    ),
    buttonType: "info",
  },
  {
    title: "Get involved",
    link: "https://discord.com/invite/linea",
    description: (
      <>
        Join the vibrant Linea Discord to connect with like-minded builders,
        collaborate on ideas and projects, and build the future together.
      </>
    ),
    buttonName: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9358 0.0886693L15.8627 3.01557V11.6618L13.6272 11.6618L13.6272 3.94154L13.6089 3.92331L2.2039 15.3284L0.623169 13.7476L12.0282 2.34257L12.0098 2.32416L4.22512 2.32412L4.22513 0.088623L12.9358 0.0886693Z"
          fill="currentColor"></path>
      </svg>
    ),
    buttonType: "info",
  },
];

function Card({ title, link, description, buttonName, buttonType }: CardItem) {
  return (
    <div className={clsx("col", "col--3", "margin-top--md")}>
      <Link to={link} className={clsx("card-demo", styles.cardDemo)}>
        <div className={clsx("card", styles.card_glow)}>
          <div className={clsx("card__header", styles.cardHeader)}>
            <div className={styles.cardTitle}>
              <h3>{title}</h3>
            </div>
          </div>
          <div className={clsx("card__body", styles.cardBody)}>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={clsx("card__footer", styles.cardFooter)}>
            <span
              className={clsx(
                "button",
                "button--" + buttonType,
                styles.button,
              )}>
              {buttonName}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageCards(): JSX.Element {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setEqualHeight = () => {
      const row = rowRef.current;
      if (!row) return;

      const cards = Array.from(
        row.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>,
      );
      cards.forEach((card) => {
        card.style.height = "auto";
      });

      const cardHeights = cards.map((card) => card.offsetHeight);
      const maxHeight = Math.max(...cardHeights);

      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };

    setEqualHeight();
    window.addEventListener("resize", setEqualHeight);

    return () => {
      window.removeEventListener("resize", setEqualHeight);
    };
  }, []);

  return (
    <section className={clsx("margin-top--lg", "margin-bottom--lg")}>
      <div className={styles.cardContainer}>
        <br />
        <h1 className={styles.heading}>BUILDER OFFERING</h1>
        <br />
        <div className="row" ref={rowRef} style={{ paddingBottom: "3rem" }}>
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
