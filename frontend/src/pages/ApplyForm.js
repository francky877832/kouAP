import React, { useContext, useState, useEffect } from 'react';
import Step1 from '../components/applyForm/Step1';
import A from '../components/applyForm/A';
import Step3 from '../components/applyForm/Step3';
import Step4 from '../components/applyForm/Step4';
import Step5 from '../components/applyForm/Step5';
import ReviewForm from '../components/applyForm/ReviewForm';
import  Loading  from '../components/Loading'

import { UserContext } from '../context/UserContext';
import { ManagerContext } from '../context/ManagerContext';

const ApplyForm = () => {
  const [step, setStep] = useState(2);
  const steps = 20

  const { userForms, isUserFormsLoading } = useContext(UserContext)
  //console.log(userForms)

  const [submittedArticles, setSubmittedArticles] = useState([]);
  const [submittedActivities, setSubmittedActivites] = useState([]);


   const { fetchCases, addCase, fetchCoefs, addCoef, updateCoef, updateCase, deleteCase, deleteCoef,  } = useContext(ManagerContext)
  
//CASE AND COEF
      const [isCasesLoading, setIsCasesLoading] = useState(true)
      const [isCoefsLoading, setIsCoefsLoading] = useState(true)
  
    const [coefs, setCoefs] = useState([]);
  
    const [cases, setCases] = useState([]);

     useEffect(() => {
          const fetchCasesEffect = async () => {
            setIsCasesLoading(true)
              const act = await fetchCases()
              //console.log(act)
              setCases(act)
              setIsCasesLoading(false)
          };
      
          if(isCasesLoading)
          {
            fetchCasesEffect();
          }
         
      }, [isCasesLoading]);
    
      useEffect(() => {
        const fetchCoefsEffect = async () => {
          setIsCoefsLoading(true)
            const act = await fetchCoefs()
            //console.log(act)
            setCoefs(act)
            setIsCoefsLoading(false)
        };
    
        if(isCoefsLoading)
        {
          fetchCoefsEffect();
        }
       
    }, [isCoefsLoading]);

//CASE AND COEF END


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
    A : 
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
        {step === 2 && <A userForms={userForms[0]} formData={formData.A} setFormData={setFormData} handleChange={handleChange} handleData={addArticle} data={submittedArticles} />}
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
