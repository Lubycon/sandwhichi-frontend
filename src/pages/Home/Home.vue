<template>
<div class="container-fluid">
    <h1>{{ msg }}</h1>
    <button @click="updateMsg">test</button>

    <!-- MODAL -->
    <signup-modal ref="signupModal"></signup-modal>
    <!-- /MODAL -->
</div>
</template>

<style lang="scss" scoped>
@import './Home';
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SignupModal from '@/components/modals/SignupModal.vue';

@Component({
    name: 'Home',
    components: {
        SignupModal,
    },
})
class Home extends Vue {
    $refs: {
        signupModal: any;
    }

    msg: string;

    constructor () {
        super();

        this.msg = 'Hello, World';
    }

    hideModal () {
        this.$refs.signupModal.hide();
    }

    updateMsg () {
        this.msg = 'After Updated';
    }
}
export default Home;
</script>
