import { promises as fs } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { compile, getFilesRecursively, plural } from "../utility";

export async function pageCommand(context: vscode.ExtensionContext) {
  // Step #0: Validate that a workspace is open
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage("No open workspace found.");
    return;
  }

  // Step #1: Prompt for the entity name
  const entity = (
    await vscode.window.showInputBox({
      prompt: "Enter the Entity name",
      placeHolder: "e.g. user",
    })
  )?.toLowerCase();

  if (!entity) {
    return;
  }

  // Step #2: Create the folder
  const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  const targetPath = path.join(workspacePath, "src", "pages", plural(entity));

  try {
    await fs.mkdir(targetPath, { recursive: true });
  } catch (err: any) {
    vscode.window.showErrorMessage(`Error creating folder: ${err.message}`);
  }

  // Step #3: Copy the files
  try {
    const templatePath = path.join(context.extensionPath, "templates", "page");

    const templateData = {
      entity,
    };
    const files = await getFilesRecursively(templatePath);

    for (const file of files) {
      const srcPath = path.join(templatePath, file);
      const destPath = path.join(
        targetPath,
        file.replace(/\.tpl$/, "").replace("[entity]", plural(entity))
      );

      const content = await fs.readFile(srcPath, "utf8");
      const template = compile(content);
      const result = template(templateData);

      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, result);
    }

    vscode.window.showInformationMessage("Page files created successfully!");
    vscode.window.showWarningMessage(
      "Check 'pages.module.ts', 'app-routing.module.ts', 'app-nav-items.ts' for extra steps."
    );
  } catch (err: any) {
    vscode.window.showErrorMessage(
      `Error reading and copying template files: ${err.message}`
    );
  }
}
