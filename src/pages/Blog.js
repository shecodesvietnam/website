import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Card } from "./../components/Card";
import { FlexBox } from "./../components/Box";
import { pipe } from "./../utils/pipe";
import { simplyContent, replaceLink, replaceHashtag } from "./../utils/web";
import { apiUrl } from "./../config.json";
import { ColorfulText } from "../components/Text";

const BlogBox = styled.div`
  margin-top: 6rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #000;
`;

const BlogImage = styled.div`
  display: block;
  max-width: 100%;
  margin: auto;
  width: 400px;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  @media only screen and (max-width: 56.25em) {
    margin-left: 0;
    margin-right: 1rem;
    max-height: 100%;
  }
`;

const BlogText = styled.span`
  font-size: 1.6rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  line-height: 1.7;
  text-align: left;
  color: #f0f0f0;
  margin: auto;
  margin-top: 1rem;
  margin-botton: 1rem;
  box-sizing: border-box;
  @media only screen and (max-width: 56.25em) {
    margin: auto;
  }
`;

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // TODO: GET Post List and set to articles using the structure with attributes: id, images, title, content
    fetch(`${apiUrl}/posts`)
      .then((res) => {
        return res.json();
        // setArticles(res.data);
      })
      .then((data) => setArticles(data))
      .catch(console.error);
  }, []);

  return (
    <BlogBox>
      <FlexBox
        wrap="wrap"
        smallDirection="row"
        margin="auto"
        maxWidth
        addition="justify-content: center;"
      >
        {(articles &&
          articles.length !== 0 &&
          articles.map((e, i) => (
            <Card
              key={i}
              direction="column"
              smallDirection="row"
              rel="noopener noreferrer"
              width="50rem"
              margin={"0.5rem"}
              padding={"1rem"}
              smallHeight={"13rem"}
              smallWidth={"30rem"}
              hover
              as={Link}
              to={{
                pathname: `/blog/${e._id}`,
                state: {
                  data: e,
                },
              }}
            >
              <BlogImage
                style={{
                  backgroundImage: `url("${apiUrl}/media/image/${e.images[0]}")`,
                }}
              />
              <BlogText>
                {parse(
                  pipe(e.content, [
                    simplyContent(20),
                    replaceLink(/(https?:\/\/[^\s]+)/g, {
                      color: "lightblue",
                      fontSize: 1.6,
                    }),
                    replaceHashtag(/\B#\w\w+\b/g, {
                      color: "lightblue",
                      fontSize: 1.6,
                    }),
                  ])
                )}
                {" ..."}
              </BlogText>
            </Card>
          ))) || (
          <ColorfulText
            as="h2"
            textAlign="center"
            fontSize="4rem"
            fontWeight="700"
            letterSpacing="0.2rem"
            lineHeight="1.7"
            width="90%"
          >
            Coming soon
          </ColorfulText>
        )}
      </FlexBox>
    </BlogBox>
  );
};

export default Blog;
