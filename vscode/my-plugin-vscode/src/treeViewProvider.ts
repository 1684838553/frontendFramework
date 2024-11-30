import { TreeItem,TreeItemCollapsibleState,TreeDataProvider,Uri,window, Event, ProviderResult } from "vscode";
import {join} from 'path'

// 创建一个Map集合
const ITEM_MAP = new Map<string,string>([
    ['pic','pic.svg'],
    ['pic1','pic1.svg'],
    ['pic2','pic2.svg'],
    ['pic3','pic3.svg'],
])

export class TreeItemNode extends TreeItem{
    constructor(public readonly label:string,public readonly collapsibleState:TreeItemCollapsibleState){
        super(label,collapsibleState)
    }

    // 为每项添加点击事件的命令
    command = {
        title:this.label,  //标题
        command:'itemClick',  //命令ID
        tooltip:this.label,   //鼠标覆盖时的小小提示框
        arguments:[    //向registerCommand传递参数
            this.label
        ]
    }

    static getIconUriForLabel(label:string):Uri{
        return Uri.file(join(__filename,'..','..','src','media',ITEM_MAP.get(label)+''))
    }

    iconPath = TreeItemNode.getIconUriForLabel(this.label)
}

export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: import ('vscode').Event<TreeItemNode | null | undefined> | undefined;
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element
    }
    getChildren(element?: TreeItemNode): ProviderResult<TreeItemNode[]> {
       return ['pic','pic1','pic2','pic3'].map(item=>{
           return new TreeItemNode(
               item as string,
               TreeItemCollapsibleState.None as TreeItemCollapsibleState
           )
       })
    }


    public static initTreeViewItem(){
        // 实例化 TreeViewProvider
        const treeViewProvider = new TreeViewProvider()

        window.registerTreeDataProvider('treeView-item',treeViewProvider)
    } 
    
}
