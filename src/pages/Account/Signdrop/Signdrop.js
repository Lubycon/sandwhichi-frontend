import APIService from '@/services/API.service';
import SigndropForm from '@/components/forms/Signdrop.form.vue';

export default {
    name: 'Signdrop',
    components: {
        SigndropForm,
    },
    methods: {
        postData (data) {
            return APIService.resource('users.signdrop').delete(data)
            .then(res => {
                console.log(res);
            });
        },
    },
};
