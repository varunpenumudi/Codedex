import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);

  function handleChange(e) {
    setInputName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    // Add the form here
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name='name' id='name' value={inputName} onChange={handleChange}/>
        <button type='submit'> Take Quiz </button>
    </form>
  );
}