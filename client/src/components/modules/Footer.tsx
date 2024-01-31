import React from "react";
import { Container, Group, Anchor } from "@mantine/core";
import "./Footer.css";

const links = [{ link: "mailto:grac@mit.edu", label: "contact the team behind booksalotl!      " }];

export function FooterSimple() {
  const items = (
    <a className="Footer-links" href={"mailto:grac@mit.edu"}>
      {"contact the team behind bookblendr!      "}
    </a>
  );

  return (
    <div className="Footer-footer">
      <Container className="Footer-inner">
        <Group className="Footer-links" key={1}>
          {items}
        </Group>
      </Container>
    </div>
  );
}
