import type { Params, State } from "../../../env";

export const paramsModule = {
    state: {
        showParamsModal: false,
        params: {
            floors: [3, 2, 1],
            floorHeight: 100,
            speed: 2
        },
    },
    mutations: {
        toggleParamsModal(state: State): void {
            state.showParamsModal = !state.showParamsModal;
        },

        setParams(state: State, payload: Params): void {
            state.params = payload;
            state.showParamsModal = false;
        },
    },
    getters: {
        showParamsModal(state: State): boolean {
            return state.showParamsModal;
        },
        floors(state: State): number[] {
            return state.params.floors;
        },
        floorHeight(state: State): number {
            return state.params.floorHeight;
        },
        speed(state: State): number {
            return state.params.speed;
        },
    }
};