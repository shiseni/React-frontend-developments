import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/base/header/header";
import { MainNav } from "./components/base/mainnav/mainnav";
import { Footer } from "./components/base/mainnav/footer";
import { Navigate } from "./components/base/navigate/navigate";
import { TextFooter } from "./components/base/textfooter/textfooter";

import { NoMatch } from "./components/not_match";
import { Home } from "./components/home/home";
import { About } from "./components/about/about";
import { Projects } from "./components/projects/projects";
import { Gallery } from "./components/projects/gallery/gallery";
import { PhotosWrapper as Photos } from "./components/projects/photo/photo";

const App = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [stylePath, setStylePath] = useState(null);

  return (
    <div className="bg">
      <link rel="stylesheet" type="text/css" href={stylePath} />
      <BrowserRouter>
        <Header />
        <MainNav />
        <div className="bw-doc" id="main-container">
          <div className="mid">
            {showNavigation ? <Navigate /> : null}
            <div className="col-xs-9">
              <Routes>
                <Route path="*" element={<NoMatch setShowNavigation={setShowNavigation} setStylePath={setStylePath} />} />
                <Route path="/" element={<Home setShowNavigation={setShowNavigation} setStylePath={setStylePath} />} />
                <Route path="about" element={<About setShowNavigation={setShowNavigation} setStylePath={setStylePath} />} />
                <Route path="projects" element={<Projects setShowNavigation={setShowNavigation} setStylePath={setStylePath} />} />
                <Route path="projects/gallery" element={<Gallery setShowNavigation={setShowNavigation} setStylePath={setStylePath} />} />
                <Route path="projects/gallery/photos/:id" element={<Photos setShowNavigation={setShowNavigation} setStylePath={setStylePath} />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
        <TextFooter />
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector(".app"));
