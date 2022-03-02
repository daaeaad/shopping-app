<template>
  <!-- 헤더 { -->
  <transition name="slide">
    <Header
      data-test="header"
      v-show="!isScrollDown"
      :class="{ slideUp: isScrollDown }"
      btn="back"
      title="주문하기"
    />
  </transition>
  <!-- } 헤더 끝 -->

  <!-- 목록 -->
  <div
    id="order-page"
    class="padding_bottom_100"
    :style="{ paddingTop: `${headerHeight}px`, paddingBottom: `${footerHeight}px` }"
  >
    <!-- 주문자 정보 { -->
    <div data-test="userInfo" class="lay_1 info_box padding_15">
      <TitleItem title="주문자 정보" :subTitle="`${userInfos.name} ${userTel}`" />

      <ul class="lay_1 input_group">
        <InputItem
          inputTitle="이름"
          inputType="text"
          v-model="userInfos.name"
          data-test="userName"
        />
        <InputItem inputTitle="연락처" inputType="tel" v-model="userInfos.tel" />
        <InputItem inputTitle="이메일" inputType="email" v-model="userInfos.email" />
      </ul>
    </div>
    <!-- } 주문자 정보 끝 -->

    <!-- 배송 정보 { -->
    <div class="lay_1 info_box padding_15">
      <TitleItem title="배송 정보" :subTitle="getFullAdress" />
      <div class="blank_box_15"></div>

      <!-- 배송지 입력 선택 { -->
      <div class="ck_box_group flex row algin_center">
        <template v-for="addressBtn in addressBtns" :key="addressBtn.detailValue">
          <RadioButton
            :content="addressBtn.content"
            :detailValue="addressBtn.value"
            v-model="selectAddress"
          />
        </template>
      </div>
      <!-- } 배송지 입력 선택 끝 -->

      <!-- 기존 배송지 { -->
      <template v-if="selectAddress === 'basic'">
        <ul class="lay_1 input_group">
          <li class="lay_1 flex row align_center">
            <p class="txt size_14 align_left weight_b">
              {{ userInfos.delivery.name }}
            </p>
            <div class="blank_box_5"></div>
            <span class="txt size_10 weight_sb label">기본 배송지</span>
          </li>
          <li class="lay_1 flex row align_center">
            <p class="txt size_14 align_left weight_m">
              {{ getFullAdress }}
            </p>
          </li>
          <li class="lay_1 flex row align_center">
            <p class="txt size_14 align_left weight_m">
              {{ userDeliveryTel }}
            </p>
          </li>
        </ul>
      </template>
      <!-- } 기존 배송지 끝 -->

      <!-- 신규 입력 { -->
      <template v-if="selectAddress === 'new'">
        <ul class="lay_1 input_group">
          <template v-for="(addressInfo, index) in addressInfos" :key="index">
            <InputItem
              v-if="addressInfo.isAddress"
              :inputTitle="addressInfo.title"
              :inputType="addressInfo.type"
              :isAddress="true"
              v-model="addressInfo.value"
            />
            <InputItem
              v-else
              :inputTitle="addressInfo.title"
              :inputType="addressInfo.type"
              v-model="addressInfo.value"
            />
          </template>

          <!-- <InputItem inputTitle="배송지" inputType="text" :isAddress="true" /> -->
        </ul>
      </template>
      <!-- } 신규 입력 끝 -->
    </div>
    <!-- } 배송 정보 끝 -->

    <!-- 주문 상품 정보 { -->
    <div class="lay_1 info_box padding_15">
      <TitleItem title="주문 상품 정보" :subTitle="`총 ${getAllTotalCount}개의 상품`" />

      <ul class="lay_1 input_group" v-if="products.length">
        <!-- 반복 { -->
        <li class="lay_1" v-for="product in products" :key="product.product_no">
          <ItemListItem
            :isCartList="true"
            :isOrderList="true"
            :product_no="product.product_no"
            :image="product.image"
            :name="product.name"
            :original_price="product.original_price"
            :price="product.price"
            :description="product.description"
            :quantity="product.quantity"
            :totalPrice="product.total_price"
          />
        </li>
        <!-- } 반복 -->
      </ul>
    </div>
    <!-- } 주문 상품 정보 끝 -->

    <!-- 결제 방법 { -->
    <div class="lay_1 info_box padding_15">
      <TitleItem title="결제 방법" />
      <div class="blank_box_15"></div>

      <div class="ck_box_group flex row algin_center">
        <template v-for="paymentBtn in paymentBtns" :key="paymentBtn.value">
          <RadioButton
            :content="paymentBtn.content"
            :detailValue="paymentBtn.value"
            v-model="selectPayment"
          />
        </template>
      </div>
    </div>
    <!-- } 결제 방법 끝 -->

    <!-- 결제 금액 정보 { -->
    <div class="lay_1 info_box padding_15">
      <TitleItem title="결제 금액" subTitle="" />

      <ul class="lay_1 input_group">
        <TextListItem title="총 상품금액" :content="`${getAllTotalPrice}원`" :isImportant="false" />
        <TextListItem title="총 배송비" content="+ 0원" :isImportant="false" />
        <TextListItem title="총 결제금액" :content="`${getAllTotalPrice}원`" :isImportant="true" />
      </ul>
    </div>
    <!-- } 결제 금액 정보 끝 -->
  </div>
  <!-- } 목록 -->

  <!-- Nav(풋터) { -->
  <Footer :btn="true" :btnContent="`${getAllTotalPrice}원 결제하기`" />
  <!-- } Nav(풋터) 끝 -->
</template>

<script>
import {
  computed, reactive, toRefs, ref,
} from 'vue';
import { useStore } from 'vuex';

// component
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TitleItem from '@/components/InputGroup/TitleItem.vue';
import InputItem from '@/components/InputGroup/InputItem.vue';
import RadioButton from '@/components/InputGroup/RadioButton.vue';
import TextListItem from '@/components/InputGroup/TextListItem.vue';
import ItemListItem from '@/components/ItemList/ItemListItem.vue';

// composable
import getHeaderHeight from '@/composable/getHeaderHeight';
import getFooterHeight from '@/composable/getFooterHeight';
import getScrollInfo from '@/composable/getScrollInfo';
import getOrderInfo from '@/composable/getOrderInfo';

export default {
  name: 'Order',
  components: {
    Header,
    Footer,
    TitleItem,
    InputItem,
    RadioButton,
    TextListItem,
    ItemListItem,
  },

  setup() {
    // 스크롤 위치
    const { scrollPosition, isScrollDown } = getScrollInfo();
    // header 높이
    const { headerHeight } = getHeaderHeight();
    // footer 높이
    const { footerHeight } = getFooterHeight();

    const state = reactive({
      // 입력 배송지 - 기존(basic), 신규(new)
      selectAddress: 'basic',
      // 지불방법 - 무통장(withoutBank), 신용카드(creditCard)
      selectPayment: 'withoutBank',
    });

    // 주문 상품 목록 - 상품 목록, 총 가격, 총 수량
    const { getAllProducts: products, getAllTotalPrice, getAllTotalCount } = getOrderInfo();

    const store = useStore();
    // 사용자 정보
    const userInfos = computed(() => store.getters['userModule/getUser']);

    // 전화번호 대쉬 추가
    const getDashedNum = (num) => {
      let result;

      if (!num) {
        result = '';
      } else {
        result = num
          .match(/\d*/g)
          .join('')
          .match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
          .slice(1)
          .join('-')
          .replace(/-*$/g, '');
      }

      return result;
    };

    // 사용자 연락처
    const userTel = computed(() => getDashedNum(userInfos.value.tel));

    // 배송 주소
    const getFullAdress = computed(() => {
      const { address1, address2, address3 } = userInfos.value.delivery;
      const result = `(${address1}) ${address2} ${address3}`;

      return result;
    });

    // 배송 연락처
    const userDeliveryTel = computed(() => getDashedNum(userInfos.value.delivery.tel));

    // 배송지 입력 선택
    const addressBtns = ref([
      { content: '기본 배송지', value: 'basic' },
      { content: '새로운 배송지', value: 'new' },
    ]);

    // 배송지 신규 입력
    const addressInfos = ref([
      { title: '수령인', type: 'text', value: '' },
      { title: '연락처', type: 'tel', value: '' },
      {
        title: '배송지',
        type: 'text',
        value: '',
        isAddress: true,
      },
    ]);

    // 지불 방법 선택
    const paymentBtns = ref([
      { content: '무통장 입금', value: 'withoutBank' },
      { content: '신용카드', value: 'creditCard' },
      { content: '카카오페이', value: 'kakaopay' },
    ]);

    return {
      scrollPosition,
      isScrollDown,
      headerHeight,
      footerHeight,
      products,
      getAllTotalPrice,
      userInfos,
      userTel,
      getFullAdress,
      userDeliveryTel,
      addressBtns,
      addressInfos,
      paymentBtns,
      getAllTotalCount,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped></style>
