import React from 'react';
import { message } from 'antd';
import { IStep } from '@/components/Common/interface';
// 在渲染进程中引入electron
const electron = window.require('electron');
const { shell, clipboard } = electron;

export function CommonComponent(props: { step: IStep }): React.ReactElement {
  const { step } = props;

  const handlerAClick = (e: any, href: string) => {
    e.preventDefault();
    shell.openExternal(href);
  };

  const handlerCodeClick = (content: string) => {
    clipboard.writeText(content);
    message.success('复制成功');
  };

  switch (step.type) {
    case 'h3': {
      return <h3>{step.content}</h3>;
    }
    case 'p': {
      return <p>{step.content}</p>;
    }
    case 'code': {
      return (
        <div className="code-snippets" onClick={() => handlerCodeClick(step.content)}>
          <code>{step.content}</code>
        </div>
      );
    }
    case 'a': {
      return (
        <div>
          <a onClick={e => handlerAClick(e, step.href!)}>{step.content}</a>
        </div>
      );
    }
    default: {
      return <span />;
    }
  }
}
