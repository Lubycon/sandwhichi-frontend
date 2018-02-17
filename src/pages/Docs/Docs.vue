<template>
<div class="container document">
    <header>
        <nav class="row justify-content-center">
            <div class="col-6 col-lg-2">
                <b-button :to="{ name: 'terms-of-service' }">Terms of service</b-button>
            </div>
            <div class="col-6 col-lg-2">
                <b-button :to="{ name: 'privacy-policy' }">Privacy policy</b-button>
            </div>
        </nav>
    </header>
    <div class="row">
        <div class="col-12" data-name="document">
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<style lang="scss">
@import 'src/styles/utils/__module__';

.container.document {
    $document-padding: 40px;
    $document-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

    margin: $document-padding * 2 auto;

    header {
        margin-bottom: $document-padding;
        nav.row {
            background-color: $white;
            box-shadow: $document-shadow;
        }
        nav>div {
            text-align: center;
            padding: 0;
            .btn {
                border: none;
                border-radius: 0;
                background-color: transparent;
                color: $bluegrey600;
                box-shadow: none;
                padding: $document-padding / 2;
                font-weight: bold;
                &.active {
                    border-bottom: 5px solid $bluegrey600;
                }
            }
        }
    }

    div.row {
        div[data-name="document"] {
            $heading-size: 35px;
            $sub-heading-size: 20px;
            $content-size: 15px;

            margin-bottom: $document-padding;
            padding: $document-padding * 2 $document-padding;
            background-color: $white;
            box-shadow: $document-shadow;
            @include mq('sm') {
                padding: $document-padding $document-padding - 10px;
            }

            * {
                font-size: $content-size;
                font-weight: normal;
                line-height: 1.6;
                strong {
                    font-weight: bold;
                }
            }

            ol {
                border: 1px dashed $grey400;
                padding: {
                    left: $document-padding;
                    right: $document-padding / 2;
                    top: $document-padding / 2;
                    bottom: $document-padding / 2;
                }
            }

            section[data-name="title"] {
                margin-top: 0;
                margin-bottom: $document-padding;
                padding-bottom: $document-padding;
                border-bottom: 1px solid $grey400;
                h1 {
                    font-size: $heading-size;
                    font-weight: bold;
                    margin-bottom: $document-padding;
                    @include mq('sm') {
                        font-size: $heading-size / 1.5;
                    }
                }
                p {
                    @include mq('sm') {
                        font-size: $content-size - 2px;
                    }
                }
            }

            section {
                margin: $document-padding * 2 0;
                * {
                    font-size: $content-size;
                    @include mq('sm') {
                        font-size: $content-size - 2px;
                    }
                }
                h3 {
                    font-size: $sub-heading-size;
                    font-weight: bold;
                    margin-bottom: $document-padding;
                }
            }
        }
    }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Docs',
})
class Docs extends Vue {
    // Do nothing
}
export default Docs;
</script>
