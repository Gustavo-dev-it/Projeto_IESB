'use client'

import Pagina from '@/app/components/page'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function RefeicaoFormPage({ searchParams }) {
    const router = useRouter()

    const [categorias, setCategorias] = useState([]);
    const [categoriaEditada, setCategoriaEditada] = useState(null);

    // Valores iniciais padrão para categorias de refeição
    const valoresIniciais = [
        { id: v4(), nome: 'Café da Manhã', descricao: 'Refeição matinal para iniciar o dia' },
        { id: v4(), nome: 'Almoço', descricao: 'Refeição principal do meio-dia' },
        { id: v4(), nome: 'Jantar', descricao: 'Refeição da noite para encerrar o dia' },
        { id: v4(), nome: 'Lanche', descricao: 'Pequena refeição entre as principais' },
        { id: v4(), nome: 'Sobremesa', descricao: 'Doce servido após a refeição principal' }
    ];

    useEffect(() => {
        // Carrega as categorias do localStorage ou adiciona valores iniciais
        const categoriasLocalStorage = JSON.parse(localStorage.getItem("categorias")) || valoresIniciais;
        setCategorias(categoriasLocalStorage);

        // Salva as categorias iniciais no localStorage caso não estejam salvas
        if (!localStorage.getItem("categorias")) {
            localStorage.setItem("categorias", JSON.stringify(valoresIniciais));
        }

        // Se houver um ID na URL, busca a categoria para edição
        const id = searchParams?.id;
        if (id) {
            const categoria = categoriasLocalStorage.find(item => item.id === id);
            setCategoriaEditada(categoria);
        }
    }, [searchParams]);

    // Função para salvar os dados do formulário
    function salvar(dados) {
        if (categoriaEditada) {
            // Atualiza a categoria existente
            Object.assign(categoriaEditada, dados);
            localStorage.setItem('categorias', JSON.stringify(categorias));
        } else {
            // Cria uma nova categoria com um ID único
            dados.id = v4();
            categorias.push(dados);
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }

        alert("Categoria cadastrada com sucesso!");
        router.push("/refeicoes");
    }

    // Valores iniciais do formulário
    const initialValues = categoriaEditada || {
        nome: '',
        descricao: '',
    };

    // Esquema de validação com Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Campo obrigatório"),
        descricao: Yup.string().required("Campo obrigatório"),
    });

    return (
        <Pagina titulo="Cadastro de Categoria de Refeição">
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
                                <Form.Label>Nome da Categoria:</Form.Label>
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
                                <Form.Label>Descrição:</Form.Label>
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

                        {/* Botões */}
                        <Form.Group className='text-end'>
                            <Button className='me-2' href='/refeicoes'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
