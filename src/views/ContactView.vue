<template>
    <div class="about">
        <contact-page-manager />
    </div>
</template>
<script>
import ContactPageManager from '@/components/ContactPageManager.vue'

// @ is an alias to /src

export default {
    name: 'ContactView',
    components: { ContactPageManager },
}
</script>
