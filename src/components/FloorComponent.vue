<template>
    <div class="floor">
        <div class="elevator-area" v-for="elevator in elevatorsNumber" :key="elevator">
            <shaft-component :floor-num="floorNum" />
            <div class="wrapper">
                <h2>{{ floorNum }}</h2>
                <call-button :floor-num="floorNum" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import ShaftComponent from "@/components/ShaftComponent.vue";
import CallButton from "@/components/CallButton.vue";

export default defineComponent({
    components: {
        ShaftComponent,
        CallButton
    },
    props: {
        floorNum: {
            type: Number,
            default: 1
        }
    },
    computed: {
        ...mapGetters(["floorHeight", "elevatorsNumber"])
    }
});
</script>

<style scoped>
.floor {
    display: flex;
    gap: 64px;
}

.elevator-area {
    display: flex;
    gap: 16px;
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
</style>
