// ../datas/adayFormData.js

export const step2Data = {
      title: 'A. Makale',
      categories: [
        {
          label: '1. SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q1 olarak taranan dergide)',
          id: 'A1',
          point : 60,
        },
        {
          label: '2. SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q2 olarak taranan dergide)',
          id: 'A2',
          point : 55,
        },
        {
          label: '3. SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q3 olarak taranan dergide)',
          id: 'A3',
          point : 40,
        },
        {
            label: '4. SCI-E, SSCI veya AHCI kapsamındaki dergilerde yayımlanmış makale (Q4 olarak taranan dergide)',
            id: 'A4',
            point : 30,
          },
          {
            label: '5. ESCI tarafından taranan dergilerde yayımlanmış makale ',
            id: 'A5',
            point : 25,
          },
          {
            label: '6. Scopus tarafından taranan dergilerde yayımlanmış makale',
            id: 'A6',
            point : 20,
          },
          {
            label: '7. Uluslararası diğer indekslerde taranan dergilerde yayımlanmış makale',
            id: 'A7',
            point : 15,
          },
          {
            label: '8. ULAKBİM TR Dizin tarafından taranan ulusal hakemli dergilerde yayımlanmış makale',
            id: 'A8',
            point : 10,
          },
          {
            label: '9. 8. madde dışındaki ulusal hakemli dergilerde yayımlanmış makale',
            id: 'A9',
            point : 8,
          },
      ],
    details : {
        label: "Details",
        fields : [
        { name: 'author', label: 'Yazar/Yazarlar' },
        { name: 'articleTitle', label: 'Makale adı' },
        { name: 'journalName', label: 'Dergi adı' },
        { name: 'volume', label: 'Cilt No.' },
        { name: 'pages', label: 'Sayfa' },
        { name: 'year', label: 'Yıl' }
      ]
    
    },
}



export const step3Data = {
    title: "B. Bilimsel toplantı faaliyetleri",
    categories: [
      {
        id: 'B1',
        label: "1) Uluslararası bilimsel toplantılarda sözlü olarak sunulan, tam metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
        point : 8,
      },
      {
        id: 'B2',
        label: "2) Uluslararası bilimsel toplantılarda sözlü olarak sunulan, özet metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
      },
      {
        id: 'B3',
        label: "3) Uluslararası bilimsel toplantılarda poster olarak sunulan çalışmalar",
      },
      {
        id: 'B4',
        label: "4) Ulusal bilimsel toplantılarda sözlü olarak sunulan tam metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
      },
      {
        id: 'B5',
        label: "5) Ulusal bilimsel toplantılarda sözlü olarak sunulan, özet metni matbu veya elektronik olarak bildiri kitapçığında yayımlanmış çalışmalar",
      },
      {
        id: 'B6',
        label: "6) Ulusal bilimsel toplantılarda poster olarak sunulan çalışmalar",
      },
      {
        id: 'B7',
        label: "7) Uluslararası bir kongre, konferans veya sempozyumda organizasyon veya yürütme komitesinde düzenleme kurulu üyeliği veya bilim kurulu üyeliği yapmak",
      },
      {
        id: 'B8',
        label: "8) Ulusal bir kongre, konferans veya sempozyumda organizasyon veya yürütme komitesinde düzenleme kurulu üyeliği veya bilim kurulu üyeliği yapmak",
      },
      {
        id: 'B9',
        label: "9) Uluslararası konferanslarda, bilimsel toplantı, seminerlerde davetli konuşmacı olarak yer almak",
      },
      {
        id: 'B10',
        label: "10) Ulusal konferanslarda, bilimsel toplantı, seminerlerde davetli konuşmacı olarak yer almak",
      },
      {
        id: 'B11',
        label: "11) Uluslararası veya ulusal çeşitli kurumlarla işbirliği içinde atölye, çalıştay, yaz okulu organize ederek gerçekleştirmek",
      },
      {
        id: 'B12',
        label: "12) Uluslararası veya ulusal çeşitli kurumlarla işbirliği içinde atölye, çalıştay, panel, seminer, yaz okulunda konuşmacı veya panelist olarak görev almak",
      }
    ],
    details: {
      label: "Details",
      fields: [
        { name: "author", label: "Author(s)", placeholder: "Enter authors" },
        { name: "title", label: "Paper Title", placeholder: "Enter paper title" },
        { name: "conferenceName", label: "Conference Name", placeholder: "Enter conference name" },
        { name: "location", label: "Location", placeholder: "Enter location" },
        { name: "numberPage", label: "Number Of Page", placeholder: "Enter page numbers" },
        { name: "date", label: "Date", placeholder: "Enter date" }
        
      ]
    }
  };
  
  