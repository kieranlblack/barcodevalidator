<template>
    <div id="app">
        <SheetComponent />
    </div>
</template>

<script>
import SheetComponent from "./components/SheetComponent.vue";

export default {
    name: "app",
    components: {
        SheetComponent
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
