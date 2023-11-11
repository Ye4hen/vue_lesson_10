<template>
    <div class="home">
        <contacts-manager />
    </div>
</template>

<script>
import ContactsManager from '@/components/ContactsManager.vue'
// @ is an alias to /src

export default {
    name: 'HomeView',
    components: { ContactsManager },
}
</script>
