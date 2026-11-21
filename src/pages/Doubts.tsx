import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Doubts.css'
import HeaderPrincipal from '../components/HeaderPrincipal'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const faqItems = [
  {
    question: 'Custos e Processos para Implementar uma Loja Virtual',
    answer:
      'Implementar uma loja virtual envolve vários custos, incluindo o desenvolvimento da plataforma, integração com sistemas de pagamento, design e usabilidade, marketing digital, hospedagem e manutenção contínua.'
  },
  {
    question: 'Processos de uma Página Institucional',
    answer:
      'Os processos de criação de uma página institucional incluem a definição de objetivos e público-alvo, criação de conteúdo, design e desenvolvimento da página, otimização para mecanismos de busca (SEO) e lançamento.'
  },
  {
    question: 'Custos de um Desenvolvimento de Software',
    answer:
      'Os custos de desenvolvimento de software variam dependendo do escopo do projeto, tecnologias utilizadas, complexidade e equipe envolvida. Pode incluir custos de desenvolvimento, design, teste, infraestrutura e manutenção.'
  },
  {
    question: 'Manutenção de Computadores',
    answer:
      'A manutenção de computadores envolve atividades como atualizações de software, remoção de malware, limpeza física e substituição de componentes defeituosos. Pode ser feita internamente pela equipe de TI ou por prestadores de serviços externos.'
  },
  {
    question: 'Custos de Ferramentas para Solucionar um Problema',
    answer:
      'Os custos de ferramentas para solucionar problemas variam dependendo da natureza do problema e das ferramentas necessárias. Pode incluir software de diagnóstico, ferramentas de monitoramento, entre outros.'
  },
  {
    question: 'Manutenção do Sistema',
    answer:
      'A manutenção do sistema envolve a aplicação de patches de segurança, atualizações de software, otimização de desempenho e correção de erros para garantir o funcionamento contínuo e seguro do sistema.'
  },
  {
    question: 'Custos de Mão de Obra Qualificada',
    answer:
      'Os custos de mão de obra qualificada incluem salários, benefícios e treinamento para desenvolvedores, engenheiros, técnicos de suporte e outros profissionais de tecnologia.'
  },
  {
    question: 'Importância de Métricas e Objetivos Bem Definidos',
    answer:
      'Métricas e objetivos bem definidos são essenciais para medir o sucesso de um projeto de desenvolvimento de software. Eles ajudam a entender o progresso, identificar áreas de melhoria e garantir que os esforços da equipe estejam alinhados com os objetivos do negócio.'
  }
]

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
      `mailto:admin@kawatecnologia.com.br?subject=Dúvida&body=${encodeURIComponent(
        emailContent
      )}`
    )
  }

  return (
    <div className='page-shell'>
      <Seo
        title='Perguntas frequentes da Kawa | Lojas, sites e software'
        description='Respostas sobre custos, prazos e processos para criar uma loja virtual, um site ou um sistema com a equipe da Kawa Tecnologia. Veja antes de começar.'
        path='/solutions/doubts'
      />
      <HeaderPrincipal />
      <main className='page-main doubts-container'>
        <section className='doubts-hero'>
          <span className='pill'>Perguntas frequentes</span>
          <h1>Tire suas dúvidas antes de começar o projeto.</h1>
          <p>
            Reunimos as respostas sobre custos, prazos e processos para criar
            lojas virtuais, sites e sistemas com a Kawa Tecnologia.
          </p>
        </section>

        <section className='faq-section'>
          <div className='section-heading'>
            <span className='pill'>Custos, prazos e processos</span>
            <h2>As dúvidas que recebemos com mais frequência</h2>
          </div>
          <div className='faq-grid'>
            {faqItems.map(item => (
              <article className='glass-card faq-card' key={item.question}>
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='panel doubts-form-panel'>
          <div className='section-heading'>
            <span className='pill'>Fale com a equipe</span>
            <h2>Ainda com dúvidas? Preencha o formulário abaixo:</h2>
          </div>
          <form onSubmit={handleSubmit} className='glass-form'>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input
                className='glass-input'
                type='text'
                id='name'
                name='name'
                placeholder='Seu nome completo'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Telefone Celular (WhatsApp)</label>
              <input
                className='glass-input'
                type='tel'
                id='phone'
                name='phone'
                placeholder='(11) 99999-9999'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                className='glass-input'
                type='email'
                id='email'
                name='email'
                placeholder='seu@email.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='question'>Sua dúvida</label>
              <textarea
                className='glass-input'
                id='question'
                name='question'
                placeholder='Conte qual é a sua dúvida'
                value={formData.question}
                onChange={handleChange}
                required
              />
            </div>
            <div className='doubts-actions'>
              <button type='submit' className='cta-button'>
                Enviar dúvida
              </button>
              <Link to='/solutions' className='secondary-button'>
                Voltar para Soluções
              </Link>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Doubts
