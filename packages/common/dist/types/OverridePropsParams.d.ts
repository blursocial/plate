import { CSSProperties } from 'react';
export declare type GetOverridePropsParams = {
    defaultOption: unknown;
    options: unknown[] | undefined;
    classNames: Partial<Record<string | number, unknown>> | undefined;
    value: string | number;
    className: string | undefined;
    style: CSSProperties;
    type: string;
};
export declare type GetElementOverridePropsParams = OverridePropsParams & {
    types: string[];
};
export declare type GetLeafOverrideProps = OverridePropsParams;
export declare type OverridePropsParams = {
    type: string;
    options?: unknown[];
    defaultOption?: unknown;
    classNames?: Partial<Record<string | number, unknown>>;
};
//# sourceMappingURL=OverridePropsParams.d.ts.map