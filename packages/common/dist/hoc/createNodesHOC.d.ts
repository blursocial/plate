import { FunctionComponent } from 'react';
import { AnyObject } from '@udecode/plate-core';
export declare type Options<T> = Partial<T> & AnyObject & {
    /**
     * Set HOC by key.
     */
    key?: string;
    /**
     * Set HOC by key.
     */
    keys?: string[];
};
/**
 * Create components HOC by plugin key.
 */
export declare const createNodesHOC: <T>(HOC: FunctionComponent<T>) => (components: any, options: Options<T> | Options<T>[]) => any;
/**
 * Create components HOC by plugin key with a custom HOC.
 */
export declare const createNodesWithHOC: <T>(withHOC: (component: any, props: T) => any) => (components: any, options: Options<T> | Options<T>[]) => any;
//# sourceMappingURL=createNodesHOC.d.ts.map