import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import { file } from '@/utils/files';
import '@/components/Git/git.scss';

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
    console.log(key, e, 'lplp')
    if (e.node.isLeaf) {
      const content = file.readFileContent(key[0] as string);
      setFileContent(content);
    }
  }

    return <div className='repository'>
      <header className='header'>
        header
      </header>
      <div className='container'>
        <aside>
          <Tree loadData={onLoadData} treeData={treeData} onSelect={(key, e) => selectFile(key, e)} />
        </aside>
        <div className='content'>
          ccc
        </div>
      </div>
    </div>
  }
