import Promise = require('promise');
export interface Variables {
    toAddress: string;
    url: string;
    fromAddress?: string;
    subject?: string;
    txtBody?: string;
    htmlBody?: string;
    [key: string]: any;
}
export declare type Variable = string | ((v: Variables) => string);
export interface ClientOptions<TUser> {
    saveToken: (token: {
        email: string;
        token: string;
        expiry: number;
    }) => Promise<string>;
    getTokenByID: (id: string) => Promise<{
        email: string;
        token: string;
        expiry: number;
    } | null>;
    developmentMode?: boolean;
    getUserByEmail?: (email: string) => TUser | null | Promise<TUser | null>;
    variables?: {
        [key: string]: any;
    };
    sendEmail?: (variables: Variables) => Promise<void>;
    /**
     * Postmark API token
     */
    postmark?: string;
    fromAddress?: Variable;
    subject?: Variable;
    txtTemplate?: Variable;
    htmlTemplate?: Variable;
}
export default function createClient<TUser = 'string'>({saveToken, getTokenByID, developmentMode, getUserByEmail, variables, sendEmail, postmark, fromAddress, subject, txtTemplate, htmlTemplate}: ClientOptions<TUser>): {
    sendMessage(email: string, redirectURL: string): Promise<{
        emailSent: true;
        development: false;
    } | {
        emailSent: false;
        development: true;
        path: string;
    }>;
    verifyToken(id: string, tokenProvidedByUser: string): Promise<TUser>;
    stripToken(url: string): string;
    generateUrl: (email: string, redirectURL: string) => Promise<string>;
};
