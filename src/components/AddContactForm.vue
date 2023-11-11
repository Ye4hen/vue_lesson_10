<template>
    <div class="contact__forms">
        <div class="contact__form">
            <div>
                <label>
                    Введіть ім'я контакту
                    <input type="text" v-model="newContactFirstName" />
                </label>
            </div>
            <div>
                <label>
                    Введіть призвіще контакту
                    <input type="text" v-model="newContactLastName" />
                </label>
            </div>
            <div>
                <label>
                    Введіть e-mail контакту
                    <input type="email" v-model="newContactEmail" />
                </label>
            </div>
            <button @click="addContact">Додати контакт</button>
            <button @click="closeForm">Відмінити</button>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AddContactForm',

    data() {
        return {
            newContactFirstName: null,
            newContactLastName: null,
            newContactEmail: null,
        }
    },

    computed: {
        ...mapGetters(['getRandomColor', 'errorMessage', 'fullName', 'isValidEmail']),
    },

    methods: {
        ...mapActions(['addNewContact', 'setErrorMessage']),
        closeForm() {
            this.$router.push({
                name: 'home',
            })
            this.setErrorMessage(null)
        },
        addContact() {
            if (this.newContactFirstName || this.newContactLastName || this.isValidEmail(this.newContactEmail)) {
                if (this.newContactEmail && !this.isValidEmail(this.newContactEmail)) {
                    this.setErrorMessage('Введіть коректний e-mail')
                } else {
                    this.addNewContact({
                        emails: this.newContactEmail,
                        first_name: this.newContactFirstName,
                        last_name: this.newContactLastName,
                    })
                    this.$router.push({ name: 'home' })
                    this.setErrorMessage(null)
                }
            } else {
                this.setErrorMessage('Введіть валідні дані')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>