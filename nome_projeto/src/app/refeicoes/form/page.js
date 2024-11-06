'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Card, Button } from 'react-bootstrap';
import Pagina from '@/app/components/page';
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ImcChartPage() {
  const [imcRecords, setImcRecords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const imcRecordsLocalStorage = JSON.parse(localStorage.getItem("imcRecords")) || [];
    setImcRecords(imcRecordsLocalStorage);
  }, []);

  const users = [...new Set(imcRecords.map(record => record.usuarioNome))];
  
  const data = {
    labels: imcRecords.map(record => record.data),
    datasets: users.map((user, index) => ({
      label: `IMC de ${user}`,
      data: imcRecords
        .filter(record => record.usuarioNome === user)
        .map(record => record.imc),
      borderColor: `hsl(${index * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.3)`,
      fill: false,
      tension: 0.3
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolução do IMC dos Usuários',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
      y: {
        title: {
          display: true,
          text: 'IMC',
        },
        min: 10,
        max: 40,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <Pagina titulo="Gráfico de Evolução do IMC">
      <Container className="d-flex flex-column align-items-center mt-4">
        <Card style={{ width: '100%', maxWidth: '800px', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}>
          <h3 className="text-center mb-4" style={{ color: '#007BFF' }}>Evolução do IMC</h3>
          <Line data={data} options={options} />
          <div className="text-center mt-4">
            <Button onClick={() => router.push('/refeicoes')} variant="primary">
              Voltar para a Calculadora de IMC
            </Button>
          </div>
        </Card>
      </Container>
    </Pagina>
  );
}
