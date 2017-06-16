/// <reference types="node" />
import Response = require('../http-response-object-2');
declare type Callback = (err: NodeJS.ErrnoException | null, response?: Response<NodeJS.ReadableStream>) => void;
export { Callback };
