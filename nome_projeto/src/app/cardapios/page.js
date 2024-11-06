'use client'

import Pagina from '@/app/components/page'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function CardapiosPage() {
    const [cardapios, setCardapios] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Carrega a lista de cardápios do localStorage
        const cardapiosLocalStorage = JSON.parse(localStorage.getItem("cardapios")) || [];
        setCardapios(cardapiosLocalStorage);

        // Carrega a lista de usuários do localStorage
        const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || [];
        setUsuarios(usuariosLocalStorage);
    }, []);

    // Função para obter o nome do usuário associado ao cardápio
    function getUsuarioNome(id) {
        const usuario = usuarios.find(u => u.id === id);
        return usuario ? usuario.nome : "Usuário não encontrado";
    }

    // Função para exclusão do cardápio
    function excluir(cardapio) {
        if (window.confirm(`Deseja realmente excluir o cardápio para ${getUsuarioNome(cardapio.usuario)}?`)) {
            const novaLista = cardapios.filter(item => item.id !== cardapio.id);
            localStorage.setItem('cardapios', JSON.stringify(novaLista));
            setCardapios(novaLista);
            alert("Cardápio excluído com sucesso!");
        }
    }

    return (
        <Pagina titulo={"Lista de Cardápios"}>
            <div className='text-end mb-2'>
                <Button 
                    href="/cardapios/form" 
                    style={{
                        backgroundColor: "#4CAF50",
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold"
                    }}
                >
                    <FaPlusCircle className="me-2" /> Novo
                </Button>
            </div>

            {/* Tabela com os cardápios */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>Segunda-feira</th>
                        <th>Terça-feira</th>
                        <th>Quarta-feira</th>
                        <th>Quinta-feira</th>
                        <th>Sexta-feira</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cardapios.map(cardapio => (
                        <tr key={cardapio.id}>
                            <td>{getUsuarioNome(cardapio.usuario)}</td>
                            <td>
                                <strong>Café:</strong> {cardapio.segunda.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.segunda.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.segunda.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.segunda.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.terca.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.terca.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.terca.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.terca.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.quarta.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.quarta.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.quarta.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.quarta.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.quinta.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.quinta.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.quinta.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.quinta.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.sexta.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.sexta.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.sexta.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.sexta.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.sabado.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.sabado.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.sabado.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.sabado.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong>     {cardapio.domingo.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.domingo.almoco}<br />
                                <strong>Lanche:</strong> {cardapio.domingo.lanche}<br />
                                <strong>Jantar:</strong> {cardapio.domingo.jantar}
                            </td>

                            <td className='text-center'>
                                <Button 
                                    className="me-2" 
                                    href={`/cardapios/form?id=${cardapio.id}`} 
                                    style={{
                                        backgroundColor: "#4CAF50",
                                        border: "none",
                                        color: "#fff",
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                                    }}
                                >
                                    <FaPen />
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => excluir(cardapio)} 
                                    style={{
                                        backgroundColor: "#FF5722",
                                        border: "none",
                                        color: "#fff",
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                                    }}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
