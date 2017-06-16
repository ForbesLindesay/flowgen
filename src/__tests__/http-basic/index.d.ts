/// <reference types="node" />
import { Callback } from './Callback';
import { HttpVerb } from './HttpVerb';
import { Options } from './Options';
declare function request(method: HttpVerb, url: string, options: Options | null | void, callback: Callback): void | NodeJS.WritableStream;
declare function request(method: HttpVerb, url: string, callback: Callback): void | NodeJS.WritableStream;
export = request;
