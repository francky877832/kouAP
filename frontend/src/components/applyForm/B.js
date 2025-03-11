import React, { useState } from 'react';
import { step3Data } from '../../datas/adayFormData';

const B = ({ formData, handleChange, handleData, data}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [submittedArticles, setSubmittedArticles] = useState([]);
  
  // Fonction pour gérer la sélection de catégorie
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (!selectedCategory) {
      alert('Lütfen bir kategori seçin.');
      return;
    }


    const activityData = {
      category: selectedCategory,
      author: formData['author'],
      title: formData['title'],
      conferanceName: formData['conferanceName'],
      location: formData['location'],
      numberPage: formData['numberPage'],
      date: formData['date'],
    };

    // Ajoute l'article aux données soumises
    handleData(activityData)

    // Réinitialiser les champs du formulaire
    setSelectedCategory('');
    handleChange({ target: { name: 'author', value: '' } }, 'B', true);
  };


  // Fonction pour rendre dynamiquement les champs de détails
  const renderDetailsFields = (details) => {
    return details.map((field) => (
      <div className="form-group" key={field.name}>
        <label htmlFor={field.name}>{field.label}</label>
        <input
          type={field.type||'text'}
          className="form-control"
          id={field.name}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={(e) => { handleChange(e, "B"); }}
        />
      </div>
    ));
  };

  return (
    <div>
      {/* Sélectionner la catégorie */}
      <div className="form-group">
        <label htmlFor="category">Catégorie</label>
        <select
          className="form-control"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Sélectionner une catégorie</option>
          {step3Data.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Afficher les champs supplémentaires si une catégorie est sélectionnée */}
      {selectedCategory && (
        <>
          <div>
            <h4>Détails de la Catégorie</h4>
            {step3Data.categories
              .filter((category) => category.id === selectedCategory)
              .map((category) => renderDetailsFields(step3Data.details.fields))}
          </div>

          <div className="mt-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddButtonClick}
          >
            Add Article
          </button>
        </div>
      </>

      )}


      <div className="mt-4">
        <h5>Articles Added:</h5>
        <ul>
          {data.map((article, index) => (
            <li key={index}>
              <strong>{article.category}:</strong> {article.title} by {article.author}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default B;
