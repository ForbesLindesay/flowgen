/// <reference types="node" />
type Response<T> = any;
declare type Callback = (err: NodeJS.ErrnoException | null, response?: Response<NodeJS.ReadableStream>) => void;
export { Callback };
