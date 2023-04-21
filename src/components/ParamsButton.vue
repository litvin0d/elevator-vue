<template>
    <button @click="toggleParamsModal">
        <params-icon />
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import ParamsIcon from "@/assets/icons/ParamsIcon.vue";

export default defineComponent({
    components: {
        ParamsIcon
    },
    computed: {
        ...mapMutations(["toggleParamsModal"])
    }
});
</script>

<style scoped>
button {
    position: absolute;
    top: 16px;
    left: 16px;
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    padding: 0;
    cursor: pointer;
    transition: transform .25s ease-in-out;
}

button:focus {
    transform: rotate(180deg);
}
</style>
