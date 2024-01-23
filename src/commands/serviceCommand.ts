import { promises as fs } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { compile } from "../utility/templates";

export async function serviceCommand(context: vscode.ExtensionContext) {
  // Step #0: Validate that a workspace is open
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage("No open workspace found.");
    return;
  }

  // Step #1: Prompt for the entity name and entity path
  const entity = (
    await vscode.window.showInputBox({
      prompt: "Enter the Entity name",
      placeHolder: "e.g. user",
    })
  )?.toLowerCase();

  if (!entity) {
    return;
  }

  const entityApiPath = (
    await vscode.window.showInputBox({
      prompt: "Enter the Entity path",
      placeHolder: "e.g. admin/user",
    })
  )?.toLowerCase();

  if (!entityApiPath) {
    return;
  }

  // Step #2: Create the folder
  const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const targetPath = path.join(workspacePath, "src", "services", entity);

  try {
    await fs.mkdir(targetPath, { recursive: true });
  } catch (err: any) {
    vscode.window.showErrorMessage(`Error creating folder: ${err.message}`);
  }

  // Step #3: Copy the files
  try {
    const templatePath = path.join(
      context.extensionPath,
      "templates",
      "service"
    );

    const templateData = {
      entity,
      entityApiPath,
    };
    const files = await fs.readdir(templatePath);
    for (const file of files) {
      const srcPath = path.join(templatePath, file);
      const destPath = path.join(
        targetPath,
        file.replace(/\.tpl$/, "").replace("[entity]", entity)
      );

      const content = await fs.readFile(srcPath, "utf8");
      const template = compile(content);
      const result = template(templateData);
      await fs.writeFile(destPath, result);
    }

    vscode.window.showInformationMessage("Service files created successfully!");
    vscode.window.showWarningMessage(
      "Please add the service into 'store.service.ts' reducers!"
    );
  } catch (err: any) {
    vscode.window.showErrorMessage(
      `Error reading and copying template files: ${err.message}`
    );
  }
}
