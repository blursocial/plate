import { PlateState, PlateStates } from '../../../types/PlateStore';
import { SPEditor } from '../../../types/SPEditor';
/**
 * If id is defined, get the state by id.
 * Else, get the first state.
 */
export declare const getPlateState: <T extends SPEditor = SPEditor>(state: PlateStates<T>, id?: string | null | undefined) => PlateState<T> | undefined;
//# sourceMappingURL=getPlateState.d.ts.map