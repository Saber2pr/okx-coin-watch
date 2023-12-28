import * as vscode from 'vscode'
import { ViewerProvider } from './ViewerProvider'
import { COM_REFRESH } from './constants'

// install
export function activate(context: vscode.ExtensionContext) {
  const Provider = new ViewerProvider()

  const TreeView = vscode.window.createTreeView('okx-coin-watch', {
    treeDataProvider: Provider,
  })

  context.subscriptions.push(
    vscode.commands.registerCommand(COM_REFRESH, Provider.update),
    TreeView,
    vscode.workspace.onDidChangeTextDocument(Provider.update)
  )
}

// uninstall
export function deactivate() {}
