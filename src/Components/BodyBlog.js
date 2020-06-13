import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ArticleCardGroup from './ArticleCardGroup';

const BodyBlog = (props) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get('/database-blog')
      .then(res => {setArticles(res.data)});
  }, []);
  return (
    <ArticleCardGroup articles={articles}/>
  );
}

export default BodyBlog;