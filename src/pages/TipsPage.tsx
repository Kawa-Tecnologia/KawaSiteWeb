import React from 'react';
import '../assets/styles/Tips.css'; // Arquivo CSS para estilização
import Navigation from '../components/Navigation';

function TipsPage() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={require('../assets/images/kawa.jpg')}
            alt="Kawa Tecnologia"
          />
        </div>
        <Navigation />
      </header>
      <div className="tips">
        <h1>Antes de solicitar o serviço, saiba disso:</h1>
        <div className="card">
          <h2>Planejamento de Website</h2>
          <p>
            - Defina o Propósito do Site: Antes de começar a construir, determine claramente o objetivo do seu site. Ele será um blog, um portfólio, um site institucional, uma loja virtual, ou algo mais? <br />
            - Identifique seu Público-Alvo: Conheça o seu público-alvo e suas necessidades. Isso ajudará a criar conteúdo e funcionalidades relevantes para eles. <br />
            - Escolha a Plataforma Certa: Decida qual plataforma atenderá melhor às suas necessidades. Opções populares incluem WordPress, Wix, Shopify (para lojas virtuais) e Squarespace. <br />
            - Design Responsivo: Certifique-se de que o design do seu site seja responsivo, ou seja, que seja adaptável a diferentes dispositivos (desktops, tablets, smartphones). <br />
            - SEO Amigável: Integre técnicas de SEO desde o início para garantir que seu site seja facilmente encontrado nos motores de busca. <br />
            - Facilidade de Navegação: Planeje uma estrutura de navegação intuitiva para que os visitantes encontrem facilmente o que estão procurando. <br />
            - Chamada para Ação (CTA): Inclua chamadas para ação claras em seu site para incentivar os visitantes a realizar ações específicas, como fazer uma compra, entrar em contato ou se inscrever em uma newsletter.
          </p>
        </div>
        <div className="card">
          <h2>Planejamento de Loja Virtual</h2>
          <p>
            - Identifique seu Nicho de Mercado: Escolha um nicho específico para sua loja virtual e pesquise a concorrência para identificar oportunidades únicas. <br />
            - Escolha a Plataforma de E-Commerce: Existem várias plataformas de e-commerce disponíveis, como Shopify, WooCommerce (para WordPress) e Magento. Escolha aquela que melhor atenda às suas necessidades e orçamento. <br />
            - Organize seu Catálogo de Produtos: Categorize seus produtos de forma lógica e intuitiva para facilitar a navegação dos clientes. <br />
            - Configure Métodos de Pagamento e Entrega: Ofereça várias opções de pagamento e configure métodos de entrega eficientes para garantir uma boa experiência de compra. <br />
            - Invista em Fotografia de Produtos: Fotos de alta qualidade são essenciais para destacar seus produtos e atrair clientes. <br />
            - Atendimento ao Cliente: Planeje como será o atendimento ao cliente, seja por meio de chat online, e-mail ou telefone, e garanta que seja eficiente e responsivo. <br />
            - Promoção e Marketing: Desenvolva estratégias de marketing digital para promover sua loja virtual e atrair tráfego qualificado.
          </p>
        </div>
        <div className="card">
          <h2>Planejamento de Software</h2>
          <p>
            Identifique suas Necessidades: Liste as necessidades específicas da sua empresa que podem ser atendidas por software, como gestão de estoque, finanças, CRM (Customer Relationship Management) etc. <br />
            - Pesquise Soluções Disponíveis: Pesquise as opções disponíveis no mercado e compare suas características, custos e avaliações de usuários. <br />
            - Analise o Custo-Benefício: Considere não apenas o custo inicial do software, mas também os custos de implementação, treinamento e manutenção a longo prazo. <br />
            - Teste a Usabilidade: Antes de tomar uma decisão final, teste a usabilidade do software para garantir que seja intuitivo e fácil de usar para os funcionários da sua empresa. <br />
            - Integração com Sistemas Existentes: Verifique se o software pode ser integrado com os sistemas existentes da sua empresa para garantir uma transição suave e eficiente. <br />
            - Suporte e Atualizações: Certifique-se de que o fornecedor ofereça suporte técnico confiável e atualizações regulares do software para manter a segurança e a funcionalidade.
          </p>
        </div>
        <div className="card">
          <h2>Planejamento de Robô para Tarefas Rotineiras</h2>
          <p>
            Veja como utilizar robôs para automatizar tarefas repetitivas e melhorar a eficiência do seu negócio.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TipsPage;