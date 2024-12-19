import React, { useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Treebeard } from 'react-treebeard';
import { Tree } from 'antd';
import { file } from '@/utils/files';
import '@/components/Git/git.scss';

const { DirectoryTree } = Tree;

export default function Repository(): React.ReactElement {
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [fileContent, setFileContent] = useState<string>('');
  useEffect(() => {
    const initTreeData = updateTreeData(getTreeNode('D:\\workspace\\extensionsTest'), '', []);
    setTreeData(initTreeData);
  }, []);

  const onLoadData = ({ key }: any) =>
    new Promise<void>(resolve => {
      const children = getTreeNode(key) as DataNode[];
      setTreeData(origin =>
        updateTreeData(origin, key, children),
      );
      resolve();
    });

  const selectFile = (key: React.Key[], e: any) => {
    if (e.node.isLeaf) {
      const content = file.readFileContent(key[0] as string);
      setFileContent(content);
    }
  }

  const options = {
    selectOnLineNumbers: true
  }

  const editorDidMount = (editor: any, monaco: any) => {
    console.log('editorDidMount', editor);
  }

  const onChange = (newValue: any, e: any) => {
    console.log('onChange', newValue, e);
  }

  const onToggle = (node: any, toggled: any) => {
    console.log('onToggle', node, toggled);
  }

  return <div className='repository'>
    <header className='header'>
      header
    </header>
    <div className='container'>
      <div className='aside'>
        <Treebeard data={treeData} onToggle={onToggle} />
        {/* <div className='my-scroll-bar'></div> */}
        {/* <DirectoryTree loadData={onLoadData} treeData={treeData} onSelect={(key, e) => selectFile(key, e)} /> */}
      </div>
      <div className='content'>
        {/* <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          value={fileContent}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        /> */}
        ccc
      </div>
    </div>
  </div>
}

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

interface SourseData {
  path: string;
  isDirectory: boolean;
}

const getTreeNode = (filePath: string): DataNode[] => {
  const dirs = file.readDirectory(filePath) as SourseData[];
  return dirs.map(item => {
    return {
      title: item.path,
      name: item.path,
      key: item.path,
      isLeaf: !item.isDirectory,
    };
  });
};

const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] => {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
};
