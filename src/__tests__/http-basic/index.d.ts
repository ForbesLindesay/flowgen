import { Callback } from './Callback';
import { HttpVerb } from './HttpVerb';
import { Options } from './Options';
declare function request(method: HttpVerb, url: string, options?: Options | Callback | null, callback?: Callback | null): void | NodeJS.WritableStream;
export = request;
