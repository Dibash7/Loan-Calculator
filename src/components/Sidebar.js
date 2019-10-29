import React from "react";
import { push as Menu } from "react-burger-menu";
import Container from "./Container";
const Sidebar = props => {
  // const styles = {
  //   color: "white",
  //   // display: "flex",
  //   // justifyContent: "center",
  //   // flexWrap: "noWrap",
  //   height: "100vh"
  // };

  return (
      <Menu noOverlay disableOverlayClick={false} {...props}>
        <Container prevUpdate={props.prevUpdate} />
      </Menu>

  );
};

export default Sidebar;
