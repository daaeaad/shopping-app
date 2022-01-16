<template>
  <!-- 상품 상세 페이지 { -->
  <div id="item-info-page" class="padding_fixbtn">
    <!-- 상품 대표 이미지 -->
    <ItemInfoVisual />

    <!-- 판매자 정보 -->
    <ItemInfoStoreInfo />

    <!-- 상품 기본 정보 : 상품명, 가격 -->
    <ItemInfoBasicInfo />

    <div class="line hori"></div>

    <!-- 상품 상세 설명 -->
    <ItemInfoDetailInfo />

    <div class="line hori"></div>

    <!-- 리뷰 -->
    <ItemInfoReview />

    <!-- 화면 고정 버튼: 찜, 구매 -->
    <ItemInfoButton />
  </div>
  <!-- } 상품 상세 페이지 -->
</template>

<script>
import '@/assets/style/template.css';
import ItemInfoVisual from '@/components/ItemInfoVisual.vue';
import ItemInfoStoreInfo from '@/components/ItemInfoStoreInfo.vue';
import ItemInfoBasicInfo from '@/components/ItemInfoBasicInfo.vue';
import ItemInfoDetailInfo from '@/components/ItemInfoDetailInfo.vue';
import ItemInfoReview from '@/components/ItemInfoReview.vue';
import ItemInfoButton from '@/components/ItemInfoButton.vue';

export default {
  name: 'ItemInfoPage',
  components: {
    ItemInfoVisual,
    ItemInfoStoreInfo,
    ItemInfoBasicInfo,
    ItemInfoDetailInfo,
    ItemInfoReview,
    ItemInfoButton,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
