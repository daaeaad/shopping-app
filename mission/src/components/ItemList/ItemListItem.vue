<template>
  <!-- 장바구니 목록의 체크박스, 삭제버튼 { -->
  <div
    data-test="cartButtons"
    class="lay_1 padding_10 padding_rl_15 padding_bottom_0"
    v-if="isCartList && !isOrderList"
  >
    <div class="inner lay_1 flex row align_center justify_space_between">
      <label class="ck_box">
        <!-- checkbox -->
        <input
          data-test="cartCheckbox"
          type="checkbox"
          :id="`ck_${product_no}`"
          :value="product_no"
          v-model="checkedItems"
        />
        <icon name="check" class="ico" />
      </label>

      <!-- 버튼: 삭제하기 -->
      <button data-test="cartDeleteBtn" class="btn xsmall btn_square" @click="deleteThisItem">
        삭제
      </button>
    </div>
  </div>
  <!-- } 장바구니 목록의 체크박스, 삭제버튼 -->

  <div class="item-list-item" :class="{ cart_list: isCartList }">
    <div
      class="img_box ratio position_relative"
      :class="{ square: isCartList, ratio_10_7: !isCartList }"
    >
      <div class="inner">
        <div
          data-test="imageClick"
          class="img_frame dis_block overflow_hidden"
          @click="goItemDetail"
        >
          <!-- 상품 이미지 -->
          <img data-test="image" :src="image" :alt="name" class="" />
        </div>
      </div>

      <!-- 찜 버튼 { -->
      <div v-if="!isCartList" class="btn_frame">
        <!-- 버튼
         - 아이콘 스타일 활성화: .btn_like에 .act 클래스 추가 -->

        <button type="button" class="btn_like position_relative" :class="{ act: isLike }">
          <icon name="heart" class="ico heart_line" />
          <icon name="heart-fill" class="ico heart_fill" />
        </button>
      </div>
      <!-- } 찜 버튼 -->
    </div>

    <div class="txt_box align_left padding_10 padding_rl_15 flex col grow_1">
      <div data-test="textClick" class="dis_block lay_1" @click="goItemDetail">
        <div class="blank_box_10"></div>

        <!-- 상품명 -->
        <p data-test="pname" class="txt size_12 weight_m line_height_13 color_66">
          {{ name }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 가격 -->
        <p data-test="price" class="txt size_14 weight_b">
          <!-- 할인율: 할인중일때만 표시 -->
          <span data-test="discountPercent" class="color_red" v-if="isDiscount">
            {{ discountPercent }}%
          </span>
          {{ currentPrice }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 상품 설명 -->
        <p data-test="description" class="txt size_12 weight_m color_98 txt_overflow_1">
          {{ description }}
        </p>

        <div class="blank_box_10"></div>

        <!-- 주문한 상품의 정보 -->
        <div class="lay_1" v-if="isOrderList">
          <p class="txt size_12 weight_m color_98"></p>
          <p class="txt size_14 weight_m">
            수량 {{ quantity }}개 / <b class="txt size_18 weight_b">{{ getTotalPrice }}</b> 원
          </p>
        </div>
      </div>
    </div>
  </div>

  <template v-if="isCartList && !isOrderList">
    <div class="lay_1 padding_rl_15">
      <!-- 수량 -->
      <div class="lay_1 flex row">
        <button data-test="btnDecrement" class="btn_quantity minus" @click="decrementQuantity">
          <icon name="minus" class="ico" />
        </button>
        <input
          data-test="inputQuantity"
          type="number"
          v-model="quantityNum"
          placeholder="0"
          class="input_quantity txt size_14 weight_sb"
        />
        <button data-test="btnIncrement" class="btn_quantity plus" @click="incrementQuantity">
          <icon name="plus" class="ico" />
        </button>
      </div>

      <div class="blank_box_10"></div>

      <div class="lay_1 flex row align_center justify_space_between">
        <div class="left">
          <p class="txt size_14 weight_m">
            <b class="txt size_18 weight_b">{{ getTotalPrice }}</b> 원
          </p>
        </div>

        <div class="right">
          <button type="button" class="btn btn_basic small btn_black" @click="goOrder()">
            바로 구매하기
          </button>
        </div>
      </div>

      <div class="padding_20 padding_rl_0">
        <div class="line hori"></div>
      </div>
    </div>
  </template>
</template>

<script>
import { toRefs } from 'vue';

import { useRouter } from 'vue-router';

import { useStore } from 'vuex';
import getDiscount from '@/composable/getDiscount';
import getLocaleNumber from '@/composable/getLocaleNumber';
import getCartInfo from '@/composable/getCartInfo';

export default {
  name: 'ItemListItem',
  props: {
    isCartList: {
      type: Boolean,
      default: false,
    },
    isOrderList: {
      type: Boolean,
      default: false,
    },
    product_no: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    original_price: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    isLike: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const {
      original_price: originalPrice,
      price,
      product_no: productNo,
      totalPrice,
      quantity,
    } = toRefs(props);

    // 할인여부, 할인율
    const { isDiscount, discountPercent } = getDiscount(originalPrice.value, price.value);

    // 현재 가격
    const { result: currentPrice } = getLocaleNumber(price.value);

    // 상세페이지 링크
    const router = useRouter();
    const goItemDetail = () => {
      router.push({
        name: 'ItemDetail',
        params: {
          id: productNo.value,
        },
      });
    };

    // 수량, 수량증가, 수량 감소
    const { quantityNum, incrementQuantity, decrementQuantity } = getCartInfo({
      quantity: quantity.value,
      productNo: productNo.value,
    });

    // 목록 총 금액
    const { getTotalPrice } = getCartInfo({
      totalPrice,
    });

    // 아이템 체크하기, 삭제하기
    const { checkedItems, deleteThisItem } = getCartInfo({
      productNo: productNo.value,
    });

    // 주문하기 페이지로 이동
    const store = useStore();
    const goOrder = async () => {
      const product = [{ product_no: productNo.value, quantity: quantityNum.value }];

      await store.dispatch('orderModule/handleOrderList', { product });

      router.push({
        name: 'Order',
      });
    };

    return {
      isDiscount,
      discountPercent,
      currentPrice,
      goItemDetail,
      quantityNum,
      incrementQuantity,
      decrementQuantity,
      getTotalPrice,
      checkedItems,
      deleteThisItem,
      goOrder,
    };
  },
};
</script>

<style scoped></style>
