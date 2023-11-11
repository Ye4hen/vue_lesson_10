<template>
    <div class="products__filter">
        <input v-model="searchText" type="text" @input="updateSearchText" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'ContactsFilter',

    data() {
        return {
            searchText: null,
        }
    },

    methods: {
        ...mapActions(['updateFilterText']),
        updateSearchText() {
            this.updateFilterText(this.searchText)
        },
    },
}
</script>

<style lang="scss" scoped>
</style>