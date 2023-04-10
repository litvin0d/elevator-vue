import { createStore } from "vuex";

export const store = createStore({
    state() {
        return {
            isBtnActive: {},
            elCurrentFloor: 1,
            handler: floorNum => floorNum,
        };
    },
    mutations: {
        setBtn(state, payload) {
            state.isBtnActive = payload;
        },

        setBtnActive(state) {
            state.isBtnActive.color = "red";
        },

        removeBtnActive(state) {
            state.isBtnActive.value.color = "blue";
        },

        setElCurrentFloor(state, payload) {
            state.elCurrentFloor = payload;
        },

        setHandler(state, payload) {
            state.handler = payload;
        }
    }
});