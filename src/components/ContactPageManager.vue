<template>
    <div>
        <contact-edit v-if="mode === 'edit'" />
        <add-contact-form v-else />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddContactForm from '@/components/AddContactForm.vue'
import ContactEdit from './ContactEdit.vue'

export default {
    name: 'ContactPageManager',
    components: {
        AddContactForm,
        ContactEdit,
    },

    computed: {
        ...mapGetters(['mode']),
    },
}
</script>

<style lang="scss" scoped>
</style>