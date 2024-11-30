import * as vscode from 'vscode'


let myStatusBarItem:vscode.StatusBarItem

export class StatusBarItem {


    public myStatusBar(){
      myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right,100)
      myStatusBarItem.text = "hello word!!!"
      myStatusBarItem.show()
    }


    updateStatusBarItem(){
        const n= this.getNumberOfSelectedLines(vscode.window.activeTextEditor)
        if(n>0){
            myStatusBarItem.text = `${n} line(s) selected`
            myStatusBarItem.show()
        }else{
            myStatusBarItem.hide()
        }
    }

    getNumberOfSelectedLines(editor:vscode.TextEditor|undefined):number{
        let lines = 0
        if(editor){
            console.log(editor,editor.selections,'editor')
            lines = editor.selections.reduce((prev, curr) => prev + (curr.end.line - curr.start.line), 0);
        }
        return lines
    }

}
