import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function PG() {
  const router = useRouter()
  const [pgs, setPgs] = useState([]);


  useEffect(() => {

    if(router.query.payments) {
      const {payments, userId, id, sales, name} = router.query;

      const p = payments.split(',').map(type => {
        if (type.includes('신용카드')) {
          return 'creditCard';
        } else if (type.includes('계좌이체')) {
          return 'bankTrans'
        } else if (type.includes('소액결제')) {
          return 'mobile'
        } else if (type.includes('상품권')) {
          return 'giftCard'
        } else if (type.includes('간편')) {
          return 'simple'
        } else if (type.includes('해외')) {
          return 'intl'
        }
      });

      const t = ['신규', '30억 이상'].includes(sales) ? 'normal' : 'other';

      console.log(p);
      console.log(t);

      getRecommendation(p, t)
    }


  }, [router.query])


  async function getRecommendation(pTypes, size) {

    const url = `pg/recommendation?paymentTypes=${pTypes.join(',')}&businessSize=${size}`;
    const res = await fetch('http://ec2-13-125-166-148.ap-northeast-2.compute.amazonaws.com:3000/' + url);
    const data = await res.json();
    console.log(data);

    setPgs(data);
  }


  function submit() {
    window.location = `https://7nwady7uv3k.typeform.com/to/big0ResY#application_id=${router.query.id}&user_id=${router.query.userId}&name=${router.query.name}`;
  }

  return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {
        pgs.length ? pgs.map(p => <div key={p}>{p}</div>) : <div>Loading........</div>
      }
      <button onClick={submit} style={{marginTop: 40}}>좋아요!! 서류 신청하기</button>
    </div>

  </div>
}