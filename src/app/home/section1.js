'use client';

require('dotenv').config();
import styles from "../../styles/home/section1.module.css";
import Section2 from "./section2.js";
import Section3 from "./section3.js";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section1() {
    const router = useRouter();
    const scrollRef = useRef(null);

  useEffect(() => {
    if(getCookie('userRole')) {
    const role = getCookie('userRole');

    if (role === 'admin') {
      router.push('/admin/bootcamp');
    } else if (role === 'student') {
      router.push('/contest');
    }
    }
  }, []);

    const handleOpenForm = () => {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); // match your transition duration
    };

    const [mobile, setMobile] = useState(false);
    const [bootcamp, setBootcamp] = useState('200%');
    const [showForm, setShowForm] = useState('none');
    const [codeCombat, setCodeCombat] = useState('200%');
    const [show, setShow] = useState('none');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [visible, setVisible] = useState('close');
    const [type, setType] = useState('password');

    useEffect(() => {
        const checkIsMobile = () => {
          setMobile(window.innerWidth <= 601);
        };

        checkIsMobile();
    
        window.addEventListener('resize', checkIsMobile);
    
        return () => {
          window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    function toggleVisiblity() {
      if(visible == 'close') {
        setVisible('open');
        setType('text');
      } else if(visible == 'open') {
        setVisible('close');
        setType('password');
      }
    }

    const initialFormData1 = {
      action: 'register',
      id: '',
      full_name: '',
      email: '',
      number: '',
      language: 'C',
      password: ''
    }

    const [formData1, setFormData1] = useState(initialFormData1);

    const handleChange1 = (e) => {
      setFormData1((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit1 = async (e) => {
      setLoading(true);
      setLoading2(false);

      e.preventDefault();

      if(formData1.id == '' || formData1.full_name == '' || formData1.email == '' || formData1.number == '' || formData1.language == '' || formData1.password == '') {
        setLoading(false);
        setError('All fields are required!');
        setShow('flex');
        return;
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=register&id=${formData1.id}&name=${formData1.full_name}&email=${formData1.email}&number=${formData1.number}&language=${formData1.language}&password=${formData1.password}`, {
          method: 'POST',
        });
  
        if (response.ok) {
          setLoading(false);
          setLoading2(true);
          setFormData1(initialFormData1);
          
          setTimeout(() => {
            setLoading2(false);
            setBootcamp('200%');
            router.push('/');
          }, 3000);

          setError('you have successfully registered!');
          setShow('flex');

        } else {
          const res = await response.json();
          setError(res);
          setShow('flex');
          setLoading(false);
        }
        
      } catch (error) {
        console.error('Error submitting entry:', error);
        setLoading(false);
      }
    };

    const initialFormData2 = {
      action: 'register',
      id: 0,
      full_name: '',
      email: '',
      number: '',
      language: 'C',
      password: ''
    }

    const [formData2, setFormData2] = useState(initialFormData2);

    const handleChange2 = (e) => {
      setFormData2((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleSubmit2 = async (e) => {
      setLoad(true);
      setLoad2(false);

      e.preventDefault();

      if(formData2.email == '' || formData2.number == '' || formData2.full_name == '' || formData2.language == '' || formData2.password == '') {
        setLoad(false);
        setError('All fields are required!');
        setShow('flex');
        return;
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=register&id=0&email=${formData2.email}&number=${formData2.number}&name=${formData2.full_name}&language=${formData2.language}&password=${formData2.password}`, {
          method: 'POST',
        });
  
        if (response.ok) {
          setLoad(false);
          setLoad2(true);
          setFormData2(initialFormData2);
          
          setTimeout(() => {
            setLoad2(false);
            setCodeCombat('200%');
            router.push('/');
          }, 3000);

          setError('you have successfully registered!');
          setShow('flex');

        } else {
          const res = await response.json();
          setError(res);
          setShow('flex');
          setLoad(false);
        }
      } catch (error) {
        console.error('Error submitting entry:', error);
        setLoad(false);
      }
    };

    function display() {
      if(bootcamp == '200%') {
        setShowForm('bootcamp');
        setCodeCombat('200%');
        setBootcamp('0%');
      }
    }

    function Show() {
      if(codeCombat == '200%') {
        setShowForm('codeCombat');
        setCodeCombat('0%');
        setBootcamp('200%');
      }
    }

    function close() {
      window.location.reload();
    }

    return (
        <main className={styles.main}>
        
        <div className={`${styles.bar} ${styles.left}`}></div>
        <div className={`${styles.bar} ${styles.right}`}></div>

       
        <Section2 />
        <Section3 />

        <div className={styles.container}>
            <div className={styles.left_text}>
                <p className={styles.para}>THE QUEST FOR <span className={`${styles.teal} ${styles.bold}`}>SKILL AWAITS</span></p>
                <p className={styles.medium}>LET THE</p>
                <p className={styles.big}>BATTLE BEGIN</p>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.left_content}>
                    <button className={styles.btn} onClick={() => {display(); if(mobile) {handleOpenForm();}}}>BOOTCAMP</button>
                    <div className={styles.para}>Rise to the <span className={styles.bg}><span className={styles.text}>challenge!</span></span> Tackle obstacles, push your boundaries, and emerge <span className={styles.bg}><span className={styles.text}>victorious</span></span> as a leader in the <span className={styles.bg}><span className={styles.text}>Tech</span></span> arena.</div>
                    <br/><br/>
                    <button className={styles.btn} onClick={() => {Show(); if(mobile) {handleOpenForm();}}}>CODECOMBAT</button>
                    <div className={styles.para}>Step into the arena! Showcase your <span className={styles.bg}><span className={styles.text}>skills</span></span>, outthink the competition, and claim your title as the ultimate <span className={styles.bg}><span className={styles.text}>challenge!</span></span>.</div>
                </div>
                <img src="/circle.png" alt="404" className={styles.image} />
            </div>
        </div>

        <div className={styles.forms_container} ref={scrollRef}>
        <div className={`${styles.form_wrapper}`} style={{ transform: `translateX(${bootcamp})` }}>
          { loading == true ? (
            <img className={`${styles.gif} ${styles.gif_}`} src="/red-loader.gif" alt="gif" />
          ) : (
          loading2 == true ? (
            <img className={`${styles.tick} ${styles.gif}`} src="/checkmark-unscreen.gif" alt="gif" />
          ) : (
            showForm == 'bootcamp' && (
            <>
            <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px' }}>REGISTER AND JOIN OUR <span style={{ fontSize: '24px' }} className={`${styles.teal} ${styles.bold}`}>Tournament</span></p>
            <br/><br/>
            <form id="bootcamp" className={styles.form} method="POST">
              <label className={styles.label}>Bootcamp <span className={styles.teal} style={{ fontWeight: '500' }}>ID</span></label><br/>
              <input type="text" name="id" className={styles.input} value={formData1.id} onChange={handleChange1} />
              <br/><br/>
              <label className={styles.label}>Full <span className={styles.teal} style={{ fontWeight: '500' }}>Name</span></label><br/>
              <input type="text" name="full_name" className={styles.input} value={formData1.full_name} onChange={handleChange1} />
              <br/><br/>
              <label className={styles.label}>Programming <span className={styles.teal} style={{ fontWeight: '500' }}>Language</span></label><br/>
              <select type="text" className={`${styles.input} ${styles.select}`} name="language" value={formData1.language} onChange={handleChange1}>
          <option value="C" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>C</option>
          <option value="C++" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>C++</option>
          <option value="DSA with C" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>DSA using C</option>
          <option value="DSA with C++" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>DSA using C++</option>
          <option value="Java" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Java</option>
          <option value="Python" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Python</option>              
          <option value="AI and ML" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>AI & ML</option>
          <option value="Full Stack" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Full Stack</option>
          <option value="MERN Stack" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>MERN Stack</option>
          <option value="Android Dev" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Android Dev</option>
          <option value="Web and AI" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Web & AI</option>
          <option value="Django" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Django</option>
          <option value="Generative AI" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Generative AI</option>
          <option value="AI Agents" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>AI Agents</option>
          <option value="Cloud Development" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Cloud Development</option>
          <option value="UI and UX" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>UI and UX</option> 
          </select><br/><br/>
              <label className={styles.label}>Your <span className={styles.teal} style={{ fontWeight: '500' }}>Email</span></label><br/>
              <input type="email" name="email" className={styles.input} value={formData1.email} onChange={handleChange1} /><br/><br/>
              <label className={styles.label}>Mobile <span className={styles.teal} style={{ fontWeight: '500' }}>Number</span></label><br/>
              <input type="number" name="number" className={styles.input} value={formData1.number} onChange={handleChange1} /><br/><br/>
              <label className={styles.label}>Enter <span className={styles.teal} style={{ fontWeight: '500' }}>Password</span></label><br/>
              {/* <input type="password" name="password" className={styles.input} value={formData1.password} onChange={handleChange1} /> */}
              <div className={styles.password_div}>
              <input type={type} name="password" className={styles.input} value={formData1.password} onChange={handleChange1} />
              <img src="/close-eye.png" style={{ display: visible == 'close' ? "block" : "none" }} className={`${styles.icon} ${styles.close_eye}`} onClick={toggleVisiblity} />
              <img style={{ display: visible == 'open' ? "block" : "none" }} src="/open-eye.png" className={`${styles.icon} ${styles.open_eye}`} onClick={toggleVisiblity} />
              </div>
              <button className={styles.button} onClick={handleSubmit1}>JOIN NOW</button>
            </form>
            </>
            )
          )
          ) }
        </div>

        <div className={`${styles.form_wrapper} ${styles.codecombat}`} style={{ transform: `translateX(${codeCombat})` }}>
          { load == true ? (
            <img className={styles.gif} src="/red-loader.gif" alt="gif" />
          ) : (
            load2 == true ? (
              <img className={`${styles.gif} ${styles.tick}`} src="/checkmark-unscreen.gif" alt="gif" />
            ) : ( showForm == 'codeCombat' && (
          <>
          <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px' }}>REGISTER AND JOIN OUR <br/> <span style={{ fontSize: '24px' }} className={`${styles.teal} ${styles.bold}`}>Code-Combat</span></p>
          <br/><br/>
          <form id="codecombat" className={styles.form} method="POST">
          <label className={styles.label}>Full <span className={styles.teal} style={{ fontWeight: '500' }}>Name</span></label><br/>
          <input type="text" name="full_name" className={styles.input} value={formData2.full_name} onChange={handleChange2} />
          <br/><br/>
          <label className={styles.label}>Programming <span className={styles.teal} style={{ fontWeight: '500' }}>Language</span></label><br/>
              <select type="text" className={`${styles.input} ${styles.select}`} name="language" value={formData2.language} onChange={handleChange2}>
              <option value="C" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>C</option>
          <option value="C++" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>C++</option>
          <option value="DSA with C" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>DSA using C</option>
          <option value="DSA with C++" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>DSA using C++</option>
          <option value="Java" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Java</option>
          <option value="Python" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Python</option>              
          <option value="AI and ML" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>AI & ML</option>
          <option value="Full Stack" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Full Stack</option>
          <option value="MERN Stack" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>MERN Stack</option>
          <option value="Android Dev" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Android Dev</option>
          <option value="Web and AI" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Web & AI</option>
          <option value="Django" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Django</option>
          <option value="Generative AI" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Generative AI</option>
          <option value="AI Agents" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>AI Agents</option>
          <option value="Cloud Development" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Cloud Development</option>
          <option value="UI and UX" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>UI and UX</option>
          </select><br/><br/>
            <label className={styles.label}>Your <span className={styles.teal} style={{ fontWeight: '500' }}>Email</span></label><br/>
            <input type="email" name="email" className={styles.input} value={formData2.email} onChange={handleChange2} /><br/><br/>
            <label className={styles.label}>Mobile <span className={styles.teal} style={{ fontWeight: '500' }}>Number</span></label><br/>
            <input type="number" name="number" className={styles.input} value={formData2.number} onChange={handleChange2} /><br/><br/>
            <label className={styles.label}>Enter <span className={styles.teal} style={{ fontWeight: '500' }}>Password</span></label><br/>
            {/* <input type="password" name="password" className={styles.input} value={formData2.password} onChange={handleChange2} /><br/><br/> */}
            <div className={styles.password_div}>
              <input type={type} name="password" className={styles.input} value={formData2.password} onChange={handleChange2} />
              <img src="/close-eye.png" style={{ display: visible == 'close' ? "block" : "none" }} className={`${styles.icon} ${styles.close_eye}`} onClick={toggleVisiblity} />
              <img style={{ display: visible == 'open' ? "block" : "none" }} src="/open-eye.png" className={`${styles.icon} ${styles.open_eye}`} onClick={toggleVisiblity} />
              </div>
            <button className={styles.button} onClick={handleSubmit2}>JOIN NOW</button>
          </form>
          </>
            )
          ) 
        )}
        </div>
        </div>

        <img src="/cross.png" alt="404" className={`${styles.cross} ${styles.cross1}`} />
        <img src="/cross.png" alt="404" className={`${styles.bottom}`} />

        <div className={styles.popup} style={{ display: `${show}`, paddingBottom: '20px' }}>
          <img src="/close.png" className={styles.close} onClick={close} />
          <p className={styles.error_mssg} style={{ color: error == 'you have successfully registered!' ? '#7CFC00' : '#F08080', fontSize: '20px', marginBottom: '16px', fontWeight: '300', letterSpacing: '1px', marginTop: '14px' }}>{ error !== '' ? (error == 'you have successfully registered!' ? 'you have successfully registered!' : error) : '' }</p>
        </div>

        </main>
    );
}