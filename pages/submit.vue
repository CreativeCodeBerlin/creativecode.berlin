<template>
    <section class="submit">
        <form>
            <h2>Submit</h2>
            
            <div>
                <label for="url">Artwork URL</label>
                <input type="text" id="url" name="url" v-model="url" placeholder="URL" />
                <details>
                    The artwork needs to be hosted by you. For images in can be on your own website, or on a service like <a href="https://imgur.com">Imgur</a>.
                    For video it can be on your own website, or on a service like <a href="https://vimeo.com">Vimeo</a> or <a href="https://youtube.com">Youtube</a>.
                    Generate an embed code and paste the URL from the src attribute here.
                </details>
            </div>

            <div>
                <label for="author">Author Name</label>
                <input type="text" id="author" name="author" v-model="author" placeholder="Author" />
                <details>
                    Your name / the author of the artwork.
                </details>
            </div>

            <div>
                <label for="author_url">Author URL</label>
                <input type="text" id="author_url" name="author_url" v-model="author_url" placeholder="Author URL" />
                <details>
                    Your website / the author's website.
                </details>
            </div>

            <div>
                <label for="color">Background Color</label>
                <select v-model="color">
                    <option value="black">Black</option>
                    <option value="white">White</option>
                </select>
            </div>

            <div>
                <label for="scale">Scale</label>
                <input type="range" max="1.5" min="0.5" step="0.01" id="scale" name="scale" v-model="scale" placeholder="Author URL" />{{ scale  }}
                <details>
                    The scale of the artwork. 1 is 100%. This is so you can hide any elements you don't want to show from the embed like video controls or page headers.
                </details>
            </div>
            
            <div>
                <label for="result">Result</label>
                <textarea id="result" cols="20" rows="20">{{ project }}</textarea>
                <details>
                    Copy this code and email it to <a href="mailto:team@creativecode.berlin">team@creativecode.berlin</a> or message one of the moderators on the <a href="https://creativecode.berlin/discord">discord</a>.
                </details>
            </div>
        </form>
    </section>
</template>

<script setup>
const project = inject('project')

const url = ref(project.value.url)
const author = ref(project.value.author)
const author_url = ref(project.value.author_url)
const color = ref(project.value.color)
const scale = ref(project.value.scale)

watch([url, author, author_url, color, scale], () => {
    project.value = {
        url: url.value,
        author: author.value,
        author_url: author_url.value,
        color: color.value,
        scale: scale.value
    }
})


</script>

<style lang="scss" scoped>
.submit{
    padding: var(--pad2);
    label{
        display: block;
    }
}
</style>