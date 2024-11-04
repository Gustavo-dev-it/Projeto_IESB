'use client'

import Pagina from '@/app/components/page'
import apiReceitas from '@/services/apiReceitas' // importação do serviço da API de receitas
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'


export default function ReceitaFormPage({ searchParams }) {
    const router = useRouter()
    

    const [ingredientes, setIngredientes] = useState([])
    const [receitas, setReceitas] = useState([]);
    const [receitaEditada, setReceitaEditada] = useState(null);

    useEffect(() => {
        // Carrega os ingredientes da API na inicialização da página
        apiReceitas.get('/ingredientes').then(response => {
          setIngredientes(response.data)
        })
      }, [])

    useEffect(() => {    
        // Busca a lista de receitas no localStorage, ou inicia com uma lista vazia
        const receitasLocalStorage = JSON.parse(localStorage.getItem("receitas")) || []
        setReceitas(receitasLocalStorage)
        console.log(receitasLocalStorage)
    }, [])

    // Função para salvar os dados do formulário
    function salvar(dados) {
        if (receitaEditada) {
            // Atualiza a receita existente
            Object.assign(receitaEditada, dados);
            localStorage.setItem('receitas', JSON.stringify(receitas));
        } else {
            // Cria uma nova receita com um ID único
            dados.id = v4();
            receitas.push(dados);
            localStorage.setItem('receitas', JSON.stringify(receitas));
        }

        alert("Receita cadastrada com sucesso!");
        router.push("/receitas");
    }

    // Valores iniciais do formulário
    const initialValues = receitaEditada || {
        titulo: '',
        descricao: '',
        tempoPreparo: '',
        porcoes: '',
        tipo: '',
        ingredientes: [],
        instrucoes: ''
    };

    // Esquema de validação com Yup
    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string().required("Campo obrigatório"),
        tempoPreparo: Yup.number().required("Campo obrigatório"),
        porcoes: Yup.number().required("Campo obrigatório"),
        tipo: Yup.string().required("Campo obrigatório"),
        ingredientes: Yup.array().min(1, "Selecione ao menos um ingrediente"),
        instrucoes: Yup.string().required("Campo obrigatório")
    });

    return (
        <Pagina titulo="Cadastro de Receita">
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
                                <Form.Label>Título:</Form.Label>
                                <Form.Control
                                    name='titulo'
                                    type='text'
                                    value={values.titulo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.titulo && !errors.titulo}
                                    isInvalid={touched.titulo && errors.titulo}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.titulo}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Modo de Preparo:</Form.Label>
                                <Form.Control
                                    name='descricao'
                                    as='textarea'
                                    rows={3}
                                    value={values.descricao}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.descricao && !errors.descricao}
                                    isInvalid={touched.descricao && errors.descricao}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Tempo de Preparo (minutos):</Form.Label>
                                <Form.Control
                                    name='tempoPreparo'
                                    type='number'
                                    value={values.tempoPreparo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.tempoPreparo && !errors.tempoPreparo}
                                    isInvalid={touched.tempoPreparo && errors.tempoPreparo}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.tempoPreparo}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Porções:</Form.Label>
                                <Form.Control
                                    name='porcoes'
                                    type='number'
                                    value={values.porcoes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.porcoes && !errors.porcoes}
                                    isInvalid={touched.porcoes && errors.porcoes}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.porcoes}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Tipo:</Form.Label>
                                <Form.Select
                                    name='tipo'
                                    value={values.tipo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.tipo && !errors.tipo}
                                    isInvalid={touched.tipo && errors.tipo}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Doce">Doce</option>
                                    <option value="Salgado">Salgado</option>
                                    <option value="Agridoce">Agridoce</option>
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Ingredientes:</Form.Label>
                                <Form.Select
                                    name='ingredientes'
                                    multiple
                                    value={values.ingredientes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.ingredientes && !errors.ingredientes}
                                    isInvalid={touched.ingredientes && errors.ingredientes}
                                >
                                    <option value="">Selecione</option>
                                    {ingredientes.map(ingrediente => (
                                        <option key={ingrediente.id} value={ingrediente.nome}>{ingrediente.nome}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.ingredientes}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Instruções:</Form.Label>
                                <Form.Control
                                    name='instrucoes'
                                    as='textarea'
                                    rows={5}
                                    value={values.instrucoes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.instrucoes && !errors.instrucoes}
                                    isInvalid={touched.instrucoes && errors.instrucoes}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.instrucoes}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Botões */}
                        <Form.Group className='text-end'>
                            <Button className='me-2' href='/receitas'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
