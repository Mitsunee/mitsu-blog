// TODO: copy remaining declarations as needed

declare module "@foxkit/node-util/fs" {
  function dirExists(filePath: string): Promise<boolean>;
  function fileExists(filePath: string): Promise<boolean>;
  function makeDir(dirPath: string): Promise<void>;
  function readFile(filePath: string): Promise<string | false>;
  function readFileJson<FileType>(filePath: string): Promise<false | FileType>;
  function writeFile(filePath: string, content: any): Promise<void>;
}

declare module "@foxkit/node-util/path" {
  function resolvePath(filePath: string, ...morePaths: string[]): string;
  function getFileName(filePath: string, withExt?: boolean): string;
  function joinPath(...pieces: string[]): string;
  function toRelativePath(filePath: string): string;
}
