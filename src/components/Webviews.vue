<template>
    <div class="views">
        <div id="preferences" class="view view-active" key="preferences">
            <webview
                id="foo"
                class="innner-view"
                src="./preferences.html"
                style="width: 100%;height: 100%;"
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
            width: 100%;
            height: 100%;
        }

        .view {
            display: none;
            flex: 1;
            height: 100%;
            background-color: $silver;

            &-active {
                display: block;
            }
        }
    }
</style>
