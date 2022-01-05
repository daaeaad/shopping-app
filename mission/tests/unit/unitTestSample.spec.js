import { mount } from "@vue/test-utils";
import UnitTestSample from "@/components/UnitTestSample.vue";

describe('Sample.vue', () => {
    const wrapper =  mount(UnitTestSample);

    test('names input은 2개 입니다. ::: ', () => {
        expect(wrapper.findAll('[name="names"]')).toHaveLength(2);
    });

    test('sum 함수에 1,2를 매개변수로 보내면 3을 리턴합니다. ::: ', () => {
        expect(wrapper.vm.sum(1,2)).toBe(3);
    });

    test('sum 함수에 1,2를 매개변수로 보내면 4를 리턴하지 않습니다. ::: ', () => {
        expect(wrapper.vm.sum(1,2)).not.toBe(4);
    });

    test('props의 msg는 문자열만 받을 수 있습니다. ::: ', () => {
        wrapper.setProps({
            msg: "안녕"
        });
    });
});
