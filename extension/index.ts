import { defineExtension, useCommand } from 'reactive-vscode'
import { MainPanel } from './views/panel'

const { activate, deactivate } = defineExtension((context) => {
  useCommand('vscode-webview-vue-template.show', () => {
    MainPanel.render(context)
  })
})

export { activate, deactivate }
