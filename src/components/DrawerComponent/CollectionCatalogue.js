import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { List } from 'antd';

import './CollectionCatalogue.css';

function CollectionCatalogue() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { articles = [] } = useSelector((state) => state.collection.data);

  return (
    <List
      dataSource={articles}
      renderItem={(article) => (
        <List.Item
          className="collection-catalogue-item"
          onClick={() => {
            history.push(`/articles/${article.id}`);
            dispatch.drawer.setVisible(false);
            dispatch.collection.setNowArticleId(article.id);
          }}
        >
          {article.name}
        </List.Item>
      )}
    />
  );
}

export default CollectionCatalogue;
