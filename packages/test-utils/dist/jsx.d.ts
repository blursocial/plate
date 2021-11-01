declare global {
    namespace JSX {
        interface IntrinsicElements {
            [key: string]: any;
            editor: any;
            mention: any;
            TodoList: any;
            inline: any;
            htext: any;
        }
    }
}
export declare const jsx: <S extends "anchor" | "focus" | "element" | "cursor" | "editor" | "fragment" | "selection" | "text">(tagName: S, attributes?: Object | undefined, ...children: any[]) => ReturnType<({
    anchor: typeof import("slate-hyperscript/dist/creators").createAnchor;
    cursor: typeof import("slate-hyperscript/dist/creators").createCursor;
    editor: typeof import("slate-hyperscript/dist/creators").createEditor;
    element: typeof import("slate-hyperscript/dist/creators").createElement;
    focus: typeof import("slate-hyperscript/dist/creators").createFocus;
    fragment: typeof import("slate-hyperscript/dist/creators").createFragment;
    selection: typeof import("slate-hyperscript/dist/creators").createSelection;
    text: typeof import("slate-hyperscript/dist/creators").createText;
} | {
    anchor: typeof import("slate-hyperscript/dist/creators").createAnchor;
    cursor: typeof import("slate-hyperscript/dist/creators").createCursor;
    editor: typeof import("slate-hyperscript/dist/creators").createEditor;
    element: typeof import("slate-hyperscript/dist/creators").createElement;
    focus: typeof import("slate-hyperscript/dist/creators").createFocus;
    fragment: typeof import("slate-hyperscript/dist/creators").createFragment;
    selection: typeof import("slate-hyperscript/dist/creators").createSelection;
    text: typeof import("slate-hyperscript/dist/creators").createText;
})[S]>;
//# sourceMappingURL=jsx.d.ts.map