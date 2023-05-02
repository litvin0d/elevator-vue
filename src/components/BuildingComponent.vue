<template>
    <div class="building">
        <div class="floors">
            <floor-component v-for="floor in floors" :key="floor" :floor-num="floor" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import FloorComponent from "@/components/FloorComponent.vue";

export default defineComponent({
    components: {
        FloorComponent
    },
    computed: {
        ...mapGetters(["floors"])
    }
});
</script>

<style scoped>
.building {
    display: flex;
    flex-direction: column;
    padding: 36px 36px 0;
    align-items: center;
    border: 3px solid #2b2b38;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #9c9090;
    background-image: url("@/assets/img/building.jpg");
    background-size: 300px;
}

.floors {
    display: block;
}
</style>
