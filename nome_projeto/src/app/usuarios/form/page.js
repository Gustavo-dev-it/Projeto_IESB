'use client';

import Pagina from '@/app/components/page';
import { Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from 'uuid';
import * as Yup from 'yup';

export default function UsuarioFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [initialValues, setInitialValues] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: '',
        telefone: '',
        endereco: '',
    });

    useEffect(() => {
        // Carrega a lista de usuários do localStorage ao iniciar
        const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || [];
        setUsuarios(usuariosLocalStorage);

        // Se houver um ID na URL, busca o usuário para edição
        const id = searchParams.get('id');
        if (id) {
            const usuario = usuariosLocalStorage.find(item => item.id === id);
            if (usuario) {
                setUsuarioEditado(usuario);
                setInitialValues(usuario); // Atualiza os valores iniciais do formulário
            }
        }
    }, [searchParams]);

    // Função para salvar os dados do formulário
    function salvar(dados) {
        if (usuarioEditado) {
            // Atualiza o usuário existente
            const usuariosAtualizados = usuarios.map(item =>
                item.id === usuarioEditado.id ? { ...item, ...dados } : item
            );
            setUsuarios(usuariosAtualizados);
            localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
        } else {
            // Cria um novo usuário com um ID único
            dados.id = v4();
            const novosUsuarios = [...usuarios, dados];
            setUsuarios(novosUsuarios);
            localStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
        }

        alert("Usuário cadastrado com sucesso!");
        router.push("/usuarios");
    }

    // Esquema de validação com Yup
    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Campo obrigatório"),
        email: Yup.string().email("Email inválido").required("Campo obrigatório"),
        senha: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Campo obrigatório"),
        confirmacaoSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], "As senhas devem coincidir")
            .required("Confirmação de senha é obrigatória"),
        telefone: Yup.string().required("Campo obrigatório"),
        endereco: Yup.string().required("Campo obrigatório"),
    });

    return (
        <Pagina titulo="Cadastro de Usuário">
            <Formik
                enableReinitialize // Permite que o formulário seja reinicializado quando os valores iniciais mudam
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={salvar}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* Campos do formulário */}
                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Nome:</Form.Label>
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
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    name='email'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && errors.email}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    name='senha'
                                    type='password'
                                    value={values.senha}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.senha && !errors.senha}
                                    isInvalid={touched.senha && errors.senha}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.senha}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Confirmação de Senha:</Form.Label>
                                <Form.Control
                                    name='confirmacaoSenha'
                                    type='password'
                                    value={values.confirmacaoSenha}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.confirmacaoSenha && !errors.confirmacaoSenha}
                                    isInvalid={touched.confirmacaoSenha && errors.confirmacaoSenha}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.confirmacaoSenha}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control
                                    name='telefone'
                                    type='text'
                                    value={values.telefone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.telefone && !errors.telefone}
                                    isInvalid={touched.telefone && errors.telefone}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control
                                    name='endereco'
                                    type='text'
                                    value={values.endereco}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.endereco && !errors.endereco}
                                    isInvalid={touched.endereco && errors.endereco}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Botões */}
                        <Form.Group className='text-end'>
                            <Button className='me-2' href='/usuarios'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
