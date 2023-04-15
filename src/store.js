import { createStore } from "vuex";

export const store = createStore({
    state() {
        return {
            elCurrentFloor: 1,
            handler: floorNum => floorNum,
        };
    },
    mutations: {
        setElCurrentFloor(state, payload) {
            state.elCurrentFloor = payload;
        },

        setHandler(state, payload) {
            state.handler = payload;
        }
    }
});