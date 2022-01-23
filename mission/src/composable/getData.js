import axios from 'axios';

/* api 호출하여 json data 받기 {
  매개변수
    - req: (String) 요청할 데이터 이름
*/
const getData = async (req) => {
  // 반환할 변수 선언
  let result;

  try {
    // 1. api를 호출하여 json 데이터를 받는다.
    const res = await axios.get(`http://localhost:8081/${req}`);

    // 2. status와 data를 확인한다.
    const { status, data } = res.data;
    // console.log('res :: ', res);

    // result에 값을 할당한다.
    result = !status ? false : data;

    //
  } catch (err) {
    // console.log('Error :: ', err);
    result = err;
  }

  // console.log('result :: ', result);
  return result;
};
/* } api 호출하여 json data 받기 끝 */

export default getData;
