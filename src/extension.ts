import * as vscode from "vscode";
import { pageCommand } from "./commands/pageCommand";
import { serviceCommand } from "./commands/serviceCommand";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const serviceCommandDisposal = vscode.commands.registerCommand(
    "generate-entity-codes.service",
    () => serviceCommand(context)
  );
  const pageCommandDisposal = vscode.commands.registerCommand(
    "generate-entity-codes.page",
    () => pageCommand(context)
  );

  context.subscriptions.push(serviceCommandDisposal, pageCommandDisposal);
}

// This method is called when your extension is deactivated
export function deactivate() {}
