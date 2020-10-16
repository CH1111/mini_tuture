import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Layout } from 'antd';

import ArticleContent from '../components/ArticleContent';
import ArticleCatalogue from '../components/ArticleCatalogue';
import StepFileList from '../components/StepFileList';
import './Article.css';

const { Sider, Content } = Layout;

function Article() {
  const match = useRouteMatch('/articles/:id');
  console.log(match);
  const id = match?.params.id;

  const dispatch = useDispatch();
  useEffect(() => {
    // 确保当用户从此 URL 访问时，能设置正确的 nowArticleId
    dispatch.collection.setNowArticleId(id);
    // 确保每次访问新文章时，重置右侧边栏的内容
    dispatch.collection.setNowStepCommit(null);
  }, [dispatch, id]);

  const { articles = [] } = useSelector((state) => state.collection.data);
  const nowArticle = articles.filter((article) => article.id === id)[0];

  return (
    <Layout className="tuture-content">
      <Sider className="article-sider-left" width="20%">
        <ArticleCatalogue />
      </Sider>
      <Content id="scroll-container" className="article-content">
        <ArticleContent article={nowArticle} />
      </Content>
      <Sider className="article-sider-right" width="20%">
        <StepFileList />
      </Sider>
    </Layout>
  );
}

export default Article;
