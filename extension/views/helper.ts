import type { Disposable, ExtensionContext, Webview } from 'vscode'
import { window } from 'vscode'

export class WebviewHelper {
  public static setupHtml(_webview: Webview, _context: ExtensionContext) {
    return __getWebviewHtml__({
      serverUrl: import.meta.env.VITE_DEV_SERVER_URL,
      webview: _webview,
      context: _context,
      injectCode: `<script>window.__FLAG__='FOO'</script>`,
    })
  }

  public static setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    webview.onDidReceiveMessage(
      (message: any) => {
        window.showInformationMessage(message.data)
        webview.postMessage({ type: message.type, data: Date.now() })
      },
      undefined,
      disposables,
    )
  }
}
