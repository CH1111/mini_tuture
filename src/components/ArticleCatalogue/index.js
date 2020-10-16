import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Anchor } from 'antd';

import './index.css';

const { Link } = Anchor;

const headingDepthMap = {
  'heading-one': 0,
  'heading-two': 5,
  'heading-three': 15,
  'heading-four': 25,
  'heading-five': 35,
};

function isHeading(node) {
  return ['heading-one', 'heading-two', 'heading-three', 'heading-four', 'heading-five'].includes(
    node.type
  );
}

function getHeadingText(node) {
  return node.children.map((child) => child.text).join('');
}

// 获取 heading 的一维数组
function getHeadings(nodes) {
  return nodes.flatMap((node) => {
    if (isHeading(node)) {
      return {
        ...node,
        title: getHeadingText(node),
      };
    }
    if (node.children) {
      return getHeadings(node.children);
    }
    return [];
  });
}

function ArticleCatalogue() {
  const nowArticleId = useSelector((state) => state.collection.nowArticleId);
  const steps = useSelector((state) => state.collection.data?.steps) || [];
  const nowSteps = steps.filter((step) => step.articleId === nowArticleId);
  //console.log('nowSteps', nowSteps);
  const headings = getHeadings(nowSteps);
  //console.log('headings', headings);

  const dispatch = useDispatch();

  function onAnchorChange(link) {
    let nowStepHeading = null;
    let find = false;
    for (let heading of headings) {
      if (heading.commit) nowStepHeading = heading;
      // 这里注意传进来的 link 前面加了井号，例如 #123abc，需要通过 .slice(1) 去掉井号
      if (heading.id === link.slice(1)) {
        find = true;
      }
    }
    if (find && nowStepHeading && nowStepHeading.commit) {
      dispatch.collection.setNowStepCommit(nowStepHeading.commit);
    }
  }

  return (
    <div className="article-catalogue">
      <p>文章目录</p>
      <Anchor
        className="article-catalogue-anchor"
        targetOffset={50}
        onChange={onAnchorChange}
        getContainer={() => document.getElementById('scroll-container')}
      >
        {headings.map((heading, index) => (
          <div key={index} style={{ paddingLeft: `${headingDepthMap[heading.type]}px` }}>
            <Link href={`#${heading.id}`} title={heading.title} />
          </div>
        ))}
      </Anchor>
    </div>
  );
}

export default ArticleCatalogue;
