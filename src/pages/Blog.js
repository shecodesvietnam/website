import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { Card } from "./../components/Card";
import { FlexBox } from "./../components/Box";
import { pipe } from "./../utils/pipe";
import { simplyContent, replaceLink, replaceHashtag } from "./../utils/web";
import { githubRawAssets } from "./../config.json";

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

// TODO: Using Graph API to retrive post list
async function queryPostList() {
  return Promise.all([
    {
      id: "shopee-code-league",
      images: [
        `${githubRawAssets}/2021/shopee-code-league/138333691_852685695512827_5225337392101164836_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138337842_852685688846161_7768404395455400447_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138654464_852685735512823_8334137342891119844_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138714444_852685815512815_8887944370065377149_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138814218_852685848846145_4341157711619049190_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138874367_852685762179487_6023640680178687749_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138945094_852685678846162_895022550607982408_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/139709282_852685792179484_2250366936540888764_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/140249641_852685758846154_2920704111411839066_o.jpg`,
      ],
      content:
        "[Chia sẻ cơ hội] Với vai trò đối tác hỗ trợ các chương trình, cuộc thi về CNTT tại Việt Nam. Lần này, SheCodes xin chia sẻ cơ hội tham gia giải đấu lập trình đến từ Shopee cho cộng đồng các SheCoders ^^ Ngoài các giải thưởng chính, cuộc thi sẽ có thêm giải thưởng tiền mặt trị giá $500 SGD dành cho top team với 100% thành viên là nữ coders. Chúc mọi người may mắn! #codelikeagirl\n Bạn đã sẵn sàng để tham gia Giải đấu Lập trình Online lớn nhất của @Shopee chưa? Sau thành công năm 2020, Shopee Code League 2021 mùa hai sẽ trở lại vào ngày 6 - 20 tháng 3 sắp tới! Đây là một sân chơi không thể bỏ qua đối với các bạn sinh viên và chuyên gia trong toàn khu vực để thử sức và thi đấu về khả năng lập trình của mình. Thành lập ngay một team từ 2 đến 4 thành viên để chinh phục những bài toán thực tế về data analytics, data science và thuật toán được thiết kế đặc biệt với đội ngũ Kỹ sư của Shopee. Ngoài ra, bạn còn có thể nâng cao kỹ thuật của mình thông qua hàng loạt hội thảo chuyên đề miễn phí của cuộc thi nữa đấy! Lên lịch hẹn và tham gia ngay Giải đấu Lập trình đáng mong đợi của năm cùng Shopee tại https://careers.shopee.com/codeleague/\n Tìm hiểu thêm về SheCodes Vietnam tại: https://shecodesvietnam.com/ #ShopeeCodeLeague #TechAtShopee #datanalytics #datascience #coding #SheCodes",
    },
    {
      id: "shopee-code-league",
      images: [
        `${githubRawAssets}/2021/shopee-code-league/138333691_852685695512827_5225337392101164836_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138337842_852685688846161_7768404395455400447_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138654464_852685735512823_8334137342891119844_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138714444_852685815512815_8887944370065377149_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138814218_852685848846145_4341157711619049190_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138874367_852685762179487_6023640680178687749_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/138945094_852685678846162_895022550607982408_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/139709282_852685792179484_2250366936540888764_o.jpg`,
        `${githubRawAssets}/2021/shopee-code-league/140249641_852685758846154_2920704111411839066_o.jpg`,
      ],
      content:
        "[Chia sẻ cơ hội] Với vai trò đối tác hỗ trợ các chương trình, cuộc thi về CNTT tại Việt Nam. Lần này, SheCodes xin chia sẻ cơ hội tham gia giải đấu lập trình đến từ Shopee cho cộng đồng các SheCoders ^^ Ngoài các giải thưởng chính, cuộc thi sẽ có thêm giải thưởng tiền mặt trị giá $500 SGD dành cho top team với 100% thành viên là nữ coders. Chúc mọi người may mắn! #codelikeagirl Bạn đã sẵn sàng để tham gia Giải đấu Lập trình Online lớn nhất của @Shopee chưa? Sau thành công năm 2020, Shopee Code League 2021 mùa hai sẽ trở lại vào ngày 6 - 20 tháng 3 sắp tới! Đây là một sân chơi không thể bỏ qua đối với các bạn sinh viên và chuyên gia trong toàn khu vực để thử sức và thi đấu về khả năng lập trình của mình. Thành lập ngay một team từ 2 đến 4 thành viên để chinh phục những bài toán thực tế về data analytics, data science và thuật toán được thiết kế đặc biệt với đội ngũ Kỹ sư của Shopee. Ngoài ra, bạn còn có thể nâng cao kỹ thuật của mình thông qua hàng loạt hội thảo chuyên đề miễn phí của cuộc thi nữa đấy! Lên lịch hẹn và tham gia ngay Giải đấu Lập trình đáng mong đợi của năm cùng Shopee tại https://careers.shopee.com/codeleague/ Tìm hiểu thêm về SheCodes Vietnam tại: https://shecodesvietnam.com/ #ShopeeCodeLeague #TechAtShopee #datanalytics #datascience #coding #SheCodes",
    },
  ]);
}

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
        {/* {articles.map((article, index) => (
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
            <BlogImage src={article.images[0]} />
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
        ))} */}
        {articles.length !== 0 && (
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
        )}
      </FlexBox>
    </BlogBox>
  );
};

export default Blog;
