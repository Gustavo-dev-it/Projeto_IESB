'use client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Button, Col, Form, Row, Alert, Container, Card } from 'react-bootstrap';
import Pagina from '@/app/components/page';

export default function ImcCalculatorPage() {
  const [imcResult, setImcResult] = useState(null);
  const [status, setStatus] = useState('');

  function calcularIMC({ peso, altura }) {
    const imc = peso / ((altura / 100) ** 2);
    setImcResult(imc.toFixed(2));
    
    if (imc < 18.5) setStatus('Abaixo do peso');
    else if (imc >= 18.5 && imc < 24.9) setStatus('Peso normal');
    else if (imc >= 25 && imc < 29.9) setStatus('Sobrepeso');
    else setStatus('Obesidade');
  }

  const initialValues = { peso: '', altura: '' };

  const validationSchema = Yup.object().shape({
    peso: Yup.number().required("Campo obrigatório").positive("O peso deve ser positivo"),
    altura: Yup.number().required("Campo obrigatório").positive("A altura deve ser positiva"),
  });

  return (
    <div style={{
      backgroundImage: "url('/images/fitness_background.jpg')",
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>
      <Container className="d-flex justify-content-center">
        <Card style={{ width: '100%', maxWidth: '600px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}>
          <h2 className="text-center mb-4" style={{ color: '#007BFF' }}>Calculadora de IMC</h2>
          <p className="text-center text-muted mb-4">Descubra seu Índice de Massa Corporal e saiba se você está no peso ideal!</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={calcularIMC}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label style={{ color: '#555' }}>Peso (kg):</Form.Label>
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
                    <Form.Label style={{ color: '#555' }}>Altura (cm):</Form.Label>
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
                  <Button type="submit" variant="primary" className="mt-3" style={{ width: '100%' }}>Calcular IMC</Button>
                </Form.Group>
              </Form>
            )}
          </Formik>

          {imcResult && (
            <Alert variant="info" className="mt-4 text-center">
              <h4>Resultado do IMC:</h4>
              <p>Seu IMC é <strong>{imcResult}</strong>, indicando: <strong>{status}</strong>.</p>
            </Alert>
          )}
        </Card>
      </Container>
    </div>
  );
}
