import React from 'react';
import { Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { useDebounce } from 'react-use';

import './ArticleHeader.css';

function ArticleHeader() {
  const { data, nowArticleId } = useSelector((state) => state.collection);
  const { articles = [] } = data;
  const nowArticle = articles.filter((article) => article.id === nowArticleId)[0];
  const { name, created, topics, cover, description } = nowArticle || {};
  const dispatch = useDispatch();

  useDebounce(() => dispatch.collection.save(), 1000, [name, description]);

  function onNameChange(e) {
    dispatch.collection.updateArticle({ ...nowArticle, name: e.target.value });
  }

  function onDescriptionChange(e) {
    dispatch.collection.updateArticle({ ...nowArticle, description: e.target.value });
  }

  return (
    <>
      <h1 className="article-title">
        <TextareaAutosize value={name} onChange={onNameChange} />
      </h1>
      <div className="article-meta">
        <small>创建于{new Date(created).toLocaleString()}</small>
        {topics?.map((topic, index) => (
          <Tag key={topic + index}>{topic}</Tag>
        ))}
      </div>
      <div className="article-cover">
        <img src={cover} alt={name} />
      </div>
      <div className="article-description">
        <TextareaAutosize value={description} onChange={onDescriptionChange} />
      </div>
    </>
  );
}

export default ArticleHeader;
