<script setup>
import { defineProps, ref } from "vue";

import { store } from "@/store";
import ElevatorComponent from "@/components/ElevatorComponent.vue";

const btn = ref({});
store.commit("setBtn", btn);
console.log(store.state.isBtnActive.value);

defineProps({
    floorNum: {
        type: Number,
        default: 1,
    },
    isInit: {
        type: Boolean,
        default: false,
    }
});

const handler = (floorNum) => {
    if (store.state.elCurrentFloor !== floorNum) {
        store.commit("setBtnActive");
        store.state.handler(floorNum);
    }
};
</script>

<template>
    <div class="floor">
        <div class="shaft"></div>
        <div class="btn-wrapper">
            <h2>{{ floorNum }}</h2>
            <button @click="handler(floorNum)" :class="['btn', `floor-${floorNum}`]" :style="btn">&middot;
            </button>
        </div>
        <ElevatorComponent v-if="isInit" />
    </div>
</template>

<style scoped>
.floor {
    display: flex;
    gap: 16px;
}

.shaft {
    width: 100px;
    height: 100px;
    border: 1px solid #2b2b38;
}

.btn-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn-wrapper > h2 {
    color: #ffffff;
    margin-top: 8px;
}

.btn {
    font-size: 32px;
    padding: 0 13px;
    background-color: #2b2b38;
    background-image: url("../assets/img/button.jpg");
    background-size: cover;
    border-radius: 100%;
    border: 1px solid #000000;
    cursor: pointer;
    font-weight: 700;
    -webkit-tap-highlight-color: #ffffff00;
}

.active {
    color: red;
}
</style>