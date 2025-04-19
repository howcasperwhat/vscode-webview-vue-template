import type { ExtensionContext, WebviewPanel } from 'vscode'
import { ViewColumn, window } from 'vscode'
import * as config from './generated/meta'

export class Panel {
  private panel: WebviewPanel

  public constructor(context: ExtensionContext) {
    this.panel = window.createWebviewPanel(
      config.name,
      config.name,
      ViewColumn.One,
      { enableScripts: true },
    )
    this.panel.webview.html = __getWebviewHtml__({
      // DO NOT FIX THIS!
      // eslint-disable-next-line node/prefer-global/process
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview: this.panel.webview,
      context,
    })
    this.panel.webview.onDidReceiveMessage(
      message => window.showInformationMessage(message.data),
      undefined,
      context.subscriptions,
    )
  }

  public render() {
    this.panel.reveal(ViewColumn.One)
    this.panel.webview.postMessage({
      type: config.name,
      data: config.description,
    })
  }
}
