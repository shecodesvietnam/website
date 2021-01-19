import React, { useState } from "react";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Event from "./pages/Event";
import Hackathon from "./pages/Hackathon";
import TechMarathon from "./pages/TechMarathon";
import Staffs from "./pages/Staffs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Sponsors from "./pages/Sponsors";
import About from "./pages/About";
import { githubRawAssets } from "./config.json";
import "./App.css";
import "./style/icon-font.css";

const NavBarHeader = styled.div`
  box-sizing: border-box;
  background-color: #161616;
  margin: 0 auto;
  height: 6rem;
  border-bottom: 1px solid #3f3f3f;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
  padding-top: 1rem;
`;

const NavBarBox = styled.div`
  height: 100%;
  max-width: 1140px;
  margin: auto;
`;

const LogoBox = styled.div`
  float: left;
  margin-left: 1rem;
  width: calc((100% - 2 * 6rem) / 3);
`;

const Logo = styled.img`
  float: left;
  width: 15rem;
  transition: all 0.4s ease;
  &:hover {
    transform: rotate(5deg) scale(1.3);
  }
  @media only screen and (max-width: 56.25em) {
    transition-property: none;
    &:hover {
      transform: none !important;
    }
  }
`;

const NavBox = styled.div`
  float: left;
  width: calc(2 * ((100% - 2 * 6rem) / 3) + 6rem);
`;

const MenuList = styled.ul`
  box-sizing: border-box;
  text-align: right;
  padding: 0;
  margin: 0;
  padding-top: 0.2rem !important;
  @media only screen and (max-width: 56.25em) {
    opacity: ${(props) => (!props.show ? 0 : 1)};
    visibility: ${(props) => (!props.show ? "hidden" : "visible")};
    float: none;
    text-align: left;
    position: absolute;
    top: 5rem;
    left: 0;
    background-color: #161616;
    width: 100%;
    border-bottom: 1px solid #3f3f3f;
  }
`;

const MenuItem = styled.li`
  color: #f0f0f0;
  margin-right: ${(props) => (!props.last ? 2 : 0)}rem;
  display: inline-block;
  @media only screen and (max-width: 56.25em) {
    display: block;
    margin: 2rem 0;
    padding-left: 2rem;
  }
  box-sizing: border-box;
`;

const LinkItem = styled(NavLink)`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  line-height: 1.7;
  &:link,
  &:visited {
    display: inline-block;
    text-decoration: none;
    color: #f0f0f0;
  }
  font-size: 2rem;
  transition: all 0.4s ease-in-out;
  &:hover {
    cursor: pointer;
    outline: none;
    background-image: linear-gradient(to right, #e80872, #592368);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transform: rotate(5deg) scale(1.3);
  }
  @media only screen and (max-width: 56.25em) {
    transition-property: none;
    &:hover {
      transform: none !important;
    }
  }
`;

const LinkItemActive = (props) => {
  return (
    <LinkItem
      activeStyle={{
        outline: "none",
        backgroundImage: "linear-gradient(to right, #e80872, #592368)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      {...props}
    />
  );
};

const ButtonLabel = styled.label`
  height: 7rem;
  width: 7rem;
  position: fixed;
  top: -0.5rem;
  right: 0rem;
  z-index: 2000;
  box-shadow: 0 1rem 3rem rgba(#161616, 0.1);
  text-align: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  @media only screen and (max-width: 56.25em) {
    opacity: 1;
    visibility: visible;
  }
`;

const ButtonIcon = styled.span`
  position: relative;
  margin-top: 3.5rem;

  &,
  &::before,
  &::after {
    width: 3rem;
    height: 2px;
    background-color: #3f3f3f;
    display: inline-block;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    transition: all 0.2s;
  }

  &::before {
    top: -0.8rem;
  }
  &::after {
    top: 0.8rem;
  }
`;

const FooterBox = styled.footer`
  background-color: #161616;
  padding: 3rem;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

const FooterLogoBox = styled.div`
  margin: 0 auto;
  width: 75%;
  box-sizing: border-box;
  line-height: 1.7;
`;

const Row = styled.div`
  max-width: 114rem;
  margin: 0 auto;
  margin-top: 6rem !important;
  margin-bottom: 1.5rem !important;
  line-height: 1.7;
  &:not(:last-child) {
    margin-bottom: 8rem;
    @media only screen and (max-width: 56.25em) {
      margin-bottom: 6rem;
    }
  }
  @media only screen and (max-width: 56.25em) {
    max-width: 50rem;
    padding: 0 3rem;
  }
  &::after {
    content: "";
    display: table;
    clear: both;
  }
  [class^="col-"] {
    float: left;
    margin-bottom: 1rem;

    &:not(:last-child) {
      margin-right: 6rem;

      @media only screen and (max-width: 56.25em) {
        margin-right: 0;
        margin-bottom: 6rem;
      }
    }

    @media only screen and (max-width: 56.25em) {
      width: 100% !important;
    }
  }
  .col-1-of-2 {
    width: calc((100% - 6rem) / 2);
  }

  .col-1-of-3 {
    width: calc((100% - 2 * 6rem) / 3);
  }

  .col-2-of-3 {
    width: calc(2 * ((100% - 2 * 6rem) / 3) + 6rem);
  }

  .col-1-of-4 {
    width: calc((100% - 3 * 6rem) / 4);
  }

  .col-2-of-4 {
    width: calc(2 * ((100% - 3 * 6rem) / 4) + 6rem);
  }

  .col-3-of-4 {
    width: calc(3 * ((100% - 3 * 6rem) / 4) + 2 * 6rem);
  }
`;

const InfoRow = styled.ul`
  padding-top: 1rem;
  border-top: 1px solid #3f3f3f;
  text-align: center !important;
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-top: 1rem;
  box-sizing: border-box;
`;

const FooterItem = styled.li`
  display: inline-block;
  margin-right: 1.5rem;
  box-sizing: border-box;
`;

const FooterLinkItem = styled(Link)`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  line-height: 1.7;
  text-align: center;
  &:link,
  &:visited {
    display: inline-block;
    text-decoration: none;
    color: #f0f0f0;
  }
  font-size: 2rem;
  transition: all 0.4s ease;
  &:hover {
    cursor: pointer;
    outline: none;
    background-image: linear-gradient(to right, #e80872, #592368);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transform: rotate(5deg) scale(1.3);
  }
  @media only screen and (max-width: 56.25em) {
    transition-property: none;
    &:hover {
      transform: none !important;
    }
  }
`;

const MediaBox = styled.div`
  border-top: 1px solid #3f3f3f;
  margin-bottom: 4rem !important;
  @media only screen and (max-width: 56.25em) {
    margin-bottom: 3rem !important;
  }
`;

const FollowUs = styled.p`
  font-size: 2rem;
  text-align: center !important;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  line-height: 1.7;
  color: #f0f0f0;
  margin: 0;
  padding: 0;
`;

const MediaList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MediaItem = styled.i`
  font-size: 2rem;
  margin: 0 0.5rem;
  transition: transform 0.4s ease !important;
  &:hover {
    cursor: pointer;
    outline: none;
    background-image: linear-gradient(to right, #e80872, #592368);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transform: rotate(5deg) scale(1.3);
  }
`;

const CopyRight = styled.p`
  font-size: 2rem;
  text-align: center !important;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  line-height: 1.7;
  color: #f0f0f0;
  margin: 0;
  padding: 0;
`;

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <NavBarHeader>
        <NavBarBox>
          <LogoBox>
            <Link to="/">
              <Logo
                src={`${githubRawAssets}/2020/media/logo-2020.png`}
                alt="SheCodes Logo"
                onClick={() => setShow(false)}
              />
            </Link>
          </LogoBox>
          <NavBox>
            <MenuList show={show}>
              <MenuItem>
                <LinkItemActive to="/hackathon" onClick={() => setShow(false)}>
                  Hackathon 2020
                </LinkItemActive>
              </MenuItem>
              <MenuItem>
                <LinkItemActive
                  to="/tech-marathon"
                  onClick={() => setShow(false)}
                >
                  Tech Marathon
                </LinkItemActive>
              </MenuItem>
              <MenuItem>
                <LinkItemActive to="/event" onClick={() => setShow(false)}>
                  Sự kiện khác
                </LinkItemActive>
              </MenuItem>
              {/* <MenuItem>
                <LinkItemActive to="/staffs" onClick={() => setShow(false)}>
                  Đội ngũ
                </LinkItemActive>
              </MenuItem> */}
              <MenuItem last>
                <LinkItemActive to="/blog" onClick={() => setShow(false)}>
                  Blog
                </LinkItemActive>
              </MenuItem>
            </MenuList>
          </NavBox>
          <ButtonLabel onClick={() => setShow(!show)}>
            <ButtonIcon />
          </ButtonLabel>
        </NavBarBox>
      </NavBarHeader>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/blog/:postId" component={BlogDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/event" component={Event} />
        <Route path="/hackathon" component={Hackathon} />
        <Route path="/tech-marathon" component={TechMarathon} />
        <Route path="/staffs" component={Staffs} />
        <Route path="/contact" component={Contact} />
        <Route path="/faqs" component={FAQ} />
        <Route path="/sponsors" component={Sponsors} />
        <Route path="/about" component={About} />
      </Switch>
      <FooterBox>
        <FooterLogoBox>
          <img
            src={`${githubRawAssets}/2020/media/logo-2020.png`}
            alt="SheCodes Logo"
          />
        </FooterLogoBox>
        <Row>
          <div className="col-1-of-2">
            <InfoRow>
              <FooterItem>
                <FooterLinkItem to="/contact">Liên hệ</FooterLinkItem>
              </FooterItem>
              <FooterItem>
                <FooterLinkItem to="/about">Giới thiệu</FooterLinkItem>
              </FooterItem>
              <FooterItem>
                <FooterLinkItem to="/sponsors">Nhà tài trợ</FooterLinkItem>
              </FooterItem>
              <FooterItem>
                <FooterLinkItem to="/faqs">FAQs</FooterLinkItem>
              </FooterItem>
            </InfoRow>
          </div>
          <div className="col-1-of-2">
            <MediaBox>
              <FollowUs>Follow us</FollowUs>
              <MediaList>
                <FooterItem>
                  <LinkItem
                    as="a"
                    href="https://www.facebook.com/shecodesvietnam/"
                    target="_blank"
                  >
                    <MediaItem className="fab fa-facebook" />
                  </LinkItem>
                </FooterItem>
                <FooterItem>
                  <LinkItem
                    as="a"
                    href="https://www.instagram.com/Shecodes.vietnam"
                    target="_blank"
                  >
                    <MediaItem className="fab fa-instagram" />
                  </LinkItem>
                </FooterItem>
                <FooterItem>
                  <LinkItem
                    as="a"
                    href="https://www.linkedin.com/company/shecodeshackathon/"
                    target="_blank"
                  >
                    <MediaItem className="fab fa-linkedin" />
                  </LinkItem>
                </FooterItem>
              </MediaList>
            </MediaBox>
          </div>
        </Row>
        <CopyRight>
          Thiết kế và phát triển với{" "}
          <span role="img" style={{ fontSize: "2rem" }} aria-label="heart">
            💖
          </span>{" "}
          bởi SheCodes Hà Nội
        </CopyRight>
      </FooterBox>
    </div>
  );
}

export default App;
