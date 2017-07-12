import Promise = require('promise');
import { Variables } from './index';
export default function createClient(postmarkToken: string): ({toAddress, fromAddress, subject, txtBody, htmlBody}: Variables) => Promise<void>;
