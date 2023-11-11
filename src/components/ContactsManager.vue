<template>
    <div>
        <contacts-filter />
        <contacts-list />
    </div>
</template>

<script>
import ContactsList from './ContactsList.vue'
import ContactsFilter from './ContactsFilter.vue'
export default {
    name: 'ContactsManager',
    components: {
        ContactsList,
        ContactsFilter,
    },
}
</script>

<style lang="scss" scoped>
</style>