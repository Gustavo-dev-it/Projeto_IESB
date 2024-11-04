'use client'

import Pagina from '@/app/components/page'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    // Busca a lista de usuários do localStorage, ou inicia com uma lista vazia
    const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || []
    setUsuarios(usuariosLocalStorage)
  }, [])

  // Função para exclusão do usuário
  function excluir(usuario) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o usuário ${usuario.nome}?`)) {
      // Filtra a lista removendo o usuário selecionado
      const novaLista = usuarios.filter(item => item.id !== usuario.id)
      // Grava a nova lista no localStorage e no estado
      localStorage.setItem('usuarios', JSON.stringify(novaLista))
      setUsuarios(novaLista)
      alert("Usuário excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Usuários"}>
      <div className='text-end mb-2'>
      <Button 
  href="/usuarios/form" 
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

      {/* Tabela com os usuários */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.endereco}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button 
  className="me-2" 
  href={`/usuarios/form?id=${usuario.id}`} 
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
  onClick={() => excluir(usuario)} 
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
