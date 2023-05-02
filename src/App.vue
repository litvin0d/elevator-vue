<template>
    <main>
        <params-button />
        <params-modal />
        <building-component />
        <ground-component />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParamsButton from "@/components/ParamsButton.vue";
import ParamsModal from "@/components/ParamsModal.vue";
import BuildingComponent from "@/components/BuildingComponent.vue";
import GroundComponent from "@/components/GroundComponent.vue";
export default defineComponent({
    components: {
        ParamsButton,
        ParamsModal,
        BuildingComponent,
        GroundComponent
    }
});
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #89c4e3;
    background-image: url("@/assets/img/sky.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
