## VSCODE API

### 1. treeView

![位置](./image/treeView-viewTitle.png)

```typescript
// package.json  contributes menu view/title
"view/title": [
    {
        "command": "nodeDependencies.refreshEntry",
        "when": "view == nodeDependencies",
        "group": "navigation"
    }
]
```

### 2. editorTitle

![位置](./image/editor-title.png)

```typescript
// package.json  contributes menu editor/title

vscode.commands.executeCommand('setContext', 'show', true);

"editor/title": [
  {
    "command": "nodeDependencies.refreshEntry",
    "when": "show",
    "group": "navigation"
  }
]
```

### 3. activity

#### 1. treeView SidePart

![位置](./image/sidePart.png)

#### 2. treeView RightSidePart

#### 3. treeView Part

![位置](./image/part.png)

### 4. timeline

![位置](./image/timeline.png)

```typescript
// package.json  contributes menu timeline/title

"timeline/title": [
  {
    "command": "nodeDependencies.addEntry",
    "when": "show",
    "group": "navigation"
  }
]

// 右键
"timeline/item/context":[
  {
    "command": "nodeDependencies.addEntry",
    "when": "show",
    "group": "navigation"
  }
]
```

### notebook

![位置](./image/notebook-toolbar.png)

```typescript
// package.json  contributes menu notebook/toolbar

"notebook/toolbar":[
  {
    "command": "nodeDependencies.addEntry",
    "when": "show",
    "group": "navigation"
  }
]
```

### when

当 `when` 为 `false` 时，actionViewItem 不展示，直接删除 dom 上的节点，而不是设置样式隐藏该节点
