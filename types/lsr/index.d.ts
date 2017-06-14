declare module 'lsr' {
  export interface Entry {
    isFile(): boolean;
    isDirectory(): boolean;
    fullPath: string;
    path: string;
  }
  function sync(dirname: string): Array<Entry>;
  export {sync};
}