import { defineExtension, useCommand } from 'reactive-vscode'
import { Panel } from './panel'

const { activate, deactivate } = defineExtension((context) => {
  useCommand('vscode-webview-vue-template.show', () => {
    const panel = new Panel(context)
    panel.render()
  })
})

export { activate, deactivate }
