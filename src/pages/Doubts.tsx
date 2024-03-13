import React, {  useState } from 'react'
import { Link } from 'react-router-dom' // Importando Link para criar o botão de voltar
import '../assets/styles/Doubts.css'
import Header from './KawaSolutions/Header'

const Doubts: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    question: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, phone, email, question } = formData
    const emailContent = `Nome: ${name}\nTelefone Celular (WhatsApp): ${phone}\nEmail: ${email}\nDúvida: ${question}`
    window.open(
      `mailto:suporte@kawatecnologia.com.br?subject=Dúvida&body=${encodeURIComponent(
        emailContent
      )}`
    )
  }
  
  return (
    <div className='doubts-container'>
             <Header/>
      <h1>Perguntas Frequentes</h1>
      <div className='question'>
        <h2>Custos e Processos para Implementar uma Loja Virtual</h2>
        <p>
          Implementar uma loja virtual envolve vários custos, incluindo o
          desenvolvimento da plataforma, integração com sistemas de pagamento,
          design e usabilidade, marketing digital, hospedagem e manutenção
          contínua.
        </p>
      </div>
      <div className='question'>
        <h2>Processos de uma Página Institucional</h2>
        <p>
          Os processos de criação de uma página institucional incluem a
          definição de objetivos e público-alvo, criação de conteúdo, design e
          desenvolvimento da página, otimização para mecanismos de busca (SEO) e
          lançamento.
        </p>
      </div>
      <div className='question'>
        <h2>Custos de um Desenvolvimento de Software</h2>
        <p>
          Os custos de desenvolvimento de software variam dependendo do escopo
          do projeto, tecnologias utilizadas, complexidade e equipe envolvida.
          Pode incluir custos de desenvolvimento, design, teste, infraestrutura
          e manutenção.
        </p>
      </div>
      <div className='question'>
        <h2>Manutenção de Computadores</h2>
        <p>
          A manutenção de computadores envolve atividades como atualizações de
          software, remoção de malware, limpeza física e substituição de
          componentes defeituosos. Pode ser feita internamente pela equipe de TI
          ou por prestadores de serviços externos.
        </p>
      </div>
      <div className='question'>
        <h2>Custos de Ferramentas para Solucionar um Problema</h2>
        <p>
          Os custos de ferramentas para solucionar problemas variam dependendo
          da natureza do problema e das ferramentas necessárias. Pode incluir
          software de diagnóstico, ferramentas de monitoramento, entre outros.
        </p>
      </div>
      <div className='question'>
        <h2>Manutenção do Sistema</h2>
        <p>
          A manutenção do sistema envolve a aplicação de patches de segurança,
          atualizações de software, otimização de desempenho e correção de erros
          para garantir o funcionamento contínuo e seguro do sistema.
        </p>
      </div>
      <div className='question'>
        <h2>Custos de Mão de Obra Qualificada</h2>
        <p>
          Os custos de mão de obra qualificada incluem salários, benefícios e
          treinamento para desenvolvedores, engenheiros, técnicos de suporte e
          outros profissionais de tecnologia.
        </p>
      </div>
      <div className='question'>
        <h2>Importância de Métricas e Objetivos Bem Definidos</h2>
        <p>
          Métricas e objetivos bem definidos são essenciais para medir o sucesso
          de um projeto de desenvolvimento de software. Eles ajudam a entender o
          progresso, identificar áreas de melhoria e garantir que os esforços da
          equipe estejam alinhados com os objetivos do negócio.
        </p>
      </div>
      <form onSubmit={handleSubmit} className='contact-form'>
        <h2>Ainda com duvidas, preencha o formulario abaixo:</h2>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Nome'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='tel'
            name='phone'
            placeholder='Telefone Celular (WhatsApp)'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            name='question'
            placeholder='Sua dúvida'
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Enviar</button>
      </form>
      <Link to='/solutions' className='back-button'>
        Voltar para Soluções
      </Link>
    </div>
  )
}

export default Doubts
