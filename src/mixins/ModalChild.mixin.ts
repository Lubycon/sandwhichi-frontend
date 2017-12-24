import { Vue, Component } from 'vue-property-decorator';

export class ModalChildMixin extends Vue {
    $refs: {
        modal: any;
    }

    constructor () {
        super();
    }

    showModal (): void {
        if (this.$refs.modal) {
            this.$refs.modal.show();
            this.$emit('shown');
        }
    }

    hideModal (): void {
        if (this.$refs.modal) {
            this.$refs.modal.hide();
            this.$emit('hidden');
        }
    }
}
