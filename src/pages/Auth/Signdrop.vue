<template>
<div class="container row">
    <div class="col-12 col-md-6 col-lg-4 card card--center-form">
        <div data-section="form-desc">
            <h1>Could I ask you some last questions?</h1>
            <p>Your comments can make <strong>Pixelstairs</strong> a better service!</p>
        </div>
        <signdrop-form @submit="postData"></signdrop-form>
    </div>

</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { UserSigndropData } from '@/interfaces/User.interface';
import SigndropForm from '@/components/forms/Signdrop.form.vue';
import APIAuth from '@/api/APIAuth';

@Component({
    name: 'Signdrop',
    components: { SigndropForm },
})
class Signdrop extends Vue {
    async postData (data: UserSigndropData): Promise<any> {
        try {
            const signdropResponse = APIAuth.signdrop(data);
            APIAuth.signout();
            return signdropResponse;
        }
        catch (e) {}
    }
}
export default Signdrop;
</script>
