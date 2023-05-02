<template>
    <div class="elevator" :style="elevator"></div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { mapGetters } from "vuex";
import { store } from "@/store/store";

export default defineComponent({
    data() {
        return {
            elevator: {
                opacity: "1",
                transform: "translateY(0px)",
                height: "100px"
            },
            posY: 0, // px
            direction: 0, // 1 - вверх, -1 - вниз
            wait: 500 // ms,
        };
    },
    computed: {
        ...mapGetters(["floorHeight", "destinationFloors", "speed", "elCurrentFloor"])
    },
    mounted() {
        watch(
            () => this.destinationFloors.length,
            (newLength, oldLength) => {
                if (newLength > oldLength) {
                    this.callHandler();
                }
            },
            { deep: true }
        );

        watch(
            () => this.floorHeight,
            () => {
                this.elevator.height = `${this.floorHeight}px`;
            }
        );
    },
    methods: {
        // ожидание
        pause() {
            return new Promise((r) => setTimeout(r, this.wait));
        },

        // действия после остановки лифта
        stop() {
            this.direction = 0;
            store.commit("shiftDestinationFloors");
            this.elevator.opacity = "1";
            this.pause().then(() => this.elevatorHandler());
        },

        // анимация движения лифта
        move() {
            this.elevator.opacity = "0.5";
            this.elevator.transform = `translateY(${(this.posY +=
                this.speed * -this.direction)}px)`;

            if (this.direction === -1) {
                if (this.posY < -(store.getters.destinationFloors[0] - 1) * this.floorHeight) {
                    requestAnimationFrame(() => this.move());
                } else {
                    this.stop();
                }
            } else if (this.direction === 1) {
                if (-this.posY < (store.getters.destinationFloors[0] - 1) * this.floorHeight) {
                    requestAnimationFrame(() => this.move());
                } else {
                    this.stop();
                }
            }
        },

        // определяет направление лифта и вызывает анимацию движения
        elevatorHandler() {
            // если текущий этаж меньше, чем назначенный задаёт направление вверх
            if (this.elCurrentFloor < store.getters.destinationFloors[0]) {
                this.direction = 1;
                requestAnimationFrame(() => this.move());
            }

            if (this.elCurrentFloor > store.getters.destinationFloors[0]) {
                this.direction = -1;
                if (store.getters.destinationFloors[1] < this.elCurrentFloor) {
                    // если следующий этаж меньше текущего
                    store.commit("shiftDestinationFloors");
                }
                requestAnimationFrame(() => this.move());
            }

            if (!store.getters.destinationFloors[0]) {
                this.direction = 0;
            }
        },

        // добавляет номер этажа в список назначений
        callHandler() {
            if (this.direction === 0) {
                this.elevatorHandler();
            }
        }
    }
});
</script>

<style scoped>
.elevator {
    position: absolute;
    border: 1px solid #2b2b38;
    width: 99px;
    height: 100px;
    background-color: #2b2b38;
    background-image: url("../assets/img/elevator.jpg");
    background-size: cover;
}
</style>
