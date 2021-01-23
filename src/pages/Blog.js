import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Card } from "./../components/Card";
import { FlexBox } from "./../components/Box";
import { pipe } from "./../utils/pipe";
import { simplyContent, replaceLink, replaceHashtag } from "./../utils/web";
import { queryPostList } from "../models/posts";

const BlogBox = styled.div`
  margin-top: 6rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #000;
`;

const BlogImage = styled.img`
  display: block;
  max-width: 100%;
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

const Blog = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // TODO: GET Post List and set to articles using the structure with attributes: id, images, title, content
    queryPostList()
      .then((posts) => setArticles(posts))
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
        {articles.map((article, index) => (
          <Card
            direction="column"
            smallDirection="row"
            rel="noopener noreferrer"
            width="50rem"
            key={"card_" + index}
            margin={"0.5rem"}
            padding={"1rem"}
            smallHeight={"13rem"}
            smallWidth={"30rem"}
            hover
            as={Link}
            to={{
              pathname: `/blog/${article.id}`,
              state: {
                data: article,
              },
            }}
          >
            {/* <BlogImage src={article.images[0]} /> */}
            <BlogText>
              {parse(
                pipe(article.content, [
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
        ))}
        {/* {articles.length !== 0 && (
          <Card
            direction="column"
            smallDirection="row"
            rel="noopener noreferrer"
            width="50rem"
            // key={"card_" + index}
            margin={"0.5rem"}
            padding={"1rem"}
            smallHeight={"13rem"}
            smallWidth={"30rem"}
            hover
            as={Link}
            to={{
              pathname: `/blog/${articles[0].id}`,
              state: {
                data: articles[0],
              },
            }}
          >
            <BlogImage src={articles[0].images[0]} />
            <BlogText>
              {parse(
                pipe(articles[0].content, [
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
        )} */}
      </FlexBox>
    </BlogBox>
  );
};

export default Blog;
