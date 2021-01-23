import React from "react";
import parse from "html-react-parser";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Box } from "./../components/Box";
import { NormalText } from "./../components/Text";
import { pipe } from "./../utils/pipe";
import { replaceLink, replaceHashtag } from "./../utils/web";
import { queryPost } from "../models/posts";

function BlogDetail(props) {
  var detail;

  if (!props.location.state) {
    detail = queryPost(props.match.params.postId);
  } else {
    detail = props.location.state.data;
  }

  return (
    <Box as="div" margin="0" padding="10rem 0 10rem 0" backgroundColor="#000">
      <Box
        as="article"
        display="block"
        margin="0 auto"
        width="90%"
        maxWidth
        textAlign="justify"
      >
        <Carousel>
          {detail.images.map((image) => (
            <div>
              <img src={image} alt="Shopee Code League" />
            </div>
          ))}
        </Carousel>
        {detail.content.split(/\r*\n\s*/g).map(function paragraph(p) {
          return (
            <NormalText
              as="p"
              display="block"
              lineHeight="1.7"
              padding="0 1%"
              fontSize="2rem"
            >
              {parse(
                pipe(p, [
                  replaceLink(/(https?:\/\/[^\s]+)/g, {
                    color: "lightblue",
                    fontSize: 2,
                  }),
                  replaceHashtag(/\B#\w\w+\b/g, {
                    color: "lightblue",
                    fontSize: 2,
                  }),
                ])
              )}
            </NormalText>
          );
        })}
        {/* TODO: If user has logged in, display like, share button */}
        {/* TODO: If user has logged in, display comment section*/}
      </Box>
    </Box>
  );
}

export default BlogDetail;
