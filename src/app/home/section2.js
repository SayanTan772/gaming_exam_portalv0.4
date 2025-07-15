// added .env variable in API URL

'use client';

import styles from "../../styles/home/section2.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section2() {
    const router = useRouter();

    const [translate, setTranslate] = useState('50%');
    const [show, setShow] = useState('none');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('none');
    const [visible, setVisible] = useState('close');
    const [type, setType] = useState('password');

    const initialFormData3 = {
        action: 'login',
        number: '',
        password: ''
    }

    function toggleVisiblity() {
      if(visible == 'close') {
        setVisible('open');
        setType('text');
      } else if(visible == 'open') {
        setVisible('close');
        setType('password');
      }
    }

    const [formData3, setFormData3] = useState(initialFormData3);

    const handleChange3 = (e) => {
      setFormData3((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit3 = async (e) => {
      e.preventDefault();

      if(formData3.number == '' || formData3.password == '') {
        setError('All fields are required!');
        setAlert('grid');
        return;
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=login&number=${formData3.number}&password=${formData3.password}`);
        const result = await response.json();

        // console.log(result);

        if(response.ok) {
          console.log(result);
            sessionStorage.setItem("userData", JSON.stringify(result));

            setCookie('userRole', result.role, {
              maxAge: 60 * 60 * 24, // 24 hours in seconds
              path: '/',
            });

            if(result.role == "student") {
              router.push('/dashboard');
            } else if(result.role == "admin") {
              router.push('/admin/bootcamp');
            }
        } else {
            setError(result);
            setAlert('grid');
        }
      } catch (error) {
        console.error('Error submitting entry:', error);
      }
    };

    const handleClick = async () => {
        if(show == 'none') {
            setShow('flex');
        } else if(show == 'flex') {
            setShow('none');
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.text_wrap}>
            <div className={styles.bg}><p className={styles.text} style={{ fontWeight: '600', letterSpacing: '0.99px' }}>MARCH</p></div> ELITE ARENA
            </div>

            <div onClick={handleClick} className={styles.btn} style={{ transform: `translateX(${translate})` }} onMouseEnter={() => setTranslate('0%')} onMouseLeave={() => setTranslate('50%')}>
                <img src="/user.png" alt="404" className={styles.user} style={{ width: '38px', height: '38px' }} />
                <p className={styles.p}>Login</p>
            </div>

        <div className={styles.form_wrapper} style={{ display: `${show}` }}>
          <img src="/close.png" className={styles.exit} onClick={() => setShow('none')} />
          <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px', textAlign: 'right' }}>LOGIN NOW AND JOIN OUR <br/><span style={{ fontSize: '24px' }} className={`${styles.teal} ${styles.bold}`}>Tournament</span></p>
          <br/><br/>
          <div className={styles.alert} style={{ display: `${alert}` }}>{error}</div><br/><br/>
          <form className={styles.form} method="POST">
            <label className={styles.label}>Mobile <span className={styles.teal} style={{ fontWeight: '500' }}>Number</span></label><br/>
            <input type="number" name="number" className={styles.input} value={formData3.number} onChange={handleChange3} /><br/><br/>
            <label className={styles.label}>Enter <span className={styles.teal} style={{ fontWeight: '500' }}>Password</span></label><br/>
            <div className={styles.password_div}>
            <input type={type} name="password" className={styles.input} value={formData3.password} onChange={handleChange3} />
            <img src="/close-eye.png" style={{ display: visible == 'close' ? "block" : "none" }} className={`${styles.icon} ${styles.mob_icon} ${styles.close_eye}`} onClick={toggleVisiblity} />
            <img style={{ display: visible == 'open' ? "block" : "none" }} src="/open-eye.png" className={`${styles.icon} ${styles.mob_icon} ${styles.open_eye}`} onClick={toggleVisiblity} />
            </div>
            <button className={styles.button} onClick={handleSubmit3}>JOIN NOW</button>
          </form>
        </div>
        </main>
    );
}