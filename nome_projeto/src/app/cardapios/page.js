'use client'

import Pagina from '@/app/components/page'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function CardapiosPage() {
    const [cardapios, setCardapios] = useState([])

    useEffect(() => {
        // Busca a lista de cardápios no localStorage, ou inicia com uma lista vazia
        const cardapiosLocalStorage = JSON.parse(localStorage.getItem("cardapios")) || []
        setCardapios(cardapiosLocalStorage)
        console.log(cardapiosLocalStorage)
    }, [])

    // Função para exclusão do cardápio
    function excluir(cardapio) {
        // Confirma com o usuário a exclusão
        if (window.confirm(`Deseja realmente excluir o cardápio da semana ${cardapio.semana}?`)) {
            // Filtra a lista removendo o cardápio selecionado
            const novaLista = cardapios.filter(item => item.id !== cardapio.id)
            // Grava a nova lista no localStorage e no estado
            localStorage.setItem('cardapios', JSON.stringify(novaLista))
            setCardapios(novaLista)
            alert("Cardápio excluído com sucesso!")
        }
    }

    return (
        <Pagina titulo={"Lista de Cardápios Semanais"}>
            <div className='text-end mb-2'>
            <Button 
  href="/cardapios/form" 
  style={{
    backgroundColor: "#4CAF50", // Verde para o botão "Novo"
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

            {/* Tabela com os cardápios semanais */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Semana</th>
                        <th>Segunda</th>
                        <th>Terça</th>
                        <th>Quarta</th>
                        <th>Quinta</th>
                        <th>Sexta</th>
                        <th>Sábado</th>
                        <th>Domingo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cardapios.map(cardapio => (
                        <tr key={cardapio.id}>
                            <td>{cardapio.semana}</td>
                            <td>
                                <strong>Café:</strong> {cardapio.segunda.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.segunda.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.segunda.lanche}
                                <strong>Jantar:</strong> {cardapio.segunda.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.terca.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.terca.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.terca.lanche}
                                <strong>Jantar:</strong> {cardapio.terca.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.quarta.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.quarta.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.quarta.lanche}
                                <strong>Jantar:</strong> {cardapio.quarta.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.quinta.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.quinta.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.quinta.lanche}
                                <strong>Jantar:</strong> {cardapio.quinta.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.sexta.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.sexta.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.sexta.lanche}
                                <strong>Jantar:</strong> {cardapio.sexta.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.sabado.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.sabado.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.sabado.lanche}
                                <strong>Jantar:</strong> {cardapio.sabado.jantar}
                            </td>
                            <td>
                                <strong>Café:</strong> {cardapio.domingo.cafe}<br />
                                <strong>Almoço:</strong> {cardapio.domingo.almoco}<br />
                                <strong>Lanche da Tarde:</strong> {cardapio.domingo.lanche}
                                <strong>Jantar:</strong> {cardapio.domingo.jantar}
                            </td>

                            <td className='text-center'>
                                <div className='d-flex justify-content-center'>
                                    {/* Botões das ações */}
                                    <Button
                                        className="mx-1"
                                        href={`/cardapios/form?id=${cardapio.id}`}
                                        style={{
                                            backgroundColor: "#4CAF50", // Verde para o botão de edição
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
                                        className="mx-1"
                                        variant="danger"
                                        onClick={() => excluir(cardapio)}
                                        style={{
                                            backgroundColor: "#FF5722", // Laranja para o botão de exclusão
                                            border: "none",
                                            color: "#fff",
                                            padding: "8px 12px",
                                            borderRadius: "6px",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
                                        }}
                                    >
                                        <FaTrash />
                                    </Button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
