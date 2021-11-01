import { Editor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { WithOverride } from '../types/PlatePlugin/WithOverride';
/**
 * {@link withHistory} that can be called multiple times without losing its history.
 */
export declare const withHistoryPersist: WithOverride<Editor, HistoryEditor>;
/**
 * @see {@link withHistoryPersist}
 */
export declare const createHistoryPlugin: () => import("..").PlatePlugin<import("..").SPEditor>;
//# sourceMappingURL=createHistoryPlugin.d.ts.map