'use client'

import Pagina from '@/app/components/page'
import { Formik, FieldArray } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck, FaPlus, FaTrash } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ReceitaFormPage({ searchParams }) {
    const router = useRouter()

    const [receitas, setReceitas] = useState([]);
    const [receitaEditada, setReceitaEditada] = useState(null);
    const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState([]);

    useEffect(() => {
        // Carrega a lista de receitas do localStorage ao iniciar
        const receitasLocalStorage = JSON.parse(localStorage.getItem("receitas")) || [];
        setReceitas(receitasLocalStorage);

        // Carrega a lista de ingredientes disponíveis do localStorage
        const ingredientesLocalStorage = JSON.parse(localStorage.getItem("ingredientes")) || [];
        setIngredientesDisponiveis(ingredientesLocalStorage);

        // Se tiver um ID, busca a receita para edição
        const id = searchParams?.id;
        if (id) {
            const receita = receitasLocalStorage.find(item => item.id === id);
            setReceitaEditada(receita);
        }
    }, [searchParams]);

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
        nome: '',
        categoria: '',
        tempoPreparo: '',
        rendimento: '',
        ingredientes: [{ nome: '', quantidade: '', unidade: '' }],
        instrucoes: ''
    };

    // Esquema de validação com Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Campo obrigatório"),
        categoria: Yup.string().required("Campo obrigatório"),
        tempoPreparo: Yup.number().required("Campo obrigatório").positive("Deve ser um valor positivo"),
        rendimento: Yup.string().required("Campo obrigatório"),
        ingredientes: Yup.array().of(
            Yup.object().shape({
                nome: Yup.string().required("Campo obrigatório"),
                quantidade: Yup.number().required("Campo obrigatório").positive("Deve ser um valor positivo"),
                unidade: Yup.string().required("Campo obrigatório"),
            })
        ),
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
                                <Form.Label>Nome da Receita:</Form.Label>
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
                                <Form.Label>Rendimento:</Form.Label>
                                <Form.Control
                                    name='rendimento'
                                    type='text'
                                    value={values.rendimento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.rendimento && !errors.rendimento}
                                    isInvalid={touched.rendimento && errors.rendimento}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.rendimento}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <FieldArray
                            name="ingredientes"
                            render={arrayHelpers => (
                                <>
                                    <h5>Ingredientes</h5>
                                    {values.ingredientes.map((ingrediente, index) => (
                                        <Row key={index} className='mb-2'>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    as="select"
                                                    name={`ingredientes.${index}.nome`}
                                                    value={ingrediente.nome}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isValid={touched.ingredientes?.[index]?.nome && !errors.ingredientes?.[index]?.nome}
                                                    isInvalid={touched.ingredientes?.[index]?.nome && errors.ingredientes?.[index]?.nome}
                                                >
                                                    <option value="">Selecione um ingrediente</option>
                                                    {ingredientesDisponiveis.map((item) => (
                                                        <option key={item.id} value={item.nome}>{item.nome}</option>
                                                    ))}
                                                </Form.Control>
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
                                    
                                </>
                            )}
                        />

                        <Row className='mt-3'>
                            <Form.Group as={Col}>
                                <Form.Label>Instruções de Preparo:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="instrucoes"
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
                        <Form.Group className='text-end mt-3'>
                            <Button className='me-2' href='/receitas'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>

                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
