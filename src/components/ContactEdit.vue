<template>
    <div class="contact__forms">
        <div class="contact__form">
            <div>
                <label>
                    Ім'я контакту
                    <input type="text" v-model="currentContact.first_name" />
                </label>
            </div>
            <div>
                <label>
                    Призвіще контакту
                    <input type="text" v-model="currentContact.last_name" />
                </label>
            </div>
            <div>
                <label>
                    E-mail контакту
                    <input type="email" v-model="currentContact.emails[0]" />
                </label>
            </div>
            <button @click="updateContactInfo">Зберегти зміни</button>
            <button @click="cancelChanges">Відмінити</button>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ContactEdit',

    data() {
        return {
            originalContact: {},
            currentContact: {},
        }
    },

    computed: {
        ...mapGetters(['getContactById', 'errorMessage', 'isValidEmail']),
        contactId() {
            return this.$route.params.contactId
        },
    },

    created() {
        this.originalContact = JSON.parse(JSON.stringify(this.getContactById(this.contactId)))
        this.currentContact = { ...this.originalContact }
    },

    methods: {
        ...mapActions(['changeContactInfo', 'setErrorMessage']),

        updateContactInfo() {
            if (!this.isValidEmail(this.currentContact.emails[0])) {
                this.setErrorMessage('Введіть валідний e-mail')
            } else {
                this.changeContactInfo(this.currentContact)
                this.setErrorMessage(null)
                this.$router.push({
                    name: 'home',
                })
            }
        },
        cancelChanges() {
            this.currentContact = { ...this.originalContact }
            this.setErrorMessage(null)
            this.$router.push({
                name: 'home',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>