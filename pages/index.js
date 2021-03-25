import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react";

export default function Home() {
  const [email, setEmail] = useState('test@test.com');
  const [section, setSection] = useState('login');

  async function startApplication() {

    const res = await fetch('https://pg-appl.iamport.dev/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        userId: email
      })
    })
    const data = await res.json();

    console.log(data);

    window.location = `https://7nwady7uv3k.typeform.com/to/Z4iI6mjC#application_id=${data.applicationId}&user_id=${email}`;
  }


  if(section === 'login') {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
      <div style={{ width: 200, display: 'flex', flexDirection: 'column'}}>
        email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{marginBottom: 20}}/>
        password:
        <input type="password" style={{marginBottom: 20}}/>

        <button onClick={() => setSection('loggedin')}>Login</button>
      </div>
    </div>
  } else {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
      <div>Welcome {email}</div>
      <button onClick={startApplication}>Start application </button>
    </div>
  }

}
