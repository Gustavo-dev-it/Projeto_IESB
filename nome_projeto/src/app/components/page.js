'use client'

import { Container, Nav, Navbar } from "react-bootstrap"
import { FaHome, FaUser, FaUtensils, FaCarrot, FaCalendarAlt, FaList } from "react-icons/fa"
import { SiGumroad } from "react-icons/si";


export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar expand="lg" className="shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7E39, #4CAF50)' }}>
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center text-white fw-bold">
            <SiGumroad
              size={60} // Define o tamanho do ícone
              className="d-inline-block align-top me-2"
              style={{ color: "#FFFFFF" }} // Ajuste a cor do ícone conforme o tema
              alt="Logo do Portal de Receitas"
            />


            <span>Gustav Projectss</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="d-flex align-items-center text-white">
                <FaHome className="me-2" /> Home
              </Nav.Link>
              <Nav.Link href="/usuarios" className="d-flex align-items-center text-white">
                <FaUser className="me-2" /> Usuários
              </Nav.Link>
              <Nav.Link href="/receitas" className="d-flex align-items-center text-white">
                <FaUtensils className="me-2" /> Receitas
              </Nav.Link>
              <Nav.Link href="/ingredientes" className="d-flex align-items-center text-white">
                <FaCarrot className="me-2" /> Ingredientes
              </Nav.Link>
              <Nav.Link href="/refeicoes" className="d-flex align-items-center text-white">
                <FaList className="me-2" /> Categoria de Refeições
              </Nav.Link>
              <Nav.Link href="/cardapios" className="d-flex align-items-center text-white">
                <FaCalendarAlt className="me-2" /> Cardápios Semanais
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de Título */}
      <div
        className="text-center text-white py-4"
        style={{
          background: "linear-gradient(135deg, #FF7E39, #FF5722)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1 style={{ fontWeight: 'bold', letterSpacing: '1px' }}>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-4">
        {children}
      </Container>
    </>
  )
}
