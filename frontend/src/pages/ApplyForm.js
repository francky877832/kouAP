import React, { useContext, useState, useEffect } from 'react';
import Step1 from '../components/applyForm/Step1';
import A from '../components/applyForm/A';
import B from '../components/applyForm/B';
import C from '../components/applyForm/C';

import Step5 from '../components/applyForm/Step5';
import ReviewForm from '../components/applyForm/ReviewForm';
import  Loading  from '../components/Loading'

import { UserContext } from '../context/UserContext';
import { ManagerContext } from '../context/ManagerContext';

const ApplyForm = () => {
  const [step, setStep] = useState(13);
  const steps = 13 // 0 - 11 + 1 

  const { userForms, isUserFormsLoading } = useContext(UserContext)
  //console.log(userForms)



   const {addCase, fetchCoefs, updateCoef, updateCase, deleteCase, deleteCoef,  } = useContext(ManagerContext)
    const {cases, coefs, isCoefsLoading, isCasesLoading, setIsCasesLoading, setIsCoefsLoading} = useContext(UserContext)
  
//CASE AND COEF



//CASE AND COEF END
const [submittedD, setSubmittedD] = useState([]);
const [submittedE, setSubmittedE] = useState([]);
const [submittedF, setSubmittedF] = useState([]);
const [submittedG, setSubmittedG] = useState([]);
const [submittedH, setSubmittedH] = useState([]);
const [submittedI, setSubmittedI] = useState([]);
const [submittedJ, setSubmittedJ] = useState([]);
const [submittedK, setSubmittedK] = useState([]);
const [submittedL, setSubmittedL] = useState([]);
const [submittedArticles, setSubmittedArticles] = useState([]);
const [submittedActivities, setSubmittedActivities] = useState([]);
const [submittedBooks, setSubmittedBooks] = useState([]);

// Fonctions pour ajouter des données
const addArticle = (newArticle) => {
  setSubmittedArticles((prevArticles) => [...prevArticles, newArticle]);
};

const addActivity = (newActivity) => {
  setSubmittedActivities((prevActivities) => [...prevActivities, newActivity]);
};

const addBook = (newBook) => {
  setSubmittedBooks((prevBooks) => [...prevBooks, newBook]);
};

// Fonctions pour ajouter des données spécifiques à chaque groupe
const addD = (newD) => {
  setSubmittedD((prevD) => [...prevD, newD]);
};

const addE = (newE) => {
  setSubmittedE((prevE) => [...prevE, newE]);
};

const addF = (newF) => {
  setSubmittedF((prevF) => [...prevF, newF]);
};

const addG = (newG) => {
  setSubmittedG((prevG) => [...prevG, newG]);
};

const addH = (newH) => {
  setSubmittedH((prevH) => [...prevH, newH]);
};

const addI = (newI) => {
  setSubmittedI((prevI) => [...prevI, newI]);
};

const addJ = (newJ) => {
  setSubmittedJ((prevJ) => [...prevJ, newJ]);
};

const addK = (newK) => {
  setSubmittedK((prevK) => [...prevK, newK]);
};

const addL = (newL) => {
  setSubmittedL((prevL) => [...prevL, newL]);
};

const handleDataFunctions = [
  { function: addArticle, data: submittedArticles },
  { function: addActivity, data: submittedActivities },
  { function: addBook, data: submittedBooks },
  { function: addD, data: submittedD },
  { function: addE, data: submittedE },
  { function: addF, data: submittedF },
  { function: addG, data: submittedG },
  { function: addH, data: submittedH },
  { function: addI, data: submittedI },
  { function: addJ, data: submittedJ },
  { function: addK, data: submittedK },
  { function: addL, data: submittedL },
];


  

  const [formData, setFormData] = useState({
      step1 : {
      fullName: '',
      idNumber: '',
      email: '',
      phoneNumber: '',
      address: '',
    }
  });

  

useEffect(() => {
  
  setFormData( userForms.reduce((acc, item) => {
    acc[item.letter] = Object.fromEntries(item.fields.map(({ name }) => [name, ""]));
    //console.log(item)
    return acc
  }, formData))

  setFormData(prev => {
    const updatedFormData = { ...prev };
    for (let letter in updatedFormData) {
      if (updatedFormData[letter]) {
        updatedFormData[letter]["cases"] = "";
        updatedFormData[letter]["coefs"] = "";
        updatedFormData[letter]["participants"] = {};
      }
    }
    return updatedFormData;
  })

  //console.log(cases)
}, [isUserFormsLoading])
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  
  const handleChange = (e, stepName, reset=false, choice=null) => {

    const { name, value } = e.target;

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

    if(choice)
    {
      setFormData({
        ...formData,
        [stepName]: {
          ...formData[stepName],
          [choice] : {
            //...formData[stepName][choice], //name==particiapants, ou cases
            [value]: !formData[stepName].cases[choice],
          }
        },
      });
      console.log(formData[stepName])
        return;
    }




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

  if(isUserFormsLoading || isCasesLoading || isCoefsLoading)
  {
    return <Loading/>
  }
  //console.log(userForms)

  /*
  const printForms = () => {
      return ( <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 1 && <Step1 formData={formData.step1} handleChange={handleChange} />}
        {step === 2 && <A userForms={userForms[0]} formData={formData.A} setFormData={setFormData} handleChange={handleChange} handleData={addArticle} data={{submittedData:submittedArticles, cases, coefs}} />}
        {step === 3 && <A userForms={userForms[1]} formData={formData.B} setFormData={setFormData} handleChange={handleChange} handleData={addActivity} data={{submittedData:submittedArticles, cases, coefs}}  />}
        {step === 4 && <A userForms={userForms[2]} formData={formData.C} setFormData={setFormData} handleChange={handleChange} handleData={addBook} data={{submittedData:submittedBooks, cases, coefs}}  />}

        {step === 5 && <Step5 formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />}
        {step === 6 && <ReviewForm formData={formData} />}
        
        <div className="mt-4 d-flex justify-content-between">
          {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
          {step < steps && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
          {step === steps && <button type="submit" className="btn btn-success">Submit Application</button>}
        </div>
      </form>)
  }
*/

  return (
    <div className="container-lg mt-5">
      <h2 className="text-center mb-4">Application Form</h2>
      
      <div className="progress mb-4">
        <div className={`progress-bar progress-bar-striped ${step === steps ? 'bg-success' : 'bg-info'}`} role="progressbar" style={{ width: `${(step / steps) * 100}%` }} aria-valuenow={step} aria-valuemin="0" aria-valuemax="5"></div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 0 && <Step1 formData={formData.step1} handleChange={handleChange} />}

        {
          userForms.map((form, index) => {
            return (
              step === index+1 && <A key={form._id} userForms={userForms[index]} formData={formData[form.activity.letter]} setFormData={setFormData} handleChange={handleChange} handleData={handleDataFunctions[index].function} data={{submittedData:handleDataFunctions[index].data, cases, coefs}} />

            )
          })
        }
  
        {step === steps && <ReviewForm formData={formData} userForms={userForms} />}
        
        <div className="mt-4 d-flex justify-content-between">
          {step > 0 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
          {step < steps && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
          {step === steps && <button type="submit" className="btn btn-success">Submit Application</button>}
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
