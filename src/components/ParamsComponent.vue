<script>

</script>

<template>
    <div class="params">
        <p>Number of floors:</p>
        <select class="sel">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
</template>

<style>
.params {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    gap: 16px;
    background: black;
    color: #fff;
    z-index: 1000;
}

.params > p {
    padding: 16px;
}

.params > select {
    padding-right: 16px;
}
</style>