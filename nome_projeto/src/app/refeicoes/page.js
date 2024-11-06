'use client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Alert, Container, Card, Table } from 'react-bootstrap';
import { v4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import Pagina from '@/app/components/page';

export default function ImcCalculatorPage() {
  const [imcRecords, setImcRecords] = useState([]);
  const [imcResult, setImcResult] = useState(null);
  const [status, setStatus] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Carrega os registros de IMC do localStorage ao iniciar
    const imcRecordsLocalStorage = JSON.parse(localStorage.getItem("imcRecords")) || [];
    setImcRecords(imcRecordsLocalStorage);

    // Carrega a lista de usuários do localStorage
    const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(usuariosLocalStorage);
  }, []);

  function calcularIMC({ usuarioId, peso, altura }) {
    const usuario = usuarios.find(u => u.id === usuarioId);
    if (!usuario) {
      alert("Por favor, selecione um usuário válido.");
      return;
    }

    const alturaEmMetros = altura > 10 ? altura / 100 : altura;
    const imc = peso / (alturaEmMetros * alturaEmMetros);
    setImcResult(imc.toFixed(2));

    let imcStatus = '';
    if (imc < 18.5) imcStatus = 'Abaixo do peso';
    else if (imc >= 18.5 && imc < 24.9) imcStatus = 'Peso normal';
    else if (imc >= 25 && imc < 29.9) imcStatus = 'Sobrepeso';
    else imcStatus = 'Obesidade';
    setStatus(imcStatus);

    const novoRegistro = {
      id: v4(),
      usuarioId,
      usuarioNome: usuario.nome,
      data: new Date().toLocaleDateString(),
      peso,
      altura,
      imc: imc.toFixed(2),
      status: imcStatus
    };

    const novaLista = [...imcRecords, novoRegistro];
    setImcRecords(novaLista);
    localStorage.setItem("imcRecords", JSON.stringify(novaLista));
  }

  function excluirRegistro(id) {
    if (window.confirm("Deseja realmente excluir este registro de IMC?")) {
      const novaLista = imcRecords.filter(record => record.id !== id);
      setImcRecords(novaLista);
      localStorage.setItem("imcRecords", JSON.stringify(novaLista));
    }
  }

  const initialValues = { usuarioId: '', peso: '', altura: '' };

  const validationSchema = Yup.object().shape({
    usuarioId: Yup.string().required("Selecione um usuário"),
    peso: Yup.number().required("Campo obrigatório").positive("O peso deve ser positivo"),
    altura: Yup.number().required("Campo obrigatório").positive("A altura deve ser positiva"),
  });

  return (
    <Pagina titulo="Calculadora de IMC e Histórico">
      <Container>
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <Card style={{ width: '100%', maxWidth: '500px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}>
              <h2 className="text-center mb-4" style={{ color: '#007BFF' }}>Calculadora de IMC</h2>
              <p className="text-center text-muted mb-4">Descubra seu Índice de Massa Corporal e veja se você está no peso ideal!</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={calcularIMC}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label style={{ color: '#333' }}>Usuário:</Form.Label>
                        <Form.Control
                          as="select"
                          name="usuarioId"
                          value={values.usuarioId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.usuarioId && !errors.usuarioId}
                          isInvalid={touched.usuarioId && errors.usuarioId}
                        >
                          <option value="">Selecione um usuário</option>
                          {usuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.usuarioId}</Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label style={{ color: '#333' }}>Peso (kg):</Form.Label>
                        <Form.Control
                          name="peso"
                          type="number"
                          value={values.peso}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.peso && !errors.peso}
                          isInvalid={touched.peso && errors.peso}
                        />
                        <Form.Control.Feedback type="invalid">{errors.peso}</Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label style={{ color: '#333' }}>Altura (cm):</Form.Label>
                        <Form.Control
                          name="altura"
                          type="number"
                          value={values.altura}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.altura && !errors.altura}
                          isInvalid={touched.altura && errors.altura}
                        />
                        <Form.Control.Feedback type="invalid">{errors.altura}</Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Form.Group className="text-center">
                      <Button type="submit" variant="primary" className="mt-3" style={{ width: '100%', fontSize: '1.1em', padding: '10px' }}>Calcular IMC</Button>
                    </Form.Group>
                  </Form>
                )}
              </Formik>

              {imcResult && (
                <Alert variant="info" className="mt-4 text-center" style={{ color: '#007BFF', backgroundColor: 'rgba(240, 248, 255, 0.8)', fontSize: '1.1em' }}>
                  <h4 style={{ fontWeight: 'bold' }}>Resultado do IMC:</h4>
                  <p>Seu IMC é <strong>{imcResult}</strong>, indicando: <strong>{status}</strong>.</p>
                </Alert>
              )}

              <div className="text-center mt-3">
                <Button 
                  href="http://localhost:3000/refeicoes/form" 
                  variant="success" 
                  style={{ fontSize: '1.1em', padding: '10px', width: '100%' }}
                >
                  Acompanhar Gráfico
                </Button>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <h3 className="text-center mb-4">Histórico de IMC</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Usuário</th>
                  <th>Peso (kg)</th>
                  <th>Altura (cm)</th>
                  <th>IMC</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {imcRecords.map(record => (
                  <tr key={record.id}>
                    <td>{record.data}</td>
                    <td>{record.usuarioNome}</td>
                    <td>{record.peso}</td>
                    <td>{record.altura}</td>
                    <td>{record.imc}</td>
                    <td>{record.status}</td>
                    <td className="text-center">
                      <Button 
                        variant="danger" 
                        onClick={() => excluirRegistro(record.id)} 
                        style={{
                          backgroundColor: "#FF5722", 
                          border: "none",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Pagina>
  );
}
