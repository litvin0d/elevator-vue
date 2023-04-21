<template>
    <div class="floor">
        <div class="shaft" :style="{ height: `${floorHeight}px` }"></div>
        <div class="wrapper">
            <h2>{{ floorNum }}</h2>
            <button
                @click="clickHandler(floorNum)"
                class="btn"
                :disabled="floorNum === 1"
                :class="[`floor-${floorNum}`]"
                :style="active"
            >&middot;
            </button>
        </div>
        <elevator-component ref="elevatorComponent" v-if="floorNum === 1" />
    </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { mapGetters, mapMutations } from "vuex";
import ElevatorComponent from "@/components/ElevatorComponent.vue";
import { store } from "@/store/store";

export default defineComponent({
    data() {
        return {
            active: {
                color: "black"
            }
        };
    },
    components: {
        ElevatorComponent
    },
    props: {
        floorNum: {
            type: Number,
            default: 1
        }
    },
    mounted() {
        watch(() => this.destinationFloors, () => {
            if (this.floorNum !== 1 && this.destinationFloors.includes(this.floorNum)) {
                this.active.color = "red";
            } else {
                this.active.color = "black";
            }
        }, { deep: true });
    },
    computed: {
        ...mapGetters(["floorHeight", "destinationFloors"]),
        ...mapMutations(["pushDestinationFloors"])
    },
    methods: {
        clickHandler(floorNum: number | undefined) {
            store.commit("pushDestinationFloors", floorNum);
        }
    }
});
</script>

<style scoped>
.floor {
    display: flex;
    gap: 16px;
}

.shaft {
    width: 100px;
    border: 1px solid #2b2b38;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrapper > h2 {
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
</style>