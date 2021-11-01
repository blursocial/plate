import { TEditor } from '@udecode/plate-core';
import { Point } from 'slate';
import { MatchRange } from '../types';
export declare type GetMatchPointsReturnType = undefined | {
    beforeStartMatchPoint: Point | undefined;
    afterStartMatchPoint: Point | undefined;
    beforeEndMatchPoint: Point;
};
export declare const getMatchPoints: (editor: TEditor, { start, end }: MatchRange) => {
    afterStartMatchPoint: import("slate").BasePoint | undefined;
    beforeStartMatchPoint: import("slate").BasePoint | undefined;
    beforeEndMatchPoint: import("slate").BasePoint;
} | undefined;
//# sourceMappingURL=getMatchPoints.d.ts.map