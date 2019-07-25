<template>
    <div>
        <h2 class="header">Sign up for your account</h2>
        <div class="auth0-form">
            <alert-box></alert-box>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" v-model="user.user_metadata.firstName" v-validate="'required'" name="user_metadata.firstName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('user_metadata.firstName') }" />
                    <div v-if="submitted && errors.has('user_metadata.firstName')" class="invalid-feedback">{{ errors.first('user_metadata.firstName') }}</div>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" v-model="user.user_metadata.lastName" v-validate="'required'" name="user_metadata.lastName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('user_metadata.lastName') }" />
                    <div v-if="submitted && errors.has('user_metadata.lastName')" class="invalid-feedback">{{ errors.first('user_metadata.lastName') }}</div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="user.email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" />
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                </div>
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" />
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="status.registering">Sign Up</button>
                    <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            </form>
        </div>
        <div class="white-text-center">
            <router-link to="/login" class="white-text-center btn btn-link">Already have an account? Log in</router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import alertBox from '../component/Alert';
export default {
    data () {
        return {
            user: {
                user_metadata : {
                    firstName: '',
                    lastName: ''
                },
                username: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        ...mapActions('account', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        }
    },
    components: {'alert-box': alertBox}
};
</script>