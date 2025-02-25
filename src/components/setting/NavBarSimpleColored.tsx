import { useState } from 'react';

import {
  Icon2fa,
  IconBellRinging,
  IconUser,
  IconSend,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Group, TextInput, Switch, MantineProvider} from '@mantine/core';
import classes from './NavbarSimpleColored.module.css';
import { ButtonCopy } from './ButtonSave'





export function NavbarSimpleColored() {
  const [active, setActive] = useState('Billing');
  const [pageCont, setPageCont] = useState(<Profile />);

  //== Default user settings: get from database ==//
  //= Profile =//
  const butSize = "lg"
  const [name, setName] = useState('Current name');
  const [country, setCountry] = useState('Current country');
  const [age, setAge] = useState('Current age');
  const [height, setHeight] = useState('Current height');
  const [religion, setReligion] = useState('Current religion');
  const [status, setStatus] = useState('Current status');
  const [hobbies, setHobbies] = useState('Current hobbies');

  //= Contact =//
  const [email, setEmail] = useState('Current email');
  const [phone, setPhone] = useState('Current phone number');

  //= Notification =//
  const [emailNot, setEmailNot] = useState(false);  // default state 
  const [phoneNot, setPhoneNot] = useState(false);  //default state 
  
  //== save into database ==//
  function saveData(){
    // some statement to save all const variables into database 

    return true;
  }

  //== logout and return to login page ==//
  function logout(){
    // function to logout and return to login page 

    return true;
  }

  //== return to home page ==//
  function homePg(){
    // function to return to home page 
    return true;
  }
  

  //== functions that create the right half of the setting page when proper section is selected ==//
  function Profile() {
    return(
      <div>
        <div className={classes.column2}>
          <div>
            <TextInput size={butSize} label="Name" placeholder={name} onChange={(event) => setName(event.currentTarget.value)} className={classes.textInput}/>
            <TextInput size={butSize} label="Country" placeholder={country} onChange={(event) => setCountry(event.currentTarget.value)} className={classes.textInput}/>
            <TextInput size={butSize} label="Age" placeholder={age} onChange={(event) => setAge(event.currentTarget.value)} className={classes.textInput}/>
            
          </div>
          <div>
            <TextInput size={butSize} label="Height" placeholder={height} onChange={(event) => setHeight(event.currentTarget.value)} className={classes.textInput}/>
            <TextInput size={butSize} label="Religion" placeholder={religion} onChange={(event) => setReligion(event.currentTarget.value)} className={classes.textInput}/>
            <TextInput size={butSize} label="Status" placeholder={status} onChange={(event) => setStatus(event.currentTarget.value)} className={classes.textInput}/>
            <TextInput size={butSize} label="Hobbies" placeholder={hobbies} onChange={(event) => setHobbies(event.currentTarget.value)} className={classes.textInput}/>
          </div>
        </div>
        <div className={classes.submitSec}>
          <ButtonCopy  hand={saveData} />
        </div>
      </div>
    );
  }

  function Contact() {
    return(
      <div>
        <div className={classes.column2}>
          <div>
            <TextInput size={butSize} label="Email" placeholder={email} onChange={(event) => setEmail(event.currentTarget.value)} className={classes.textInput}/>
          </div>
          <div>
            <TextInput size={butSize} label="Phone number" placeholder={phone} onChange={(event) => setPhone(event.currentTarget.value)} className={classes.textInput}/>
          </div>
        </div>
        <div className={classes.submitSec}>
          <ButtonCopy hand={saveData} />
        </div>
      </div>
    );
  }

  function Notification() {
    return(
      <div>
        {/* Design notes: issues with switch rendering */}
        <div className={classes.column2}>
          <div>
            {/* <TextInput size={butSize} label="switch to sliders" placeholder={email} onChange={(event) => setEmail(event.currentTarget.value)} className={classes.textInput}/> */}
            <Switch size={butSize} label="Email notification" checked={emailNot} onChange={(event) => setEmailNot(event.currentTarget.checked)} className={classes.textInput} />
          </div>
          <div>
            {/* <TextInput size={butSize} label="switch to sliders" placeholder={phone} onChange={(event) => setPhone(event.currentTarget.value)} className={classes.textInput}/> */}
            <Switch size={butSize} label="Phone notification" checked={phoneNot} onChange={(event) => setPhoneNot(event.currentTarget.checked)} className={classes.textInput} />
          </div>
        </div>
        <div className={classes.submitSec}>
          <ButtonCopy hand={saveData} />
        </div>
      </div>
    );
  }

  function Authentication() {
    // prob don't need 
    return(
      <div>
        <div className={classes.column2}>
          <div>
            <TextInput size={butSize} label="if there's any settings to add" placeholder={email} onChange={(event) => setEmail(event.currentTarget.value)} className={classes.textInput}/>
          </div>
          <div>
            <TextInput size={butSize} label="if there's any settings to add" placeholder={phone} onChange={(event) => setPhone(event.currentTarget.value)} className={classes.textInput}/>
          </div>
        </div>
        <div className={classes.submitSec}>
          <ButtonCopy hand={saveData} />
        </div>
      </div>
    );
  }

  function Other() {
    return(
      <div>
        <div className={classes.column2}>
          <div>
            <TextInput size={butSize} label="if there's any settings to add" placeholder={email} onChange={(event) => setEmail(event.currentTarget.value)} className={classes.textInput}/>
          </div>
          <div>
            {/* <TextInput size={butSize} label="if there's any settings to add" placeholder={phone} onChange={(event) => setPhone(event.currentTarget.value)} className={classes.textInput}/> */}
          </div>
        </div>
        <div className={classes.submitSec}>
          <ButtonCopy hand={saveData} />
        </div>
      </div>
    );
  }

  const data = [
    { link: <Profile />, label: 'Profile', icon: IconUser },
    { link: <Contact />, label: 'Contact Information', icon: IconSend},
    { link: <Notification />, label: 'Notifications', icon: IconBellRinging },
    { link: <Authentication />, label: 'Authentication', icon: Icon2fa },
    { link: <Other />, label: 'Other Settings', icon: IconSettings },
  ];

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      // href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setPageCont(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <MantineProvider>
      <div className={classes.mainHolder}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <h1 className={classes.textWhite}>Settings</h1>
            </Group>
            {links}
          </div>

          <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={homePg}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Return to home</span>
          </a>

            <a href="#" className={classes.link} onClick={logout}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </div>
        </nav>
        <h1>{pageCont}</h1>
      </div>
    </MantineProvider>
  );
}