import React from "react";
import clsx from "clsx";
import Link from '@docusaurus/Link';
import styles from "./styles.module.css";
import CardIcon1 from '../../../static/img/icon_bridge.svg';
import CardIcon2 from '../../../static/img/icon_developer.svg';
import CardIcon3 from '../../../static/img/icon_blockexplorer.svg';
import CardIcon4 from '../../../static/img/icon_group.svg';

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
  buttonName: string;
  buttonType:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link";
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const CardList: CardItem[] = [
  {
    title: "Bridge your funds",
    link: "/use-mainnet/bridges-of-linea/bridging-non-dev",
    description: (
      <>
       Learn how to safely bridge your tokens over to Linea via MetaMask and ecosystem bridges!
      </>
    ),
    buttonName: "Bridge",
    buttonType: "primary",
    icon: CardIcon1,
  },
  {
    title: "Developer quickstart",
    link: "/build-on-linea/quickstart",
    description: (
      <>
        Deploy and verify your first smart contract on Linea using your favorite
        developer tools!
      </>
    ),
    buttonName: "Build",
    buttonType: "success",
    icon: CardIcon2,
  },
  {
    title: "Linea block explorer",
    link: "https://lineascan.build/",
    description: (
      <>
        View transactions and find deployed contracts and wallet addresses on
        block explorers!
      </>
    ),
    buttonName: "Explore",
    buttonType: "info",
    icon: CardIcon3,
  },
  {
    title: "Linea builders club",
    link: "https://linea.deform.cc/linea-builders-club",
    description: (
      <>
        Join our builders club for exclusive access to tech talks, Linea core team, tiny grants, events, and more!
      </>
    ),
    buttonName: "Join",
    buttonType: "info",
    icon: CardIcon4,
  },
];

function Card({ title, link, description, buttonName, buttonType, icon: Icon }: CardItem) {
  return (
    <div className={clsx("col", "col--3", "margin-top--md")}>
      <div className={clsx("card-demo", styles.cardDemo)}>
        <div className={clsx("card", styles.card_glow)}>
          <div className={styles.circle}></div>
          <div
            className={clsx("card__header", styles.cardHeader)}
            style={{
              textAlign: "left",
              paddingLeft: "40px",
            }}>
            <div style={{ position: 'absolute', right: 18 }}>
              <Icon style={{ width: '50px', height: '50px' }} />
            </div>
            <div style={{ paddingTop: "50px" }}>
              <h3 style={{ fontSize: "30px", fontWeight: "300", marginBottom: "0" }}>{title}</h3>
            </div>
          </div>
          <div
            className={clsx("card__body", styles.cardBody)}
            style={{
              textAlign: "left",
              paddingLeft: "40px",
            }}>
            <p style={{ fontSize: "18px", fontWeight: "300", marginTop: "0" }}>{description}</p>
          </div>
          <div
            className="card__footer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              paddingBottom: "30px",
            }}>
            <Link
              className={clsx(
                "button",
                "button--" + buttonType,
                "button--block",
                styles.button
              )}
              to={link}
              style={{
                width: "90%",
              }}>
              {buttonName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageCards(): JSX.Element {
  return (
    <section className={clsx("margin-top--lg", "margin-bottom--lg")}>
      <div className={clsx("container", styles.cardContainer)}>
        <br />
        <h1 className={styles.heading}>Quick links</h1>
        <br />
        <div className="row" style={{ paddingBottom: "3rem" }}>
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
