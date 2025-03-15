import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { ManagerContext } from "../context/ManagerContext";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";

const FormManager = () => {
    const { deleteForm, updateForm, createForm } = useContext(ManagerContext)
    const { userForms, isUserFormsLoading, setIsUserFormsLoading, activities} = useContext(UserContext)
    const [isLoading, setIsLaoding] = useState(false)
    //console.log(userForms)
  const [forms, setForms] = useState([])


  useEffect(() => {
    setForms(userForms)
  }, [userForms])

  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', options: '' });
  const [isEdit, setIsEdit] = useState(false)

  // Ouvrir le modal de modification
  const handleEditForm = (id) => {
    const formToEdit = forms.find((form) => form._id === id);
    setCurrentForm({ ...formToEdit });

    setIsEdit(true)
    setShowModal(true);
  };

  // Sauvegarder les modifications
  const handleSaveForm = async () => {
    //console.log(forms)
    setIsLaoding(true)
    if(isEdit)
    {
     //modification
        await updateForm(currentForm)
       // alert("update")
    }
    else
    {
        //ajout
        await createForm(currentForm)
    }
    //setForms(forms.map((form) => (form.id === currentForm.id ? currentForm : form)));
    setShowModal(false);
    setCurrentForm(null);
    setIsLaoding(false)
    setIsUserFormsLoading(true)
  };

  // Fermer le modal sans sauvegarder
  const closeModal = () => {
    setShowModal(false);
    setCurrentForm(null);
  };

  // Ajouter un nouveau formulaire
  const handleAddForm = () => {
    const newForm = {
      //_id: forms.length + 1,
      letter: '',
      fields: [],
    };
    //setForms([...forms, newForm]);
    setCurrentForm(newForm);
    setShowModal(true);
    setIsEdit(false)
  };

  // Supprimer un formulaire
  const handleDeleteForm = async (id) => {
    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer ce formulaire ?");
    if (!isConfirmed) return;
  
    setIsLaoding(true);
    await deleteForm(id);
    setIsLaoding(false);
  };
  
  // Ajouter un champ au formulaire
  const addField = () => {
    const updatedForm = { ...currentForm };
    const field = { ...newField, options: newField.type === 'radio' || newField.type === 'checkbox' ? newField.options.split(';').map(opt => opt.trim()) : [] };
    updatedForm.fields.push(field);
    setCurrentForm(updatedForm);
    setNewField({ name: '', label: '', type: 'text', options: '' });
  };

  
  // Supprimer un champ du formulaire
  const deleteField = (fieldName) => {
    const updatedForm = { ...currentForm };
    updatedForm.fields = updatedForm.fields.filter((field) => field.name !== fieldName);
    setCurrentForm(updatedForm);
  };

  // Gérer les changements dans les champs du formulaire
  const handleFieldChange = (e, fieldName, isField=true) => {
    const { name, value } = e.target;

    if(!isField)
    {
        setCurrentForm({...currentForm, [name]: value })
        return;
    }

    
    const updatedFields = currentForm.fields.map((field) => {
      
        if (field.name === fieldName) {
            if(field.type=="radio" || field.type=="checkbox")
            {
               return { ...field, [name]: value.split(";") };
            }
            return { ...field, [name]: value };
        }
        return field;
    });
    
     
    setCurrentForm({ ...currentForm, fields: updatedFields });
  };

  // Gérer les changements pour le champ à ajouter
  const handleNewFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };

  if(isUserFormsLoading || isLoading)
  {
    return <Loading/>
  }
  return (
    <div className="container mt-4">
      <h2>Forms Management</h2>

      {/* Bouton pour ajouter un nouveau formulaire */}
      <Button variant="primary" className="mb-3" onClick={handleAddForm}>
       Add A New Form
      </Button>

      {/* Table des formulaires */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Letter</th>
            <th>Fields</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{form.letter}</td>
              <td>{form.fields.length} fields</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditForm(form._id)}>
                  Update
                </Button>
                <Button variant="danger" size="sm" className="ml-2" onClick={() => handleDeleteForm(form._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour ajouter ou modifier un formulaire */}
      {currentForm && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentForm._id ? 'Modifier le Formulaire' : 'Ajouter un Nouveau Formulaire'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Modification de la lettre du formulaire */}
              <Form.Group controlId="formLetter">
                <Form.Label>Letter</Form.Label>
                <Form.Select
                  name="letter"
                  value={currentForm.letter}
                  onChange={(e) => handleFieldChange(e, 'letter', false)}
                >
                  <option value="">Sélectionnez une lettre</option>
                  {Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                    <option key={letter} value={letter}>{letter}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <br/>

              {/* Liste des champs existants */}
              <h5>Champs existants</h5>
              {currentForm.fields.map((field, index) => (
                <div key={index} className="mb-3">
                  <Form.Group controlId={`formField${field.name}`}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={field.name}
                      onChange={(e) => handleFieldChange(e, field.name)}
                      placeholder="Nom du champ"
                    />
                    <Form.Control
                      type="text"
                      name="label"
                      value={field.label}
                      onChange={(e) => handleFieldChange(e, field.name)}
                      placeholder="Label du champ"
                    />
                    <Form.Control
                      as="select"
                      name="type"
                      value={field.type}
                      onChange={(e) => handleFieldChange(e, field.name)}
                    >
                      <option value="text">Text</option>
                      <option value="textarea">Textarea</option>
                      <option value="number">Number</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="file">File</option>
                      <option value="date">Date</option>
                      <option value="Year">Year</option>
                    </Form.Control>
                    {/* Si c'est un champ radio ou checkbox, afficher les options */}
                    {(field.type === 'radio' || field.type === 'checkbox') && (
                      <Form.Control
                        type="text"
                        name="options"
                        value={field.options.join(';')}
                        onChange={(e) => handleFieldChange(e, field.name)}
                        placeholder="Options séparées par ;"
                      />
                    )}
                  </Form.Group>

                  {/* Bouton pour supprimer le champ */}
                  <Button variant="danger" size="sm" onClick={() => {deleteField(field.name)}}>
                   Delete field
                  </Button>
                </div>
              ))}

              {/* Formulaire pour ajouter un nouveau champ */}
              <h5>Add A New Field</h5>
              <Form.Group controlId="newFieldName">
                <Form.Label>Field Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newField.name}
                  onChange={handleNewFieldChange}
                  placeholder="Nom du champ"
                />
              </Form.Group>
              <Form.Group controlId="newFieldLabel">
                <Form.Label>Field Label</Form.Label>
                <Form.Control
                  type="text"
                  name="label"
                  value={newField.label}
                  onChange={handleNewFieldChange}
                  placeholder="Label du champ"
                />
              </Form.Group>
              <Form.Group controlId="newFieldType">
                <Form.Label>Field Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={newField.type}
                  onChange={handleNewFieldChange}
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="file">File</option>
                  <option value="date">Date</option>
                  <option value="year">Year</option>
                </Form.Control>
              </Form.Group>

              {/* Affichage des options si le type est radio ou checkbox */}
              {(newField.type === 'radio' || newField.type === 'checkbox') && (
                <Form.Group controlId="newFieldOptions">
                  <Form.Label>Options (separated by ;)</Form.Label>
                  <Form.Control
                    type="text"
                    name="options"
                    value={newField.options}
                    onChange={handleNewFieldChange}
                    placeholder="Ex: Option1; Option2"
                  />
                </Form.Group>
              )}

              {/* Bouton pour ajouter un champ */}
              <Button variant="secondary" onClick={(e) => {addField()}}>
                Add A Field
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveForm}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default FormManager;
