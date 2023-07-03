<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog p-5 mt-3">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">已收到您的留言</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>謝謝您的留言，我們會快回覆您<br></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Modal from 'bootstrap/js/dist/modal'
import modalMixin from '@/mixins/modalMixin'
export default {
  data() {
    return {
      modal: {}
    }
  },
  mixins: [modalMixin]
}
</script>

<style scoped lang="scss">
.modal {
  background: rgba(200, 200, 200, .5);
  button{
    color: #fff;
  }
  .modal-dialog{
    button{
      border-radius: 10px;
    }
  }
}
</style>
