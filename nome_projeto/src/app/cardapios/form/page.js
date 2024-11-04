'use client'

import Pagina from '@/app/components/page'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function CardapioFormPage({ searchParams }) {
    const router = useRouter()

    const [cardapios, setCardapios] = useState([]);
    const [cardapioEditado, setCardapioEditado] = useState(null);

    useEffect(() => {
        // Carrega a lista de cardápios do localStorage ao iniciar
        const cardapiosLocalStorage = JSON.parse(localStorage.getItem("cardapios")) || []
        setCardapios(cardapiosLocalStorage);

        // Se tiver um ID, busca o cardápio para edição
        const id = searchParams?.id;
        if (id) {
            const cardapio = cardapiosLocalStorage.find(item => item.id === id);
            setCardapioEditado(cardapio);
        }
    }, [searchParams]);

    // Função para salvar os dados do formulário
    function salvar(dados) {
        if (cardapioEditado) {
            // Atualiza o cardápio existente
            Object.assign(cardapioEditado, dados);
            localStorage.setItem('cardapios', JSON.stringify(cardapios));
        } else {
            // Cria um novo cardápio com um ID único
            dados.id = v4();
            cardapios.push(dados);
            localStorage.setItem('cardapios', JSON.stringify(cardapios));
        }

        alert("Cardápio semanal cadastrado com sucesso!");
        router.push("/cardapios");
    }

    // Valores iniciais do formulário
    const initialValues = cardapioEditado || {
        semana: '',
        segunda: { cafe: '', almoco: '', lanche: '', jantar: '' },
        terca: { cafe: '', almoco: '', lanche: '', jantar: '' },
        quarta: { cafe: '', almoco: '', lanche: '', jantar: '' },
        quinta: { cafe: '', almoco: '', lanche: '', jantar: '' },
        sexta: { cafe: '', almoco: '', lanche: '', jantar: '' },
        sabado: { cafe: '', almoco: '', lanche: '', jantar: '' },
        domingo: { cafe: '', almoco: '', lanche: '', jantar: '' },
    };

    // Esquema de validação com Yup
    const validationSchema = Yup.object().shape({
        semana: Yup.string().required("Campo obrigatório"),
        segunda: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        // Repete para os outros dias da semana
        terca: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        quarta: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        quinta: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        sexta: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        sabado: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        domingo: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
    });

    return (
        <Pagina titulo="Cadastro de Cardápio Semanal">
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
                                <Form.Label>Semana:</Form.Label>
                                <Form.Control
                                    name='semana'
                                    type='text'
                                    value={values.semana}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.semana && !errors.semana}
                                    isInvalid={touched.semana && errors.semana}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.semana}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].map(dia => (
                            <Row key={dia} className='mb-3'>
                                <h5 className='mt-3'>{dia.charAt(0).toUpperCase() + dia.slice(1)}</h5>
                                <Form.Group as={Col}>
                                    <Form.Label>Café da Manhã:</Form.Label>
                                    <Form.Control
                                        name={`${dia}.cafe`}
                                        type='text'
                                        value={values[dia].cafe}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched[dia]?.cafe && !errors[dia]?.cafe}
                                        isInvalid={touched[dia]?.cafe && errors[dia]?.cafe}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors[dia]?.cafe}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Almoço:</Form.Label>
                                    <Form.Control
                                        name={`${dia}.almoco`}
                                        type='text'
                                        value={values[dia].almoco}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched[dia]?.almoco && !errors[dia]?.almoco}
                                        isInvalid={touched[dia]?.almoco && errors[dia]?.almoco}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors[dia]?.almoco}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Lanche da Tarde:</Form.Label>
                                    <Form.Control
                                        name={`${dia}.lanche`}
                                        type='text'
                                        value={values[dia].lanche}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched[dia]?.lanche && !errors[dia]?.lanche}
                                        isInvalid={touched[dia]?.lanche && errors[dia]?.lanche}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors[dia]?.lanche}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Jantar:</Form.Label>
                                    <Form.Control
                                        name={`${dia}.jantar`}
                                        type='text'
                                        value={values[dia].jantar}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched[dia]?.jantar && !errors[dia]?.jantar}
                                        isInvalid={touched[dia]?.jantar && errors[dia]?.jantar}
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors[dia]?.jantar}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        ))}

                        {/* Botões */}
                        <Form.Group className='text-end'>
                            <Button className='me-2' href='/cardapios'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
