<script setup>
import { ref } from "vue";

const elevator = ref({});
let floorHeight = 100; // px
let currentFloor = 1;
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
    currentFloor = destinationFloors.shift();
    elevator.value.opacity = "1";
    pause().then(() => {
        elevatorHandler();
    });
}

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
}

// определяет направление лифта и вызывает анимацию движения
const elevatorHandler = () => {
    // если текущий этаж меньше, чем назначенный задаёт направление вверх
    if (currentFloor < destinationFloors[0]) {
        direction = 1;
        requestAnimationFrame(() => move());
    }

    if (currentFloor > destinationFloors[0]) {
        direction = -1;
        if (destinationFloors[1] < currentFloor) { // если следующий этаж меньше текущего
            destinationFloors.shift(); // удаляет текущий этаж назначения
        }
        requestAnimationFrame(() => move());
    }

    if (!destinationFloors[0]) {
        direction = 0;
    }
}

// добавляет номер этажа в список назначений
const callHandler = (floorNum) => {
    if (destinationFloors.indexOf(floorNum) === -1) {
        destinationFloors.push(floorNum, 1);
        if (direction === 0) {
            elevatorHandler();
        }
    }
}
</script>

<template>
    <main>
        <div class="building">
            <div class="floors">
                <div class="floor">
                    <div class="shaft"></div>
                    <div class="btn-wrapper">
                        <h2>4</h2>
                        <button @click="callHandler(4)" class="btn floor-4">&middot;</button>
                    </div>
                </div>
                <div class="floor">
                    <div class="shaft"></div>
                    <div class="btn-wrapper">
                        <h2>3</h2>
                        <button @click="callHandler(3)" class="btn floor-3">&middot;</button>
                    </div>
                </div>
                <div class="floor">
                    <div class="shaft"></div>
                    <div class="btn-wrapper">
                        <h2>2</h2>
                        <button @click="callHandler(2)" class="btn floor-2">&middot;</button>
                    </div>
                </div>
                <div class="floor">
                    <div class="shaft"></div>
                    <div class="btn-wrapper">
                        <h2>1</h2>
                        <button class="btn">&middot;</button>
                    </div>
                    <div :style="elevator" id="elevator"></div>
                </div>
            </div>
        </div>
        <div class="ground"></div>
    </main>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color: #a4afff;
    background-image: url("./assets/img/sky.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
}

.building {
    display: flex;
    flex-direction: column;
    padding: 36px 36px 0;
    align-items: center;
    border: 3px solid #2b2b38;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #9c9090;
    background-image: url("./assets/img/slabs.jpg");
    background-size: 300px;
}

.floors {
    display: block;
}

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
    background-image: url("./assets/img/button.jpg");
    background-size: cover;
    border-radius: 100%;
    border: 1px solid #000000;
    cursor: pointer;
    font-weight: 700;
    -webkit-tap-highlight-color: #ffffff00;
}

.active {
    color: #d02020;
}

#elevator {
    position: absolute;
    border: 1px solid #2b2b38;
    width: 100px;
    height: 100px;
    background-color: #2b2b38;
    background-image: url("./assets/img/elevator.jpg");
    background-size: cover;
}

.ground {
    width: 100%;
    height: 200px;
    background-color: darkgreen;
    background-image: url("./assets/img/ground.jpg");
    background-size: 300px;
}
</style>
