import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useDebounce } from 'react-use';

import './Home.css';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name = '', description = '', articles = [] } = useSelector(
    (state) => state.collection.data
  );

  useDebounce(() => dispatch.collection.save(), 1000, [name, description]);

  function onTitleChange(e) {
    dispatch.collection.updateCollectionMeta({ name: e.target.value });
  }
  function onDescriptionChange(e) {
    dispatch.collection.updateCollectionMeta({ description: e.target.value });
  }

  return (
    <div className="home-container">
      <h1>
        <TextareaAutosize
          className="collection-title"
          value={name}
          onChange={onTitleChange}
          placeholder="在此处填写文集标题"
        />
      </h1>
      <div>
        <TextareaAutosize
          className="collection-description"
          value={description}
          onChange={onDescriptionChange}
        />
      </div>
      <div className="article-card-list">
        {articles.map((article) => (
          <div
            className="article-card"
            key={article.id}
            onClick={() => {
              history.push(`/articles/${article.id}`);
              dispatch.collection.setNowArticleId(article.id);
            }}
          >
            <img src={article.cover} alt={article.name} />
            <p>{article.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
