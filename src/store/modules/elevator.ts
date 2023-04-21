import type { State } from "../../../env";

export const elevatorModule = {
    state: {
        elCurrentFloor: 1,
        destinationFloors: [],
    },
    mutations: {
        setElCurrentFloor(state: State, payload: number): void {
            state.elCurrentFloor = payload;
        },
        shiftDestinationFloors(state: State): void {
            state.elCurrentFloor = state.destinationFloors.shift()
        },
        pushDestinationFloors(state: State, payload: number): void {
            if (state.destinationFloors.indexOf(payload) === -1) {
                state.destinationFloors.push(payload, 1);
            }
        },
    },
    getters: {
        elCurrentFloor(state: State): number | undefined {
            return state.elCurrentFloor;
        },
        destinationFloors(state: State): number[] {
            return state.destinationFloors;
        }
    }
}