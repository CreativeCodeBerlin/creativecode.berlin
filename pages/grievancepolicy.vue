<template>
    <div>
        <article v-html="result"></article>
    </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";

const sourceUrl = "https://github.com/CreativeCodeBerlin/Meta/raw/main/grievancepolicy.md"

const { data } = await useFetch(sourceUrl)

const markdown = new MarkdownIt();

const result = markdown.render(data.value);

</script>


<style scoped>
div {
    background: var(--background);
    padding: var(--pad2);
}
</style>