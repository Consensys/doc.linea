import React from "react";
import {
  findFirstSidebarItemLink,
  useDocById,
} from "@docusaurus/plugin-content-docs/client";
import { useDocCardDescriptionCategoryItemsPlural } from "@docusaurus/theme-common/internal";
import BaseCard from "@site/src/components/BaseCard";

function CardCategory({ item }) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  if (!href) {
    return null;
  }
  return (
    <BaseCard
      href={href}
      text={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }) {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <BaseCard
      href={item.href}
      text={item.label}
      description={item.description ?? doc?.description}
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
