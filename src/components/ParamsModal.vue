<template>
    <div class="overlay" v-if="showParamsModal" @click.self="toggleParamsModal">
        <form @submit.prevent="submitParams">
            <h2>Parameters</h2>
            <div class="params">
                <label>
                    floors number:
                    <select v-model="floorsNum">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    floor height (px):
                    <input v-model="floorHeight" type="number" placeholder="px" :min="85" :max="200">
                </label>
                <label>
                    speed (px/ms):
                    <input v-model="speed" type="number" placeholder="px/ms" :min="1" :max="10">
                </label>
            </div>
            <div class="buttons">
                <button @click="toggleParamsModal">Close</button>
                <button type="submit">SUBMIT</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { store } from "@/store/store";

interface Params {
    floors: number[],
    floorHeight: number,
    speed: number,
}

export default defineComponent({
    data() {
        return {
            floorsNum: 3,
            floorHeight: 100,
            speed: 2
        };
    },
    computed: {
        ...mapGetters(["showParamsModal"]),
        ...mapMutations(["toggleParamsModal"])
    },
    methods: {
        submitParams() {
            // если выбранные значения не соответствуют ограничениям, то присваиваются дефолтные
            (!this.floorsNum || this.floorsNum < 2 || this.floorsNum > 5) && (this.floorsNum = 3);
            (!this.floorHeight || this.floorHeight < 85 || this.floorHeight > 200) && (this.floorHeight = 100);
            (!this.speed || this.speed < 1 || this.speed > 10) && (this.speed = 2);

            // создание массива этажей (от 1 до floorsNum)
            const floors = Array.from({ length: this.floorsNum }, (_, i) => i + 1);

            const params: Params = {
                floors: floors.reverse(),
                floorHeight: this.floorHeight,
                speed: this.speed
            };

            store.commit("setParams", params);
        }
    }
});
</script>


<style scoped>
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000000C4;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    background: #000;
    padding: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 32px;
    border: 1px dashed #fff;
    width: 320px;
}

.params {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.params > label {
    display: flex;
    justify-content: space-between;
}

.params > label > select, input {
    width: 64px;
    background: #000;
    color: #fff;
    border: 1px solid #fff;
}

.buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.buttons > button {
    background: inherit;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0;
    font-size: 16px;
    transition: all .25s ease-in-out;
}

.buttons > button:hover {
    text-decoration: underline;
}
</style>