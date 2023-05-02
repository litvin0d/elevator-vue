import type { State } from "../../../env";

export const elevatorModule = {
    state: {
        // elevators: [
        //     {
        //
        //     },
        //     {
        //
        //     }
        // ],
        elCurrentFloor: 1,
        destinationFloors: []
    },
    mutations: {
        shiftDestinationFloors(state: State): void {
            state.elCurrentFloor = state.destinationFloors.shift();
        },
        pushDestinationFloors(state: State, payload: number): void {
            if (state.destinationFloors.indexOf(payload) === -1) {
                state.destinationFloors.push(payload, 1);
            }
        }
    },
    getters: {
        elCurrentFloor(state: State): number | undefined {
            return state.elCurrentFloor;
        },
        destinationFloors(state: State): number[] {
            return state.destinationFloors;
        }
    }
};
