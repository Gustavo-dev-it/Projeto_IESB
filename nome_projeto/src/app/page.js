'use client'

import Pagina from '@/app/components/page'
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap'
import Link from 'next/link'
import { FaPlusCircle, FaList, FaCalendarAlt } from 'react-icons/fa'

export default function HomePage() {
  return (
    <Pagina titulo="Portal de Receitas e Gerador de Cardápio">
      <Container className="my-5">
        {/* Banner ou introdução com imagem de fundo */}
        <Row className="text-center mb-5" style={{ position: 'relative' }}>
          <Image 
            src="/images/food-bannerr.jpg" 
            alt="Banner de comida" 
            fluid 
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: '8px', 
              opacity: 0.8 
            }} 
          />
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: '#fff' 
          }}>
            <h1>Bem-vindo ao Portal de Receitas</h1>
            <p>Explore deliciosas receitas e crie cardápios semanais personalizados para sua casa!</p>
          </div>
        </Row>

        {/* Seções principais */}
        <Row className="gy-4">
          {/* Seção de receitas */}
          <Col md={4}>
            <Card className="text-center">
              <Card.Img variant="top" src="/images/receitass.jpg" alt="Receitas" style={{ height: '250px', objectFit: 'cover' }}/>
              <Card.Body>
                <FaList size={40} className="mb-3" />
                <Card.Title>Receitas</Card.Title>
                <Card.Text>Explore nossa coleção de receitas e inspire-se para cozinhar pratos deliciosos!</Card.Text>
                <Link href="/receitas" className="d-block mt-2">
  <Button
    style={{
      background: "linear-gradient(135deg, #FF7E39, #FF5722)",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    className="w-100 py-2"
  >
    Ver Receitas
  </Button>
</Link>

<Link href="/receitas/form" className="d-block mt-2">
  <Button
    style={{
      backgroundColor: "#4CAF50",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    className="w-100 py-2"
  >
    <FaPlusCircle className="me-2" /> Novas Receitas
  </Button>
</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Seção de ingredientes */}
          <Col md={4}>
            <Card className="text-center">
              <Card.Img variant="top" src="/images/ingredientes.jpg" alt="Ingredientes" style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body>
                <FaPlusCircle size={40} className="mb-3" />
                <Card.Title>Ingredientes</Card.Title>
                <Card.Text>Gerencie seus ingredientes para ter sempre tudo à mão para suas receitas.</Card.Text>

                <Link href="/ingredientes" className="d-block mt-2">
  <Button
    style={{
      background: "linear-gradient(135deg, #FF7E39, #FF5722)",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    className="w-100 py-2"
  >
    Ver ingredientes
  </Button>
</Link>

<Link href="/ingredientes/form" className="d-block mt-2">
  <Button
    style={{
      backgroundColor: "#4CAF50",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    className="w-100 py-2"
  >
    <FaPlusCircle className="me-2" /> Novos  Ingredientes
  </Button>
</Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Seção do gerador de cardápio semanal */}
          <Col md={4}>
            <Card className="text-center">
              <Card.Img variant="top" src="/images/menu.jpg" alt="Cardápio Semanal" style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body>
                <FaCalendarAlt size={40} className="mb-3" />
                <Card.Title>Gerador de Cardápio</Card.Title>
                <Card.Text>Planeje suas refeições para a semana inteira com o nosso gerador de cardápio.</Card.Text>
                <Link href="/cardapios" className="d-block mt-2">
  <Button
    style={{
      background: "linear-gradient(135deg, #FF7E39, #FF5722)",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    className="w-100 py-2"
  >
    Ver Cardápios
  </Button>
</Link>

<Link href="/cardapios/form" className="d-block mt-2">
  <Button
    style={{
      backgroundColor: "#4CAF50",
      border: "none",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    }}
    className="w-100 py-2"
  >
    <FaPlusCircle className="me-2" /> Novo Cardápio
  </Button>
</Link>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Pagina>
  )
}
