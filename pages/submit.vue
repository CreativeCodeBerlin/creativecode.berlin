<template>
    <section class="submit">
        <form>
            <h2>Submit</h2>

            <div>
                <h2>How to submit</h2>
                <p>
                    <a
                        :href="`mailto:team@creativecode.berlin?subject=Website%20Submission&body=${encodeURIComponent(JSON.stringify(project))}`">Click
                        here to submit</a> or
                    copy the <a href="#result">code</a> below and email it to <a
                        href="mailto:team@creativecode.berlin">team@creativecode.berlin</a>.
                </p>

                <label for="url">Artwork URL</label>
                <input type="text" id="url" name="url" v-model="url" placeholder="URL" />

                <p>
                    The artwork needs to be hosted by you.<br>
                    For images in can be on your own website, or on a service like <a
                        href="https://imgur.com">Imgur</a>.<br>
                    For websites you could use a service like <a href="https://www.netlify.com/">Netlify</a>.
                    For video it can be on your own website, or on a service like <a href="https://vimeo.com">Vimeo</a>
                    or
                    <a href="https://youtube.com">Youtube</a>.<br>
                    Tip: When generating an embed code with an iFrame tag, use the url from the src attribute.

                </p>
            </div>

            <div>
                <label for="author">Author Name</label>
                <input type="text" id="author" name="author" v-model="author" placeholder="Author" />
                <p>Your name / the author of the artwork.</p>
            </div>

            <div>
                <label for="author_url">Author URL</label>
                <input type="text" id="author_url" name="author_url" v-model="author_url" placeholder="Author URL" />
                <p>Your website / the author's website.</p>
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
                <input type="range" max="1.5" min="0.5" step="0.01" id="scale" name="scale" v-model="scale" />
                <p>
                    The scale of the artwork. This is so you can hide any elements you don't want to show from
                    the embed like video controls or page headers.
                </p>
            </div>

            <div>
                <label for="result">The code to send to us</label>
                <textarea id="result" cols="30" rows="8">{{ project }}</textarea>


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
.submit {
    background: var(--background);

    padding: var(--pad2);
    padding-top: calc(var(--pad2) * 2);

    @media screen and (min-width: 800px) {
        min-width: 400px;
    }

    position: absolute;

    label {
        display: block;
    }

    p {
        max-width: 400px;
    }
}

label {
    margin-top: var(--pad);

}

input,
select {
    width: 100%;
    padding: var(--pad);
    font-size: 1.2em;
    box-sizing: border-box;
}

textarea {
    width: 100%;

}

h2 {
    margin-top: var(--pad2);
}
</style>
