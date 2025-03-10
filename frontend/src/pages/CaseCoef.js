import React, { useContext, useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { ManagerContext } from "../context/ManagerContext";
import Loading from "../components/Loading";


const CaseCoef = () => {
    const { fetchCases, addCase, fetchCoefs, addCoef, updateCoef, updateCase, deleteCase, deleteCoef,

    } = useContext(ManagerContext)

    
    const [isCasesLoading, setIsCasesLoading] = useState(true)
    const [isCoefsLoading, setIsCoefsLoading] = useState(true)

  const [coefs, setCoefs] = useState([]);

  const [cases, setCases] = useState([]);



    useEffect(() => {
      const fetchCasesEffect = async () => {
        setIsCasesLoading(true)
          const act = await fetchCases()
          //console.log(act)
          setCases(act)
          setIsCasesLoading(false)
      };
  
      if(isCasesLoading)
      {
        fetchCasesEffect();
      }
     
  }, [isCasesLoading]);

  useEffect(() => {
    const fetchCoefsEffect = async () => {
      setIsCoefsLoading(true)
        const act = await fetchCoefs()
        //console.log(act)
        setCoefs(act)
        setIsCoefsLoading(false)
    };

    if(isCoefsLoading)
    {
      fetchCoefsEffect();
    }
   
}, [isCoefsLoading]);

  const participantTitles = ["AD", "LO1", "LO2", "ED", "KYD", "BY", "IY", "SY", "EY", "FIVE_PLUS", "NONE_OF_THEM"];

  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ number: "", coef: "", message: "", participants: [] });
  const [selectedId, setSelectedId] = useState(null);
  const [formType, setFormType] = useState("coef");

  const handleShow = (type, item = null) => {
    setFormType(type);
    if (item) {
      setEditMode(true);
      setSelectedId(item._id);
      setForm(item);
    } else {
      setEditMode(false);
      setForm({ number: "", coef: "", message: "", participants: [] });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...form.participants];
    updatedParticipants[index][field] = value;
    setForm({ ...form, participants: updatedParticipants });
  };

  const addParticipant = () => {
    setForm({ ...form, participants: [...form.participants, { title: "AD", coef: 0 }] });
  };

  const removeParticipant = async (index) => {
    const updatedParticipants = form.participants.filter((_, i) => i !== index);
    setForm({ ...form, participants: updatedParticipants });
  };

  const handleSubmit = async () => {
    if (formType === "coef") {
      if (editMode) {
        //setCoefs(coefs.map(item => (item._id === selectedId ? { ...item, ...form } : item)));
        await updateCoef(form)
      } else {
        //setCoefs([...coefs, { _id: Date.now(), ...form }]);
        await addCoef(form)
      }
      setIsCoefsLoading(true)
    } else {
      if (editMode) {
        //setCases(cases.map(item => (item._id === selectedId ? { ...item, ...form } : item)));
        await updateCase(form)
      } else {
       //setCases([...cases, { _id: Date.now(), ...form }]);
        await addCase(form)
      }
      setIsCasesLoading(true)
    }
    handleClose();
  };

  const handleDelete = async (id, type) => {
    if (type === "coef") {
      //setCoefs(coefs.filter(item => item._id !== id));
      await deleteCoef(id)
        setIsCoefsLoading(true)
    } else {
      //setCases(cases.filter(item => item._id !== id));
      await deleteCase(id)
        setIsCasesLoading(true)
    }
  };

  if(isCasesLoading || isCoefsLoading)
  {
    return <Loading/>
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Coefs</h2>
      <Button variant="primary" onClick={() => handleShow("coef")}>Ajouter Coef</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Coef</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coefs.map((item) => (
            <tr key={item._id}>
              <td>{item.number}</td>
              <td>{item.coef}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow("coef", item)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDelete(item._id, "coef")} className="ms-2">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-5">Gestion des Cases</h2>
      <Button variant="primary" onClick={() => handleShow("case")}>Ajouter Case</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Message</th>
            <th>Participants</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((item) => (
            <tr key={item._id}>
              <td>{item.number}</td>
              <td>{item.message}</td>
              <td>{item.participants.map(p => `${p.title} (${p.coef})`).join(", ")}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow("case", item)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDelete(item._id, "case")} className="ms-2">Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Modifier" : "Ajouter"} {formType === "coef" ? "Coef" : "Case"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Numéro</Form.Label>
              <Form.Control type="number" name="number" value={form.number} onChange={handleChange} required />
            </Form.Group>
            {formType === "coef" ? (
              <Form.Group>
                <Form.Label>Coef</Form.Label>
                <Form.Control type="number" name="coef" value={form.coef} onChange={handleChange} required />
              </Form.Group>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control type="text" name="message" value={form.message} onChange={handleChange} required />
                </Form.Group>
                <Button onClick={addParticipant} className="mt-2">Ajouter Participant</Button>
                {form.participants.map((p, index) => (
                  <div key={index} className="d-flex align-items-center mt-2">
                    <Form.Select value={p.title} onChange={(e) => handleParticipantChange(index, "title", e.target.value)}>
                      {participantTitles.map(title => <option key={title} value={title}>{title}</option>)}
                    </Form.Select>
                    <Form.Control type="number" value={p.coef} onChange={(e) => handleParticipantChange(index, "coef", e.target.value)} className="ms-2" />
                    <Button variant="danger" onClick={() => removeParticipant(index)} className="ms-2">X</Button>
                  </div>
                ))}
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
          <Button variant="primary" onClick={handleSubmit}>{editMode ? "Modifier" : "Ajouter"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CaseCoef;