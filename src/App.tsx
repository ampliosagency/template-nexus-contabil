import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Menu, 
  X, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  TrendingUp, 
  FileText,
  ArrowUpRight,
  Quote,
  CheckCircle2
} from 'lucide-react';

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Início', href: '#inicio'},
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Depoimentos', href: '#depoimentos' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (!isHome) {
      window.location.href = '/' + id;
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || !isHome ? 'bg-white shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-royal-blue rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${scrolled || !isHome ? 'text-royal-blue' : 'text-white'}`}>
            A&J<span className="text-accent-blue">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {isHome ? navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.href)}
              className={`font-semibold text-xs uppercase tracking-widest transition-all hover:text-accent-blue relative group ${scrolled ? 'text-deep-black' : 'text-white'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all duration-300 group-hover:w-full"></span>
            </button>
          )) : (
            <Link to="/" className="font-semibold text-xs uppercase tracking-widest text-deep-black hover:text-accent-blue">Voltar ao Início</Link>
          )}
          <button 
            className="bg-royal-blue text-white px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-blue-800 transition-all"
          >
            Fale Conosco
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled || !isHome ? 'text-deep-black' : 'text-white'} /> : <Menu className={scrolled || !isHome ? 'text-deep-black' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {isHome ? navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-xl font-bold text-deep-black hover:text-royal-blue transition-colors"
                >
                  {link.name}
                </button>
              )) : (
                <Link to="/" className="text-xl font-bold text-deep-black">Início</Link>
              )}
              <button 
                className="bg-royal-blue text-white px-6 py-3 rounded-md font-bold text-center text-sm uppercase tracking-widest"
              >
                Fale Conosco
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-deep-black text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-royal-blue rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              A&J Assessoria Contábil<span className="text-accent-blue">.</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/5 text-gray-500 text-sm">
          <div className="space-y-2">
            <p>© {new Date().getFullYear()} A&J Assessoria Contábil</p>
            <p>
              Desenvolvido por{' '}
              <a
                href="https://agenciaamplios.com.br"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white hover:text-accent-blue transition-colors"
              >
                Agência Amplios
              </a>
            </p>
          </div>
          <div className="flex md:justify-end gap-8">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Landing Page Sections ---

const LandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const services = [
    { title: "Fiscal & Tributário", desc: "Planejamento estratégico para redução legal de impostos.", icon: FileText },
    { title: "Gestão de Pessoas", desc: "Processamento de folha e consultoria trabalhista.", icon: Users },
    { title: "Consultoria 360", desc: "Análise profunda de indicadores e suporte estratégico.", icon: BarChart3 },
    { title: "Legalização", desc: "Abertura e regularização societária ágil.", icon: Briefcase },
    { title: "BPO Financeiro", desc: "Terceirização completa da gestão financeira.", icon: TrendingUp },
    { title: "Auditoria", desc: "Revisão de processos e demonstrações contábeis.", icon: ShieldCheck }
  ];

  const testimonials = [
    { name: "Roberto Silva", company: "TechFlow Solutions", text: "A A&J Assessoria Contábil transformou nossa contabilidade. A agilidade digital deles é incomparável." },
    { name: "Mariana Costa", company: "Studio M", text: "Finalmente uma contabilidade que fala a língua do empreendedor moderno. Recomendo muito!" },
    { name: "Carlos Eduardo", company: "Logística Express", text: "O planejamento tributário da A&J Assessoria Contábil nos economizou 20% em impostos no primeiro ano." }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center overflow-hidden bg-deep-black">
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Building" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-deep-black"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-accent-blue px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/10">
                Contabilidade Estratégica & Digital
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight"
            >
              Inteligência contábil <br />
              para o seu <span className="text-accent-blue">negócio.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl font-normal"
            >
              Soluções corporativas modernas para empresas que buscam segurança, 
              eficiência e crescimento sustentável no ambiente digital.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button onClick={() => document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-royal-blue text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                Nossos Serviços <ArrowUpRight className="w-5 h-5" />
              </button>
              <button onClick={() => document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold text-base hover:bg-white/20 transition-all text-center">
                Sobre a A&J Assessoria Contábil
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Tecnologia", desc: "Processos 100% digitais e integrados para maior agilidade.", icon: TrendingUp },
              { title: "Estratégia", desc: "Foco real no aumento da sua lucratividade e redução de custos.", icon: BarChart3 },
              { title: "Segurança", desc: "Conformidade total com as normas e transparência absoluta.", icon: ShieldCheck }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-12 h-12 bg-royal-blue/10 rounded-lg flex items-center justify-center text-royal-blue">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-24 bg-soft-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: "15+", label: "Anos de Mercado" },
              { val: "500+", label: "Clientes Ativos" },
              { val: "98%", label: "Satisfação" },
              { val: "24h", label: "Suporte Digital" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-royal-blue mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 bg-white overflow-hidden" ref={aboutRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isAboutInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1 }}
                className="relative z-10 aspect-video overflow-hidden rounded-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Office" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-royal-blue/20 rounded-2xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <h2 className="text-royal-blue text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-8 h-px bg-royal-blue"></span> Nossa História
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                Compromisso com a <br />
                <span className="text-royal-blue font-extrabold">Excelência.</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                A  A&J Assessoria Contábil nasceu para oferecer um serviço contábil que fosse além do cumprimento de obrigações fiscais. 
                Acreditamos que a contabilidade deve ser o braço direito do empreendedor.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-royal-blue">Missão</h4>
                  <p className="text-sm text-gray-500">Transformar dados em inteligência estratégica.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-royal-blue">Valores</h4>
                  <p className="text-sm text-gray-500">Ética, inovação e foco no resultado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 bg-soft-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-royal-blue text-white p-12 md:p-20 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-accent-blue">Nossa Metodologia</h2>
                <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Contabilidade Digital de Alta Performance.</h3>
                <p className="text-lg text-blue-100/80 leading-relaxed mb-8">
                  Não somos apenas processadores de guias. Utilizamos análise de dados e automação para 
                  antecipar problemas e identificar oportunidades.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10">Paperless</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10">Real-time Data</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10">Cloud Based</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">Agilidade</div>
                  <div className="text-sm text-blue-100/60">Respostas em até 4h úteis.</div>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-2">Precisão</div>
                  <div className="text-sm text-blue-100/60">Conferência automatizada.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <h2 className="text-royal-blue text-xs font-bold uppercase tracking-[0.2em] mb-4">Serviços</h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Soluções integradas <br />
              <span className="text-royal-blue">e eficientes.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="p-8 bg-soft-white rounded-2xl border border-gray-100 hover:border-royal-blue/30 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-royal-blue/10 rounded-lg flex items-center justify-center text-royal-blue mb-6 group-hover:bg-royal-blue group-hover:text-white transition-all">
                  <service.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-royal-blue text-xs font-bold cursor-pointer">
                  <span>Saiba Mais</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-32 bg-soft-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-royal-blue text-xs font-bold uppercase tracking-[0.2em] mb-4">Depoimentos</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">O que nossos <span className="text-royal-blue">clientes</span> dizem.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm relative">
                <Quote className="text-royal-blue/10 w-12 h-12 absolute top-6 right-6" />
                <p className="text-gray-600 italic mb-8 relative z-10">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-deep-black">{t.name}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-royal-blue text-xs font-bold uppercase tracking-[0.2em] mb-4">FAQ</h2>
              <h3 className="text-3xl font-bold tracking-tight">Dúvidas Frequentes</h3>
            </div>
            <div className="space-y-6">
              {[
                { q: "Como funciona a migração para a A&J Assessoria Contábil?", a: "É simples. Nós cuidamos de todo o processo de transição com seu contador atual, sem interrupções no seu negócio." },
                { q: "Quais sistemas vocês utilizam?", a: "Trabalhamos com as principais plataformas ERP do mercado e possuímos integração direta via API para automação total." },
                { q: "Atendem empresas de quais regimes tributários?", a: "Atendemos Simples Nacional, Lucro Presumido e Lucro Real, com especialistas dedicados para cada regime." }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 bg-soft-white rounded-xl border border-gray-100">
                  <h4 className="font-bold mb-2 text-royal-blue">{faq.q}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// --- Legal Pages ---

const PrivacyPolicy = () => {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-royal-blue">Política de Privacidade (LGPD)</h1>
        <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
          <p>A A&J Assessoria Contábil Contabilidade está comprometida com a proteção de seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>
          
          <h2 className="text-xl font-bold text-deep-black pt-4">1. Coleta de Dados</h2>
          <p>Coletamos apenas os dados necessários para a prestação de nossos serviços contábeis e para o contato comercial, como nome, e-mail e dados da empresa.</p>
          
          <h2 className="text-xl font-bold text-deep-black pt-4">2. Finalidade do Tratamento</h2>
          <p>Seus dados são utilizados exclusivamente para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Execução de contratos de prestação de serviços contábeis;</li>
            <li>Cumprimento de obrigações legais e fiscais;</li>
            <li>Comunicação sobre atualizações legislativas e serviços.</li>
          </ul>

          <h2 className="text-xl font-bold text-deep-black pt-4">3. Seus Direitos</h2>
          <p>Como titular dos dados, você tem direito a confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou desatualizados e solicitar a anonimização ou eliminação de dados desnecessários.</p>
          
          <h2 className="text-xl font-bold text-deep-black pt-4">4. Segurança</h2>
          <p>Implementamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda ou alteração.</p>
        </div>
      </div>
    </main>
  );
};

const TermsOfUse = () => {
  return (
    <main className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-royal-blue">Termos de Uso</h1>
        <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
          <p>Ao acessar o site da A&J Assessoria Contábil, você concorda em cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis.</p>
          
          <h2 className="text-xl font-bold text-deep-black pt-4">1. Uso de Licença</h2>
          <p>É concedida permissão para baixar temporariamente uma cópia dos materiais no site da A&J Assessoria Contábil apenas para visualização transitória pessoal e não comercial.</p>
          
          <h2 className="text-xl font-bold text-deep-black pt-4">2. Isenção de Responsabilidade</h2>
          <p>Os materiais no site da A&J Assessoria Contábil são fornecidos 'como estão'. A A&J não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias.</p>

          <h2 className="text-xl font-bold text-deep-black pt-4">3. Limitações</h2>
          <p>Em nenhum caso a A&J Assessoria Contábil ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais no site.</p>
          
          <h2 className="text-xl font-bold text-deep-black pt-4">4. Lei Aplicável</h2>
          <p>Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
        </div>
      </div>
    </main>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen selection:bg-royal-blue selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos" element={<TermsOfUse />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
