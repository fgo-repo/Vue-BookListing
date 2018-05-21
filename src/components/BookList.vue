<template>
    <div>
        <h1>{{ title }}</h1>
        <ul>
            <li>book 1</li>
            <li>book 2</li>
            <li>book 3</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'BookList',
    data() {
        return {
            title: "All Books"
        }
    }
}
</script>

<style>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
</style>
