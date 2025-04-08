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
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import InlineLoading from '../components/InlineLoading';
import { casedActivities, titlesToNote } from '../datas/schoolDepartments';
import UserMenu from './UserMenu';
import ScrollComponent from '../components/ScrollComponent';

const ApplyForm = () => {
  const [step, setStep] = useState(1);
  const steps = 13// 13 // 0 - 11 + 1 

  const [isLoading, setIsLoading] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const { user, isAuthenticated, userForms, isUserFormsLoading, createUserApplication} = useContext(UserContext)
  const [selectedOption, setSelectedOption] = useState(null);

  //console.log(userForms)

  const navigate = useNavigate()
  const location = useLocation()
  const { announcement } = location.state || {};
  if(!announcement || !announcement?.postedBy) {
    alert('No anouncement match with the application.');
    navigate('/home')
  }

   const {addCase, fetchCoefs, updateCoef, updateCase, deleteCase, deleteCoef,  } = useContext(ManagerContext)
    const {cases, coefs, isCoefsLoading, isCasesLoading, setIsCasesLoading, setIsCoefsLoading} = useContext(UserContext)
  
//CASE AND COEF

const [formDataImageToSend, setFormDataImageToSend] = useState(new FormData());


const [formData, setFormData] = useState({
  /*step1 : {
  fullName: '',
  idNumber: '',
  email: '',
  phoneNumber: '',
  address: '',
}*/
});


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

const addSubmittedData = (data, dataFunction, submittedDatas) => {
  const newData = {...data, proof:formData[data.letter].proof}
  //console.log(newData);
  const isActivityAlreadyExists = submittedDatas.some(a => a.number==newData.number)
  if(isActivityAlreadyExists) 
  {
    alert("This activity has already been added. Delete it to add new one.")
    return;
  }
  
  const hasEmptyField = Object.keys(newData).some((el) => {
    const value = newData[el];
    //console.log(newData) //cases : {no_case:true} {i_id:true}
    if(!["cases", "participants"].includes(el) )
    {
      if ((typeof value === "string" && !value.trim()) || 
        (value instanceof File && value.size === 0) ||   
        (value instanceof Object && !(value instanceof File) && Object.keys(value).length === 0)
      ) {
        alert("Le champ " + el + " est obligatoire.");
        return true; 
      }
    }else
    { //console.log("oo")
      if(casedActivities.includes(newData.letter) && (!newData["cases"]?.no_case && Object.keys(value).length === 0)){
        alert("Le champ " + el + " est obligatoire.");
        return true;
      }
    }
  });

  if (hasEmptyField) return false;

  dataFunction((prev) => [...prev, {...newData}]);
  //console.log(submittedArticles)
  return true
};

const removeSubmittedData = (newData, dataFunction) => {
  const fileKey = `${newData.letter}${newData.number}`;
  if (formDataImageToSend.has(fileKey)) {
    formDataImageToSend.delete(fileKey);
    alert('file removed')
  }
  dataFunction((prev) => prev.filter(d => d._id!=newData._id))
}
/*
const addArticle = (newArticle) => {
  console.log(submittedArticles)
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
*/
const handleDataFunctions = [
  { function: setSubmittedArticles, data: submittedArticles, },
  { function: setSubmittedActivities, data: submittedActivities },
  { function: setSubmittedBooks, data: submittedBooks },
  { function: setSubmittedD, data: submittedD },
  { function: setSubmittedE, data: submittedE },
  { function: setSubmittedF, data: submittedF },
  { function: setSubmittedG, data: submittedG },
  { function: setSubmittedH, data: submittedH },
  { function: setSubmittedI, data: submittedI },
  { function: setSubmittedJ, data: submittedJ },
  { function: setSubmittedK, data: submittedK },
  { function: setSubmittedL, data: submittedL },
];


  


  

useEffect(() => {
  
  setFormData( userForms?.reduce((acc, item) => {
    acc[item.letter] = Object.fromEntries(item.fields.map(({ name }) => [name, ""]));
    //console.log(item)
    return acc
  }, formData))

  setFormData(prev => {
    const updatedFormData = { ...prev };
    for (let letter in updatedFormData) {
      if (updatedFormData[letter]) {
        updatedFormData[letter]["cases"] = ""; //{}
       // updatedFormData[letter]["coefs"] = "";
        updatedFormData[letter]["participants"] = ""; //{}
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
    //console.log(formData)


    if(choice) //choice == cases, participants...
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
      //console.log(formData[stepName])
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




  if(isUserFormsLoading || isCasesLoading || isCoefsLoading)
  {
    return <Loading/>
  }
  //console.log(userForms)

  const handleFileChange = (e, stepName, number) => {
    const { name, files } = e.target;
  
    if (files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split('.').pop();
      const newFileName = `${stepName}${number}.${fileExtension}`;
      const renamedFile = new File([file], newFileName, { type: file.type });
      
      const fileKey = `${stepName}${number}`;
        if (formDataImageToSend.has(fileKey)) {
          formDataImageToSend.delete(fileKey);
        }

      formDataImageToSend.append(`${stepName}${number}`, renamedFile);
      setFormDataImageToSend(formDataImageToSend); 
  
      setFormData({
        ...formData,
        [stepName]: {
          ...formData[stepName],
          [name]: renamedFile,
        },
      });
    }
  };


const handleGeneratePDF = async (element, titleToNote) => {
    setIsLoading(true)
  if (!element || titleToNote===null) {
    alert("Fill the header form!")
    console.error("Élément #table-to-pdf introuvable !");
    return;
  }

  const pdfBlob = await html2pdf()
    .from(element)
    .set({
      margin: 10,
      filename: "tableau_formulaire.pdf",
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: false
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    })
    .outputPdf("blob") //.save()

    if(pdfBlob)
    {
      formDataImageToSend.append("appPdf", pdfBlob, `${user?._id}.pdf`);
        setFormDataImageToSend(formDataImageToSend); 
        
    }
    else
    {
      alert('An error occured while generating the PDF Form.')
    }

    setIsLoading(false)
    setCanSubmit(true)
}
//console.log(announcement)



  const handleSumbmitApplication = async (e) => 
  {
    e.preventDefault();
    setIsLoading(true)
    
    const formDataToSend = new FormData()
    const tmp = handleDataFunctions.map(d=> d.data)
 
    let shapedData = {};
   // console.log(tmp)
   if(!announcement && !announcement?.postedBy)
   {
      alert("No Annoucement Selected For This Task. Sorry, but you should start the application over.")
      return;
   }

      const data = {
        user : user._id,
        announcement : /*"67c4627d414b10c75dfd82d0", */announcement._id,
        status : 'pending',
        jury : [],
        admin : /*"67c4712f12d662f6eeb9d7fd", */announcement.postedBy._id,
        categories : {},
        titleToNote : (titlesToNote.find(el => el._id==selectedOption)).value,
       }
    
      for(let i=0;i<tmp.length;i++)
      {
        const form = tmp[i]
        let letter = String.fromCharCode(65+i)

        if(form.length === 0) continue;
        
       

        for(let j=0;j<form.length;j++)
        {
          
          const fields = Object.keys(form[j])
          for(let k=0;k<fields.length;k++)
          {
            const file = form[j][fields[k]]
            //console.log(file)
            //gestion des sous objects
            if(file instanceof Object)
            {
              const tmp_ = Object.keys(file)
              if(tmp_.length === 1 || tmp_.length === 0)
                {
                  form[j][fields[k]]= tmp_[0] //formuaire.champ
                }else{
                  form[j][fields[k]]= tmp_
                }

                continue;
            }
          
            //gestion des fichier
            if(file instanceof File)
            {
              formDataImageToSend.append("files", file) 
            }

          }

          const letterData = !(Object.keys(shapedData).includes(letter)) ? {} : form[j]
          if(Object.keys(letterData).length===0)
          {
            shapedData[letter] = []
          }
          shapedData[letter].push({...form[j] })
      
        }
            //formDataImageToSend.append(letter, JSON.stringify(form)) 
           
      }
      //console.log(shapedData)
      data.categories = shapedData

      Object.keys(data).forEach((key) => {
        if (data[key] instanceof Object) {
          formDataToSend.append(key, JSON.stringify(data[key]));
        } else {
          formDataToSend.append(key, data[key]);
        }
      });

    // GROUP ALL IMAGES IN AN ARRAY
    const allImages = [];
      for (let [key, value] of formDataImageToSend.entries()) {
        if (value instanceof File) {
          allImages.push(value); 
        } else {
          formDataToSend.append(key, value); 
        }
      }

      allImages.forEach((file) => {
        formDataToSend.append("files[]", file);
      });

      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

  
      const res = await createUserApplication(formDataToSend)
      if(res)
      {
        alert("Applciaiton was created successfully")
        navigate('/user/applications')
      }
      else
      {
        alert("An error occurs while creation the application")
      }
      

    setIsLoading(false)

  }


  return (
    <ScrollComponent>

    <div className="container-lg mt-5">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

      <h2 className="text-center mb-4">Application Form</h2>
      
      <div className="progress mb-4">
        <div className={`progress-bar progress-bar-striped ${step === steps ? 'bg-success' : 'bg-info'}`} role="progressbar" style={{ width: `${(step / steps) * 100}%` }} aria-valuenow={step} aria-valuemin="0" aria-valuemax="5"></div>
      </div>

      <form onSubmit={handleSumbmitApplication} encType="multipart/form-data">
        {step === 0 && <Step1 formData={formData?.step1} handleChange={handleChange} />}

        {
          [...userForms?.slice(0)].map((form, index) => {
            return (
              step === index+1 && <A key={form._id} userForms={userForms[index]} handleFileChange={handleFileChange} formData={formData[form.activity.letter]} setFormData={setFormData} handleChange={handleChange} handleAddData={addSubmittedData}  handleRemoveSubmittedData={removeSubmittedData} dataSetters={handleDataFunctions[index].function} data={{submittedData:handleDataFunctions[index].data, cases, coefs}} />

            )
          })
        }
  
        {step === steps && <ReviewForm formData={formData} announcement={announcement} selectedOption={selectedOption} setSelectedOption={setSelectedOption} userForms={userForms} formsDatas={handleDataFunctions.map(d=>d.data)} canSubmit={canSubmit} handleGeneratePDF={handleGeneratePDF} />}
        
        <div className="mt-4 d-flex justify-content-between">
          {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Previous</button>}
          {step < steps && <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>}
          {isLoading &&  <InlineLoading/> }
          {canSubmit && !isLoading ?
            step === steps && <button type="submit" className="btn btn-success">Submit Application</button>
          :
          <></>
          }
        </div>
      </form>
    </div>
    </ScrollComponent>

  );
};

export default ApplyForm;
