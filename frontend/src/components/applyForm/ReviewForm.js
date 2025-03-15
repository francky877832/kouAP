import React, { useContext, useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

import { UserContext } from '../../context/UserContext';
import Loading from '../Loading';
import '../../styles/applyFormStyles.css'

const ReviewForm = ({ formData }) => {
  const { userForms, isUserFormsLoading } = useContext(UserContext);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const tmp = Object.keys(formData).map((f) => ({ ...formData[f], letter: f }));
    setDatas(tmp);
  }, [formData]);

  const handleGeneratePDF = () => {
    const element = document.getElementById("table-to-pdf");

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: 'tableau_formulaire.pdf',
        html2canvas: { scale: 2 }, // Améliorer la qualité des images
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Format A4 et orientation portrait
      })
      .save();
  };

  if (isUserFormsLoading) {
    return <Loading />;
  }

  
  const printExtraLines = (formIndex, index, form, data, numActivities) => {
    //if(data.letter=="L") alert(data.letter)
    //if(formIndex < numActivities-1) return;
    if(formIndex < numActivities-1) return;
    
    switch(data.letter)
    {
      case "A" :
        //alert("ok")
        return (
                <>
                  <tr>
                      <td rowSpan="3">{data.letter}<br/>
                      *Asgari koşul çalışmaları altı çizili olarak gösterilmelidir.<br/>
                      ** Başlıca yazar çalışmaları italik olarak gösterilmelidir
                      </td>

                      <td>Asgari Koşula Dahil Toplam Puanı</td>
                      <td colSpan="2"> </td>
                  </tr>

                  <tr> 
                      <td rowSpan="2">Toplam Puanı </td>
                      <td colSpan="2"></td>
                  </tr>
                  <tr></tr>
                </>
              )
      break;
      case "B":case"C":case "D":case"E":case "G":case"I":case"J":case"K":case"L":
        return (
                  <tr>
                      <td >Bölüm {data.letter}</td>
                      <td>Toplam Puanı</td>
                      <td colSpan="2"></td>
                    </tr>
              )
      break;
      case "F":case"H":
        return (
          <>
            <tr>
                <td rowSpan="4">Bölüm {data.letter} </td>
                <td rowSpan="2">Asgari Koşula Dahil Toplam Puanı</td>
                <td rowSpan="2" colSpan="2"> </td>
            </tr>

            <tr></tr>
            <tr> 
                <td rowSpan="2">Toplam Puanı </td>
                <td rowSpan="2" colSpan="2"></td>
            </tr>
            <tr></tr>
          </>
        )
          break;
      default : <></>
          break;
    }
     
  }
  console.log(userForms)

  return (
    <div className="container-lg">
      <div id="table-to-pdf">
        <h2 className="my-4 text-center">Formulaire de données</h2>
        <table className="table table-bordered table-striped">
          
          <tbody>
            {[...datas.slice(1)].map((data, index) => (
            
              <>

            {index < userForms.length &&
              <>
                <tr>
                  <th colSpan="4">{data.letter} - {userForms[index].activity.label}</th>
                </tr>
                <tr>
                  <th style={{width:"20%",}}>{}</th>
                  <th>Yazar/Yazarlar, Makale adı, Dergi adı, Cilt No., Sayfa, Yıl</th>
                  {
                    "E F H I J K L".split(" ").includes(data.letter) ?
                     <>
                      <th colSpan={2}  style={{width:"5%",}}>Puan</th>
                     </>
                     :
                     <>
                      <th  style={{width:"5%",}}>Puan Hesabı</th>
                      <th  style={{width:"5%",}}>Nihai Puan</th>
                    </>
                  }
                 
                </tr>

               
                  {userForms[index].activity.activities.map((form, formIndex) => (
                    <>
                    <tr key={formIndex}>
                      <td>{form.number+")"} {form.name}</td>
                      <td>janedoe@example.com</td>
                      <td>25</td>
                    </tr>
                    { printExtraLines(formIndex, index, form, data, userForms[index].activity.activities.length)}
                   </>
                  ))
                }
              </>
              }
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bouton pour générer le PDF */}
      <div className="text-center mt-4">
        <button onClick={handleGeneratePDF} className="btn btn-primary">
          Télécharger le PDF
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
