import React from 'react';
import { useSelector } from 'react-redux';

import { isCommitEqual } from '../../utils';
import './DiffBlock.css';

function getDiffItemByCommitAndFile(diff, commit, file) {
  const emptyVal = { chunks: [] };
  if (!diff) {
    return emptyVal;
  }
  const rawDiffItem = diff.filter((item) => isCommitEqual(item.commit, commit))[0];
  //console.log(rawDiffItem);
  if (!rawDiffItem) {
    return emptyVal;
  }
  return rawDiffItem.diff.filter((item) => item.to === file)[0] || emptyVal;
}

function concatCodeStr(diffItem, hideDiff) {
  const codeStrArr = [];
  const DIFF_ADD = [];
  const DIFF_DEL = [];
  let allLines = [];

  diffItem.chunks.forEach((chunk, chunkIndex) => {
    chunk.changes.forEach((change, index) => {
      const { type, content } = change;
      allLines = allLines.concat(index);

      if (type === 'add' && !hideDiff) {
        DIFF_ADD.push(index);
      } else if (type === 'del') {
        if (hideDiff) {
          return;
        }
        DIFF_DEL.push(index);
      }
      // handle render code content
      let code = content;

      if (content !== 'normal' && content.length === 1) {
        code = content.replace(/[+-]/, ' ');
      } else if (content !== 'normal' && content.length > 1) {
        code = content.slice(1);
      }

      codeStrArr.push(code);
    });
  });

  return { codeStrArr, DIFF_ADD, DIFF_DEL, allLines };
}

function DiffBlock(props) {
  const { commit, file, hideDiff } = props;

  const diff = useSelector((state) => state.diff.data);
  //console.log(diff);
  const diffItem = getDiffItemByCommitAndFile(diff, commit, file);
  // console.log('diffItem.new', diffItem.new);
  const { codeStrArr = [], DIFF_ADD = [], DIFF_DEL = [] } = concatCodeStr(diffItem, hideDiff);
  //console.log('codeStrArr', codeStrArr);

  function getLineStyle(index) {
    if (!diffItem.new && DIFF_ADD.includes(index)) {
      return 'article-body-diff-block-line article-body-diff-block-line-add';
    } else if (!diffItem.new && DIFF_DEL.includes(index)) {
      return 'article-body-diff-block-line article-body-diff-block-line-del';
    } else {
      return 'article-body-diff-block-line';
    }
  }

  return (
    <div className="article-body-diff-block" contentEditable={false}>
      <div className="article-body-diff-block-title">{file}</div>
      <pre>
        {codeStrArr.length > 500
          ? '此文件代码过长，暂不显示'
          : codeStrArr.map((line, index) => (
              <div key={file + index} className={getLineStyle(index)}>
                <code>{line}</code>
              </div>
            ))}
      </pre>
    </div>
  );
}

export default DiffBlock;
