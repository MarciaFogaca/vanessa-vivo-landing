

import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import {

  ArrowDown,

  ArrowRight,

  ArrowUpRight,

  Check,

  Cloud,

  Headphones,

  Menu,

  MessageCircle,

  Network,

  ShieldCheck,

  Smartphone,

  Sparkles,

  Wifi,

  X,

  Zap,

  Send,

} from 'lucide-react'

import GlobeNetwork from './components/GlobeNetwork'

const WHATSAPP_NUMBER = '5521978826474'

const solutions = [

  {

    title: 'Telefonia móvel',

    description: 'Mobilidade para equipes que precisam estar conectadas em qualquer lugar.',

    icon: Smartphone,

  },

  {

    title: 'Internet empresarial',

    description: 'Conectividade para manter sua operação funcionando com confiança.',

    icon: Wifi,

  },

  {

    title: 'Telefonia fixa',

    description: 'Comunicação profissional para o dia a dia da sua empresa.',

    icon: Headphones,

  },

  {

    title: 'PABX e comunicação',

    description: 'Recursos para organizar e otimizar a comunicação corporativa.',

    icon: Network,

  },

  {

    title: 'Soluções digitais e cloud',

    description: 'Serviços digitais para apoiar a evolução da sua operação.',

    icon: Cloud,

  },

  {

    title: 'Segurança digital',

    description: 'Soluções para apoiar a proteção do ambiente digital da empresa.',

    icon: ShieldCheck,

  },

  {

    title: 'IoT e conectividade M2M',

    description: 'Conectividade entre dispositivos, máquinas e operações.',

    icon: Zap,

  },

  {

    title: 'Outros serviços e soluções',

    description: 'Vamos entender juntos quais soluções fazem sentido para seu negócio.',

    icon: Sparkles,

  },

]

function formatarCNPJ(valor: string): string {
  const numeros = valor.replace(/\D/g, '').slice(0, 14)
  return numeros
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

function validarCNPJ(valor: string): boolean {

  const numeros = valor.replace(/\D/g, '')

  if (numeros.length !== 14 || /^(\d)\1{13}$/.test(numeros)) return false

  const digito = (base: string): number => {

    let peso = base.length - 7

    let soma = 0

    for (const numero of base) {

      soma += Number(numero) * peso

      peso = peso === 2 ? 9 : peso - 1

    }

    const resto = soma % 11

    return resto < 2 ? 0 : 11 - resto

  }

  return digito(numeros.slice(0, 12)) === Number(numeros[12]) &&

    digito(numeros.slice(0, 13)) === Number(numeros[13])

}

const schema = z.object({

  name: z.string().min(2, 'Informe seu nome.'),

  company: z.string().min(2, 'Informe o nome da empresa.'),

  cnpj: z.string().min(1, 'Informe o CNPJ da empresa.').refine(validarCNPJ, 'Informe um CNPJ válido.'),

  phone: z.string().min(10, 'Informe um telefone com DDD.'),

  email: z.email('Informe um e-mail válido.').or(z.literal('')),

  interest: z.string().min(1, 'Selecione uma solução de interesse.'),

  message: z.string().optional(),

  consent: z.literal(true, {

    error: 'Precisamos do seu consentimento para continuar.',

  }),

})

type FormData = z.infer<typeof schema>

function whatsappLink(message: string) {

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

}

function App() {

  const [menuOpen, setMenuOpen] = useState(false)

  const [toast, setToast] = useState<'ready' | 'blocked' | null>(null)
  const [pendingWhatsappUrl, setPendingWhatsappUrl] = useState('')
  const [footerVisible, setFooterVisible] = useState(false)

  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const footer = document.querySelector('.site-footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting)
    }, { threshold: 0 })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 6500)
    return () => window.clearTimeout(timer)
  }, [toast])


  useEffect(() => {

    const updateActiveSection = () => {

      const sections = ['solucoes', 'diferenciais', 'sobre']

      let current = ''

      for (const id of sections) {

        const section = document.getElementById(id)

        if (section && section.getBoundingClientRect().top <= 150) {

          current = id

        }

      }

      setActiveSection(current)

    }

    updateActiveSection()

    window.addEventListener('scroll', updateActiveSection, { passive: true })

    window.addEventListener('resize', updateActiveSection)

    return () => {

      window.removeEventListener('scroll', updateActiveSection)

      window.removeEventListener('resize', updateActiveSection)

    }

  }, [])

  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting },

    reset,

  } = useForm<FormData>({

    resolver: zodResolver(schema),

  })

  const cnpjField = register('cnpj')

  const onSubmit = (data: FormData) => {

    const message = [

      'Olá, Vanessa! Gostaria de conversar sobre soluções Vivo Empresas.',

      '',

      `Nome: ${data.name}`,

      `Empresa: ${data.company}`,

      `CNPJ: ${data.cnpj}`,

      `Telefone: ${data.phone}`,

      data.email ? `E-mail: ${data.email}` : '',

      `Interesse: ${data.interest}`,

      data.message ? `Mensagem: ${data.message}` : '',

    ]

      .filter(Boolean)

      .join('\n')

    const url = whatsappLink(message)
    // Abrir uma aba vazia no gesto do usuário permite detectar bloqueios.
    const popup = window.open('', '_blank')
    if (popup) {
      popup.opener = null
      popup.location.href = url
      setPendingWhatsappUrl('')
      setToast('ready')
      reset()
    } else {
      setPendingWhatsappUrl(url)
      setToast('blocked')
      // Preservar o formulário para o usuário tentar novamente.
    }

  }

  const closeMenu = () => setMenuOpen(false)

  return (

    <div className="site-shell">

      {/* CABEÇALHO */}

      <header className="site-header">

        <a

          className="brand"

          href="#inicio"

          aria-label="Vanessa Vivo Empresas - início"

          onClick={closeMenu}

        >

          <span className="brand-copy">

            <strong>VANESSA DE MENDONÇA</strong>

            <small>EXECUTIVA B2B</small>

          </span>

        </a>

        <button

          className="mobile-menu-button"

          onClick={() => setMenuOpen(!menuOpen)}

          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}

          aria-expanded={menuOpen}

        >

          {menuOpen ? <X /> : <Menu />}

        </button>

        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>

          <a href="#solucoes" className={activeSection === 'solucoes' ? 'active' : undefined} aria-current={activeSection === 'solucoes' ? 'location' : undefined} onClick={closeMenu}>Soluções</a>

          <a href="#diferenciais" className={activeSection === 'diferenciais' ? 'active' : undefined} aria-current={activeSection === 'diferenciais' ? 'location' : undefined} onClick={closeMenu}>Diferenciais</a>

          <a href="#sobre" className={activeSection === 'sobre' ? 'active' : undefined} aria-current={activeSection === 'sobre' ? 'location' : undefined} onClick={closeMenu}>Sobre</a>

        </nav>

      </header>

      <main>

        {/* HERO */}

        <section className="hero-section" id="inicio">

          <div className="hero-orb orb-one" />

          <div className="hero-orb orb-two" />

          <div className="hero-content">

            <span className="eyebrow">

              <span className="eyebrow-dot" />

              CONECTIVIDADE PARA NEGÓCIOS

            </span>

            <h1>

              Sua empresa merece uma conexão{' '}

              <span>à altura dos seus negócios.</span>

            </h1>

            <p className="hero-lead">

              Tecnologia, mobilidade e conectividade para acompanhar o ritmo

              da sua empresa — com atendimento próximo e consultivo.

            </p>

            <div className="hero-proof">

              <span className="proof-line" />

              Atendimento para pequenas, médias e grandes empresas

            </div>

            <div className="hero-actions">

              <a

                className="button button-primary"

                href={whatsappLink(

                  'Olá, Vanessa! Gostaria de conhecer as soluções Vivo Empresas para minha empresa.'

                )}

                target="_blank"

                rel="noreferrer"

              >

                Converse com Vanessa <ArrowUpRight size={18} />

              </a>

              <a className="text-link" href="#solucoes">

                Conheça as soluções <ArrowDown size={16} />

              </a>

            </div>

          </div>

{/* GLOBO 3D — TERRA DIGITAL COM CONTINENTES */}

<div

  className="hero-visual"

  aria-label="Globo terrestre 3D com continentes e conexões digitais"

>

  <GlobeNetwork />

</div>

          <div className="hero-bottom">

          </div>

        </section>

        {/* INTRODUÇÃO */}

        <section className="intro-strip">

          <p>

            Mais do que conectar dispositivos,{' '}

            <strong>conectamos oportunidades.</strong>

          </p>

          <span> ATENDIMENTO CONSULTIVO

          </span>

        </section>

        {/* SOLUÇÕES */}

        <section className="section solutions-section" id="solucoes">

          <div className="section-heading">

            <div>

              <span className="eyebrow eyebrow-purple">

                SOLUÇÕES EMPRESARIAIS

              </span>

              <h2>

                Tecnologia para cada etapa <em>do seu negócio.</em>

              </h2>

            </div>

            <p>

              Um portfólio de soluções para apoiar a comunicação,

              a produtividade e a evolução da sua empresa.

            </p>

          </div>

          <div className="solutions-grid">

            {solutions.map(({ title, description, icon: Icon }, index) => (

              <article className="solution-card" key={title}>

                <div className="card-top">

                  <span className="card-index">0{index + 1}</span>

                  <Icon size={24} strokeWidth={1.5} />

                </div>

                <h3>{title}</h3>

                <p>{description}</p>

                <a href="#contato" aria-label={`Consultar sobre ${title}`}>

                  Saiba mais <ArrowUpRight size={16} />

                </a>

              </article>

            ))}

          </div>

          <p className="section-footnote">

            A disponibilidade e as condições das soluções dependem de análise

            de cobertura, perfil e elegibilidade de cada empresa.

          </p>

        </section>

{/* DIFERENCIAIS */}

<section className="benefits-section" id="diferenciais">

  {/* IMAGEM DE CONSULTORIA B2B */}

  <div className="benefits-art benefits-art-image">

    <img

      src="/images/consultoria-b2b.png"

      alt="Notebook com painéis digitais representando conectividade, tecnologia e soluções empresariais"

      className="benefits-image"

      loading="lazy"

    />

  </div>

  {/* TEXTO DA SEÇÃO */}

  <div className="benefits-copy">

    <span className="eyebrow">

      UMA PARCERIA QUE ENTENDE SEU NEGÓCIO

    </span>

    <h2>

      Não existe solução ideal sem entender{' '}

      <em>o que sua empresa precisa.</em>

    </h2>

    <p>

      O atendimento começa com uma conversa sobre sua operação,

      seus desafios e seus objetivos. A partir daí, avaliamos as

      possibilidades do portfólio Vivo Empresas.

    </p>

    <ul>

      <li>

        <Check size={18} />

        Escuta e entendimento das necessidades

      </li>

      <li>

        <Check size={18} />

        Orientação sobre soluções disponíveis

      </li>

      <li>

        <Check size={18} />

        Acompanhamento durante o atendimento comercial

      </li>

    </ul>

    <a className="button button-dark" href="#contato">

      Vamos conversar <ArrowRight size={17} />

    </a>

  </div>

</section>

{/* SOBRE VANESSA */}

<section className="about-section section" id="sobre">

  <div className="about-copy">

    <span className="eyebrow eyebrow-purple">

      SUA EXECUTIVA DE CONTAS

    </span>

    <h2>

      Relacionamento próximo.{' '}

      <em>Soluções com propósito.</em>

    </h2>

    <p className="about-intro">

      Olá, sou <strong>Vanessa de Mendonça</strong>,

      profissional com mais de <strong>15 anos de experiência

      no setor de telecomunicações</strong>, sendo

      <strong> 12 anos dedicados às soluções Vivo Empresas.</strong>

    </p>

    <p>

      Ao longo dessa trajetória, construí minha experiência

      no mercado B2B, atuando no relacionamento com empresas

      e na identificação de soluções de comunicação,

      mobilidade e conectividade alinhadas às necessidades

      de cada negócio.

    </p>

    <p>

      Acredito que um bom atendimento vai muito além de

      apresentar produtos. É preciso ouvir, compreender

      os desafios de cada empresa e oferecer uma orientação

      clara, estratégica e personalizada.

    </p>

    <p>

      Minha experiência com o portfólio Vivo Empresas me

      permite apoiar clientes na avaliação de soluções

      que contribuam para a produtividade, a comunicação

      e a evolução de suas operações.

    </p>

    <p className="about-highlight">

      Mais do que oferecer conectividade, meu compromisso

      é construir relacionamentos de confiança e ajudar

      empresas a encontrar soluções que façam sentido

      para seus negócios.

    </p>

    <p className="about-closing">

  Conte comigo para iniciar uma conversa e avaliar as

  possibilidades para o seu negócio!

</p>

    <a

      className="text-link purple-link"

      href={whatsappLink(

        'Olá, Vanessa! Gostaria de conversar sobre soluções para minha empresa.'

      )}

      target="_blank"

      rel="noreferrer"

    >

      Fale diretamente comigo

      <ArrowUpRight size={17} />

    </a>

  </div>

  <div className="about-visual">

  <div className="portrait-placeholder">

    <div className="portrait-frame">

      <img

        src="/images/vanessa-foto.jpg"

        alt="Vanessa de Mendonça, executiva de contas"

        className="vanessa-photo"

        loading="lazy"

      />

    </div>

  </div>

</div>

</section>

        {/* PROCESSO */}

        <section className="process-section">

          <div className="section-heading centered">

            <span className="eyebrow">

              SIMPLES, PRÓXIMO E OBJETIVO

            </span>

            <h2>

              Do primeiro contato à <em>solução.</em>

            </h2>

          </div>

          <div className="process-grid">

            <div className="process-item">

              <span>01</span>

              <h3>Você conta</h3>

              <p>

                Compartilhe um pouco sobre sua empresa e o que precisa.

              </p>

            </div>

            <div className="process-item">

              <span>02</span>

              <h3>Vamos avaliar</h3>

              <p>

                Conversamos sobre as alternativas disponíveis para seu cenário.

              </p>

            </div>

            <div className="process-item">

              <span>03</span>

              <h3>Seguimos juntos</h3>

              <p>

                Você recebe orientação para dar continuidade ao atendimento e fechar a melhor solução.

              </p>

            </div>

          </div>

        </section>

        {/* CONTATO */}

        <section className="contact-section" id="contato">

          <div className="contact-copy">

            <span className="eyebrow">VAMOS CONVERSAR?</span>

            <h2>

              O próximo passo para conectar sua empresa{' '}

              <em>começa aqui.</em>

            </h2>

            <p>

              Preencha seus dados e envie sua solicitação pelo WhatsApp.

              Darei continuidade ao seu atendimento.

            </p>

            <a

              className="contact-whatsapp"

              href={whatsappLink(

                'Olá, Vanessa! Vim pela landing page e gostaria de conhecer as soluções Vivo Empresas.'

              )}

              target="_blank"

              rel="noreferrer"

            >

              <MessageCircle size={20} />

              (21) 97882-6474

              <ArrowUpRight size={17} />

            </a>

            <small>

              Atendimento comercial para empresas em todo o Brasil.

            </small>

          </div>

          <form

            className="contact-form"

            onSubmit={handleSubmit(onSubmit)}

          >

            <div className="form-heading">

              <span>FALE COM VANESSA</span>

              <p>Conte um pouco sobre sua empresa.</p>

            </div>

            <label>

              Seu nome

              <input

                {...register('name')}

                placeholder="Como podemos chamar você?"

              />

              {errors.name && (

                <small className="field-error">

                  {errors.name.message}

                </small>

              )}

            </label>

            <label>

              Nome da empresa

              <input {...register('company')} placeholder="Empresa" />

              {errors.company && (

                <small className="field-error">

                  {errors.company.message}

                </small>

              )}

            </label>

            <label>

              CNPJ da empresa (obrigatório)

              <input

                {...cnpjField}

                inputMode="numeric"

                placeholder="00.000.000/0000-00"

                maxLength={18}

                required

                onChange={(event) => {

                  event.target.value = formatarCNPJ(event.target.value)

                  void cnpjField.onChange(event)

                }}

              />

              {errors.cnpj && (

                <small className="field-error">

                  {errors.cnpj.message}

                </small>

              )}

            </label>

            <div className="form-row">

              <label>

                Telefone

                <input

                  {...register('phone')}

                  placeholder="(00) 00000-0000"

                />

                {errors.phone && (

                  <small className="field-error">

                    {errors.phone.message}

                  </small>

                )}

              </label>

              <label>

                E-mail <span>(opcional)</span>

                <input

                  {...register('email')}

                  placeholder="voce@empresa.com"

                />

                {errors.email && (

                  <small className="field-error">

                    {errors.email.message}

                  </small>

                )}

              </label>

            </div>

            <label>

              Solução de interesse

              <select {...register('interest')} defaultValue="">

                <option value="" disabled>

                  Selecione uma opção

                </option>

                {solutions.map((solution) => (

                  <option key={solution.title} value={solution.title}>

                    {solution.title}

                  </option>

                ))}

              </select>

              {errors.interest && (

                <small className="field-error">

                  {errors.interest.message}

                </small>

              )}

            </label>

            <label>

              Como podemos ajudar? <span>(opcional)</span>

              <textarea

                {...register('message')}

                rows={3}

                placeholder="Conte brevemente o que sua empresa procura..."

              />

            </label>

            <label className="consent">

              <input type="checkbox" {...register('consent')} />

              <span>

                Autorizo o contato para tratar desta solicitação e declaro

                que li o aviso de privacidade.

              </span>

            </label>

            {errors.consent && (

              <small className="field-error">

                {errors.consent.message}

              </small>

            )}

            <button

              className="button button-primary form-submit"

              type="submit"

              disabled={isSubmitting}

            >

              <Send size={17} />

              Enviar pelo WhatsApp

              <ArrowUpRight size={17} />

            </button>

            <small className="privacy-note">

              Seus dados serão utilizados para dar retorno à sua solicitação.

              Este formulário não armazena informações em um banco de dados.

            </small>

          </form>

        </section>

      </main>

      {/* RODAPÉ */}

      <footer className="site-footer">

        <a className="brand footer-brand" href="#inicio">

          <span className="brand-copy">

            <strong>VANESSA DE MENDONÇA</strong>

          </span>

        </a>

        <p>

          Conectividade e soluções para negócios, com atendimento consultivo!

        </p>

        <div className="footer-bottom">

          <span>

            © {new Date().getFullYear()} Vanessa de Mendonça · Consultora comericial B2B - Telecon · Todos os Direitos Reservados

          </span>

          <span>

          Site de apresentação e atendimento profissional.

          </span>

        </div>

      </footer>

      {toast && (
        <div className={`form-toast form-toast--${toast}`} role="status" aria-live="polite">
          <div className="form-toast__icon" aria-hidden="true">
            {toast === 'ready' ? <Check size={20} /> : <MessageCircle size={20} />}
          </div>
          <div className="form-toast__content">
            <strong>{toast === 'ready' ? 'Solicitação preparada!' : 'O WhatsApp não abriu'}</strong>
            <p>{toast === 'ready'
              ? 'Seus dados foram preparados no WhatsApp. Toque em Enviar para concluir.'
              : 'Seus dados foram preservados. Use o link abaixo para continuar.'}</p>
            {toast === 'blocked' && pendingWhatsappUrl && (
              <a href={pendingWhatsappUrl} target="_blank" rel="noopener noreferrer">
                Abrir WhatsApp <ArrowUpRight size={15} />
              </a>
            )}
          </div>
          <button type="button" className="form-toast__close" aria-label="Fechar aviso" onClick={() => setToast(null)}>
            <X size={17} />
          </button>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}

      <a

        className={`floating-whatsapp ${footerVisible ? 'floating-whatsapp-hidden' : ''}`}

        href={whatsappLink(

          'Olá, Vanessa! Gostaria de conhecer as soluções Vivo Empresas.'

        )}

        target="_blank"

        rel="noreferrer"

        aria-label="Fale com Vanessa pelo WhatsApp"
        aria-hidden={footerVisible}
        tabIndex={footerVisible ? -1 : undefined}

      >

        <MessageCircle size={23} />

        <span>Fale com Vanessa</span>

      </a>

    </div>

  )

}

export default App