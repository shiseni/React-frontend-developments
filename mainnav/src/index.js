import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "./modal";
import { Footer } from "./footer";
import { MainNav } from "./mainnav";

ReactDOM.render(<MainNav main_nav_header={main_nav_header} main_nav_bottom={main_nav_bottom} />, document.querySelector("#mainnav"));
ReactDOM.render(<Modal data={main_nav_bottom} />, document.querySelector(".header-nav"));
ReactDOM.render(<Footer data={main_nav_bottom} />, document.querySelector(".bw-doc#nav-footer"));
