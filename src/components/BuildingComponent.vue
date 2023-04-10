<script setup>
import FloorComponent from "@/components/FloorComponent.vue";</script>

<template>
    <div class="building">
        <div class="floors">
            <FloorComponent :floorNum="4" />
            <FloorComponent :floorNum="3" />
            <FloorComponent :floorNum="2" />
            <FloorComponent :is-init="true" />
        </div>
    </div>
</template>

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
    background-image: url("../assets/img/slabs.jpg");
    background-size: 300px;
}

.floors {
    display: block;
}

.btn-wrapper > h2 {
    color: #ffffff;
    margin-top: 8px;
}
</style>