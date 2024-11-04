'use client'

import Pagina from '@/app/components/page'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function IngredienteFormPage({ searchParams }) {
    const router = useRouter()

    const [ingredientes, setIngredientes] = useState([]);
    const [ingredienteEditado, setIngredienteEditado] = useState(null);

    useEffect(() => {
        // Carrega a lista de ingredientes do localStorage ao iniciar
        const ingredientesLocalStorage = JSON.parse(localStorage.getItem("ingredientes")) || []
        setIngredientes(ingredientesLocalStorage);

        // Se tiver um ID, busca o ingrediente para edição
        const id = searchParams?.id;
        if (id) {
            const ingrediente = ingredientesLocalStorage.find(item => item.id === id);
            setIngredienteEditado(ingrediente);
        }
    }, [searchParams]);

    // Função para salvar os dados do formulário
    function salvar(dados) {
        if (ingredienteEditado) {
            // Atualiza o ingrediente existente
            Object.assign(ingredienteEditado, dados);
            localStorage.setItem('ingredientes', JSON.stringify(ingredientes));
        } else {
            // Cria um novo ingrediente com um ID único
            dados.id = v4();
            ingredientes.push(dados);
            localStorage.setItem('ingredientes', JSON.stringify(ingredientes));
        }

        alert("Ingrediente cadastrado com sucesso!");
        router.push("/ingredientes");
    }

    // Valores iniciais do formulário
    const initialValues = ingredienteEditado || {
        nome: '',
        categoria: '',
        quantidade: '',
        unidade: ''
    };

    // Esquema de validação com Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Campo obrigatório"),
        categoria: Yup.string().required("Campo obrigatório"),
        quantidade: Yup.number().required("Campo obrigatório").positive("Deve ser um valor positivo"),
        unidade: Yup.string().required("Campo obrigatório"),
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
                        {/* Campos do formulário */}
                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Nome do Ingrediente:</Form.Label>
                                <Form.Control
                                    name='nome'
                                    type='text'
                                    value={values.nome}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.nome && !errors.nome}
                                    isInvalid={touched.nome && errors.nome}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Categoria:</Form.Label>
                                <Form.Control
                                    name='categoria'
                                    type='text'
                                    value={values.categoria}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.categoria && !errors.categoria}
                                    isInvalid={touched.categoria && errors.categoria}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.categoria}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Quantidade:</Form.Label>
                                <Form.Control
                                    name='quantidade'
                                    type='number'
                                    value={values.quantidade}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.quantidade && !errors.quantidade}
                                    isInvalid={touched.quantidade && errors.quantidade}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.quantidade}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Unidade (ex.: kg, g, ml):</Form.Label>
                                <Form.Control
                                    name='unidade'
                                    type='text'
                                    value={values.unidade}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.unidade && !errors.unidade}
                                    isInvalid={touched.unidade && errors.unidade}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.unidade}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Botões */}
                        <Form.Group className='text-end'>
                            <Button className='me-2' href='/ingredientes'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
