<template>
<transition name="modal" appear>
    <div class="modal_mask">
        <div class="modal_wrapper">
            <div class="modal_container">

                <!-- 모달 헤더 -->
                <div class="modal_header">
                    <p class="txt title">
                        <!-- 제목 -->
                        <slot name="title"></slot>
                    </p>
                </div>
                <!--/ 모달 헤더 -->

                <!-- 모달 콘텐츠 -->
                <div class="modal_content">
                    <p class="txt content">
                        <!-- 내용 -->
                        <slot name="content"></slot>
                    </p>
                </div>
                <!--/ 모달 콘텐츠 -->

                <!-- 모달 풋터 -->
                <div class="modal_footer">
                    <!-- 버튼: 닫기 -->
                    <button type="button" class="btn btn_basic btn_green"
                    @click="$emit('toggleModal')">
                        <slot name="button_name"></slot>
                    </button>
                </div>
                <!--/ 모달 풋터 -->
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
  name: 'Modal',
  emits: {
    toggleModal: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.modal_mask {
    width: 100%; height: 100%;
    position: fixed;
    z-index: 999; top: 0; left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal_wrapper {
    width: 100%; height: 100%;
    display: flex; flex-direction: row;
    align-items: center; justify-content: center;
    padding: 20px;
}
.modal_container {
    width: 90%; max-width: 300px;
    height: auto; padding: 30px;
    display: flex; flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 16px;
}
.modal_header, .modal_content, .modal_footer {
    width: 100%; height: auto;
    text-align: left;
    padding: 10px 0;
}
.modal_footer {padding-top: 20px; padding-bottom: 0; text-align: center;}
.txt.content {
    font-size: 16px;
}
</style>
