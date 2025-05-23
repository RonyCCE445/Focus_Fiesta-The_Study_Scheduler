import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // ✅ Import Supabase client
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import FormNavigation from "./FormNavigation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./form.css";

const initialFormData = {
  subjects: [{ name: "", chapters: "", difficulty: "" }],
  examDates: {},
  studyHours: 2,
  timePreference: "morning",
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useLocalStorage("studyFormData", initialFormData);
  const navigate = useNavigate();

  const next = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const back = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

 const handleSubmit = async () => {
  alert("Form submitted! Redirecting to profile...");
  console.log("Submitted formData:", formData);

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error fetching authenticated user:", authError);
    return;
  }

  if (user) {
    console.log("User found:", user.id);

    const formattedSubjects = JSON.stringify(formData.subjects);
    const formattedExamDates = JSON.stringify(formData.examDates);

    const payload = {
      id: user.id,
      full_name: user.user_metadata?.full_name || "Unknown",
      email_address: user.email,
      preferred_time: formData.timePreference,
      selected_theme: formData.theme,
      subjects: formattedSubjects,
      examDates: formattedExamDates,
    };

    console.log("Sending payload to Supabase:", payload); // ✅ Log the exact data

    const { error } = await supabase
      .from("users")
      .upsert(payload);

    if (error) {
      console.error("Error saving user data to Supabase:", error);
      return;
    }

    console.log("User data successfully saved.");
    navigate("/profile");
  }
};


  return (
    <div className="app-container">
      <div className="card">
        {currentStep === 1 && <Step1 formData={formData} updateFormData={updateFormData} />}
        {currentStep === 2 && <Step2 formData={formData} updateFormData={updateFormData} />}
        {currentStep === 3 && <Step3 formData={formData} updateFormData={updateFormData} />}

        <FormNavigation
          currentStep={currentStep}
          totalSteps={3}
          next={next}
          back={back}
          submit={handleSubmit}
        />
      </div>
    </div>
  );
}
