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
    const [receitas, setReceitas] = useState([]);
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários

    useEffect(() => {
        // Carrega a lista de receitas do localStorage
        const receitasLocalStorage = JSON.parse(localStorage.getItem("receitas")) || [];
        setReceitas(receitasLocalStorage);

        // Carrega a lista de cardápios do localStorage
        const cardapiosLocalStorage = JSON.parse(localStorage.getItem("cardapios")) || [];
        setCardapios(cardapiosLocalStorage);

        // Carrega a lista de usuários do localStorage
        const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || [];
        setUsuarios(usuariosLocalStorage);

        // Busca o cardápio para edição, se houver ID
        const id = searchParams?.id;
        if (id) {
            const cardapio = cardapiosLocalStorage.find(item => item.id === id);
            setCardapioEditado(cardapio);
        }
    }, [searchParams]);

    // Função para salvar os dados do formulário
    function salvar(dados) {
        let updatedCardapios;

        if (cardapioEditado) {
            updatedCardapios = cardapios.map(item =>
                item.id === cardapioEditado.id ? { ...item, ...dados } : item
            );
        } else {
            dados.id = v4();
            updatedCardapios = [...cardapios, dados];
        }

        localStorage.setItem('cardapios', JSON.stringify(updatedCardapios));
        setCardapios(updatedCardapios);

        alert("Cardápio semanal cadastrado com sucesso!");
        router.push("/cardapios");
    }

    // Valores iniciais do formulário
    const initialValues = cardapioEditado || {
        usuario: '', // Para selecionar o usuário
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
        usuario: Yup.string().required("Selecione um usuário"),
        segunda: Yup.object().shape({
            cafe: Yup.string().required("Campo obrigatório"),
            almoco: Yup.string().required("Campo obrigatório"),
            lanche: Yup.string().required("Campo obrigatório"),
            jantar: Yup.string().required("Campo obrigatório")
        }),
        // Repetir a mesma validação para os outros dias da semana...
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
                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Usuário:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name='usuario'
                                    value={values.usuario}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.usuario && !errors.usuario}
                                    isInvalid={touched.usuario && errors.usuario}
                                >
                                    <option value="">Selecione um usuário</option>
                                    {usuarios.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{errors.usuario}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Campos de seleção para cada refeição em cada dia da semana */}
                        {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].map(dia => (
                            <Row key={dia} className='mb-3'>
                                <h5 className='mt-3'>{dia.charAt(0).toUpperCase() + dia.slice(1)}</h5>
                                {['cafe', 'almoco', 'lanche', 'jantar'].map(refeicao => (
                                    <Form.Group as={Col} key={refeicao}>
                                        <Form.Label>{refeicao.charAt(0).toUpperCase() + refeicao.slice(1)}:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name={`${dia}.${refeicao}`}
                                            value={values[dia][refeicao]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched[dia]?.[refeicao] && !errors[dia]?.[refeicao]}
                                            isInvalid={touched[dia]?.[refeicao] && errors[dia]?.[refeicao]}
                                        >
                                            <option value="">Selecione uma receita</option>
                                            {receitas.map(receita => (
                                                <option key={receita.id} value={receita.nome}>
                                                    {receita.nome}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type='invalid'>{errors[dia]?.[refeicao]}</Form.Control.Feedback>
                                    </Form.Group>
                                ))}
                            </Row>
                        ))}

                        {/* Botões de controle */}
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
