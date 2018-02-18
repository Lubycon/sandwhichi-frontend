<template>
<nav class="row navbar">
    <ul>
        <li v-for="menu in navMenus">
            <router-link :to="{ name: menu.link }">
                {{ menu.name }}
            </router-link>
        </li>
    </ul>
</nav>
</template>

<style lang="scss" scoped>
@import 'src/styles/utils/__module__';

$footer-margin: 1.5rem;
$menu-margin: $footer-margin / 2;

nav {
    border-top: 1px solid $grey400;
    margin: 0;
    padding: {
        top: $footer-margin;
        right: $footer-margin;
        left: $footer-margin;
    }
    ul li {
        a {
            font-size: 1rem;
            color: $bluegrey700;
            &.router-link-exact-active {
                font-weight: bold;
            }
        }
    }
}

ul {
    li {
        display: inline-block;
        margin-right: $menu-margin;
        padding-right: $menu-margin;
        text-align: center;
        font-size: 1rem;
        border-right: 1px solid $grey400;
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface FooterMenu {
    name: string;
    link: string;
}

@Component({
    name: 'GlobalFooter',
})
class GlobalFooter extends Vue {
    navMenus: FooterMenu[];
    msg: string;

    constructor () {
        super();

        this.navMenus = [{
            name: 'Menu1',
            link: 'home',
        }];
        this.msg = 'This is Global Footer';
    }
}
export default GlobalFooter;
</script>
