import React, { useContext, useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

import { UserContext } from '../../context/UserContext';
import Loading from '../Loading';
import '../../styles/applyFormStyles.css'
import { getDate, round } from '../../utils/utilsFunctions';
import InlineLoading from '../InlineLoading'
import { activitiesLetters, casedActivities, minActivitiesRnage, minPointsRange, titles, titlesToNote } from '../../datas/schoolDepartments';

const ReviewForm = ({ formData, formsDatas, handleGeneratePDF, canSubmit, announcement, selectedOption, setSelectedOption}) => {
  const { userForms, isUserFormsLoading, activities, cases, coefs, minActivities, minPoints} = useContext(UserContext);
  const [datas, setDatas] = useState([]);
  const [points, setPoints] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(UserContext)

  const [signatureUrl,setSignatureUrl] = useState(null)

//console.log("userForms")
//console.log(formsDatas)

  useEffect(() => {
    //console.log(userForms)
    //console.log(formsDatas)
    setIsLoading(false)
    const tmp = Object.keys(formData).map((f) => ({ ...formData[f], letter: f }));
    setDatas(tmp);
  }, [formData]);

  const updatePoints = (letter, number, points) => {
    setPoints((prev) => {
      return {...prev, [letter]:{...prev[letter], [number] : points} }
    })
  }

  useEffect(() => {
    fetch(user.signature, { mode: "cors" })
  .then(response => response.blob())
  .then(imageBlob => {
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setSignatureUrl(imageObjectURL)
  })
  .catch(error => console.error("CORS Error:", error));
  })
  
  const computesPoints = async () => {
    //console.log(formsDatas)
    let letter="", number=0, normalPoint=0, activityPoints=0;
    for(let i=0;i<formsDatas.length;i++) 
    {
      let act = formsDatas[i]
      if(act.length<=0) continue;
      
      letter = String.fromCharCode(65+i)
      const activity = activities.find(a => a.letter==letter)

      for(let j=0;j<act.length;j++) 
      {
        number = act[j].number // {formulaire, number}
        normalPoint = (activity.activities.find(a => a.number==number)).points //A.activities[0] => {name number point}
        activityPoints = normalPoint
       
        //Let's find cases
        const case_arr = Object.keys(act[j].cases)
        if(case_arr.length>0 && !case_arr.includes('no_case'))
        { //console.log(Object.keys(act[j].cases))
          const caseId = Object.keys(act[j].cases)[0]
          const case_ = cases.find(c => c._id==caseId)
          //error participants
          const {coef, coef2} = case_?.participants?.find(p => p?.title==(Object.keys(act[j]?.participants)[0]))
          activityPoints = normalPoint*coef*coef2
          //alert(activityPoints)
        }
        else if(casedActivities.includes(letter)) //no_cases
        {
          const numWriter = parseInt(act[j].numWriter)
          const {coef, factor} = coefs.find(c => c.number==numWriter)
          activityPoints = normalPoint*(coef/factor)
        }
        else
        {
          activityPoints = normalPoint
        }
        updatePoints(letter, number, round(activityPoints)) //letter et activityNymber
      }
            

    }
  }
  useEffect(() => {
    const compute = async () =>
    {
      setIsLoading(true)
      await computesPoints()
      setIsLoading(false)
    }
    if(isLoading)
    {
      compute()

    }
  }, [isLoading])


  const getActivityPoints = (letter, number) => {
    if (!points || typeof points !== "object") return 0; 
    if (!points[letter]) return 0; 
    if (typeof points[letter][number] === "undefined") return 0;
  
    return points[letter][number];
  };
  


  
  const printExtraLines = (formIndex, index, form, data, numActivities) => {
    //if(data.letter=="L") alert(data.letter)
    //if(formIndex < numActivities-1) return;
    //const letter = String.fromCharCode(65+i)
    let points_tmp = [], points_=0
    if(points[data.letter])
    {
      //console.log(Object.keys(points[data.letter])['4'])
       points_tmp = Object.keys(points[data.letter]);
       points_ = points_tmp.reduce((acc, p) =>{
        //console.log(points_tmp[p])
          return acc + points[data.letter][p]
      }, 0)
    }
    

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
                      <td colSpan="2">{points_}</td>
                  </tr>

                  <tr> 
                      <td rowSpan="2">Toplam Puanı </td>
                      <td colSpan="2">{points_}</td>
                  </tr>
                  <tr></tr>
                </>
              )
      case "B":case"C":case "D":case"E":case "G":case"I":case"J":case"K":case"L": //['B','C','D','E','G','I','J','K','L'].includes(data.letter) : //
      //alert("ok")  
      return (
                  <tr>
                      <td >Bölüm {data.letter}</td>
                      <td>Toplam Puanı</td>
                      <td colSpan="2">{points_}</td>
                    </tr>
              )
      case "F":case"H":
        return (
          <>
            <tr>
                <td rowSpan="4">Bölüm {data.letter} </td>
                <td rowSpan="2">Asgari Koşula Dahil Toplam Puanı</td>
                <td rowSpan="2" colSpan="2">{points_}</td>
            </tr>

            <tr></tr>
            <tr> 
                <td rowSpan="2">Toplam Puanı </td>
                <td rowSpan="2" colSpan="2">{points_}</td>
            </tr>
            <tr></tr>
          </>
        )
      default : return <></>;
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

  //console.log(formsDatas)

  const printActivityDetails = (letter, activity) => {
    const index = letter.trim().charCodeAt(0)-65;
    let subActivities_arr = []
    //console.log(formsDatas)
    //console.log(index)
    if(formsDatas[index]?.length===0)  return "/";
    const formInfos = formsDatas[index].find(f => f.number==activity.number)
    if(!formInfos) return "/"
    const prohibitedFields = ['proof', 'numWriter', 'mainAuthor']
    const allowedFields = (userForms[index].fields.map(f => f.name)).filter(g => !prohibitedFields.includes(g))
    //console.log(activity)
    return Object.keys(formInfos).map( f => {
        return (
          allowedFields.includes(f) && ['string', 'number'].includes(typeof(formInfos[f])) ?
          <>
              {formInfos["mainAuthor"]?.toLowerCase()=="yes" ?
                <i>
                  <span>{formInfos[f]}, </span>
                </i>
                :
                <>
                  <span>{formInfos[f]}, </span>
                </>
              }
              
          </>
          :
          <></>
        )
      })
  }


  const generatePDF = (e) => {
    e.preventDefault();
    if(formsDatas.every(e => e?.length===0)){
      alert('No data submitted.');
      return;
    } 
    setIsLoading(true)
    const element = document.getElementById("table-to-pdf");
    handleGeneratePDF(element, selectedOption)
    setIsLoading(false)
  }

  const header1 = {
    "Ad Soyad(Ünvan)" : `${user?.name}`,
    "Tarih" : `${getDate()}`,
    "Bulunduğu Kurum" : `${user?.location}`,
    "Başvurduğu Akademik Kadro": titles[announcement?.position-1]?.label,
  }


  const header2 = [
    "Dr. Öğretim Üyesi (İlk Atama)",
    "Dr. Öğretim Üyesi (Yeniden Atama: Son atama tarihinden başvuru tarihine kadar olmak üzere dönem faaliyetleri esas\
      alınacaktır)",
    "Doçent (Doktora / Sanatta yeterlik/ tıp/diş uzmanlık ünvanını aldıktan sonraki faaliyetleri esas alınacaktır) ",
    "Profesör (Doçent ünvanını aldıktan sonraki faaliyetleri esas alınacaktır)",

  ]


  const printHeader = () => {
    return (
      <>
      {
        Object.keys(header1).map((h, index) => {
          return (
            <tr key={index}>
              <th colSpan={1}>{h} : </th>
              <td colSpan={3}>{header1[h]}</td>
            </tr>
          )
        })
      
      }
        <tr>
          <th colSpan={1}>İmza: </th>
          <td colSpan={3}> <img src={signatureUrl} crossOrigin="anonymous" alt="User Signature"  style={{ width: "100px", height: "200" }} />  </td>
        </tr>

        <tr>
          <th colSpan={5} className='text-center'> Puanlanan Faaliyet Dönemi </th>
        </tr>

        {header2.map((item, index) => (
            <tr key={index}>
              <th colSpan={3} className='text-center'> 
                <label className="form-check-label" htmlFor={`radio-${index}`}>{item}</label>
              </th>
              
              <td colSpan={0}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="academicRole"
                  id={`radio-${index}`}
                  value={item}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                />
              </td>
            </tr>
      ))}

<tr>
          <th colSpan={5} className='text-center'> ETKINLIK </th>
        </tr>

     </>
    )
  }




//console.log(minActivities)
//console.log(formsDatas)
  const printFooter = () => {
   /*const minActivitiesLabel = minActivities.reduce((acc, key, index) => {
      
      Object.keys(acc).includes()
    })
    */
    const getMinActivities = (el, range=true) => {
    //if(!range) console.log(el)
      return  range ?
          minActivities.find(m => m?.letter==el.letter && m?.from==el.from && m?.to==el.to)?.groups?.find(g => g.faculty._id==announcement?.faculty?._id)?.positions[parseInt(announcement.position)-1].quantity
        :
        minActivities.find(m => m?.criteria==el.criteria)?.groups?.find(g => g.faculty._id==announcement?.faculty?._id)?.positions[parseInt(announcement.position)-1].quantity

      }

      const getMinPoints = (el, range=true) => {
        //console.log(minPoints.find(m => m?.letter==el.letter && m?.from==el.from && m?.to==el.to)?.groups)
          return  range ?
              minPoints.find(m => m?.letter==el.letter && m?.from==el.from && m?.to==el.to)?.groups?.find(g => g.faculty._id==announcement?.faculty?._id)?.positions[parseInt(announcement.position)-1].minPoint
            :
            minPoints.find(m => m?.criteria==el.criteria)?.groups?.find(g => g.faculty._id==announcement?.faculty?._id)?.positions[parseInt(announcement.position)-1].minPoint
    
          }

    const minActivitiesLabels = {}
    //1- Range
    const rangedActivities = minActivities.filter(a => a?.range && minActivitiesRnage?.includes(a?.letter))
    rangedActivities.forEach(el => {
      const activitiesLetter =  formsDatas[el.letter.charCodeAt(0)-65] //.filter(f => f.letter==el.letter)
      //console.log(minActivities.find(m => m?.letter==el.letter && m?.from==el.from && m?.to==el.to).groups) //?.find(g => g.faculty._id==announcement?.faculty?._id)) //?.positions)
//console.log(announcement)
    
       minActivitiesLabels[el.letter+el.from+"-"+el.letter+el.to] = {
        min : getMinActivities(el),
      real : (activitiesLetter.filter(el2 => el2.number>=el.from && el2.number<=el.to)).length}
    })

    

    const criteriaActivities = minActivities.filter(a => !a?.range)
    criteriaActivities.forEach(el => {
      const label = el.criteria.split(" - ")[0]
      //if(label.length != 2 ) return;
       const parts = label.split("/"); //veya
       const from = parts[0]?.trim(); const to = parts[1]?.trim()
       //console.log(from)
       if([2,5].includes(from.length) && activitiesLetters.includes(from[0])) {
          minActivitiesLabels[label] = {
            min : getMinActivities(el, false),
            real:(formsDatas[from.charCodeAt(0)-65]?.filter(f => f.letter+f.number==from ||  f.letter+f.number==to))?.length}
       }

       minActivitiesLabels["Başlıca Yazar"] = {
        min : getMinActivities(el, false),
        real : (formsDatas[0].filter(f => f?.mainAuthor?.toLowerCase()=="yes"))?.length}
       minActivitiesLabels["Toplam Makale"] = {
        min : getMinActivities(el, false),
        real : formsDatas[0]?.length}
       minActivitiesLabels["Kişisel ve Karma Etkinlik"] = {
        min : getMinActivities(el, false),
        real : formsDatas.at(-1)?.length}
       //console.log(announcement)
       //minActivities.find()


    })


    const minPointsLabels = {}
    //1- Range
    const rangedPoints = minPoints.filter(p => p?.range && minPointsRange?.includes(p?.letter))
    let currentLetter = null;
    //RANGES
    activitiesLetters.forEach((al, index) => {
      if(!minPointsRange.includes(al))
      {
        //ALL POINTS
        const currentActivities = activities?.find(act => act.letter==al)?.activities
        minPointsLabels["Bolum "+al+" Total Puanı"] = 
        {
          min : 0,
         real : formsDatas[al?.charCodeAt(0)-65]?.reduce((acc, val) => acc+currentActivities?.find(x=>x.number==val.number).points, 0)
        }
        return;
      }

      //!rangedPoints.includes(el)
      const rangedPointsForThisLetter = rangedPoints.filter(f => f.letter==al)
      rangedPointsForThisLetter.forEach((el, index) => {
        const currentActivities = activities?.find(act => act.letter==el.letter)?.activities
        //console.log(formsDatas)
        const pointsLetter =  formsDatas[el.letter.charCodeAt(0)-65] //.filter(f => f.letter==el.letter)
        minPointsLabels[el.letter+el.from+"-"+el.letter+el.to] = 
        {
          min : getMinPoints(el),
          real : (pointsLetter?.filter(el2 => el2.number>=el.from && el2.number<=el.to))?.reduce((acc, val) => acc+currentActivities?.find(x=>x.number==val.number).points, 0)
        }
          if(index==rangedPointsForThisLetter.length-1)
        {
          minPointsLabels["Bolum "+al+" Total Puanı"] = 
          {
            min : 0,
            real : formsDatas[al?.charCodeAt(0)-65]?.reduce((acc, val) => acc+currentActivities?.find(x=>x.number==val.number).points, 0)
          }
        }
      })
    })

    //const letter = 65+s




    return (
      <>
      <tr>
        <td></td>
        <td colSpan={4}>{"Adayın Asgari Yayın/Etkinlik Sayısı (Tablo 1 göz önüne alınarak faaliyet sayılarıyazılır. Var ise özel durumlar açıklanır)"}</td>
      </tr>
    
        {Object.keys(minActivitiesLabels).map(el => {
        return (
            <tr>
              <th>{el}</th>
              <td colSpan={4}>{minActivitiesLabels[el].min+" / "+minActivitiesLabels[el].real}</td>
            </tr>
        )})
      }


<tr>
        <td></td>
        <td colSpan={4}>{"Adayın Asgari/Toplam Puanları (Tablo 2 göz önüne alınarak toplam ve asgari\
puanları yazılır. Var ise özel durumlar açıklanır)"}</td>
      </tr>
    

      
      {Object.keys(minPointsLabels).map(el => {
        return (
            <tr>
              <th>{el}</th>
              <td colSpan={4}>{minPointsLabels[el].min+" / "+minPointsLabels[el].real}</td>
            </tr>
        )})
      }

    </>
    )
    



    //minPoints
  }
  
  if (isUserFormsLoading || isLoading) {
    return <Loading />;
  }


  return (
    <div className="container">
      <div id="table-to-pdf">
        <h2 className="my-4 text-center">Application Resume</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th colSpan={4} className='text-center'>Genel Punalama Bilgileri</th>
            </tr>
            {printHeader()}
          </thead>

          <tbody>
      
            {[...datas?.slice(0)].map((data, index) => (
            
              <>

            {index < userForms?.length &&
              <>
                {printTitle(data?.letter, index)}
                
               
                  {userForms[index]?.activity?.activities?.map((form, formIndex) => ( //form=(sub)activity
                    <>
                    <tr key={formIndex}>
                      <td>{form.number+")"} {form.name}</td>
                      <td>
                        {printActivityDetails(data.letter, form)}
                      </td>
                      {
                        "E F H I J K L".split(" ").includes(data.letter) ?
                          <>
                            <td colSpan={2}  style={{width:"5%",}}>{getActivityPoints(data.letter, form.number)}</td>
                          </>
                          :
                          <>
                            <td  style={{width:"5%",}}>{getActivityPoints(data.letter, form.number)}</td>
                            <td  style={{width:"5%",}}>{getActivityPoints(data.letter, form.number)}</td>
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

          <tfoot>
            <tr>
              <th colSpan={4} className='text-center'>Genel Punalama Bilgileri</th>
            </tr>
            {printFooter()}
          </tfoot>

        </table>
      </div>

      {/* Bouton pour générer le PDF */}
      <div className="text-center mt-4">
        {isLoading && <InlineLoading/>}
        {!isLoading || !canSubmit ? 
        <button onClick={generatePDF} className="btn btn-primary">
          Generate PDF
        </button>
        :
       <></>
      }
      </div>
    </div>
  );
};

export default ReviewForm;
