import * as vscode from 'vscode'
import { ViewerProvider } from './ViewerProvider'
import { COM_JUMP, COM_REFRESH } from './constants'
import { openUrl } from './utils/openUrl'

// install
export function activate(context: vscode.ExtensionContext) {
  const Provider = new ViewerProvider()

  const TreeView = vscode.window.createTreeView('okx-coin-watch', {
    treeDataProvider: Provider,
  })

  context.subscriptions.push(
    vscode.commands.registerCommand(COM_REFRESH, Provider.update),
    vscode.commands.registerCommand(COM_JUMP, () =>
      openUrl('https://ouxyi.chat/join/86653224')
    ),
    TreeView,
    vscode.workspace.onDidChangeTextDocument(Provider.update)
  )
}

// uninstall
export function deactivate() {}
