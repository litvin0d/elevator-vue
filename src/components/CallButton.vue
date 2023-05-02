<template>
    <button
        @click="clickHandler(floorNum)"
        class="btn"
        :disabled="floorNum === 1"
        :class="[`floor-${floorNum}`]"
        :style="active"
    >
        &middot;
    </button>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { mapGetters } from "vuex";
import { store } from "@/store/store";

export default defineComponent({
    data() {
        return {
            active: {
                color: "black"
            }
        };
    },
    props: {
        floorNum: {
            type: Number,
            default: 1,
            required: true
        }
    },
    mounted() {
        watch(
            () => this.destinationFloors,
            () => {
                if (this.floorNum !== 1 && this.destinationFloors.includes(this.floorNum)) {
                    this.active.color = "red";
                } else {
                    this.active.color = "black";
                }
            },
            { deep: true }
        );
    },
    computed: {
        ...mapGetters(["destinationFloors"])
    },
    methods: {
        clickHandler(floorNum: number | undefined) {
            store.commit("pushDestinationFloors", floorNum);
        }
    }

});
</script>

<style scoped>
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
</style>
