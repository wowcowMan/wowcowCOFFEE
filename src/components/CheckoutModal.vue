<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">訂購人資訊</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="my-5 row justify-content-center">
            <form class="" @submit.prevent="">
              <table class="table">
                <tbody>
                  <tr>
                    <th width="100">Email</th>
                    <td>{{ form.user.email }}</td>
                  </tr>
                  <tr>
                    <th>姓名</th>
                    <td>{{ form.user.name }}</td>
                  </tr>
                  <tr>
                    <th>收件人電話</th>
                    <td>{{ form.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th>
                    <td>{{ form.user.address }}</td>
                  </tr>
                  <tr>
                    <th>備註</th>
                    <td>{{ form.message !== '' ? form.message : '無' }}</td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">返回</button>
          <button type="button" class="btn btn-dark"
          @click.prevent="$emit('createOrder')">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    form: {
      type: Object,
      // 預設為空物件
      default() { return {} }
    }
  },
  data() {
    return {
      modal: {}
    }
  },
  methods: {
  },
  mixins: [modalMixin]
}
</script>
