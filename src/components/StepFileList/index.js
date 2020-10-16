import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip, message } from 'antd';
import { Container, Draggable } from 'react-smooth-dnd';

import './index.css';
import { isCommitEqual } from '../../utils';

function getHeadingText(node) {
  return node.children.map((child) => child.text).join('');
}

function FileCard(props) {
  const { file } = props;
  return (
    <Tooltip title={file.file} mouseEnterDelay={0.4}>
      <div className="step-file-list-card" style={{ color: file.display ? 'black' : '#ccc' }}>
        {file.file}
      </div>
    </Tooltip>
  );
}

function StepFileList() {
  const { data, nowStepCommit } = useSelector((state) => state.collection);
  const nowStep = data?.steps?.filter((step) => isCommitEqual(step.commit, nowStepCommit))[0];
  const files = nowStep?.children?.filter((node) => node.type === 'file') || [];

  return (
    <div>
      <p className="step-file-list-title">{nowStep ? getHeadingText(nowStep.children[0]) : ''}</p>
      <Container onDrop={() => message.success('666!')}>
        {files.map((file, index) => {
          return (
            <Draggable key={index}>
              <FileCard file={file} />
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
}

export default StepFileList;
