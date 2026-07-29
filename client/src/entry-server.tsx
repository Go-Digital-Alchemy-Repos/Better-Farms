import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";

export function render(pathname: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let didError = false;
    const output = new PassThrough();
    let html = "";

    output.setEncoding("utf8");
    output.on("data", (chunk) => {
      html += chunk;
    });
    output.on("end", () => {
      if (didError) {
        reject(new Error(`Server rendering failed for ${pathname}`));
        return;
      }
      resolve(html);
    });
    output.on("error", reject);

    const stream = renderToPipeableStream(<App initialPath={pathname} />, {
      onAllReady() {
        stream.pipe(output);
      },
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    });
  });
}
