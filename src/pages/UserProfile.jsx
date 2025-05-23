import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./UserProfile.css";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
  console.log("Fetching user data...");

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error("Auth Error:", authError);
    return;
  }

  if (user) {
    console.log("User found:", user.id);

    const { data, error } = await supabase
      .from("users")
       .select("id, full_name, email_address, preferred_time, selected_theme")
      .eq("id", user.id)
      .limit(1) // ✅ Limit to 1 result
      .single(); // ✅ Ensures only one matching record

    if (error) {
      console.error("Error fetching profile data:", error);
    } else {
      console.log("Fetched user profile:", data);
      setUserData(data);
    }
  }
};


  fetchUser();
}, []);


  if (!userData) {
    return <div className="profile-container">❌ No profile data found. Try submitting your form first.</div>;
  }

  return (
  <div>
    <h1>{userData.full_name}'s Profile</h1>
   
      <p><strong>Email:</strong> {userData.email_address}</p>
      <p><strong>Study Preference:</strong> {userData.preferred_time}</p>
      <p><strong>Selected Theme:</strong> {userData.selected_theme}</p>

      <h2>Study Plan</h2>
      {userData.subjects ? (
        <ul>
          {userData.subjects.map((subject, index) => (
            <li key={index}>
              <strong>{subject.name}</strong> - {subject.chapters} chapters ({subject.difficulty})
            </li>
          ))}
        </ul>
      ) : (
        <p>❌ No subjects found. Make sure the form was submitted.</p>
      )}

      <h2>Upcoming Exams</h2>
      {userData.examDates ? (
        <ul>
          {Object.entries(userData.examDates).map(([subject, date], index) => (
            <li key={index}><strong>{subject}</strong>: {date}</li>
          ))}
        </ul>
      ) : (
        <p>❌ No exam dates found.</p>
      )}
  
  </div>
);

}
