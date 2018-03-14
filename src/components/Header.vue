<template>
<nav class="row navbar fixed-top">
    <div class="col-4"></div>
    <div class="col-4 header--global-logo">
        <router-link to="/">
            <img :src="logoSrc" alt="global-logo">
        </router-link>
    </div>
    <div class="col-4 header--user-menu">
        <div v-if="isAuthorized">
            <b-button @click="signout">Signout</b-button>
        </div>
        <div v-else>
            <router-link class="btn btn-round" :to="{ name: 'signin' }">
                Login
            </router-link>
        </div>
    </div>
</nav>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

nav {
    margin: 0;
    height: $global-header-height;
    border-bottom: 1px solid $grey400;
    background: {
        color: $white;
    }
    .col-4 {
        padding: 0;
        @include mq('sm') {
            padding: 0 20px;
        }
    }
    .header--global-logo {
        text-align: center;
        img {
            $width: 100px;
            width: 100px;
            height: 100%;
            @include mq('sm') {
                width: $width + 30;
            }
        }
    }
    .header--user-menu {
        text-align: right;
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter, Action } from 'vuex-class';
import { TYPE_LOGO } from '@/constants';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'GlobalHeader',
})
class GlobalHeader extends Vue {
    logoSrc: string;
    msg: string;

    constructor () {
        super();
        
        this.logoSrc = TYPE_LOGO;
        this.msg = 'This is Global Header';
    }

    @State('auth') AuthState;
    @Getter('isAuthorized') isAuthorized;
    @Action('destroy') destoryToken;

    signout () {
        APIAuth.signout();
    }
}

export default GlobalHeader;
</script>
