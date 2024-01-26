import React from "react";
import { Container, Group, Anchor } from "@mantine/core";
import "./Footer.css";

const links = [
  { link: "#", label: "contact      " },
  { link: "#", label: "privacy      " },
  { link: "#", label: "blog      " },
  { link: "#", label: "careers" },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <a className="Footer-links" href={link.link}>
      {link.label}
    </a>
  ));

  return (
    <div className="Footer-footer">
      <Container className="Footer-inner">
        <Group className="Footer-links">{items}</Group>
      </Container>
    </div>
  );
}
