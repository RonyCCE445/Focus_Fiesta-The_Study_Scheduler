import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './AuthPage.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

 const handleSignUp = async () => {
  setMessage('');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }, // ✅ Stores name in authentication metadata
    },
  });

  if (error) {
    setMessage(error.message);
  } else {
    setMessage('Signup successful! Please confirm your email before login.');
    setIsSignup(false);
    setName('');
    setEmail('');
    setPassword('');
  }
};


  const handleSignIn = async () => {
  setMessage('');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    setMessage(error.message);
    return;
  }

  const { user } = data;

  if (user) {
    console.log("User logged in:", user.id);

    // Check if user profile exists
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
    }

    if (!profile) {
      console.log("No profile found. Creating a new entry...");

      const profileData = {
        id: user.id,
        full_name: user.user_metadata?.full_name || "Unknown",
        email_address: user.email,
        created_at: new Date().toISOString(),
      };

      console.log("Inserting profile:", profileData);

      const { error: insertError } = await supabase
        .from("users")
        .insert(profileData);

      if (insertError) {
        console.error("Error saving user profile:", insertError);
        setMessage("Failed to save profile: " + insertError.message);
        return;
      }

      console.log("Profile successfully saved.");
    }

    setMessage("Signed in successfully!");
    navigate("/welcome");
  }
};


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '1rem', width: '100%' }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '1rem', width: '100%' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '1rem', width: '100%' }}
        />

        {isSignup ? (
          <button onClick={handleSignUp}>Sign Up</button>
        ) : (
          <button onClick={handleSignIn}>Sign In</button>
        )}

        <p style={{ marginTop: '1rem' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage('');
              setName('');
              setEmail('');
              setPassword('');
            }}
            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>

        <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>
      </div>
    </div>
  );
};

export default AuthPage;
