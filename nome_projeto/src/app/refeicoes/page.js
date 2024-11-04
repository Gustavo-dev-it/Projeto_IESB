'use client'

import Pagina from '@/app/components/page'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    // Busca a lista de categorias do localStorage, ou inicia com uma lista vazia
    const categoriasLocalStorage = JSON.parse(localStorage.getItem("categorias")) || []
    setCategorias(categoriasLocalStorage)
    console.log(categoriasLocalStorage)
  }, [])

  // Função para exclusão da categoria
  function excluir(categoria) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir a categoria ${categoria.nome}?`)) {
      // Filtra a lista removendo a categoria selecionada
      const novaLista = categorias.filter(item => item.id !== categoria.id)
      // Grava a nova lista no localStorage e no estado
      localStorage.setItem('categorias', JSON.stringify(novaLista))
      setCategorias(novaLista)
      alert("Categoria excluída com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Categorias de Refeição"}>
      <div className='text-end mb-2'>
      <Button 
  href="/refeicoes/form" 
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

      {/* Tabela com as categorias */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(categoria => {
            return (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td>{categoria.descricao}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button 
  className="me-2" 
  href={`/refeicoes/form?id=${categoria.id}`} 
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
  onClick={() => excluir(categoria)} 
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
