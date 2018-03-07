<template>
<div class="container-fluid">
    <ul>
        <li
            v-for="(item, index) in testRouters"
            :key="index">
            <b-button :to="item.route">{{ item.name }}</b-button>
        </li>
    </ul>
</div>
</template>

<style lang="scss" scoped>
@import '~@/styles/utils/__module__';

h1 {
    margin: 50px 0;
    color: $bluegrey800;
    text-align: center;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface TestRouter {
    name: string;
    route: string;
}

@Component({
    name: 'Home',
})
class Home extends Vue {
    testRouters: TestRouter[] = [];

    constructor () {
        super();
        this.testRouters.push({
            name: 'Sign in',
            route: 'signin',
        }, {
            name: 'Sign up',
            route: 'signup',
        }, {
            name: 'Sign Drop',
            route: 'signdrop',
        }, {
            name: 'Find Password',
            route: 'find-password',
        });
    }
}
export default Home;
</script>
