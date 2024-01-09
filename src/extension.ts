import * as vscode from 'vscode'
import { ViewerProvider } from './ViewerProvider'
import { COM_CHART, COM_JUMP, COM_REFRESH } from './constants'
import { openUrl } from './utils/openUrl'
import { join } from 'path'
import {
  WebviewParams,
  createWebviewContent,
} from './webview/createWebviewContent'
import { handleServiceMessage } from './api/services'
import { isActiveThemeKind } from './utils/isActiveThemeKind'
import { WebviewEditor } from './WebviewEditor'

let webviewPanel: vscode.WebviewPanel
let displayName = 'Okx Coin Chart'

// install
export function activate(context: vscode.ExtensionContext) {
  const Provider = new ViewerProvider()

  const TreeView = vscode.window.createTreeView('okx-coin-watch', {
    treeDataProvider: Provider,
  })

  // webview init
  function activeProjectCreatorWebview(
    params: WebviewParams = {},
    reload = false
  ) {
    if (webviewPanel) {
      if (reload) {
        webviewPanel.webview.html = createWebviewContent({
          webviewPanel,
          basePath: context.extensionPath,
          params,
        })
      }
      webviewPanel.reveal()
    } else {
      webviewPanel = vscode.window.createWebviewPanel(
        displayName,
        displayName,
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      )
      webviewPanel.iconPath = vscode.Uri.file(
        join(context.extensionPath, 'assets', 'logo.png')
      )

      webviewPanel.webview.html = createWebviewContent({
        webviewPanel,
        basePath: context.extensionPath,
        params,
      })

      webviewPanel.webview.onDidReceiveMessage(
        async message => {
          await handleServiceMessage(webviewPanel, message)
        },
        null,
        context.subscriptions
      )

      webviewPanel.onDidDispose(
        () => {
          webviewPanel = undefined
        },
        null,
        context.subscriptions
      )
    }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(COM_REFRESH, Provider.update),
    vscode.commands.registerCommand(COM_JUMP, () =>
      openUrl('https://ouxyi.chat/join/86653224')
    ),
    TreeView,
    vscode.workspace.onDidChangeTextDocument(Provider.update),
    vscode.commands.registerCommand(COM_CHART, name => {
      if (webviewPanel) {
        webviewPanel.dispose()
        webviewPanel = null
      }
      activeProjectCreatorWebview({ coin: name })
    })
  )
}

// uninstall
export function deactivate() {}
