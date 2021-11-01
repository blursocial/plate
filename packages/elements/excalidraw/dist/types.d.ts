import { ImportedDataState } from '@excalidraw/excalidraw-next/types/data/types';
import { ExcalidrawElement } from '@excalidraw/excalidraw-next/types/element/types';
import { ExcalidrawProps } from '@excalidraw/excalidraw-next/types/types';
export interface ExcalidrawNodeData {
    data?: {
        elements: ExcalidrawDataState['elements'];
        state: ExcalidrawDataState['appState'];
    } | null;
}
export interface ExcalidrawDataState extends Omit<ImportedDataState, 'elements'> {
    elements?: readonly Partial<ExcalidrawElement>[] | null;
}
export interface TExcalidrawProps extends Omit<ExcalidrawProps, 'initialData'> {
    initialData: ExcalidrawDataState | null | Promise<ExcalidrawDataState | null>;
}
//# sourceMappingURL=types.d.ts.map