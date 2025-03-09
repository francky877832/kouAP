import React, { useState } from 'react';

const Step2 = ({ formData, userForms, handleChange, handleData, data }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

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
    handleChange({ target: { name: 'author', value: '' } }, 'step2', true);
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
              onChange={(e) => handleChange(e, 'step2')}
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
          onChange={(e) => handleChange(e, 'step2')}
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
          onChange={(e) => handleChange(e, 'step2')}
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
          {userForms.activity.activities.map((category) => (
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
            {renderDetailsFields(userForms.fileds)}
          </div>

          <div className="mt-3">
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
          {data.map((article, index) => (
            <li key={index}>
              <strong>{article.category}:</strong> {article.articleTitle} by {article.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Step2;
