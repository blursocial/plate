/// <reference types="react" />
import { KeyboardHandler, SPEditor, TEditor } from '@udecode/plate-core';
import { ExitBreakOnKeyDownOptions } from './types';
/**
 * Check if the selection is at the edge of its parent block.
 * If it is and if the selection is expanded, delete its content.
 */
export declare const exitBreakAtEdges: (editor: TEditor, { start, end, }: {
    start?: boolean | undefined;
    end?: boolean | undefined;
}) => {
    queryEdge: boolean;
    isEdge: boolean;
    isStart: boolean;
};
export declare const getExitBreakOnKeyDown: <T extends SPEditor = SPEditor>({ rules, }?: ExitBreakOnKeyDownOptions) => (editor: T) => (event: import("react").KeyboardEvent<Element>) => import("@udecode/plate-core").HandlerReturnType;
//# sourceMappingURL=getExitBreakOnKeyDown.d.ts.map