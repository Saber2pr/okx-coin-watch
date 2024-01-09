import * as vscode from 'vscode'
import { Coin } from './utils/queryCoinList'
import { getCoinList } from './utils/getCoinList'
import { getArray } from './utils/kit'
import { COM_CHART } from './constants'

export class ViewerProvider implements vscode.TreeDataProvider<AstNodeItem> {
  constructor() {}

  async getChildren(node?: AstNodeItem): Promise<AstNodeItem[]> {
    if (node) {
      if (node.coin) {
        const comNode = new AstNodeItem(
          `[${node.coin.name} 24Hour Chart]`,
          null,
          vscode.TreeItemCollapsibleState.None
        )
        comNode.command = {
          title: `View ${node.coin.name} 24Hour Chart`,
          command: COM_CHART,
          arguments: [node.coin.name],
        }
        return [
          new AstNodeItem(
            `Price BTC: ${node.coin.priceBtc}`,
            null,
            vscode.TreeItemCollapsibleState.None
          ),
          new AstNodeItem(
            `24 volume BTC: ${node.coin.vol24Btc}`,
            null,
            vscode.TreeItemCollapsibleState.None
          ),
          new AstNodeItem(
            `Calc Price: ${node.coin.price}`,
            null,
            vscode.TreeItemCollapsibleState.None
          ),
          new AstNodeItem(
            `Calc 24 volume: ${node.coin.vol24}`,
            null,
            vscode.TreeItemCollapsibleState.None
          ),
          comNode,
        ]
      }
    } else {
      let list = await getCoinList()

      const favorite = vscode.workspace
        .getConfiguration('okx-coin-watch.config')
        .get<string[]>('favorite')

      const favoriteList = getArray(favorite)

      if (favoriteList.length > 0) {
        list = list.filter(item =>
          getArray(favorite).find(fav => item.coin === fav)
        )
      }

      return list.map(
        coin => new AstNodeItem(`${coin.coin}: ${coin.price}`, coin)
      )
    }
  }

  async getTreeItem(node: AstNodeItem): Promise<vscode.TreeItem> {
    return node
  }

  private _onDidChangeTreeData: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>()

  readonly onDidChangeTreeData: vscode.Event<void> =
    this._onDidChangeTreeData.event

  update = () => {
    this._onDidChangeTreeData.fire()
  }
}

class AstNodeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly coin?: Coin,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode
      .TreeItemCollapsibleState.Collapsed
  ) {
    super(label, collapsibleState)
  }
}
