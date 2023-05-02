<template>
    <div class="shaft" :style="{ height: `${floorHeight}px` }">
        <elevator-component ref="elevatorComponent" v-if="floorNum === 1" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ElevatorComponent from "@/components/ElevatorComponent.vue";

export default defineComponent({
    components: {
        ElevatorComponent
    },
    props: {
        floorNum: {
            type: Number,
            default: 1,
            required: true
        }
    },
    computed: {
        ...mapGetters(["floorHeight"])
    }
})
</script>

<style scoped>
.shaft {
    width: 100px;
    border: 1px solid #2b2b38;
}
</style>
