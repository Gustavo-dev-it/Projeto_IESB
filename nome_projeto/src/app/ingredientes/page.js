'use client'

import Pagina from '@/app/components/page'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function IngredientesPage() {
  const [ingredientes, setIngredientes] = useState([])

  useEffect(() => {
    // Busca a lista de ingredientes no localStorage, ou inicia com uma lista vazia
    const ingredientesLocalStorage = JSON.parse(localStorage.getItem("ingredientes")) || []
    setIngredientes(ingredientesLocalStorage)
    console.log(ingredientesLocalStorage)
  }, [])

  // Função para exclusão do ingrediente
  function excluir(ingrediente) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o ingrediente ${ingrediente.nome}?`)) {
      // Filtra a lista removendo o ingrediente selecionado
      const novaLista = ingredientes.filter(item => item.id !== ingrediente.id)
      // Grava a nova lista no localStorage e no estado
      localStorage.setItem('ingredientes', JSON.stringify(novaLista))
      setIngredientes(novaLista)
      alert("Ingrediente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Ingredientes"}>
      <div className='text-end mb-2'>
      <Button 
  href="/ingredientes/form" 
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

      {/* Tabela com os ingredientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map(ingrediente => {
            return (
              <tr key={ingrediente.id}>
                <td>{ingrediente.nome}</td>
                <td>{ingrediente.categoria}</td>
                <td>{ingrediente.quantidade}</td>
                <td>{ingrediente.unidade}</td>
                <td className='text-center'>
                                <div className='d-flex justify-content-center'></div>
                  {/* Botões das ações */}
                  <Button 
  className="me-2" 
  href={`/ingredientes/form?id=${ingrediente.id}`} 
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
  onClick={() => excluir(ingrediente)} 
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
