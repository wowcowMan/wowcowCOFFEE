<template>
  <Header></Header>
  <div class="container mt-5">
    <div class="col-6 mx-auto">
      <Form name="submit-to-google-sheet" v-slot="{ errors }" @submit="this.$refs.msgModal.showModal()">
        <div class="mb-3">
          <label for="name" class="form-label">名字*</label>
          <Field id="name" name="name" type="text" class="form-control" :class="{ 'is-invalid': errors['name'] }"
            rules="required" v-model="form.user.name"></Field>
          <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email*</label>
          <Field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            rules="email|required" v-model="form.user.email"></Field>
          <ErrorMessage as="" name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-5">
          <label for="message" class="form-label">留言*</label>
          <Field name="message" id="message" class="form-control" rules="required" v-model="form.message" as="textarea">
          </Field>
          <ErrorMessage name="message" class="invalid-feedback"></ErrorMessage>
        </div>
        <button class="btn btn-dark d-block ms-auto">SUBMIT</button>
      </Form>
    </div>
  </div>
  <MsgModal ref="msgModal"></MsgModal>
  <Footer></Footer>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import MsgModal from '@/components/MsgModal.vue'
export default {
  components: {
    Header, Footer, MsgModal
  },
  data() {
    return {
      form: {
        user: {
          name: '',
          email: ''
        },
        message: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
form {
  label {
    font-size: 16px;
    font-weight: 500;
  }

  input,
  textarea {
    height: 40px;
    border: none;
    border-radius: 0;
    background: #d9d9d9;
    padding: 5px;
  }

  textarea {
    resize: none;
    height: 200px;
  }

  span {
    font-weight: 300;
    color: rgb(184, 21, 21);
  }
}
</style>
