<template>
    <main>
        <!--<ParamsComponent />-->
        <BuildingComponent />
        <div class="ground"></div>
    </main>
</template>

<script setup>
import BuildingComponent from "@/components/BuildingComponent.vue";
// import ParamsComponent from "@/components/ParamsComponent.vue";
</script>

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

.ground {
    width: 100%;
    height: 200px;
    background-color: darkgreen;
    background-image: url("./assets/img/ground.jpg");
    background-size: 300px;
}
</style>
