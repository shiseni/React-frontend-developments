import React from "react";
import { Modal } from "../mainnav/modal";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const Header = () => {
  return (
    <div className="bw-doc" id="header">
      <div className="header">
        <Modal />
        <div id="brand_image">
          <Link to="/">
            <img src="/static/brand.png" />
          </Link>
        </div>
        <div id="header_icons">
          <div className="" id="ico_main_page">
            <Link to="/">
              <HomeOutlinedIcon color="action" display="block" sx={{ fontSize: 48 }} />
            </Link>
          </div>
          <div className="" id="ico_about_page">
            <Link to="/about">
              <InfoOutlinedIcon color="action" display="block" sx={{ fontSize: 48 }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
