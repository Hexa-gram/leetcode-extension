import * as vscode from "vscode";
import * as fse from "fs-extra";

import { fileMeta, getEntryFile, IProblemType } from "../utils/problemUtils";

import { ShowMessage } from "../utils/OutputUtils";
import { OutPutType } from "../model/ConstDefind";
import { debugArgDao } from "../dao/debugArgDao";

export class DebugPy3 {
  static DEBUG_LANG = "python3";

  public async execute(
    document: vscode.TextDocument,
    filePath: string,
    testString: string,
    language: string,
    port: number
  ): Promise<string | undefined> {
    if (language != DebugPy3.DEBUG_LANG) {
      return;
    }
    let debugConfig = {
      type: "python",
      env: {
        PYTHONPATH: "",
      },
      program: "",
    };
    const fileContent: Buffer = await fse.readFile(filePath);
    const meta: { id: string; lang: string } | null = fileMeta(fileContent.toString());
    if (meta == null) {
      ShowMessage(
        "File meta info has been changed, please check the content: '@lc app=leetcode.cn id=xx lang=xx'.",
        OutPutType.error
      );
      return;
    }
    const problemType: IProblemType | undefined = debugArgDao.getDebugArgData(meta.id, document);
    if (problemType == undefined) {
      ShowMessage(`Notsupported problem: ${meta.id}.`, OutPutType.error);
      return;
    }

    const numericStr = meta.id.replace(/\D/g, ""); // 去除非数字字符
    const temp_meta_id = parseInt(numericStr, 10);

    debugConfig.program = await getEntryFile(meta.lang, temp_meta_id.toString());

    // check whether module.exports is exist or not
    const moduleExportsReg: RegExp = /# @lcpr-before-debug-begin/;
    if (!moduleExportsReg.test(fileContent.toString())) {
      await fse.writeFile(
        filePath,
        `# @lcpr-before-debug-begin\nfrom python3problem${temp_meta_id.toString()} import * # type: ignore \nfrom typing import *\n# @lcpr-before-debug-end\n\n` +
          fileContent.toString()
      );
    }
    debugConfig.env!.PYTHONPATH = debugConfig.program;
    const args: string[] = [
      filePath,
      testString,
      problemType.funName,
      problemType.paramTypes.join(","),
      problemType.returnType || "returnType",
      temp_meta_id.toString(),
      port.toString(),
    ];
    if (vscode.debug.activeDebugSession) {
      return;
    }
    vscode.debug.startDebugging(
      undefined,
      Object.assign({}, debugConfig, {
        request: "launch",
        name: "Launch Program",
        args,
      })
    );

    return;
  }
}
