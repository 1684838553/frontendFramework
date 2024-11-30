import {window,DecorationOptions,Range,workspace,TextEditor} from 'vscode'

// createTextEditorDecorationType 向文本添加装饰 
const smallNumDecoration = window.createTextEditorDecorationType({
    border:'1px solid #fff'
})

const bigNumDecoration = window.createTextEditorDecorationType({
   backgroundColor:'blue'
}) 

export class DecorationNumber{

    private editor:TextEditor | undefined

    constructor(){
        this.editor = window.activeTextEditor
    }

    public DecNumber(){
       if(!this.editor){
           return
       }

       // 获取文档中全部信息   
       let doc  = this.editor.document

        //  获取文档中全部内容
        let text = doc.getText()  

        // 创建两个用来存放正则表达式判断出来的数字的数组
        let smallNumbers:DecorationOptions[] = []
        let bigNumbers:DecorationOptions[] = []

        const regEx = /\d+/g

        let match;
        while(match = regEx.exec(text)){
            const startPos = doc.positionAt(match.index)
            const endPos = doc.positionAt(match.index + match[0].length)


            const decoration = {
                range:new Range(startPos,endPos),
                hoverMessage:"Number **" + match[0] +'**'
            }

            if(match[0].length<3){
                smallNumbers.push(decoration)
            }else{
                bigNumbers.push(decoration)
            }
        }

        this.editor.setDecorations(smallNumDecoration,smallNumbers)
        this.editor.setDecorations(bigNumDecoration,bigNumbers)


    }

    dispose(){}
}
