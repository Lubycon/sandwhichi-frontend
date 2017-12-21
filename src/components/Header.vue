<template>
<nav class="row navbar fixed-top">
    <div class="col-4"></div>
    <div class="col-4 header--global-logo">
        <router-link to="/">
            <img :src="logoSrc" alt="global-logo">
        </router-link>
    </div>
    <div class="col-4 header--user-menu">
        <div v-if="isAuthorized">isAuthorized</div>
        <div v-else>
            <router-link class="btn btn-round" :to="{ name: 'signin' }">
                Login
            </router-link>
        </div>
    </div>

    <!-- MODAL -->
    <signup-modal ref="signupModal"></signup-modal>
    <!-- /MODAL -->
</nav>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

nav {
    margin: 0;
    height: $global-header-height;
    border-bottom: 1px solid $grey-400;
    background: {
        color: $white;
    }
    .col-4 {
        @include mq('sm') {
            padding: 0;
        }
    }
    .header--global-logo {
        text-align: center;
        img {
            width: 50px;
            height: 100%;
        }
    }
    .header--user-menu {
        text-align: right;
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import { LOGO } from '@/constants';
import SignupModal from '@/components/modals/SignupModal.vue';

@Component({
    name: 'GlobalHeader',
    components: {
        SignupModal,
    },
})

class GlobalHeader extends Vue {
    logoSrc: string;
    msg: string;

    constructor () {
        super();
        
        this.logoSrc = LOGO;
        this.msg = 'This is Global Header';
    }

    @State('auth') AuthState;
    @Getter('isAuthorized') isAuthorized;
}

export default GlobalHeader;
</script>
