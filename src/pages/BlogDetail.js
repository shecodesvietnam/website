import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Disqus from "disqus-react";

import { Box } from "./../components/Box";
import { ColorfulText, NormalText } from "./../components/Text";
import { pipe } from "./../utils/pipe";
import { replaceLink, replaceHashtag } from "./../utils/web";
import { apiUrl } from "./../config.json";

// TODO: Convert to Graph API query-by-ID function
import { useParams } from "react-router";

function BlogDetail() {
  const { postId } = useParams();
  console.log(postId);
  const [detail, setDetail] = useState();

  useEffect(() => {
    fetch(`${apiUrl}/posts/${postId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setDetail(data))
      .catch(console.error);
  }, [postId]);

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
          {detail &&
            detail.images.map((image, index) => (
              <div key={index}>
                <img src={`${apiUrl}/media/image/${image}`} alt={image} />
              </div>
            ))}
        </Carousel>
        <ColorfulText
          as="h2"
          textAlign="center"
          fontSize="4rem"
          fontWeight="700"
          letterSpacing="0.2rem"
          lineHeight="1.7"
          width="90%"
        >
          {detail && detail.title}
        </ColorfulText>
        {detail &&
          detail.content.split(/\r*\n\s*/g).map(function paragraph(p, index) {
            return (
              <NormalText
                as="p"
                display="block"
                lineHeight="1.7"
                padding="0 1%"
                fontSize="2rem"
                key={index}
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
        {/* <div style={{ paddingTop: "2rem" }}>
          <Disqus.DiscussionEmbed
            shortname={detail && `shecodesvietnam`}
            config={
              detail && {
                url: `https://shecodesvietnam.com/#/blog/${postId}`,
                identifier: String(postId),
                title: detail.title,
              }
            }
          />
        </div> */}
      </Box>
    </Box>
  );
}

export default BlogDetail;
