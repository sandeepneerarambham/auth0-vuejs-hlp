<template>
    <div class="">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
};
</script>