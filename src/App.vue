<template>
    <div class="app">
        <div class="draggable"></div>

        <div class="layout">
            <Sidebar />
        </div>
    </div>
</template>

<script>
import Sidebar from "./components/sidebar/Sidebar";

export default {
    name: "app",
    components: {
        Sidebar
    }
};
</script>

<style lang="scss" scoped>
.draggable {
    height: 50px;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 9999;
    -webkit-app-region: drag;
}

.app {
    background-color: $silver;
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
}
</style>
