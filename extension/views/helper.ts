import type { Disposable, ExtensionContext, Webview } from 'vscode'
import { window } from 'vscode'

export class WebviewHelper {
  public static setupHtml(webview: Webview, context: ExtensionContext) {
    return __getWebviewHtml__({
      // DO NOT FIX THIS!
      // eslint-disable-next-line node/prefer-global/process
      serverUrl: process.env.VITE_DEV_SERVER_URL,
      webview,
      context,
      injectCode: `<script>window.__FLAG1__=666;window.__FLAG2__=888;</script>`,
    })
  }

  public static setupWebviewHooks(webview: Webview, disposables: Disposable[]) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const type = message.type
        const data = message.data
        switch (type) {
          case 'show':
            window.showInformationMessage(data)
            webview.postMessage({ type, data: Date.now() })
        }
      },
      undefined,
      disposables,
    )
  }
}
