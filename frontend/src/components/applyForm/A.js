import React, { useState } from 'react';

const A = ({ formData, userForms, handleChange, handleData, data}) => {
  const {submittedArticles, cases, coefs} = data
  const [selectedCategory, setSelectedCategory] = useState('');
  console.log("formData")
  console.log(formData)
  const formCases = formData
  const formCoefs = formData

  const [selectedMessage, setSelectedMessage] = useState(null);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (!selectedCategory) {
      alert('Lütfen bir kategori seçin.');
      return;
    }

    const articleData = {
      category: selectedCategory,
      author: formData['author'] || '',
      articleTitle: formData['articleTitle'] || '',
      journalName: formData['journalName'] || '',
      volume: formData['volume'] || '',
      pages: formData['pages'] || '',
      year: formData['year'] || '',
    };

    handleData(articleData);
    setSelectedCategory('');
    handleChange({ target: { name: 'author', value: '' } }, 'A', true);
  };

  // Fonction pour rendre dynamiquement les champs en fonction du type
  const printFields = (field) => {
    if (['checkbox', 'radio'].includes(field.type) && field.options) {
      return field.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type={field.type}
              name={field.name}
              value={option}
              checked={formData[field.name]?.includes(option) || false}
              onChange={(e) => handleChange(e, 'A')}
            />
            {option}
          </label>
        </div>
      ));
    } else if (field.type === 'textarea') {
      return (
        <textarea
          className="form-control"
          id={field.name}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(e, 'A')}
        />
      );
    } else {
      return (
        <input
          type={field.type}
          className="form-control"
          id={field.name}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(e, 'A')}
        />
      );
    } 
  };

  // Fonction pour rendre dynamiquement les champs de détails
  const renderDetailsFields = (details) => {
    return details.map((field) => (
      <div className="form-group" key={field.name}>
        <label htmlFor={field.name}><strong>{field.label}</strong></label>
        {printFields(field)}
      </div>
    ));
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          className="form-control"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Sélectionner une catégorie</option>
          {userForms?.activity?.activities.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>



      {selectedCategory && (
        <>
          <div>
            <h4>Détails de la Catégorie</h4>
            {renderDetailsFields(userForms.fields)}
          </div>




        <br/>
    
      
          <>
              <h4>Choose a situation</h4>
              {cases.map((item, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="messages"
                    value={item._id}
                    checked={formCases.cases[item._id]}
                    onChange={(e) => {setSelectedMessage(item._id);handleChange(e, 'A', false, 'cases')}}
                  />
                  <label className="form-check-label">
                    {item.message}
                  </label>
                </div>
              ))}

              {/* Affichage des participants uniquement si un message est sélectionné */}
              {selectedMessage && (
                <div className="mt-3">
                  <h5>Participants :</h5>
                  {cases
                    .find((item) => item._id === selectedMessage)
                    ?.participants.map((p, i) => (
                      <div key={i} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="participants"
                          value={p.title}
                          checked={formCases.participants[p.title]}
                          onChange={(e) => handleChange(e, 'A', false, 'participants')}
                        />
                        <label className="form-check-label">{p.title}</label>
                      </div>
                    ))}
                </div>
              )}
          </>
        

          <div className="mt-3 d-flex justify-content-center ">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddButtonClick}
            >
              Ajouter Article
            </button>
          </div>
        </>
      )}





      <div className="mt-4">
        <h5>Articles Ajoutés:</h5>
        <ul>
          {submittedArticles.map((article, index) => (
            <li key={index}>
              <strong>{article.category}:</strong> {article.articleTitle} by {article.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default A;
