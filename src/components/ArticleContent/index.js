import React from 'react';

import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';

function ArticleContent(props) {
  const { article } = props;

  return (
    <>
      <ArticleHeader article={article} />
      <ArticleBody />
    </>
  );
}

export default ArticleContent;
