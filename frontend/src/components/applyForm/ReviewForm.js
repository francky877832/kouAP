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

  const printTitle = (letter, index) => {
    const title = letter+ " - "+userForms[index].activity.label
    let extraText = "", title2="", colSpan="", rowSpan="";
    //extraText A, C D E F H K L
      switch(letter)
      {
        case 'A':
            extraText = "Başvurulan bilim alanı ile ilgili tam araştırma ve derleme makaleleri"
            title2 = "Yazar/Yazarlar, Makale adı, Dergi adı, Cilt No., Sayfa, Yıl"
          break;
        case 'B':
            title2="Yazar/Yazarlar, Bildiri Adı, Konferansın Adı, Yapıldığı Yer,Sayfa Sayıları ve Tarih"
          break;
        case 'C':
          extraText="Yabancı dildeki kitapların puanları 1.5 ile çarpıldıktan sonra hesaplama kullanılır"
          title2="Yazar/Yazarlar, Kitap Adı, Yayınevi, Baskı sayısı yayımlandığıYer, Yıl"
          break;
        case 'D' :
          extraText = 'Atıf yapan eserlerin belgelenmesi kaydıyla, bu yönetmeliğin Temel İlkeler bölümündeki atıflara ilişkin açıklamalar dikkate alınır'
          title2 = "Atıfın Yapıldığı Eser, Atıf Sayısı"
          break;
        case 'E':
          extraText="Son üç yılda verdiği dersler, Azami 50 puan, doktora unvanından sonra"
          title2 = "Dersin Adı, Programın Adı, Dönemi, Yılı"
          break;
        case 'F':
          title2="Öğrenci adı, Tezin Adı, Enstitüsü, Yılı"
          break;
        case 'G':
          title2="Patent Adı, Yılı"
          break;
        case 'H':
            extraText="Tamamlanmış veya devam ediyor olmak koşuluyla, projenin en az dokuz ay süreli olduğu ve hakem\
değerlendirilmesinden geçtiği belgelenir ve projenin bütçesi, kabul edildiği yıldaki en son açıklanan memur taban aylık katsayısının en az 4000 katı olmalıdır."
            title2="Projenin Adı, Proje Numarası, Projenin YürütüldüğüKurumun Adı, Yılı"  
          break;
        case 'I':
            title2="Derginin Adı, Sayısı, Yılı"  
          break;
        case 'J':
            title2="Ödülün Veren Kurul/Kurumun Adı, Yılı"  
          break;
        case 'K':
          extraText="(İdari görevlerde vekaleten de olsa en az 6 ay görev yapmış olmak, aynı anda birden fazla idari görevi olanlar için en yüksek puan dikkate alınır\
ve normal süresi dolup yeniden atamalar ayrıca puanlanır. Bu kısımda en fazla 50 puan dikkate alınır"
          title2="Görev Birimi, Yılı "
          break;
        case 'L':
            extraText="Konservatuvar dahil"
            title2="Faaliyet Adı, Yılı"
          break;
          default : extraText=""; break;
      }
      return(
          <>
            <tr>
                <td colSpan="4"><b>{title}</b> <i>{!!extraText ? "("+extraText+")" : extraText}</i></td>
            </tr>

            <tr>
                  <th style={{width:"20%",}}>{}</th>
                  <th>{title2}</th>
                  {
                    "E F H I J K L".split(" ").includes(letter) ?
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

          </>
      )
  }

  const printLExtraLines = (number) => {
    if(![16, 34, 46, 70, 76].includes(number)) return;
    const title2="Faaliyet Adı, Yılı"
    let subTitle = ""
   // alert(number)
    switch(number)
    {
      case 16 :
        subTitle = "KONSERLER (Konser salonu hüviyetinde, önceden ilan edilmiş, programı basılmış, kurum onaylı)"
        break;
      case 34 :
          subTitle = "SESLİ VE GÖRSEL ETKİNLİKLER VE SESLİ YAYINLAR Kültür Bakanlığı bandrolü, muadili basılı veya elektronik olarak \
          (spotify, itunes, amazonmusic, deezer…vb platformlarda) ulusal veya uluslararası statüde basılmış ve erişime sunulmuş."
          break;
      case 46 :
        subTitle = "ALANA İLİŞKİN MÜZİKAL ÜRETİM / MÜZİKAL YAYIN Bünyesinde Müzik Teorisi elemanlarını (armoni, kontrpuan, form, orkestrasyon vb..)\
         teknik, süresel ve estetik yeterliklerle bulunduran yazılmışmüzikal kompozisyonlar, derlemeler ve ses yayınları"
        break;
      case 70 :
        subTitle = "TÜRK MÜZİĞİ ESERLERİNE İLİŞKİN ÜRETİM / MÜZİKAL YAYIN Bünyesinde Türk Müziği Teorisi ve Yöresel elemanları \
        (makam, yöre, form, dönem, usul, vb..) teknik ve estetik yeterliklerle bulunduran, yazılmış müzikal kompozisyonlar, derlemeler ve ses yayınları"
        break;
      case 76 :
        subTitle = "SAHNE VE GÖRÜNTÜ SANATLARI (Tekrarlanan etkinliklere sadece iki kere puan verilebilir. Aday aynı eserde birden fazla alanda çalışmışsa -\
yazar, yönetmen, oyuncu, tasarım, vb., her bir alan ayrı ayrı puanlandırılır ve ayrı ayrı iki kere yazılabilir. İkinci puanlandırmada ilk puanın üçte ikisi\
verilir. Etkinliklerin uluslararası gerçekleştirilmesi durumunda puanlar 2 ile çarpılır.)"
        break;
      default: break;
    }

    return (
      <>
        <tr>
          <td colSpan={4}>{subTitle}</td>
        </tr>
        {number==16 &&
        <tr>
          <th>{}</th>
          <th>{title2}</th>    
          <th colSpan={2}  style={{width:"5%",}}>Puan</th>
        </tr>
        }
      </>
    )
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
                {printTitle(data.letter, index)}
                
               
                  {userForms[index].activity.activities.map((form, formIndex) => (
                    <>
                    <tr key={formIndex}>
                      <td>{form.number+")"} {form.name}</td>
                      <td  style={{}}>janedoe@example.com</td>
                      {
                        "E F H I J K L".split(" ").includes(data.letter) ?
                          <>
                            <td colSpan={2}  style={{width:"5%",}}>25</td>
                          </>
                          :
                          <>
                            <td  style={{width:"5%",}}>25</td>
                            <td  style={{width:"5%",}}>55</td>
                          </>
                        
                      }
          
                    </tr>
                    {
                      data.letter=="L" && (printLExtraLines(form.number))
                    }
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
