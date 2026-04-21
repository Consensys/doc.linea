import React from "react";
import { findFirstSidebarItemLink } from "@docusaurus/plugin-content-docs/client";
import BaseCard from "@site/src/components/BaseCard";

function CardCategory({ item }) {
  const href = findFirstSidebarItemLink(item);
  if (!href) {
    return null;
  }
  return <BaseCard href={href} text={item.label} />;
}

function CardLink({ item }) {
  return <BaseCard href={item.href} text={item.label} />;
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
