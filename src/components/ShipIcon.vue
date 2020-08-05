<template>
    <div class="shipIcon">
        <font-awesome-layers class="fa-2x">
            <font-awesome-icon :icon="['far', 'circle']" />
            <font-awesome-icon :icon="icon" :class="color" :transform="transform" />
            <font-awesome-layers-text :class="color" :value="text" transform="shrink-12 down-12" />
        </font-awesome-layers>
    </div>
</template>

<script>
import Classification from '../enums/Classification.js';
import ContactType from '../enums/ContactType.js';

export default {
    name: 'ShipIcon',
    props: {
        contact: {
            type: Object,
            required: true,
        },
    },
    computed: {
        color() {
            switch (this.contact.classification) {
                case Classification.FRIENDLY:
                    return 'has-text-success';
                case Classification.HOSTILE:
                    return 'has-text-danger';
                case Classification.CIVILLIAN:
                    return 'has-text-info';
                case Classification.UNCLASSIFIED:
                    return 'has-text-primary';
                default:
                    return 'has-text-warning';
            }
        },
        transform() {
            return 'shrink-6';
        },
        text() {
            return `${this.contact.code} ${this.contact.name}`;
        },
        icon() {
            switch (this.contact.contactType) {
                case ContactType.FIGHTER:
                    return ['fas', 'chevron-up']; // Alt: 'arrow-up'
                case ContactType.CARRIER:
                    return ['fas', 'bullseye'];
                case ContactType.PIRATE:
                    return ['fas', 'skull-crossbones'];
                case ContactType.LIGHT:
                    return ['fas', 'caret-down'];
                case ContactType.RADIOLOGICAL:
                    return ['fas', 'radiation']; // Alt: 'radiation'
                default:
                    return ['fas', 'question']; // Alt: 'exclamation-triangle', 'exclamation-circle'
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.shipIcon {
    display: block;
    margin-bottom: 2rem;

    span {
        white-space: nowrap;
        text-transform: uppercase;
    }
}
</style>
