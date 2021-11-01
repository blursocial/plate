import { EditableProps } from 'slate-react/dist/components/editable';
import { PlatePlugin } from '../types/PlatePlugin/PlatePlugin';
import { SPEditor } from '../types/SPEditor';
/**
 * @see {@link Decorate}.
 * Optimization: return undefined if empty list so Editable uses a memo.
 */
export declare const pipeDecorate: (editor: SPEditor, plugins?: PlatePlugin[]) => EditableProps['decorate'];
//# sourceMappingURL=pipeDecorate.d.ts.map