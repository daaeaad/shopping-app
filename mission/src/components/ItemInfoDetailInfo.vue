<template>
  <!-- 상품 상세 설명 영역 { -->
  <div id="ItemInfoDetailInfo" data-test="ItemInfoDetailInfo" class="padding_rl_15 align_left">
    <div class="blank_box_15"></div>

    <!-- 제목 -->
    <p class="txt size_14 weight_b">상품 설명</p>
    <div class="blank_box_15"></div>

    <!-- 데이터를 정상적으로 불러오지 못한 경우 { -->
    <div v-if="!data">
      <p class="lay_1 txt size_12 align_center padding_20 color_9b">
        상품 설명을 불러올 수 없습니다.
      </p>
    </div>
    <!-- } 데이터를 정상적으로 불러오지 못한 경우 -->

    <!-- 데이터를 정상적으로 불러온 경우 { -->
    <div v-if="data">
      <!-- 상세 설명 (html형식) -->
      <div class="" data-test="description" v-html="data.description"></div>

      <!-- 옵션 정보 영역 -->
      <div data-test="optionSection" v-if="data.optionName.length">
        <!-- 반복
        optionName 배열의 길이만큼 반복 -->
        <div :data-test="name" v-for="(name, index) in data.optionName" :key="index">
          <!-- 옵션명 -->
          <p class="txt size_14 weight_b">
            {{ name }}
          </p>
          <div class="blank_box_10"></div>

          <!-- 옵션이 color일 경우 -->
          <div v-if="name === 'color'">
            <p class="txt size_14">{{ $store.getters.getOptionColor }}</p>
          </div>
          <!-- / 옵션이 color일 경우 -->

          <!-- 옵션이 size일 경우 -->
          <div v-if="name === 'size'">
            <table>
              <thead>
                <th v-for="(detailObj, sizeName) in data.option.size" :key="sizeName">
                  {{ sizeName }}
                </th>
              </thead>
              <tbody>
                <tr>
                  <!-- <td v-for="(arr, sizeName) in data.option.size" :key="sizeName">
                    <tr v-for="(detailObj, index) in arr" :key="index">
                      <td>{{ String(Object.keys(detailObj)) }}</td>
                    </tr>
                  </td> -->
                  <td v-for="(arr, sizeName) in data.option.size" :key="sizeName">
                    <tr v-for="(detailObj, detailName) in arr" :key="detailName">
                      <td>{{ String(Object.values(detailObj)) }}</td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- / 옵션이 size일 경우 -->
          <div class="blank_box_20"></div>
        </div>
        <!-- / 반복 -->
      </div>
      <!-- / 옵션 정보 영역 -->
    </div>
    <!-- } 데이터를 정상적으로 불러온 경우 -->

    <div class="blank_box_15"></div>
  </div>
  <!-- } 상품 상세 설명 영역 -->
</template>

<script>
export default {
  name: 'ItemInfoDetailInfo',
  data() {
    return {
      // 상품 정보
      data: this.$store.getters.getProduct,
    };
  },
  methods: {
    manufacureObj(obj) {
      const result = obj;
      return result;
    },
  },
};
</script>

<style></style>
