import { promises as fs } from "fs";
import * as path from "path";

export async function getFilesRecursively(
  dir: string,
  rootDir?: string
): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const resPath = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return getFilesRecursively(resPath, rootDir || dir);
      } else {
        // If rootDir is set, calculate the relative path, otherwise, return just the filename
        return rootDir ? path.relative(rootDir, resPath) : dirent.name;
      }
    })
  );
  return files.flat();
}
