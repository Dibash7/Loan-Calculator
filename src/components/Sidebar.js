import React from "react";
import { push as Menu } from "react-burger-menu";
import Container from "./Container";
const Sidebar = props => {
  return (
    <Menu noOverlay disableOverlayClick={false} {...props}>
      <Container prevUpdate={props.prevUpdate} />
    </Menu>
  );
};

export default Sidebar;
