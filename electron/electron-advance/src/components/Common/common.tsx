import React from 'react';
import { IStep } from '@/components/Common/interface';
// 在渲染进程中引入electron
const electron = window.require('electron');
const { shell } = electron;

export function CommonComponent(props: { step: IStep }): React.ReactElement {
    const { step } = props;

    const handlerAClick = (e: any, href: string) => {
        e.preventDefault();
        shell.openExternal(href);
    }

    switch (step.type) {
        case 'h3': {
            return <h3>{step.content}</h3>;
        }
        case 'p': {
            return <p>{step.content}</p>
        }
        case 'code': {
            return <code>{step.content}</code>
        }
        case 'a': {
            return <p><a onClick={(e) => handlerAClick(e, step.href!)}>{step.content}</a> </p>
        }
        default: {
            return <span></span>;
        }
    }
}


