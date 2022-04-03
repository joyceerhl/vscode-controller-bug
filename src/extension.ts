import * as vscode from "vscode";
import { NotebookSerializer } from "./serializer";

export function activate(context: vscode.ExtensionContext) {
  const serializer = new NotebookSerializer();

  context.subscriptions.push(
    vscode.workspace.registerNotebookSerializer("gqlnb", serializer),

    vscode.commands.registerCommand("gqlnb.createNew", async () => {
      const data = serializer.createNew();
      const notebookDocument = await vscode.workspace.openNotebookDocument(
        "gqlnb",
        data,
      );
      await vscode.commands.executeCommand(
        "vscode.openWith",
        notebookDocument.uri,
        "gqlnb",
      );
    }),


	);
	for (const name of ['foo', 'bar', 'baz']) {
		vscode.notebooks.createNotebookController(name, 'gqlnb', name); // no affinity configured, yet 'baz' is Suggested
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
