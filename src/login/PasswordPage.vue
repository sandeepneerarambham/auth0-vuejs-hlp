<template>
    <div>
        <h2 class="header">Can't Log in?</h2>
        <div class="auth0-form">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="email">We will send a recovery link to</label>
                    <input type="email" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
                    <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Send recovery link</button>
                </div>
            </form>
        </div>
        <div class="white-text-center">
            <router-link to="/login" class="white-text-center btn btn-link">Return to Login</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            email: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout', 'changePassword']),
        handleSubmit (e) {
            this.submitted = true;
            const { email } = this;
            if (email) {
                this.changePassword({ email })
            }
        }
    }
};
</script>