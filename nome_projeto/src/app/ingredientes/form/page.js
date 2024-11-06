'use client'

import Pagina from '@/app/components/page'
import { Formik, FieldArray } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaPlus, FaTrash } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function IngredienteFormPage({ searchParams }) {
    const router = useRouter()

    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteEditado, setIngredienteEditado] = useState(null);

    useEffect(() => {
        const ingredientesLocalStorage = JSON.parse(localStorage.getItem("ingredientes")) || []
        setIngredientes(ingredientesLocalStorage);

        const id = searchParams?.id;
        if (id) {
            const ingrediente = ingredientesLocalStorage.find(item => item.id === id);
            setIngredienteEditado(ingrediente);
        }
    }, [searchParams]);

    function salvar(dados) {
        const novosIngredientes = dados.ingredientes.map(ingrediente => ({
            ...ingrediente,
            id: ingredienteEditado ? ingredienteEditado.id : v4()
        }));

        const updatedIngredientes = ingredienteEditado
            ? ingredientes.map(item =>
                item.id === ingredienteEditado.id ? { ...novosIngredientes[0] } : item
              )
            : [...ingredientes, ...novosIngredientes];

        localStorage.setItem('ingredientes', JSON.stringify(updatedIngredientes));
        setIngredientes(updatedIngredientes);

        alert("Ingrediente cadastrado com sucesso!");
        
        // Aguardar a atualização do localStorage antes de redirecionar
        setTimeout(() => {
            router.push("/ingredientes");
        }, 100);
    }

    const initialValues = {
        ingredientes: ingredienteEditado
            ? [{ nome: ingredienteEditado.nome, quantidade: ingredienteEditado.quantidade, unidade: ingredienteEditado.unidade }]
            : [{ nome: '', quantidade: '', unidade: '' }]
    };

    const validationSchema = Yup.object().shape({
        ingredientes: Yup.array().of(
            Yup.object().shape({
                nome: Yup.string().required("Campo obrigatório"),
                quantidade: Yup.number().required("Campo obrigatório").positive("Deve ser um valor positivo"),
                unidade: Yup.string().required("Campo obrigatório"),
            })
        ),
    });

    return (
        <Pagina titulo="Cadastro de Ingrediente">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={salvar}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldArray
                            name="ingredientes"
                            render={arrayHelpers => (
                                <>
                                    <h5>Ingredientes</h5>
                                    {values.ingredientes.map((ingrediente, index) => (
                                        <Row key={index} className='mb-2'>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    name={`ingredientes.${index}.nome`}
                                                    type='text'
                                                    placeholder="Ingrediente"
                                                    value={ingrediente.nome}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isValid={touched.ingredientes?.[index]?.nome && !errors.ingredientes?.[index]?.nome}
                                                    isInvalid={touched.ingredientes?.[index]?.nome && errors.ingredientes?.[index]?.nome}
                                                />
                                                <Form.Control.Feedback type='invalid'>{errors.ingredientes?.[index]?.nome}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    name={`ingredientes.${index}.quantidade`}
                                                    type='number'
                                                    placeholder="Quantidade"
                                                    value={ingrediente.quantidade}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isValid={touched.ingredientes?.[index]?.quantidade && !errors.ingredientes?.[index]?.quantidade}
                                                    isInvalid={touched.ingredientes?.[index]?.quantidade && errors.ingredientes?.[index]?.quantidade}
                                                />
                                                <Form.Control.Feedback type='invalid'>{errors.ingredientes?.[index]?.quantidade}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    name={`ingredientes.${index}.unidade`}
                                                    type='text'
                                                    placeholder="Unidade (ex.: kg, g)"
                                                    value={ingrediente.unidade}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isValid={touched.ingredientes?.[index]?.unidade && !errors.ingredientes?.[index]?.unidade}
                                                    isInvalid={touched.ingredientes?.[index]?.unidade && errors.ingredientes?.[index]?.unidade}
                                                />
                                                <Form.Control.Feedback type='invalid'>{errors.ingredientes?.[index]?.unidade}</Form.Control.Feedback>
                                            </Form.Group>
                                            <Col xs="auto">
                                                <Button variant="danger" onClick={() => arrayHelpers.remove(index)}>
                                                    <FaTrash />
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button variant="secondary" onClick={() => arrayHelpers.push({ nome: '', quantidade: '', unidade: '' })}>
                                        <FaPlus /> Adicionar Ingrediente
                                    </Button>
                                </>
                            )}
                        />

                        <Form.Group className='text-end mt-3'>
                            <Button className='me-2' href='/ingredientes'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
