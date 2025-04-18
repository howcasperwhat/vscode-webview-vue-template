import type { Disposable, ExtensionContext, WebviewPanel } from 'vscode'
import { ViewColumn, window } from 'vscode'

export class Panel {
  private panel: WebviewPanel
  private disposables: Disposable[] = []

  public constructor(context: ExtensionContext) {
    this.panel = window.createWebviewPanel(
      'show',
      'Webview Vue Title',
      ViewColumn.One,
      { enableScripts: true },
    )

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables)
    this.panel.webview.html = __getWebviewHtml__({
      serverUrl: import.meta.env.VITE_DEV_SERVER_URL,
      webview: this.panel.webview,
      context,
      injectCode: `<script>window.__FLAG__='FOO'</script>`,
    })
    this.panel.webview.onDidReceiveMessage(
      message => window.showInformationMessage(message.data),
      undefined,
      this.disposables,
    )
  }

  public render() {
    this.panel.reveal(ViewColumn.One)
    this.panel.webview.postMessage({
      type: 'show',
      data: 'Message Data',
    })
  }

  public dispose() {
    this.panel.dispose()
    while (this.disposables.length)
      this.disposables.pop()?.dispose()
  }
}
