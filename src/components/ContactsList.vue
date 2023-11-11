<template>
    <div class="contact__container">
        <button @click="openForm" class="add-btn">
            <span class="add-btn-span">+</span>
            Новий контакт
        </button>
        <ul class="contact__list">
            <li v-for="contact in filteredList" :key="contact.id" class="contact__item">
                <div class="contact__image" :style="{ backgroundColor: getRandomColor() }">
                    {{ contactAvatar(contact) }}
                </div>
                <div v-if="fullName(contact) || contact.emails" class="contact__info">
                    <h5 v-if="fullName(contact)" class="contact__name">
                        {{ contact.first_name }} {{ contact.last_name }}
                    </h5>
                    <a v-if="contact.emails" href="mailto:{{contact.emails[0]}}" class="contact__email">
                        {{ contact.emails[0] }}
                    </a>
                </div>
                <div v-else class="score">{{ contact.activity_score }}</div>
                <button class="button" @click="onEditContact(contact.id)">Редагувати</button>
            </li>
        </ul>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ContactsList',

    computed: {
        ...mapGetters([
            'contactsList',
            'contactAvatar',
            'fullName',
            'getRandomColor',
            'contactForm',
            'filteredList',
            'errorMessage',
        ]),
    },
    methods: {
        ...mapActions(['getContactsList', 'openForm', 'editContact', 'setModeToAdd']),
        openForm() {
            this.$router.push({
                name: 'contact',
            })
            this.setModeToAdd()
            console.log(this.mode)
        },
        onEditContact(id) {
            this.editContact(id)
            this.$router.push({
                name: 'contact_edit',
                params: {
                    contactId: id,
                },
            })
        },
    },
    created() {
        this.getContactsList()
    },
}
</script>

<style lang="scss" scoped>
</style>