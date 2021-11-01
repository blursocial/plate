import { UsePopperOptions } from '@udecode/plate-popper';
import { StateActions, StoreApi } from '@udecode/zustood';
import { Range } from 'slate';
import { ComboboxItemData } from './components/Combobox.types';
import { ComboboxOnSelectItem } from './types/ComboboxOnSelectItem';
export declare type ComboboxStateById = {
    /**
     * Combobox id.
     */
    id: string;
    /**
     * Items filter function by text.
     * @default (value) => value.text.toLowerCase().startsWith(search.toLowerCase())
     */
    filter?: (search: string) => (item: ComboboxItemData) => boolean;
    /**
     * Max number of items.
     * @default items.length
     */
    maxSuggestions?: number;
    /**
     * Trigger that activates the combobox.
     */
    trigger: string;
    /**
     * Regular expression for search, for example to allow whitespace
     */
    searchPattern?: string;
    /**
     * Called when an item is selected.
     */
    onSelectItem: ComboboxOnSelectItem | null;
    /**
     * Is opening/closing the combobox controlled by the client.
     */
    controlled?: boolean;
};
export declare type ComboboxStoreById = StoreApi<string, ComboboxStateById, StateActions<ComboboxStateById>>;
export declare type ComboboxState = {
    /**
     * Active id (combobox id which is opened).
     */
    activeId: string | null;
    /**
     * Object whose keys are combobox ids and values are config stores
     * (e.g. one for tag, one for mention,...).
     */
    byId: Record<string, ComboboxStoreById>;
    /**
     * Unfiltered items.
     */
    items: ComboboxItemData[];
    /**
     * Filtered items
     */
    filteredItems: ComboboxItemData[];
    /**
     * Highlighted index.
     */
    highlightedIndex: number;
    /**
     * Parent element of the popper element (the one that has the scroll).
     * @default document
     */
    popperContainer?: Document | HTMLElement;
    /**
     * Overrides `usePopper` options.
     */
    popperOptions?: UsePopperOptions;
    /**
     * Range from the trigger to the cursor.
     */
    targetRange: Range | null;
    /**
     * Text after the trigger.
     */
    text: string | null;
};
export declare const comboboxStore: StoreApi<"combobox", ComboboxState, import("@udecode/zustood").SetRecord<ComboboxState> & {
    state: import("@udecode/zustood").SetImmerState<ComboboxState>;
    mergeState: import("@udecode/zustood").MergeState<ComboboxState>;
} & {
    setComboboxById: (state: ComboboxStateById) => void;
    open: (state: Pick<ComboboxState, 'activeId' | 'targetRange' | 'text'>) => void;
    reset: () => void;
}, {
    isOpen: () => boolean;
}>;
export declare const getComboboxStoreById: (id: string | null) => ComboboxStoreById | null;
export declare const useActiveComboboxStore: () => ComboboxStoreById | null;
//# sourceMappingURL=combobox.store.d.ts.map