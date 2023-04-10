<script setup>
import { ref } from "vue";

import { store } from "@/store";

const elevator = ref({});
let floorHeight = 100; // px
let posY = 0; // px
let direction = 0; // 1 - вверх, -1 - вниз
let speed = 2; // px
let wait = 500; // ms
let destinationFloors = [];

// ожидание
const pause = () => new Promise(r => setTimeout(r, wait));

// действия после остановки лифта
const stop = () => {
    direction = 0;
    store.state.elCurrentFloor = destinationFloors.shift();
    elevator.value.opacity = "1";
    if (store.state.elCurrentFloor !== 1) { // удаление класса active у кнопки
        store.commit("removeBtnActive");
    }
    pause().then(() => {
        elevatorHandler();
    });
};

// анимация движения лифта
const move = () => {
    elevator.value.opacity = "0.5";
    elevator.value.transform = `translateY(${posY += speed * -direction}px)`;

    if (direction === -1) {
        if (posY < -(destinationFloors[0] - 1) * floorHeight) {
            requestAnimationFrame(() => move());
        } else {
            stop();
        }
    } else if (direction === 1) {
        if (-posY < (destinationFloors[0] - 1) * floorHeight) {
            requestAnimationFrame(() => move());
        } else {
            stop();
        }
    }
};

// определяет направление лифта и вызывает анимацию движения
const elevatorHandler = () => {
    // если текущий этаж меньше, чем назначенный задаёт направление вверх
    if (store.state.elCurrentFloor < destinationFloors[0]) {
        direction = 1;
        requestAnimationFrame(() => move());
    }

    if (store.state.elCurrentFloor > destinationFloors[0]) {
        direction = -1;
        if (destinationFloors[1] < store.state.elCurrentFloor) { // если следующий этаж меньше текущего
            destinationFloors.shift(); // удаляет текущий этаж назначения
        }
        requestAnimationFrame(() => move());
    }

    if (!destinationFloors[0]) {
        direction = 0;
    }
};

// добавляет номер этажа в список назначений
const callHandler = (floorNum) => {
    if (destinationFloors.indexOf(floorNum) === -1) {
        destinationFloors.push(floorNum, 1);
        if (direction === 0) {
            elevatorHandler();
        }
    }
};

store.commit("setHandler", callHandler);
</script>

<template>
    <div :style="elevator" class="elevator"></div>
</template>

<style scoped>
.elevator {
    position: absolute;
    border: 1px solid #2b2b38;
    width: 100px;
    height: 100px;
    background-color: #2b2b38;
    background-image: url("../assets/img/elevator.jpg");
    background-size: cover;
}
</style>