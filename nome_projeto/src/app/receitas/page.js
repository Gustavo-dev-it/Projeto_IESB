'use client'

import Pagina from '@/app/components/page'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ReceitasPage() {
  const [receitas, setReceitas] = useState([])

  useEffect(() => {
    // Busca a lista de receitas no localStorage, ou inicia com uma lista vazia
    const receitasLocalStorage = JSON.parse(localStorage.getItem("receitas")) || []
    setReceitas(receitasLocalStorage)
    console.log(receitasLocalStorage)
  }, [])

  // Função para exclusão da receita
  function excluir(receita) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir a receita ${receita.titulo}?`)) {
      // Filtra a lista removendo a receita selecionada
      const novaLista = receitas.filter(item => item.id !== receita.id)
      // Grava a nova lista no localStorage e no estado
      localStorage.setItem('receitas', JSON.stringify(novaLista))
      setReceitas(novaLista)
      alert("Receita excluída com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Receitas"}>
      <div className='text-end mb-2'>
      <Button 
  href="/receitas/form" 
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

      {/* Tabela com as receitas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome da Receita</th>
            <th>Descrição</th>
            <th>Tempo de Preparo</th>
            <th>Porções</th>
            <th>Modo de preparo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {receitas.map(receita => {
            return (
              <tr key={receita.id}>
                <td>{receita.nome}</td>
                <td>{receita.categoria}</td>
                <td>{receita.tempoPreparo} min</td>
                <td>{receita.rendimento}</td>
                <td>{receita.instrucoes}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button 
  className="me-2" 
  href={`/receitas/form?id=${receita.id}`} 
  style={{
    backgroundColor: "#4CAF50", // Verde para o botão de edição
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
   
  }}
>
  <FaPen />
</Button>

<Button 
  variant="danger" 
  onClick={() => excluir(receita)} 
  style={{
    backgroundColor: "#FF5722", // Laranja para o botão de exclusão
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  
  }}
>
  <FaTrash />
</Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
