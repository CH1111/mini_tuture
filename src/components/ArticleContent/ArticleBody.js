import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editure, Editable, initializeTutureEditor } from 'editure-react';
import { useDebounce } from 'react-use';
import './ArticleBody.css';
import DiffBlock from './DiffBlock';

function Element(props) {
  const { attributes, children, element } = props;
  //console.log(element);
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...attributes}>
          <div>{children}</div>
        </blockquote>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'heading-one':
      return (
        <h1 {...attributes} id={element.id}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 {...attributes} id={element.id}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 {...attributes} id={element.id}>
          {children}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 {...attributes} id={element.id}>
          {children}
        </h4>
      );
    case 'heading-five':
      return (
        <h5 {...attributes} id={element.id}>
          {children}
        </h5>
      );
    case 'code-block':
      return (
        <pre className="article-body-code-block" {...attributes}>
          {children}
        </pre>
      );
    case 'code-line':
      return (
        <div {...attributes}>
          <code>{children}</code>
        </div>
      );
    case 'image':
      return (
        <div {...attributes}>
          <div className="article-body-image" contentEditable={false}>
            <img src={element.url} alt="" />
          </div>
          {children}
        </div>
      );
    case 'file':
      return (
        <div className="article-body-file" style={{ display: element.display ? 'block' : 'none' }}>
          {children}
        </div>
      );
    case 'step':
      return (
        <div className="article-body-step" {...attributes}>
          {children}
        </div>
      );
    case 'explain':
      return (
        <div className="article-body-explain" {...attributes}>
          {children}
        </div>
      );
    case 'diff-block':
      //console.log('diff-block-element', element);
      return <DiffBlock commit={element.commit} file={element.file} hideDiff={element.hideDiff} />;

    default:
      return <div {...attributes}>{children}</div>;
  }
}

function Leaf(props) {
  const { attributes, leaf } = props;
  let { children } = props;
  //console.log(leaf);
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.strikethrough) {
    children = <span style={{ textDecoration: 'line-through' }}>{children}</span>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.link) {
    children = (
      <a href={leaf.url || '#'} onClick={() => window.open(leaf.url)}>
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
}

function ArticleBody() {
  const editor = useMemo(initializeTutureEditor, []);
  const { nowArticleId } = useSelector((state) => state.collection);
  const steps = useSelector((state) => state.collection.data.steps) || [];
  const fragment = steps.filter((step) => step.articleId === nowArticleId);

  const renderElement = useCallback(Element, []);
  const renderLeaf = useCallback(Leaf, []);
  const dispatch = useDispatch();

  useDebounce(() => dispatch.collection.save(), 1000, [fragment]);

  function onContentChange(fragment) {
    dispatch.collection.updateFragment(fragment);
  }

  return (
    <Editure editor={editor} value={fragment} onChange={onContentChange}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Editure>
  );
}

export default ArticleBody;
