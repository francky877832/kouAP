import React, { useContext, useState } from 'react';
import Step1 from '../components/applyForm/Step1';
import Step2 from '../components/applyForm/Step2';
import Step3 from '../components/applyForm/Step3';
import Step4 from '../components/applyForm/Step4';
import Step5 from '../components/applyForm/Step5';
import ReviewForm from '../components/applyForm/ReviewForm';
import  Loading  from '../components/Loading'

import { UserContext } from '../context/UserContext';

const ApplyForm = () => {
  const [step, setStep] = useState(2);
  const steps = 20

  const { userForms, isUserFormsLoading } = useContext(UserContext)
  //console.log(userForms)

  const [submittedArticles, setSubmittedArticles] = useState([]);
  const [submittedActivities, setSubmittedActivites] = useState([]);





  const addArticle = (newArticle) => {
    //console.log(submittedArticles)
    setSubmittedArticles((prevArticles) => [...prevArticles, newArticle]);
  };
  const addActivity = (newActivity) => {
    //console.log(submittedArticles)
    setSubmittedActivites((prevActivity) => [...prevActivity, newActivity]);
  };

  

  const [formData, setFormData] = useState({
    step1 : {
      fullName: '',
      idNumber: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
    step2 : 
    {
      author: '',
      articleTitle: '',
      journalName: '',
      volume: '',
      pages: '',
      year: '',
      authorName:'',
    },
    step3 : {
      author : '',
      title : '',
      conferenceName : '',
      location : '',
      numberPage : '',
      date : '',
    },


    
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  
  const handleChange = (e, stepName, reset=false) => {

    const resetObjectFields = (obj) => {
      return Object.fromEntries(
        Object.keys(obj).map(key => [key, ""])
      );
    };

    if (reset) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [stepName]: resetObjectFields(prevFormData[stepName]), // Réinitialise uniquement l'étape actuelle
      }));
      return;
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [stepName]: {
        ...formData[stepName],
        [name]: value,
      },
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  if(isUserFormsLoading)
  {
    return <Loading/>
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Application Form</h2>
      
      <div className="progress mb-4">
        <div className={`progress-bar progress-bar-striped ${step === steps ? 'bg-success' : 'bg-info'}`} role="progressbar" style={{ width: `${(step / steps) * 100}%` }} aria-valuenow={step} aria-valuemin="0" aria-valuemax="5"></div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 1 && <Step1 formData={formData.step1} handleChange={handleChange} />}
        {step === 2 && <Step2 userForms={userForms[0]} formData={formData.step2} setFormData={setFormData} handleChange={handleChange} handleData={addArticle} data={submittedArticles} />}
        {step === 3 && <Step3 formData={formData.step3} handleChange={handleChange} handleData={addActivity} data={submittedActivities}  />}

        {step === 4 && <Step4 formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />}
        {step === 5 && <Step5 formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />}
        {step === 6 && <ReviewForm formData={formData} />}
        
        <div className="mt-4 d-flex justify-content-between">
          {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
          {step < steps && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
          {step === steps && <button type="submit" className="btn btn-success">Submit Application</button>}
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
