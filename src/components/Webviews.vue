<template>
    <div class="views">
        <div id="preferences" class="view view-active" key="preferences">
            <webview
                id="foo"
                class="innner-view"
                src="./preferences.html"
                style="height: 100%;width: 100%;"
            ></webview>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Webviews',
    };
</script>
<style lang="scss">
    .views {
        width: 100%;

        .inner-view {
            height: 100%;
            width: 100%;
        }

        .view {
            flex: 1;
            height: 100%;
            background-color: $silver;
            display: none;

            &-active {
                display: block;
            }
        }
    }
</style>
