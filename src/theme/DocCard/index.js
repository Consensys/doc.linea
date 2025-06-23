import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  useDocById,
  findFirstSidebarItemLink,
} from "@docusaurus/plugin-content-docs/client";
import { usePluralForm } from "@docusaurus/theme-common";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
  return (count) =>
    selectMessage(
      count,
      translate(
        {
          message: "1 item|{count} items",
          id: "theme.docs.DocCard.categoryDescription.plurals",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count },
      ),
    );
}
function CardContainer({ className, href, children }) {
  return (
    <Link
      href={href}
      className={clsx("card padding--lg", styles.cardContainer, className)}>
      {children}
    </Link>
  );
}
function CardLayout({ className, href, icon, title, description, type }) {
  const cardStyle =
    type === "featured" ? styles.featuredCard : styles.cardContainer;
  const titleClass =
    type === "featured" ? styles.featuredCardTitle : styles.cardTitle;
  const descriptionClass =
    type === "featured"
      ? styles.featuredCardDescription
      : styles.cardDescription;

  return (
    <CardContainer href={href} className={cardStyle}>
      <Heading as="h2" className={clsx(titleClass)} title={title}>
        {icon} {title}
      </Heading>
      {description && (
        <p className={clsx(descriptionClass)} title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}
function CardCategory({ item }) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <CardLayout
      className={item.className}
      href={href}
      icon="🗃️"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}
function CardLink({ item }) {
  const icon = isInternalUrl(item.href) ? "📄️" : "🔗";
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
      type={item.featured ? "featured" : "link"}
    />
  );
}
export default function DocCard({ item }) {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
