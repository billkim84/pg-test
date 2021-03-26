import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function PG() {
  const router = useRouter()
  const [pgs, setPgs] = useState([]);


  useEffect(() => {

    if(router.query.payments) {
      const {payments,sales, bizTypes} = router.query;

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

      const bt = bizTypes.split(',').map(type => {
        if (type.includes('일반 커머스')) {
          return 'e-commerce';
        } else if (type.includes('디지털 컨텐츠')) {
          return 'digital-edu'
        } else if (type.includes('중개 플랫폼')) {
          return 'mediation-platform'
        } else if (type.includes('광고/마케팅')) {
          return 'ads-marketing'
        } else if (type.includes('구독/예약')) {
          return 'subscription'
        } else if (type.includes('기타')) {
          return 'others'
        }
      });

      const t = ['신규', '30억 이상'].includes(sales) ? 'normal' : 'other';

      console.log(p);
      console.log(t);

      getRecommendation(p, t, bt)
    }


  }, [router.query])


  async function getRecommendation(pTypes, size, bTypes) {

    const url = `pg/recommendation?paymentTypes=${pTypes.join(',')}&businessSize=${size}&businessTypes=${bTypes.join(',')}`;
    const res = await fetch('https://pg-appl.iamport.dev/' + url);
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