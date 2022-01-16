<template>
  <div id="item-info-page" class="padding_fixbtn">
    <ItemInfoVisual />
    <ItemInfoStoreInfo />
    <ItemInfoBasicInfo />
    <div class="line hori"></div>
    <ItemInfoDetailInfo />
    <div class="line hori"></div>
    <ItemInfoReview />
    <ItemInfoButton />
  </div>
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
