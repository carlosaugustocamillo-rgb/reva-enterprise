import ze from"https://esm.sh/react@18.2.0?dev";import{createRoot as Ha}from"https://esm.sh/react-dom@18.2.0/client?dev";import Ka from"https://esm.sh/htm@3.1.1?dev";import{createClient as Wa}from"https://esm.sh/@supabase/supabase-js@2.45.0?dev";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))o(u);new MutationObserver(u=>{for(const d of u)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function a(u){const d={};return u.integrity&&(d.integrity=u.integrity),u.referrerPolicy&&(d.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?d.credentials="include":u.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(u){if(u.ep)return;u.ep=!0;const d=a(u);fetch(u.href,d)}})();const{useState:I,useMemo:H,useCallback:L,useEffect:X,useRef:Ya}=ze,i=Ka.bind(ze.createElement),$a=window.__SUPABASE_URL__,ga=window.__SUPABASE_ANON_KEY__,F=!!($a&&ga),E=F?Wa($a,ga):null;F||console.warn("Supabase não configurado. Defina window.__SUPABASE_URL__ e window.__SUPABASE_ANON_KEY__ no index.html.");const ke=[{id:"assobrafir",name:"ASSOBRAFIR",segment:"Fisioterapia",plan:"Enterprise",status:"ativo",activeModules:["users","payments","events","communications","analytics"],comingSoon:["legal","science"],priority:"Alta adoção de eventos híbridos"},{id:"confisio",name:"Confisio Brasil",segment:"Conselho Profissional",plan:"Professional",status:"implementacao",activeModules:["users","governance","support"],comingSoon:["payments","analytics"],priority:"Migrar jurídico e comunicação"},{id:"rede_cientifica",name:"Rede Científica Integrada",segment:"Frente acadêmica",plan:"Prime",status:"piloto",activeModules:["users","science"],comingSoon:["events","communications","analytics"],priority:"Consolidar produções científicas"}],Xa=[{id:"users",name:"Usuários e Perfis",description:"Base única de cadastros, perfis e trilhas de permissão.",category:"Fundacional",availability:"always",focus:["Registro completo","Controle de acesso"]},{id:"payments",name:"Pagamentos e Financeiro",description:"Cobranças, conciliações, inadimplência e relatórios.",category:"Financeiro",availability:"plan_based",focus:["Anuidades","Eventos","Recorrência"]},{id:"events",name:"Eventos e Programação",description:"Gestão fim a fim de eventos científicos e institucionais.",category:"Programação",availability:"plan_based",focus:["Submissões","Grade científica"]},{id:"communications",name:"Comunicação e Marketing",description:"Conteúdos multicanal, campanhas e monitoramento de KPIs.",category:"Relacionamento",availability:"plan_based",focus:["Newsroom","Automação"]},{id:"legal",name:"Jurídico e Institucional",description:"Protocolos, pareceres e workflows sigilosos.",category:"Governança",availability:"advanced",focus:["Pareceres","Documentos oficiais"]},{id:"governance",name:"Administrativo e Governança",description:"Mandatos, atas, deliberações e continuidade institucional.",category:"Governança",availability:"always",focus:["Atas digitais","Comissões"]},{id:"science",name:"Produção Científica",description:"Diretrizes, consensos e notas técnicas centralizadas.",category:"Institucional",availability:"advanced",focus:["Versionamento","Integrações"]},{id:"support",name:"Atendimento e Suporte",description:"Canais de chamados, SLA e integrações com módulos.",category:"Operacional",availability:"plan_based",focus:["Filas","Automação"]},{id:"analytics",name:"Relatórios, BI e Auditoria",description:"Dashboards consolidados, logs e rastreabilidade.",category:"Insights",availability:"always",focus:["Dashboards","Auditoria"]}],Za=[{id:"seed-fer-tavares",tenantId:"assobrafir",fullName:"Fernanda Tavares",preferredName:"Fer Tavares",email:"fernanda.tavares@assobrafir.org",status:"ativo",category:"especialista",councilNumber:"CREFITO 3/123456-F",councilState:"SP",regional:"Sudeste",membershipType:"professional_annual",nationality:"Brasileira",gender:"Feminino",maritalStatus:"Solteira",documentId:"123.456.789-00",birthDate:"1989-04-02",addresses:[{id:"seed-address-fer",type:"Residencial",street:"Av. Paulista",number:"1000",city:"São Paulo",state:"SP",postalCode:"01310-100",isPrimary:!0}],contacts:[{id:"seed-contact-fer",type:"celular",countryCode:"+55",areaCode:"11",number:"988887777",label:"WhatsApp",isPrimary:!0}],education:[],specialties:[],titularities:[],roles:[],practices:[],contributions:[]},{id:"seed-ricardo-moreno",tenantId:"assobrafir",fullName:"Ricardo Moreno",preferredName:"Ricardo",email:"ricardo.moreno@assobrafir.org",status:"ativo",category:"efetivo",councilNumber:"CREFITO 4/654321-F",councilState:"MG",regional:"Sudeste",membershipType:"professional_monthly",nationality:"Brasileiro",gender:"Masculino",maritalStatus:"Casado",documentId:"987.654.321-00",birthDate:"1984-11-15",addresses:[],contacts:[],education:[],specialties:[],titularities:[],roles:[],practices:[],contributions:[]},{id:"seed-helena-prado",tenantId:"confisio",fullName:"Helena Prado",preferredName:"Helena",email:"helena.prado@confisio.org",status:"implementacao",category:"especialista",councilNumber:"CREFITO 2/789123-F",councilState:"RJ",regional:"Sudeste",membershipType:"professional_annual",nationality:"Brasileira",gender:"Feminino",maritalStatus:"Solteira",documentId:"102.938.475-11",birthDate:"1991-08-25",addresses:[],contacts:[],education:[],specialties:[],titularities:[],roles:[],practices:[],contributions:[]}],Da=[{id:"members",label:"Associados ativos",value:"18.420",variation:"+4,2% vs último mês",tone:"positive"},{id:"revenue",label:"Receita recorrente",value:"R$ 742 mil",variation:"+R$ 45 mil confirmados",tone:"neutral"},{id:"engagement",label:"Engajamento digital",value:"62%",variation:"Campanhas multi-canal ativas",tone:"info"}],et=[{id:"newTenant",label:"Novo tenant",variant:"primary"},{id:"configurePlan",label:"Configurar plano",variant:"ghost"},{id:"launchModule",label:"Liberar módulo",variant:"ghost"}];function at({tenants:e=[],selectedId:t,onChange:a}){if(!e.length)return i`<div className="tenant-switcher">Cadastre um tenant para começar</div>`;const o=e.find(u=>u.id===t);return i`
    <div className="tenant-switcher">
      <div className="tenant-switcher__label">Tenant em foco</div>
      <select
        className="tenant-switcher__select"
        aria-label="Selecionar tenant"
        value=${t??""}
        onChange=${u=>a==null?void 0:a(u.target.value)}
      >
        ${e.map(u=>i`<option key=${u.id} value=${u.id}>${u.name}</option>`)}
      </select>
      <span className="tenant-switcher__meta">${(o==null?void 0:o.plan)??""}</span>
    </div>
  `}const tt={primary:"quick-action--primary",ghost:"quick-action--ghost"};function st({actions:e=[],onAction:t}){return e.length?i`
    <div className="quick-actions">
      ${e.map(a=>{const o=["quick-action",tt[a.variant]??""].filter(Boolean).join(" ");return i`
          <button
            key=${a.id}
            type="button"
            className=${o}
            data-action=${a.id}
            disabled=${a.disabled}
            onClick=${()=>t==null?void 0:t(a.id)}
          >
            ${a.label}
          </button>
        `})}
    </div>
  `:null}function ot({title:e,subtitle:t,tenants:a,selectedTenantId:o,onTenantChange:u,actions:d,onAction:f}){return i`
    <header className="app-header">
      <div className="app-header__copy">
        <p className="app-header__eyebrow">Console global</p>
        <h1 className="app-header__title">${e}</h1>
        <p className="app-header__subtitle">${t}</p>
      </div>
      <div className="app-header__toolbar">
        <${at}
          tenants=${a}
          selectedId=${o}
          onChange=${u}
        />
        <${st} actions=${d} onAction=${f} />
      </div>
    </header>
  `}const nt={positive:"insight-card--positive",info:"insight-card--info"};function rt({cards:e=[]}){return e.length?i`
    <section className="insight-panel">
      ${e.map((t,a)=>{const o=["insight-card",nt[t.tone]??""].filter(Boolean).join(" ");return i`
          <article key=${t.id??`insight-${a}`} className=${o}>
            <p className="insight-card__label">${t.label}</p>
            <strong className="insight-card__value">${t.value}</strong>
            <span className="insight-card__variation">${t.variation}</span>
          </article>
        `})}
    </section>
  `:null}const it=[{id:"all",label:"Todos"},{id:"active",label:"Ativos"},{id:"planned",label:"Planejados"},{id:"locked",label:"Não contratados"}];function lt({activeFilter:e,onChange:t}){return i`
    <div className="module-filters">
      ${it.map(a=>{const u=["module-filter",a.id===e?"module-filter--active":""].filter(Boolean).join(" ");return i`
          <button
            key=${a.id}
            type="button"
            data-filter=${a.id}
            className=${u}
            onClick=${()=>t==null?void 0:t(a.id)}
          >
            ${a.label}
          </button>
        `})}
    </div>
  `}const ut={active:"Abrir painel",planned:"Planejar ativação",locked:"Ver planos"};function ct({module:e}){const t=e.focus??[],a=["status-badge",e.tone?`status-badge--${e.tone}`:""].filter(Boolean).join(" "),o=["module-card__action",e.status==="active"?"primary":"ghost"].filter(Boolean).join(" "),u=["module-card",e.status==="locked"?"module-card--muted":""].filter(Boolean).join(" "),d=e.statusLabel??"Status indefinido";return i`
    <article className=${u}>
      <div className="module-card__header">
        <div>
          <p className="module-card__category">${e.category}</p>
          <h3 className="module-card__title">${e.name}</h3>
        </div>
        <span className=${a}>${d}</span>
      </div>
      <p className="module-card__description">${e.description}</p>
      <ul className="module-card__focus">
        ${t.map(f=>i`<li key=${f}>${f}</li>`)}
      </ul>
      <button type="button" className=${o}>${ut[e.status]??"Ver detalhes"}</button>
    </article>
  `}function dt({modules:e=[]}){return e.length?i`
    <div className="module-grid">
      ${e.map(t=>i`<${ct} key=${t.id} module=${t} />`)}
    </div>
  `:i`
      <div className="module-grid__empty">
        Nenhum módulo encontrado para o filtro selecionado.
      </div>
    `}const pt=[{id:"activation",label:"Ativar módulos críticos",dependsOn:["payments","events"]},{id:"experience",label:"Escalar comunicação e atendimento",dependsOn:["communications","support"]},{id:"governance",label:"Liberar governança avançada",dependsOn:["legal","science"]}];function mt({tenant:e}){const t=(e==null?void 0:e.activeModules)??[],a=(e==null?void 0:e.comingSoon)??[],o=pt.map(u=>{const d=u.dependsOn.every(w=>t.includes(w)),f=!d&&u.dependsOn.every(w=>a.includes(w)),N=d?"done":f?"planned":"todo",$=d?"Pronto para monitorar resultados":f?"Planejamento em andamento":"Planeje a ativação dos módulos relacionados",_=["journey-item",`journey-item--${N}`].join(" ");return i`
      <li key=${u.id} className=${_}>
        <span className="journey-item__status"></span>
        <div>
          <p className="journey-item__label">${u.label}</p>
          <span className="journey-item__hint">${$}</span>
        </div>
      </li>
    `});return i`
    <section className="journey-panel">
      <div className="journey-panel__header">
        <h3>Próximas etapas</h3>
        <span className="journey-panel__tenant">${(e==null?void 0:e.priority)??"Configure prioridades"}</span>
      </div>
      <ul className="journey-list">${o}</ul>
    </section>
  `}function ft({tenant:e,modules:t=[]}){const a=t.filter(u=>u.status==="active").length,o=t.filter(u=>u.status==="planned").length;return i`
    <section className="tenant-summary">
      <div>
        <p className="tenant-summary__label">Plano</p>
        <strong className="tenant-summary__value">${(e==null?void 0:e.plan)??"N/D"}</strong>
      </div>
      <div>
        <p className="tenant-summary__label">Módulos ativos</p>
        <strong className="tenant-summary__value">${a}</strong>
      </div>
      <div>
        <p className="tenant-summary__label">Módulos planejados</p>
        <strong className="tenant-summary__value">${o}</strong>
      </div>
    </section>
  `}function bt({query:e,statusFilter:t,onQueryChange:a,onStatusChange:o}){return i`
    <div className="user-filters">
      <input
        className="user-filters__search"
        type="search"
        placeholder="Buscar por nome ou e-mail"
        value=${e}
        onInput=${u=>a==null?void 0:a(u.target.value)}
      />
      <select
        className="user-filters__status"
        value=${t}
        onChange=${u=>o==null?void 0:o(u.target.value)}
      >
        <option value="all">Todos os status</option>
        <option value="ativo">Ativos</option>
        <option value="implementacao">Em implementação</option>
        <option value="inativo">Inativos</option>
      </select>
    </div>
  `}const vt={ativo:"Ativo",implementacao:"Em implementação",inativo:"Inativo"};function $t({profiles:e=[],onEdit:t,canEditProfile:a}){return e.length?i`
    <div className="user-table__scroll">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tenant</th>
            <th>Categoria</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${e.map(o=>i`
              <tr key=${o.id}>
                <td>
                  <div className="user-table__name">
                    <strong>${o.fullName}</strong>
                    ${o.preferredName&&i`<span>${o.preferredName}</span>`}
                  </div>
                </td>
                <td>${o.email}</td>
                <td>${o.tenantName??"—"}</td>
                <td>${o.category??"—"}</td>
                <td>
                  <span className=${["status-pill",`status-pill--${o.status}`].join(" ")}>
                    ${vt[o.status]??o.status}
                  </span>
                </td>
                <td>
                  ${(()=>{const u=a?a(o):!0;return i`
                      <button
                        type="button"
                        className="ghost-button"
                        onClick=${()=>u&&(t==null?void 0:t(o.id))}
                        disabled=${!u}
                      >
                        Editar
                      </button>
                    `})()}
                </td>
              </tr>
            `)}
        </tbody>
      </table>
    </div>
  `:i`<p className="user-panel__empty">Nenhum perfil encontrado.</p>`}function ra({profiles:e,query:t,statusFilter:a,onQueryChange:o,onStatusChange:u,isSyncing:d,errorMessage:f,onCreate:N,onEdit:$,canCreate:_=!0,canEditProfile:w}){return i`
    <section className="user-panel card">
      <div className="panel-header">
        <div>
          <p className="panel-eyebrow">Usuários e Perfis</p>
          <h2 className="panel-title">Base integrada de pessoas</h2>
        </div>
        <div className="user-panel__actions">
          <${bt}
            query=${t}
            statusFilter=${a}
            onQueryChange=${o}
            onStatusChange=${u}
          />
          <button type="button" className="primary-button" onClick=${N} disabled=${!_}>
            Novo perfil
          </button>
        </div>
      </div>
      ${d&&i`<p className="data-feedback">Sincronizando perfis...</p>`}
      ${f&&i`<p className="data-feedback data-feedback--error">${f}</p>`}
      <${$t} profiles=${e} onEdit=${$} canEditProfile=${w} />
    </section>
  `}function gt({items:e,activeId:t,onChange:a}){return i`
    <nav className="module-workspace-nav">
      ${e.map(o=>{const d=["module-workspace-nav__item",o.id===t?"is-active":""].filter(Boolean).join(" ");return i`
          <button
            key=${o.id}
            type="button"
            className=${d}
            onClick=${()=>a(o.id)}
          >
            <span>${o.label}</span>
            ${o.description&&i`<small>${o.description}</small>`}
          </button>`})}
    </nav>
  `}const _t=[{id:"UEL",name:"Universidade Estadual de Londrina",uf:"PR"},{id:"USP",name:"Universidade de São Paulo",uf:"SP"},{id:"UNICAMP",name:"Universidade Estadual de Campinas",uf:"SP"},{id:"UNESP",name:"Universidade Estadual Paulista Júlio de Mesquita Filho",uf:"SP"},{id:"UFRJ",name:"Universidade Federal do Rio de Janeiro",uf:"RJ"},{id:"UFMG",name:"Universidade Federal de Minas Gerais",uf:"MG"},{id:"UFPR",name:"Universidade Federal do Paraná",uf:"PR"},{id:"UFSC",name:"Universidade Federal de Santa Catarina",uf:"SC"},{id:"UFBA",name:"Universidade Federal da Bahia",uf:"BA"},{id:"UFPE",name:"Universidade Federal de Pernambuco",uf:"PE"},{id:"UFRGS",name:"Universidade Federal do Rio Grande do Sul",uf:"RS"},{id:"UFPA",name:"Universidade Federal do Pará",uf:"PA"},{id:"UFC",name:"Universidade Federal do Ceará",uf:"CE"},{id:"UFMA",name:"Universidade Federal do Maranhão",uf:"MA"},{id:"UFPI",name:"Universidade Federal do Piauí",uf:"PI"},{id:"UFES",name:"Universidade Federal do Espírito Santo",uf:"ES"},{id:"UFRN",name:"Universidade Federal do Rio Grande do Norte",uf:"RN"},{id:"UFMS",name:"Universidade Federal de Mato Grosso do Sul",uf:"MS"},{id:"UFMT",name:"Universidade Federal de Mato Grosso",uf:"MT"},{id:"UNB",name:"Universidade de Brasília",uf:"DF"},{id:"UFAC",name:"Universidade Federal do Acre",uf:"AC"},{id:"UFAM",name:"Universidade Federal do Amazonas",uf:"AM"},{id:"UFAL",name:"Universidade Federal de Alagoas",uf:"AL"},{id:"UFPB",name:"Universidade Federal da Paraíba",uf:"PB"},{id:"UFSE",name:"Universidade Federal de Sergipe",uf:"SE"},{id:"UNOESTE",name:"Universidade do Oeste Paulista",uf:"SP"},{id:"PUCSP",name:"Pontifícia Universidade Católica de São Paulo",uf:"SP"},{id:"PUCRS",name:"Pontifícia Universidade Católica do Rio Grande do Sul",uf:"RS"},{id:"PUC/RIO",name:"Pontifícia Universidade Católica do Rio de Janeiro",uf:"RJ"},{id:"PUCPR",name:"Pontifícia Universidade Católica do Paraná",uf:"PR"},{id:"UNISA",name:"Universidade Santo Amaro",uf:"SP"},{id:"UNIP",name:"Universidade Paulista",uf:"SP"},{id:"UNIFESP",name:"Universidade Federal de São Paulo",uf:"SP"},{id:"UNIFEI",name:"Universidade Federal de Itajubá",uf:"MG"},{id:"UFOP",name:"Universidade Federal de Ouro Preto",uf:"MG"},{id:"UNIRIO",name:"Universidade Federal do Estado do Rio de Janeiro",uf:"RJ"},{id:"UFJF",name:"Universidade Federal de Juiz de Fora",uf:"MG"},{id:"UFPEL",name:"Universidade Federal de Pelotas",uf:"RS"},{id:"UFU",name:"Universidade Federal de Uberlândia",uf:"MG"},{id:"UFTM",name:"Universidade Federal do Triângulo Mineiro",uf:"MG"}];function yt(e,t=10){const a=e==null?void 0:e.trim().toLowerCase();return a?_t.filter(o=>o.name.toLowerCase().includes(a)||o.id.toLowerCase().includes(a)).slice(0,t):[]}const ht=[{id:"personal",label:"Dados Pessoais"},{id:"addresses",label:"Endereços"},{id:"contacts",label:"Telefones"},{id:"education",label:"Escolaridade"},{id:"practices",label:"Atuação"},{id:"specialties",label:"Especialidade (de acordo com o COFFITO)"},{id:"roles",label:"Cargos"},{id:"notes",label:"Outros"}],Nt=["Feminino","Masculino","Outro"],Pt=[{id:"residencial",label:"Residencial"},{id:"celular",label:"Celular"},{id:"trabalho",label:"Trabalho"}],wt=[{id:"professional",label:"Profissional"},{id:"student",label:"Estudante"}],St=[{id:"efetivo",label:"Efetivo"},{id:"especialista",label:"Especialista"},{id:"emerito",label:"Emérito"}],_a=[{id:"icu_adult",label:"Fisioterapia em Terapia Intensiva Adulto",value:"Fisioterapia em Terapia Intensiva Adulto"},{id:"respiratoria",label:"Fisioterapia Respiratória",value:"Fisioterapia Respiratória"},{id:"cardiovascular",label:"Fisioterapia Cardiovascular",value:"Fisioterapia Cardiovascular"},{id:"icu_pediatric",label:"Fisioterapia em Terapia Intensiva Pediátrica",value:"Fisioterapia em Terapia Intensiva Pediátrica"},{id:"icu_neonatal",label:"Fisioterapia em Terapia Intensiva Neonatal",value:"Fisioterapia em Terapia Intensiva Neonatal"},{id:"sleep",label:"Fisioterapia nos Distúrbios Respiratórios do Sono",value:"Fisioterapia nos Distúrbios respiratórios do Sono"},{id:"pediatric_cardioresp",label:"Fisioterapia Cardiorrespiratória Pediátrica",value:"Fisioterapia Cradiorrespiratória Pediátrica"},{id:"other",label:"Outra (especificar)",value:"other"}],Ct=new Set(_a.map(e=>e.value)),It=[{id:"respiratoria",label:"Fisioterapia Respiratória",value:"Fisioterapia Respiratória"},{id:"cardiovascular",label:"Fisioterapia Cardiovascular",value:"Fisioterapia Cardiovascular"},{id:"uti",label:"Fisioterapia em Terapia Intensiva",value:"Fisioterapia em Terapia Intensiva"},{id:"uti_ped",label:"Fisioterapia em Terapia Intensiva Pediátrica",value:"Fisioterapia em Terapia Intensiva Pediátrica"},{id:"uti_neonatal",label:"Fisioterapia em Terapia Intensiva Neonatal",value:"Fisioterapia em Terapia Intensiva Neonatal"},{id:"acupuntura",label:"Fisioterapia em Acupuntura",value:"Fisioterapia em Acupuntura"},{id:"aquatica",label:"Fisioterapia Aquática",value:"Fisioterapia Aquática"},{id:"dermatofuncional",label:"Fisioterapia Dermatofuncional",value:"Fisioterapia Dermatofuncional"},{id:"esportiva",label:"Fisioterapia Esportiva",value:"Fisioterapia Esportiva"},{id:"gerontologia",label:"Fisioterapia em Gerontologia",value:"Fisioterapia em Gerontologia"},{id:"trabalho",label:"Fisioterapia do Trabalho",value:"Fisioterapia do Trabalho"},{id:"neurofuncional",label:"Fisioterapia Neurofuncional",value:"Fisioterapia Neurofuncional"},{id:"oncologia",label:"Fisioterapia em Oncologia",value:"Fisioterapia em Oncologia"},{id:"reumatologia",label:"Fisioterapia em Reumatologia",value:"Fisioterapia em Reumatologia"},{id:"traumato",label:"Fisioterapia Traumato-Ortopédica",value:"Fisioterapia Traumato-Ortopédica"},{id:"saude_mulher",label:"Fisioterapia em Saúde da Mulher",value:"Fisioterapia em Saúde da Mulher"},{id:"osteopatia",label:"Fisioterapia em Osteopatia",value:"Fisioterapia em Osteopatia"},{id:"quiropraxia",label:"Fisioterapia em Quiropraxia",value:"Fisioterapia em Quiropraxia"}],Ft=["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"],Et=[{id:"br",label:"Brasileiro"},{id:"foreign",label:"Estrangeiro"}];function ia({tenants:e,initialData:t,onSubmit:a,onCancel:o,isSaving:u,error:d,lockedTenantId:f,canEditTenant:N=!0,canEditRole:$=!1}){const[_,w]=I("personal"),[S,k]=I(()=>la(t,e,f)),[q,C]=I(null),[A,T]=I({}),[l,U]=I({loadingIndex:null,error:null,errorIndex:null}),j=Ya(null);X(()=>{k(la(t,e,f))},[t,e,f]),X(()=>()=>{j.current&&clearTimeout(j.current)},[]);function s(p,b){p==="tenantId"&&!N||k(h=>({...h,[p]:b}))}function c(p,b,h,g){k(R=>({...R,[p]:R[p].map((D,v)=>v===b?{...D,[h]:g}:D)}))}function r(p,b){k(h=>({...h,addresses:h.addresses.map((g,R)=>R===p?{...g,...b}:g)}))}function re(p,b){k(h=>({...h,[p]:[...h[p],b]}))}function ye(p,b){k(h=>({...h,[p]:h[p].filter((g,R)=>R!==b)}))}function ue(p){var b;(b=p==null?void 0:p.preventDefault)==null||b.call(p),a==null||a(S)}function he(p){const b=At(p.target.value);p.target.value=b,s("documentId",b)}function V(p){const b=kt(p.target.value);p.target.value=b,s("councilNumber",b)}function M(p,b){c("education",p,"institution",b),j.current&&clearTimeout(j.current);const h=b.trim();if(!h||h.length<3){T(g=>({...g,[p]:[]})),U(g=>({...g,error:null,errorIndex:null}));return}j.current=setTimeout(()=>{fe(p,h)},400)}async function fe(p,b){try{U({loadingIndex:p,error:null,errorIndex:null});const h=await fetch(`https://emec.mec.gov.br/api/v1/ies?limit=10&termo=${encodeURIComponent(b)}`);if(!h.ok)throw new Error("Falha ao consultar MEC");const g=await h.json(),D=(Array.isArray(g)?g:(g==null?void 0:g.items)??(g==null?void 0:g.content)??(g==null?void 0:g.dados)??[]).map(v=>({id:(v==null?void 0:v.id)??(v==null?void 0:v.codigo)??(v==null?void 0:v.cod_ies)??(v==null?void 0:v.ies_id)??`${(v==null?void 0:v.nome)??v}`,name:(v==null?void 0:v.nome)??(v==null?void 0:v.nome_completo)??(v==null?void 0:v.nome_ies)??(v==null?void 0:v.instituicao)??(v==null?void 0:v.sigla)??"",uf:(v==null?void 0:v.uf)??(v==null?void 0:v.sigla_uf)??(v==null?void 0:v.estado)??""})).filter(v=>v.name);T(v=>({...v,[p]:D})),U({loadingIndex:null,error:null,errorIndex:null})}catch(h){console.error("Erro ao buscar instituições MEC",h);const g=yt(b);g.length?(T(R=>({...R,[p]:g})),U({loadingIndex:null,error:"Usando lista MEC offline (amostra).",errorIndex:null})):(T(R=>({...R,[p]:[]})),U({loadingIndex:null,error:"Não foi possível buscar instituições agora.",errorIndex:p}))}}function Z(p,b){c("education",p,"institution",(b==null?void 0:b.name)??""),b!=null&&b.uf&&c("education",p,"state",b.uf),T(h=>({...h,[p]:[]})),U(h=>({...h,error:null,errorIndex:null}))}function ie(p,b){var R;const h=((R=S.contacts[p])==null?void 0:R.type)??"celular",g=Rt(b,h);c("contacts",p,"number",g)}function Me(p,b){const h=Mt(b);c("addresses",p,"postalCode",h);const g=h.replace(/\D/g,"");g.length===8&&ce(p,g)}async function ce(p,b){try{const h=await fetch(`https://viacep.com.br/ws/${b}/json/`);if(!h.ok)return;const g=await h.json();if(g!=null&&g.erro)return;const R=g.logradouro??"";let D="",v=R;if(R.includes(" ")){const be=R.split(" ");D=be.shift(),v=be.join(" ")}r(p,{streetType:D,street:v,district:g.bairro??"",city:g.localidade??"",state:g.uf??""})}catch(h){console.error("Falha ao buscar CEP",h)}}function Re(p){const b=p.target.value;b==="br"?(s("nationalityType",b),s("nationality","Brasileiro"),s("foreignCountry","")):(s("nationalityType",b),s("nationality",S.foreignCountry||""))}function Ne(p){const b=p.target.value;s("foreignCountry",b),s("nationality",b)}function Oe(p){var g;const b=(g=p.target.files)==null?void 0:g[0];if(!b)return;if(b.size>5*1024*1024){C("A foto deve ter no máximo 5 MB."),p.target.value="";return}const h=new FileReader;h.onload=()=>{C(null),s("avatarFile",b),s("avatarPreview",h.result)},h.readAsDataURL(b)}return i`
    <section className="user-form card">
      <div className="user-form__header">
        <div>
          <p className="panel-eyebrow">${t?"Editar perfil":"Novo perfil"}</p>
          <h2 className="panel-title">${t?t.fullName:"Cadastro de associado"}</h2>
        </div>
        <button type="button" className="ghost-button" onClick=${o}>Fechar</button>
      </div>
      <div className="user-form__tabs">
        ${ht.map(p=>{const b=["user-form__tab",_===p.id?"is-active":""].filter(Boolean).join(" ");return i`
            <button key=${p.id} type="button" className=${b} onClick=${()=>w(p.id)}>
              ${p.label}
            </button>
          `})}
      </div>
      ${Ut({formState:S,handleFieldChange:s,handleArrayChange:c,handleAddItem:re,handleRemoveItem:ye,activeTab:_,handleCPFInput:he,handleCouncilInput:V,handleContactNumberInput:ie,handlePostalCodeInput:Me,handleInstitutionInput:M,handleInstitutionSelect:Z,institutionSuggestions:A,institutionSearchState:l,handleNationalityTypeChange:Re,handleForeignCountryChange:Ne,handleAvatarUpload:Oe,canEditTenant:N,canEditRole:$})}
      ${(d||q)&&i`<p className="data-feedback data-feedback--error">${d??q}</p>`}
      <div className="user-form__actions">
        <button type="button" className="ghost-button" onClick=${o} disabled=${u}>Cancelar</button>
        <button type="button" className="primary-button" onClick=${ue} disabled=${u}>
          ${u?"Salvando...":"Salvar informações"}
        </button>
      </div>
    </section>
  `}function Ut({formState:e,handleFieldChange:t,handleArrayChange:a,handleAddItem:o,handleRemoveItem:u,activeTab:d,handleCPFInput:f,handleCouncilInput:N,handleContactNumberInput:$,handlePostalCodeInput:_,handleInstitutionInput:w,handleInstitutionSelect:S,institutionSuggestions:k,institutionSearchState:q,handleNationalityTypeChange:C,handleForeignCountryChange:A,handleAvatarUpload:T,canEditTenant:l,canEditRole:U}){const j=e.tenantOptions??[];switch(d){case"personal":return i`
        <form className="user-form__grid" onSubmit=${s=>s.preventDefault()}>
          <label>
            <span>Tenant</span>
            <select
              value=${e.tenantId}
              onChange=${s=>t("tenantId",s.target.value)}
              disabled=${!l}
            >
              ${j.map(s=>i`<option key=${s.id} value=${s.id}>${s.name}</option>`)}
            </select>
          </label>
          <label>
            <span>Nome completo</span>
            <input type="text" value=${e.fullName} onInput=${s=>t("fullName",s.target.value)} />
          </label>
          <label>
            <span>Como deseja ser chamado</span>
            <input type="text" value=${e.preferredName} onInput=${s=>t("preferredName",s.target.value)} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value=${e.email} onInput=${s=>t("email",s.target.value)} />
          </label>
          <label>
            <span>CPF</span>
            <input
              type="text"
              inputMode="numeric"
              value=${e.documentId}
              onInput=${f}
              placeholder="000.000.000-00"
            />
          </label>
          <label>
            <span>Conselho (número)</span>
            <input
              type="text"
              value=${e.councilNumber}
              onInput=${N}
              placeholder="000.000-F"
            />
          </label>
          <label>
            <span>UF do Conselho</span>
            <select value=${e.councilState} onChange=${s=>t("councilState",s.target.value)}>
              <option value="">Selecione</option>
              ${Ft.map(s=>i`<option key=${s} value=${s}>${s}</option>`)}
            </select>
          </label>
          <label>
            <span>Nacionalidade</span>
            <select value=${e.nationalityType} onChange=${C}>
              ${Et.map(s=>i`<option key=${s.id} value=${s.id}>${s.label}</option>`)}
            </select>
          </label>
          ${e.nationalityType==="foreign"&&i`
            <label>
              <span>País de origem</span>
              <input type="text" value=${e.foreignCountry} onInput=${A} />
            </label>
          `}
          <label>
            <span>Sexo</span>
            <select value=${e.gender} onChange=${s=>t("gender",s.target.value)}>
              <option value="">Selecione</option>
              ${Nt.map(s=>i`<option key=${s} value=${s}>${s}</option>`)}
            </select>
          </label>
          <label>
            <span>Estado civil</span>
            <input type="text" value=${e.maritalStatus} onInput=${s=>t("maritalStatus",s.target.value)} />
          </label>
          <label>
            <span>Nascimento</span>
            <input type="date" value=${e.birthDate} onInput=${s=>t("birthDate",s.target.value)} />
          </label>
          <label>
            <span>Categoria</span>
            <select value=${e.category} onChange=${s=>t("category",s.target.value)}>
              <option value="">Selecione</option>
              ${St.map(s=>i`<option key=${s.id} value=${s.id}>${s.label}</option>`)}
            </select>
          </label>
          <label>
            <span>Tipo de associação</span>
            <select value=${e.membershipType} onChange=${s=>t("membershipType",s.target.value)}>
              ${wt.map(s=>i`<option key=${s.id} value=${s.id}>${s.label}</option>`)}
            </select>
          </label>
          ${U&&i`
            <label>
              <span>Nível de acesso</span>
              <select value=${e.role} onChange=${s=>t("role",s.target.value)}>
                <option value="associado">Associado</option>
                <option value="tenant_admin">Tenant admin</option>
                <option value="super_admin">Super admin</option>
              </select>
            </label>
          `}
          <label>
            <span>Vigência inicial</span>
            <input
              type="date"
              value=${e.membershipStartedAt}
              disabled=${!0}
            />
          </label>
          <label>
            <span>Foto (quadrada)</span>
            <input type="file" accept="image/*" onChange=${T} />
            <small>Até 5 MB</small>
            ${(e.avatarPreview||e.avatarUrl)&&i`
              <div className="user-form__avatar-preview">
                <img src=${e.avatarPreview||e.avatarUrl} alt="Prévia do avatar" />
              </div>
            `}
          </label>
        </form>
      `;case"addresses":return i`
        <div className="user-form__list">
          ${e.addresses.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Endereço ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("addresses",c)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${r=>r.preventDefault()}>
                <label>
                  <span>CEP</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="00000-000"
                    value=${s.postalCode}
                    onInput=${r=>_(c,r.target.value)}
                  />
                </label>
                <label>
                  <span>Tipo</span>
                  <input type="text" value=${s.type} onInput=${r=>a("addresses",c,"type",r.target.value)} />
                </label>
                <label>
                  <span>Tipo de logradouro</span>
                  <input type="text" value=${s.streetType} onInput=${r=>a("addresses",c,"streetType",r.target.value)} />
                </label>
                <label>
                  <span>Logradouro</span>
                  <input type="text" value=${s.street} onInput=${r=>a("addresses",c,"street",r.target.value)} />
                </label>
                <label>
                  <span>Número</span>
                  <input type="text" value=${s.number} onInput=${r=>a("addresses",c,"number",r.target.value)} />
                </label>
                <label>
                  <span>Complemento</span>
                  <input type="text" value=${s.complement} onInput=${r=>a("addresses",c,"complement",r.target.value)} />
                </label>
                <label>
                  <span>Bairro</span>
                  <input type="text" value=${s.district} onInput=${r=>a("addresses",c,"district",r.target.value)} />
                </label>
                <label>
                  <span>Município</span>
                  <input type="text" value=${s.city} onInput=${r=>a("addresses",c,"city",r.target.value)} />
                </label>
                <label>
                  <span>Estado</span>
                  <input type="text" value=${s.state} onInput=${r=>a("addresses",c,"state",r.target.value)} />
                </label>
                <label>
                  <span>País</span>
                  <input type="text" value=${s.country} onInput=${r=>a("addresses",c,"country",r.target.value)} />
                </label>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      checked=${s.isPrimary}
                      onChange=${r=>a("addresses",c,"isPrimary",r.target.checked)}
                    />
                    Endereço principal
                  </span>
                </label>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      checked=${s.isCorrespondence}
                      onChange=${r=>a("addresses",c,"isCorrespondence",r.target.checked)}
                    />
                    Correspondência
                  </span>
                </label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("addresses",ya())}>
            + Adicionar endereço
          </button>
        </div>
      `;case"contacts":return i`
        <div className="user-form__list">
          ${e.contacts.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Telefone ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("contacts",c)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${r=>r.preventDefault()}>
                <label>
                  <span>Tipo</span>
                  <select value=${s.type} onChange=${r=>a("contacts",c,"type",r.target.value)}>
                    ${Pt.map(r=>i`<option key=${r.id} value=${r.id}>${r.label}</option>`)}
                  </select>
                </label>
                <label>
                  <span>Código do país</span>
                  <input type="text" value=${s.countryCode} onInput=${r=>a("contacts",c,"countryCode",r.target.value)} />
                </label>
                <label>
                  <span>DDD</span>
                  <input type="text" value=${s.areaCode} onInput=${r=>a("contacts",c,"areaCode",r.target.value)} />
                </label>
                <label>
                  <span>Número</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value=${s.number}
                    onInput=${r=>$(c,r.target.value)}
                    placeholder=${s.type==="celular"?"00000-0000":"0000-0000"}
                  />
                </label>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      checked=${s.isPrimary}
                      onChange=${r=>a("contacts",c,"isPrimary",r.target.checked)}
                    />
                    Principal
                  </span>
                </label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("contacts",ha())}>
            + Adicionar telefone
          </button>
        </div>
      `;case"contributions":return i`
        <div className="user-form__list">
          ${e.contributions.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Contribuição ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("contributions",c)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${r=>r.preventDefault()}>
                <label><span>Competência</span><input type="text" value=${s.referencePeriod} onInput=${r=>a("contributions",c,"referencePeriod",r.target.value)} /></label>
                <label><span>Vencimento</span><input type="date" value=${s.dueDate} onInput=${r=>a("contributions",c,"dueDate",r.target.value)} /></label>
                <label><span>Valor devido</span><input type="number" step="0.01" value=${s.amountDue} onInput=${r=>a("contributions",c,"amountDue",r.target.value)} /></label>
                <label><span>Valor pago</span><input type="number" step="0.01" value=${s.amountPaid} onInput=${r=>a("contributions",c,"amountPaid",r.target.value)} /></label>
                <label><span>Status</span><input type="text" value=${s.status} onInput=${r=>a("contributions",c,"status",r.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("contributions",Ca())}>
            + Adicionar contribuição
          </button>
        </div>
      `;case"education":return i`
        <div className="user-form__list">
          ${e.education.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Formação ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("education",c)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${r=>r.preventDefault()}>
                <label><span>Nível</span><input type="text" value=${s.level} onInput=${r=>a("education",c,"level",r.target.value)} /></label>
                <label className="user-form__field-with-suggestions">
                  <span>Instituição</span>
                  <input
                    type="text"
                    value=${s.institution}
                    onInput=${r=>w(c,r.target.value)}
                    placeholder="Buscar no MEC"
                  />
                  ${Bt(c,k,q,S)}
                </label>
                <label><span>Curso</span><input type="text" value=${s.course} onInput=${r=>a("education",c,"course",r.target.value)} /></label>
                <label><span>Início</span><input type="date" value=${s.startedAt} onInput=${r=>a("education",c,"startedAt",r.target.value)} /></label>
                <label><span>Conclusão</span><input type="date" value=${s.finishedAt} onInput=${r=>a("education",c,"finishedAt",r.target.value)} /></label>
                <label><span>Carga horária</span><input type="number" value=${s.hours} onInput=${r=>a("education",c,"hours",r.target.value)} /></label>
                <label><span>Observações</span><input type="text" value=${s.notes} onInput=${r=>a("education",c,"notes",r.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("education",Na())}>
            + Adicionar formação
          </button>
        </div>
      `;case"practices":return i`
        <div className="user-form__list">
          ${e.practices.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Atuação ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("practices",c)}>
                  Remover
                </button>
              </div>
              <label>
                <span>Área</span>
                <select value=${s.practice} onChange=${r=>a("practices",c,"practice",r.target.value)}>
                  <option value="">Selecione</option>
                  ${_a.map(r=>i`<option key=${r.id} value=${r.value}>${r.label}</option>`)}
                </select>
              </label>
              ${s.practice==="other"?i`
                    <label>
                      <span>Descreva a atuação</span>
                      <input
                        type="text"
                        value=${s.customPractice}
                        onInput=${r=>a("practices",c,"customPractice",r.target.value)}
                      />
                    </label>
                  `:null}
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("practices",Pa())}>
            + Adicionar atuação
          </button>
        </div>
      `;case"specialties":return i`
        <div className="user-form__list">
          ${e.specialties.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Especialidade ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("specialties",c)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${r=>r.preventDefault()}>
                <label>
                  <span>Especialidade (COFFITO)</span>
                  <select value=${s.specialty} onChange=${r=>a("specialties",c,"specialty",r.target.value)}>
                    <option value="">Selecione</option>
                    ${It.map(r=>i`<option key=${r.id} value=${r.value}>${r.label}</option>`)}
                  </select>
                </label>
                <label>
                  <span>RQE</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value=${s.rqeNumber}
                    onInput=${r=>a("specialties",c,"rqeNumber",r.target.value.replace(/\D+/g,""))}
                  />
                </label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("specialties",wa())}>
            + Adicionar especialidade
          </button>
        </div>
      `;case"roles":return i`
        <div className="user-form__list">
          ${e.roles.map((s,c)=>i`
            <div key=${s.id} className="user-form__repeatable-item">
              <div className="user-form__repeatable-header">
                <strong>Cargo ${c+1}</strong>
                <button type="button" className="ghost-button" onClick=${()=>u("roles",c)}>
                  Remover
                </button>
              </div>
              <form className="user-form__grid" onSubmit=${r=>r.preventDefault()}>
                <label><span>Nome</span><input type="text" value=${s.roleName} onInput=${r=>a("roles",c,"roleName",r.target.value)} /></label>
                <label><span>Início</span><input type="date" value=${s.startedAt} onInput=${r=>a("roles",c,"startedAt",r.target.value)} /></label>
                <label><span>Fim</span><input type="date" value=${s.finishedAt} onInput=${r=>a("roles",c,"finishedAt",r.target.value)} /></label>
              </form>
            </div>
          `)}
          <button type="button" className="ghost-button" onClick=${()=>o("roles",Sa())}>
            + Adicionar cargo
          </button>
        </div>
      `;case"notes":return i`
        <label className="user-form__notes">
          <span>Observações</span>
          <textarea value=${e.notes} onInput=${s=>t("notes",s.target.value)}></textarea>
        </label>
      `;default:return null}}function la(e,t,a){var N;const o=a??(e==null?void 0:e.tenantId)??((N=t[0])==null?void 0:N.id)??"",u=(e==null?void 0:e.nationality)??"Brasileiro",d=!u||u.toLowerCase()==="brasileiro",f=(e==null?void 0:e.membershipType)==="student"?"student":"professional";return{tenantOptions:t,tenantId:o,fullName:(e==null?void 0:e.fullName)??"",preferredName:(e==null?void 0:e.preferredName)??"",email:(e==null?void 0:e.email)??"",documentId:(e==null?void 0:e.documentId)??"",councilNumber:(e==null?void 0:e.councilNumber)??"",councilState:(e==null?void 0:e.councilState)??"",nationality:u,nationalityType:d?"br":"foreign",foreignCountry:d?"":u,gender:(e==null?void 0:e.gender)??"",maritalStatus:(e==null?void 0:e.maritalStatus)??"",birthDate:(e==null?void 0:e.birthDate)??"",category:(e==null?void 0:e.category)??"",status:(e==null?void 0:e.status)??"ativo",associationStatus:(e==null?void 0:e.associationStatus)??"pendente",membershipType:f,membershipStartedAt:(e==null?void 0:e.membershipStartedAt)??Ot(),membershipExpiresAt:(e==null?void 0:e.membershipExpiresAt)??"",avatarUrl:(e==null?void 0:e.avatarUrl)??"",avatarPreview:"",avatarFile:null,notes:(e==null?void 0:e.notes)??"",role:(e==null?void 0:e.role)??"associado",userId:(e==null?void 0:e.userId)??null,addresses:((e==null?void 0:e.addresses)??[]).map($=>({...ya(),...$})),contacts:((e==null?void 0:e.contacts)??[]).map($=>({...ha(),...$})),education:((e==null?void 0:e.education)??[]).map($=>({...Na(),...$})),practices:((e==null?void 0:e.practices)??[]).map($=>{const _=Pa(),w=($==null?void 0:$.practice)??"";return w&&!Ct.has(w)?{..._,practice:"other",customPractice:w}:{..._,...$}}),specialties:((e==null?void 0:e.specialties)??[]).map($=>({...wa(),...$})),titularities:((e==null?void 0:e.titularities)??[]).map($=>({...Tt(),...$})),roles:((e==null?void 0:e.roles)??[]).map($=>({...Sa(),...$})),contributions:((e==null?void 0:e.contributions)??[]).map($=>({...Ca(),...$}))}}function ya(){return{id:ne(),type:"Residencial",streetType:"",street:"",number:"",complement:"",district:"",city:"",state:"",country:"Brasil",postalCode:"",isPrimary:!1,isCorrespondence:!1}}function ha(){return{id:ne(),type:"celular",countryCode:"+55",areaCode:"",number:"",isPrimary:!1}}function Na(){return{id:ne(),level:"",institution:"",course:"",startedAt:"",finishedAt:"",hours:"",notes:""}}function Pa(){return{id:ne(),practice:"",customPractice:""}}function wa(){return{id:ne(),area:"",specialty:"",rqeNumber:""}}function Tt(){return{id:ne(),titleName:""}}function Sa(){return{id:ne(),roleName:"",startedAt:"",finishedAt:""}}function Ca(){return{id:ne(),referencePeriod:"",dueDate:"",amountDue:"",amountPaid:"",status:"pending"}}function ne(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`local-${Date.now()}-${Math.random().toString(16).slice(2)}`}function At(e){return e.replace(/\D/g,"").slice(0,11).replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2")}function kt(e){const t=e.replace(/\D/g,"").slice(0,6);if(!t)return"";const a=t.slice(0,3),o=t.slice(3);return t.length<=3?a:t.length<6?`${a}.${o}`:`${a}.${o}-F`}function Mt(e){const t=e.replace(/\D/g,"").slice(0,8);return t.length<=5?t:`${t.slice(0,5)}-${t.slice(5)}`}function Rt(e,t){const a=t==="celular",o=a?9:8,u=e.replace(/\D/g,"").slice(0,o),d=a?5:4;return u.length<=d?u:`${u.slice(0,d)}-${u.slice(d)}`}function Ot(){const e=new Date,t=e.getTime()+e.getTimezoneOffset()*6e4;return new Date(t+-3*60*60*1e3).toISOString().slice(0,10)}function Bt(e,t,a,o){const u=t[e]??[];return a.loadingIndex===e?i`<div className="user-form__suggestions">Buscando no MEC...</div>`:u.length?i`
    <div className="user-form__suggestions">
      ${a.error&&!a.errorIndex?i`<div className="user-form__suggestions__notice">${a.error}</div>`:null}
      ${u.map(d=>i`
          <button type="button" key=${d.id} onClick=${()=>o(e,d)}>
            <span>${d.name}</span>
            ${d.uf?i`<small>${d.uf}</small>`:null}
          </button>
        `)}
    </div>
  `:a.error&&a.errorIndex===e?i`<div className="user-form__suggestions user-form__suggestions--error">
        ${a.error}
      </div>`:null}function jt({onSubmit:e,isLoading:t,error:a}){const[o,u]=I(""),[d,f]=I(""),[N,$]=I(null);function _(w){var S;if((S=w==null?void 0:w.preventDefault)==null||S.call(w),!o||!d){$("Informe e-mail e senha.");return}$(null),e==null||e({email:o,password:d})}return i`
    <section className="auth-panel card">
      <header className="auth-panel__header">
        <p className="panel-eyebrow">Acesso seguro</p>
        <h1 className="panel-title">Entrar no REVA Enterprise</h1>
      </header>
      <form className="auth-panel__form" onSubmit=${_}>
        <label>
          <span>E-mail corporativo</span>
          <input
            type="email"
            value=${o}
            onInput=${w=>u(w.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            value=${d}
            onInput=${w=>f(w.target.value)}
            autoComplete="current-password"
          />
        </label>
        ${(a||N)&&i`<p className="data-feedback data-feedback--error">${a??N}</p>`}
        <button type="submit" className="primary-button" disabled=${t}>
          ${t?"Entrando...":"Entrar"}
        </button>
      </form>
    </section>
  `}function Lt({tenant:e,moduleCatalog:t=[],initialActive:a=[],initialPlanned:o=[],onClose:u,onSave:d,isSaving:f,error:N}){const[$,_]=I(new Set(a)),[w,S]=I(new Set(o));X(()=>{_(new Set(a??[])),S(new Set(o??[]))},[a,o,e==null?void 0:e.id]);function k(C,A){_(T=>{const l=new Set(T);return A==="active"&&(l.has(C)?l.delete(C):l.add(C)),l}),S(T=>{const l=new Set(T);return A==="active"&&l.has(C)?l.delete(C):A==="planned"&&(l.has(C)?l.delete(C):l.add(C)),l})}function q(C){var A;(A=C==null?void 0:C.preventDefault)==null||A.call(C),d==null||d({active:Array.from($),planned:Array.from(w).filter(T=>!$.has(T))})}return i`
    <div className="tenant-preview-overlay">
      <section className="tenant-module-manager card">
        <header className="tenant-module-manager__header">
          <div>
            <p className="panel-eyebrow">Liberação de módulos</p>
            <h2 className="panel-title">${(e==null?void 0:e.name)??"Tenant"}</h2>
            <p className="tenant-module-manager__stats">
              ${$.size} ativos • ${w.size} planejados
            </p>
          </div>
          <button type="button" className="ghost-button" onClick=${u} disabled=${f}>
            Fechar
          </button>
        </header>
        <p className="tenant-module-manager__hint">
          Selecione os módulos ativos e os planejados para ${(e==null?void 0:e.name)??"o tenant"}. Os módulos ativos
          ficam imediatamente disponíveis no console do tenant; os planejados aparecem como “em preparação”.
        </p>
        ${N&&i`<p className="data-feedback data-feedback--error">${N}</p>`}
        <form className="tenant-module-manager__grid" onSubmit=${q}>
          ${t.map(C=>{var l;const A=$.has(C.id),T=w.has(C.id);return i`
              <article key=${C.id} className="tenant-module-manager__module">
                <header>
                  <div>
                    <p className="tenant-module-manager__eyebrow">${C.category}</p>
                    <h3>${C.name}</h3>
                  </div>
                  <div className="tenant-module-manager__toggles">
                    <label>
                      <input
                        type="checkbox"
                        checked=${A}
                        onChange=${()=>k(C.id,"active")}
                      />
                      Ativo
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked=${T&&!A}
                        onChange=${()=>k(C.id,"planned")}
                        disabled=${A}
                      />
                      Planejado
                    </label>
                  </div>
                </header>
                <p>${C.description}</p>
                ${(l=C.focus)!=null&&l.length?i`
                      <div className="tenant-module-manager__tags">
                        ${C.focus.map(U=>i`<span>${U}</span>`)}
                      </div>
                    `:null}
              </article>
            `})}
        </form>
        <div className="tenant-module-manager__actions">
          <button type="button" className="ghost-button" onClick=${u} disabled=${f}>
            Cancelar
          </button>
          <button type="button" className="primary-button" onClick=${q} disabled=${f}>
            ${f?"Salvando...":"Salvar módulos"}
          </button>
        </div>
      </section>
    </div>
  `}function qt({tenant:e,modules:t=[],selectedModuleId:a,onOpenModule:o,moduleContent:u=null,onLogout:d}){var w;const f=t.filter(S=>S.status==="active"),N=t.filter(S=>S.status==="planned"),$=[...f,...N],_=$.find(S=>S.id===a)??$[0]??null;return i`
    <div className="tenant-console">
      <header className="tenant-console__hero">
        <div>
          <p className="tenant-console__eyebrow">Área do tenant</p>
          <h1>${(e==null?void 0:e.name)??"Tenant"}</h1>
          <p className="tenant-console__subtitle">
            Plano ${(e==null?void 0:e.plan)??"N/D"} • ${(e==null?void 0:e.segment)??"Segmento não informado"}
          </p>
        </div>
        <div className="tenant-console__actions">
          <div className="tenant-console__meta">
            <div>
              <p>Módulos ativos</p>
              <strong>${f.length}</strong>
            </div>
            <div>
              <p>Em planejamento</p>
              <strong>${N.length}</strong>
            </div>
          </div>
          ${d?i`
                <button type="button" className="tenant-console__logout" onClick=${d}>
                  Sair
                </button>
              `:null}
        </div>
      </header>
      ${$.length?i`
            <div className="tenant-console__tabs">
              ${$.map(S=>{const k=(_==null?void 0:_.id)===S.id;return i`
                  <button
                    key=${S.id??S.slug??S.name}
                    type="button"
                    className=${["tenant-console__tab",`tenant-console__tab--status-${S.status??"default"}`,k?"tenant-console__tab--selected":""].filter(Boolean).join(" ")}
                    onClick=${()=>o==null?void 0:o(S.id)}
                  >
                    <span className="tenant-console__tab-label">${S.name}</span>
                    <small>${S.category}</small>
                  </button>
                `})}
            </div>
            ${_?i`
                  <section className="tenant-console__section tenant-console__section--detail">
                    <div className="tenant-console__section-header">
                      <div>
                        <p className="panel-eyebrow">${_.category}</p>
                        <h2>${_.name}</h2>
                      </div>
                      <span
                        className=${["status-pill",`status-pill--${_.status}`].join(" ")}
                      >
                        ${_.statusLabel}
                      </span>
                    </div>
                    <p>${_.description}</p>
                    ${(w=_.focus)!=null&&w.length?i`
                          <div className="tenant-console__tags">
                            ${_.focus.map(S=>i`<span key=${`${_.id}-${S}`}>${S}</span>`)}
                          </div>
                        `:null}
                    ${_.status==="active"&&u?i`<div className="tenant-console__module-content">
                          ${u}
                        </div>`:i`<div className="tenant-console__detail-footnote">
                          ${_.status==="active"?i`Este painel está em modo demonstrativo. Em produção, ele carregará a aplicação
                                dedicada do módulo <strong>${_.name}</strong>.`:i`Este módulo está em construção pelo time da REVA. Você será notificado assim
                                que estiver disponível.`}
                        </div>`}
                  </section>
                `:i`<section className="tenant-console__section">
                  <p className="tenant-console__empty">
                    Selecione um módulo acima para visualizar o painel correspondente.
                  </p>
                </section>`}
          `:i`<section className="tenant-console__section">
            <p className="tenant-console__empty">
              Nenhum módulo ativo ou planejado para ${(e==null?void 0:e.name)??"este tenant"}.
            </p>
          </section>`}
    </div>
  `}const ua={active:{label:"Ativo",tone:"positive"},planned:{label:"Planejado",tone:"info"},locked:{label:"Não contratado",tone:"muted"}};function Vt(e,t=[]){if(!e||!t.length)return[];const a=e.activeModules??[],o=e.comingSoon??[];return t.map(u=>{const d=a.includes(u.id),f=o.includes(u.id);let N="locked";d?N="active":f&&(N="planned");const $=ua[N]??ua.locked;return{...u,status:N,statusLabel:$.label,tone:$.tone}})}function Gt(e=[],t){return t==="all"?e:e.filter(a=>a.status===t)}const Ge={id:"placeholder",name:"Tenant não configurado",plan:"N/D",status:"inativo",activeModules:[],comingSoon:[],priority:"Adicione o primeiro tenant"},Ae=typeof window<"u"?new URLSearchParams(window.location.search).get("tenantView"):null,zt=typeof window<"u"?new URLSearchParams(window.location.search).get("module"):null;var va;const xt=Ia(Ae,ke)??((va=ke[0])==null?void 0:va.id)??Ge.id,ca=`
  id,
  tenant_id,
  user_id,
  full_name,
  preferred_name,
  email,
  document_id,
  council_number,
  council_state,
  nationality,
  gender,
  marital_status,
  birth_date,
  category,
  status,
  regional,
  membership_type,
  membership_started_at,
  membership_expires_at,
  association_status,
  avatar_url,
  notes,
  role,
  profile_addresses(*),
  profile_contacts(*),
  profile_education(*),
  profile_specialties(*),
  profile_roles(*),
  profile_titularities(*),
  profile_practices(*),
  profile_contributions(*),
  tenant:tenants(id, name, slug)
`;async function Jt(e,t,a,o,u){if(!E)throw new Error("Supabase não configurado.");try{const{data:d,error:f}=await E.auth.admin.createUser({email:e,password:t,email_confirm:!0});if(f)throw console.error("Erro ao criar usuário:",f),new Error(`Erro ao criar usuário: ${f.message}`);console.log("Usuário criado:",d.user.id);const{error:N}=await E.from("user_roles").insert({user_id:d.user.id,tenant_id:a,role:o});if(N)throw console.error("Erro ao atribuir role:",N),new Error(`Erro ao atribuir role: ${N.message}`);console.log(`Role '${o}' atribuído ao usuário`);const{data:$,error:_}=await E.from("profiles").insert({user_id:d.user.id,tenant_id:a,full_name:u,email:e,role:o,status:"ativo"}).select().single();if(_)throw console.error("Erro ao criar perfil:",_),new Error(`Erro ao criar perfil: ${_.message}`);return console.log("Perfil criado:",$.id),{userId:d.user.id,profileId:$.id,email:e,role:o}}catch(d){throw console.error("Erro em createNewUser:",d),d}}function Qt(){var aa,ta;const[e,t]=I(ke),[a,o]=I(Xa),[u,d]=I(()=>Za.map(n=>Ve({id:n.id,tenant_id:n.tenantId,full_name:n.fullName,preferred_name:n.preferredName,email:n.email,document_id:n.documentId,council_number:n.councilNumber,council_state:n.councilState,nationality:n.nationality,gender:n.gender,marital_status:n.maritalStatus,birth_date:n.birthDate,category:n.category,status:n.status,membership_type:n.membershipType,profile_addresses:n.addresses,profile_contacts:n.contacts,profile_education:n.education,profile_specialties:n.specialties,profile_titularities:n.titularities,profile_roles:n.roles,profile_practices:n.practices,profile_contributions:n.contributions},ke))),[f,N]=I(xt),[$,_]=I("all"),[w,S]=I(""),[k,q]=I("all"),[C,A]=I(!1),[T,l]=I(null),[U,j]=I("overview"),[s,c]=I(!1),[r,re]=I(null),[ye,ue]=I(!1),[he,V]=I(null),[M,fe]=I(null),[Z,ie]=I([]),[Me,ce]=I(null),[Re,Ne]=I(F),[Oe,p]=I(!1),[b,h]=I(!1),[g,R]=I(null),[D,v]=I(null),[be,xe]=I(!1),[ve,Pe]=I(zt);X(()=>{if(!F||!E){Ne(!1);return}let n=!0;E.auth.getSession().then(({data:P})=>{n&&(fe((P==null?void 0:P.session)??null),Ne(!1))});const{data:m}=E.auth.onAuthStateChange((P,O)=>{fe(O),ce(null)});return()=>{n=!1,m.subscription.unsubscribe()}},[]);const we=((aa=M==null?void 0:M.user)==null?void 0:aa.id)??null;X(()=>{if(!F||!E)return;if(!we){ie(P=>P.length?[]:P);return}let n=!0;async function m(){const{data:P,error:O}=await E.from("user_roles").select("id, role, tenant_id, tenants:tenants(id, name, slug)").eq("user_id",we);n&&(O?(console.error("Falha ao buscar roles",O),ce("Não foi possível carregar permissões."),ie([])):ie(P??[]))}return m(),()=>{n=!1}},[F,we]);const K=H(()=>F?M!=null&&M.user?Z.some(m=>m.role==="super_admin")?e.map(m=>m.id):Z.map(m=>m.tenant_id).filter(Boolean):[]:e.map(m=>m.id),[F,M,Z,e]),B=H(()=>!F||Z.some(n=>n.role==="super_admin"),[F,Z]);X(()=>{!F||!K.length||K.includes(f)||N(K[0])},[F,K,f]),X(()=>{if(!F||!E||!(M!=null&&M.user))return;let n=!0;async function m(){A(!0),l(null);try{const[P,O,W]=await Promise.all([E.from("tenants").select("*").order("name"),E.from("module_catalog").select("*").order("category"),E.from("profiles").select(ca).order("full_name")]);if(P.error)throw P.error;if(O.error)throw O.error;if(W.error)throw W.error;if(!n)return;t((P.data??[]).map(J=>da(J))),o(O.data??[]);const G=(W.data??[]).map(J=>Ve(J,P.data??e));d(G)}catch(P){console.error("Falha ao carregar dados Supabase",P),n&&l("Não foi possível carregar dados em tempo real (usando mocks locais).")}finally{n&&A(!1)}}return m(),()=>{n=!1}},[M]),X(()=>{var P;if(!e.length||!f||e.some(O=>O.id===f))return;const m=e.find(O=>O.slug===f);if(m){N(m.id);return}N(((P=e[0])==null?void 0:P.id)??Ge.id)},[e,f]);const z=H(()=>{if(!F||!K.length)return e;const n=new Set(K);return e.filter(m=>n.has(m.id))},[e,K,F]),y=H(()=>{const n=z.length?z:e;return n.find(m=>m.id===f)??n[0]??Ge},[z,e,f]),te=H(()=>Vt(y,a),[y,a]),Ba=H(()=>Gt(te,$),[te,$]),$e=H(()=>{var m;const n=z.length?z:e;if(Ae){const P=Ia(Ae,n);if(P)return P}return F&&!B?K[0]??((m=n[0])==null?void 0:m.id)??null:null},[Ae,z,e,F,B,K]),se=!!$e,x=H(()=>{if(!se||!te.length)return null;if(ve){const n=te.find(m=>m.id===ve);if(n)return n}return te[0]},[se,ve,te]);X(()=>{!se||!$e||f!==$e&&N($e)},[se,$e,f]);const ge=H(()=>Z.filter(n=>n.role==="tenant_admin").map(n=>n.tenant_id),[Z]),Je=we,de=!F||B||ge.includes(y==null?void 0:y.id),pe=L(n=>n?!!(!F||B||ge.includes(n.tenantId)||n.role==="associado"&&n.userId===Je):!1,[F,B,ge,Je]),Be=H(()=>F?B?z.map(n=>n.id):ge:z.map(n=>n.id),[F,z,B,ge]),_e=!F||B||Be.length>1,je=H(()=>{if(!z.length)return[];if(!F||B)return z;const n=new Set(Be);return z.filter(m=>n.has(m.id))},[z,Be,F,B]),le=_e?null:((ta=je[0])==null?void 0:ta.id)??(y==null?void 0:y.id),Le=(y==null?void 0:y.slug)??(y==null?void 0:y.id),Qe=H(()=>{const n=w.trim().toLowerCase();return u.filter(m=>{var G,J;const P=y==null||m.tenantId===y.id||Le&&m.tenantSlug===Le,O=k==="all"||m.status===k,W=!n||((G=m.fullName)==null?void 0:G.toLowerCase().includes(n))||((J=m.email)==null?void 0:J.toLowerCase().includes(n));return P&&O&&W})},[u,y,w,k,Le]),ja=L(n=>{F&&K.length&&!K.includes(n)||N(n)},[K,F]),La=L(n=>{_(n)},[]),He=L(n=>{S(n)},[]),Ke=L(n=>{q(n)},[]),qa=[{id:"overview",label:"Visão geral",description:"KPIs e módulos contratados"},{id:"users",label:"Usuários e Perfis",description:"Base de pessoas por tenant"}],Va=H(()=>et.map(n=>n.id==="launchModule"?{...n,disabled:!B}:n),[B]),Ga=L(async({email:n,password:m})=>{if(!E)return;ce(null),p(!0);const{error:P}=await E.auth.signInWithPassword({email:n,password:m});P&&(console.error("Falha no login",P),ce("Credenciais inválidas ou sem permissão.")),p(!1)},[]),We=L(async()=>{if(E)try{await E.auth.signOut()}catch(n){console.error("Falha ao encerrar sessão",n)}finally{if(fe(null),ie([]),j("overview"),c(!1),re(null),R(null),v(null),h(!1),Pe(null),typeof window<"u"){const n=`${window.location.origin}${window.location.pathname}`;window.location.replace(n)}}},[]);L(async n=>{if(!B){V("Apenas Super Admin pode criar novos usuários.");return}ue(!0),V(null);try{const m=await Jt(n.email,n.password,n.tenantId,n.role,n.fullName);console.log("Usuário criado com sucesso:",m);const{data:P}=await E.from("user_roles").select("id, role, tenant_id, tenants:tenants(id, name, slug)").eq("user_id",M.user.id);ie(P??[]),V(null),console.log("Novo usuário criado e roles atualizados")}catch(m){console.error("Falha ao criar usuário",m),V(`Falha ao criar usuário: ${m.message}`)}finally{ue(!1)}},[B,M]);const Ye=L(()=>{if(!de){V("Você não tem permissão para criar perfis neste tenant.");return}re(null),c(!0),V(null)},[de]),Xe=L(n=>{const m=u.find(P=>P.id===n);if(m){if(!pe(m)){V("Você não tem permissão para editar este perfil.");return}re(m),c(!0),V(null)}},[u,pe]),Ze=L(()=>{!B||!(y!=null&&y.id)||(R(y),v(null),h(!0))},[B,y]),za=L(()=>{if(!y||typeof window>"u")return;const n=y.slug??y.id,m=new URL(window.location.href);m.searchParams.set("tenantView",n),m.searchParams.delete("module"),window.open(m.toString(),"_blank","noopener")},[y]),xa=L(n=>{if(Pe(n),typeof window<"u"){const m=new URL(window.location.href);n?m.searchParams.set("module",n):m.searchParams.delete("module"),window.history.replaceState(null,"",m.toString())}},[]);X(()=>{if(!se){Pe(null);return}!ve&&(x!=null&&x.id)&&Pe(x.id)},[se,ve,x==null?void 0:x.id]);const Ja=L(n=>{n==="launchModule"&&Ze()},[Ze]),De=L(()=>{re(null),c(!1),V(null)},[]),ea=L(async n=>{const{tenantOptions:m,avatarPreview:P,addresses:O=[],contacts:W=[],education:G=[],specialties:J=[],roles:Se=[],titularities:Ce=[],practices:Ie=[],contributions:Fe=[],avatarFile:sa=null,...ee}=n,Ee=F&&E,oa=_e?ee.tenantId||(y==null?void 0:y.id)||le:le??(y==null?void 0:y.id)??ee.tenantId;if(!oa){V("Selecione um tenant válido.");return}if(r){if(!pe(r)){V("Você não tem permissão para editar este perfil.");return}}else if(!de){V("Você não tem permissão para criar perfis.");return}ee.tenantId=oa,!Ee&&!ee.avatarUrl&&P&&(ee.avatarUrl=P),ue(!0),V(null);try{let Y;const na=Fa(ee);if(r)if(Ee){const{error:Q}=await E.from("profiles").update(na).eq("id",r.id);if(Q)throw Q;await ma(r.id,{addresses:O,contacts:W,education:G,specialties:J,roles:Se,titularities:Ce,practices:Ie,contributions:Fe}),Y=await qe(r.id)}else Y=pa(r.id,ee,{addresses:O,contacts:W,education:G,specialties:J,roles:Se,titularities:Ce,practices:Ie,contributions:Fe});else if(Ee){const{data:Q,error:me}=await E.from("profiles").insert(na).select("id").single();if(me)throw me;await ma(Q.id,{addresses:O,contacts:W,education:G,specialties:J,roles:Se,titularities:Ce,practices:Ie,contributions:Fe}),Y=await qe(Q.id)}else{const Q=ae();Y=pa(Q,ee,{addresses:O,contacts:W,education:G,specialties:J,roles:Se,titularities:Ce,practices:Ie,contributions:Fe})}if(Ee&&sa){const Q=await Kt(sa,ee.tenantId,Y.id,M==null?void 0:M.user),{error:me}=await E.from("profiles").update({avatar_url:Q}).eq("id",Y.id);if(me)throw me;Y=await qe(Y.id)}const Ue=Ve(Y,e);d(Q=>Q.some(Te=>Te.id===Ue.id)?Q.map(Te=>Te.id===Ue.id?Ue:Te):[...Q,Ue]),c(!1),re(null)}catch(Y){console.error("Falha ao salvar perfil",Y),V("Não foi possível salvar o perfil. Tente novamente.")}finally{ue(!1)}},[de,pe,_e,r,F,le,M,y,e]);async function qe(n){const{data:m,error:P}=await E.from("profiles").select(ca).eq("id",n).single();if(P)throw P;return m}const Qa=L(async({active:n,planned:m})=>{if(!g)return;const P=Array.from(n??[]),O=Array.from(m??[]);xe(!0),v(null);const W=F&&E;try{if(W){const{error:G}=await E.from("tenants").update({active_modules:P,coming_soon:O}).eq("id",g.id);if(G)throw G}t(G=>G.map(J=>J.id===g.id?da({...J,active_modules:P,coming_soon:O}):J)),h(!1),R(null)}catch(G){console.error("Falha ao salvar módulos",G),v("Não foi possível atualizar os módulos deste tenant.")}finally{xe(!1)}},[g,F]);if(!se&&F){if(Re)return i`<div className="app-shell"><p>Conferindo sessão...</p></div>`;if(!M)return i`
        <div className="app-shell app-shell--auth">
          <${jt} onSubmit=${Ga} isLoading=${Oe} error=${Me} />
        </div>
      `}if(se){let n=null;return x?x.status!=="active"?n=i`<p className="tenant-console__empty">
        O módulo ${x.name} ainda está em construção pela REVA.
      </p>`:x.id==="users"?n=i`
        <${ra}
          profiles=${Qe}
          query=${w}
          statusFilter=${k}
          onQueryChange=${He}
          onStatusChange=${Ke}
          isSyncing=${C}
          errorMessage=${T}
          onCreate=${Ye}
          onEdit=${Xe}
          canCreate=${de}
          canEditProfile=${pe}
        />
      `:n=i`<p className="tenant-console__empty">
        Integração do módulo ${x.name} ainda está em desenvolvimento.
      </p>`:n=i`<p className="tenant-console__empty">
        Nenhum módulo disponível para este tenant.
      </p>`,i`
      <div className="tenant-console-shell">
        <${qt}
          tenant=${y}
          modules=${te}
          selectedModuleId=${x==null?void 0:x.id}
          onOpenModule=${xa}
          moduleContent=${n}
          onLogout=${M?We:null}
        />
        ${s&&i`<${ia}
          tenants=${je}
          initialData=${r??{tenantId:le??(y==null?void 0:y.id)}}
          onSubmit=${ea}
          onCancel=${De}
          isSaving=${ye}
          error=${he}
          lockedTenantId=${le}
          canEditTenant=${_e}
          canEditRole=${B}
        />`}
      </div>
    `}return i`
    <div className="app-shell">
      ${F&&M&&i`
        <div className="auth-banner">
          <span>${M.user.email}</span>
          <button type="button" className="ghost-button" onClick=${We}>Sair</button>
        </div>
      `}
      <${ot}
        title="REVA Enterprise"
        subtitle="Controle unificado dos tenants, planos e módulos licenciáveis."
        tenants=${z.length?z:e}
        selectedTenantId=${y==null?void 0:y.id}
        onTenantChange=${ja}
        actions=${Va}
        onAction=${Ja}
      />
      <${gt}
        items=${qa}
        activeId=${U}
        onChange=${n=>j(n)}
      />
      ${U==="overview"&&i`
        <${rt} cards=${Da} />
        <div className="content-grid">
          <section className="module-panel card">
            <div className="panel-header">
              <div>
                <p className="panel-eyebrow">Mapeamento</p>
                <h2 className="panel-title">Módulos por tenant</h2>
              </div>
              <div className="panel-actions">
                <${lt} activeFilter=${$} onChange=${La} />
                ${B&&i`
                  <button
                    type="button"
                    className="ghost-button"
                    onClick=${()=>za()}
                  >
                    Ver como tenant
                  </button>
                `}
              </div>
            </div>
            ${C&&i`<p className="data-feedback">Sincronizando com Supabase...</p>`}
            ${T&&i`<p className="data-feedback data-feedback--error">${T}</p>`}
            <${dt} modules=${Ba} />
          </section>
          <div className="side-column">
            <${ft} tenant=${y} modules=${te} />
            <${mt} tenant=${y} />
          </div>
        </div>
      `}
      ${U==="users"&&i`
        <${ra}
          profiles=${Qe}
          query=${w}
          statusFilter=${k}
          onQueryChange=${He}
          onStatusChange=${Ke}
          isSyncing=${C}
          errorMessage=${T}
          onCreate=${Ye}
          onEdit=${Xe}
          canCreate=${de}
          canEditProfile=${pe}
        />
        ${s&&i`<${ia}
          tenants=${je}
          initialData=${r??{tenantId:le??(y==null?void 0:y.id)}}
          onSubmit=${ea}
          onCancel=${De}
          isSaving=${ye}
          error=${he}
          lockedTenantId=${le}
          canEditTenant=${_e}
          canEditRole=${B}
        />`}
      `}
      ${B&&b&&g&&i`<${Lt}
        tenant=${g}
        moduleCatalog=${a}
        initialActive=${g.activeModules??g.active_modules??[]}
        initialPlanned=${g.comingSoon??g.coming_soon??[]}
        onClose=${()=>{be||(h(!1),R(null))}}
        onSave=${Qa}
        isSaving=${be}
        error=${D}
      />`}
    </div>
  `}function Ve(e,t=[]){var S,k,q,C,A,T;if(!e)return null;const a=e.tenant??t.find(l=>l.id===e.tenant_id||l.slug===e.tenant_id),o=e.profile_addresses??e.addresses??[],u=e.profile_contacts??e.contacts??[],d=e.profile_education??e.education??[],f=e.profile_specialties??e.specialties??[],N=e.profile_roles??e.roles??[],$=e.profile_titularities??e.titularities??[],_=e.profile_practices??e.practices??[],w=e.profile_contributions??e.contributions??[];return{id:e.id,tenantId:e.tenant_id??e.tenantId,tenantSlug:(a==null?void 0:a.slug)??e.tenantSlug??null,tenantName:(a==null?void 0:a.name)??e.tenantName??"",fullName:e.full_name??e.fullName??"",preferredName:e.preferred_name??e.preferredName??"",email:e.email,documentId:e.document_id??e.documentId??"",status:e.status??"ativo",category:e.category??"",membershipType:e.membership_type??e.membershipType??"professional",councilNumber:e.council_number??e.councilNumber??"",councilState:e.council_state??e.councilState??"",nationality:e.nationality??"",gender:e.gender??"",maritalStatus:e.marital_status??"",birthDate:((k=(S=e.birth_date??e.birthDate)==null?void 0:S.slice)==null?void 0:k.call(S,0,10))??"",membershipStartedAt:((C=(q=e.membership_started_at??e.membershipStartedAt)==null?void 0:q.slice)==null?void 0:C.call(q,0,10))??"",membershipExpiresAt:((T=(A=e.membership_expires_at??e.membershipExpiresAt)==null?void 0:A.slice)==null?void 0:T.call(A,0,10))??"",associationStatus:e.association_status??e.associationStatus??"pending",avatarUrl:e.avatar_url??e.avatarUrl??"",notes:e.notes??"",userId:e.user_id??e.userId??null,role:e.role??e.profileRole??"associado",addresses:o.map(l=>({id:l.id??ae(),type:l.type??"",streetType:l.street_type??l.streetType??"",street:l.street??"",number:l.number??"",complement:l.complement??"",district:l.district??"",city:l.city??"",state:l.state??"",country:l.country??"Brasil",postalCode:l.postal_code??"",isPrimary:!!(l.is_primary??l.isPrimary),isCorrespondence:!!(l.is_correspondence??l.isCorrespondence)})),contacts:u.map(l=>({id:l.id??ae(),type:l.type??"celular",countryCode:l.country_code??l.countryCode??"+55",areaCode:l.area_code??l.areaCode??"",number:l.number??"",label:l.label??"",isPrimary:!!(l.is_primary??l.isPrimary)})),education:d.map(l=>{var U,j,s,c;return{id:l.id??ae(),level:l.level??"",institution:l.institution??"",course:l.course??"",startedAt:((j=(U=l.started_at??l.startedAt)==null?void 0:U.slice)==null?void 0:j.call(U,0,10))??"",finishedAt:((c=(s=l.finished_at??l.finishedAt)==null?void 0:s.slice)==null?void 0:c.call(s,0,10))??"",hours:l.hours??"",notes:l.notes??""}}),specialties:f.map(l=>({id:l.id??ae(),area:l.area??"",specialty:l.specialty??"",rqeNumber:l.rqe_number??l.rqeNumber??l.sub_specialty??l.subSpecialty??"",notes:l.notes??""})),roles:N.map(l=>{var U,j,s,c;return{id:l.id??ae(),roleName:l.role_name??l.roleName??"",startedAt:((j=(U=l.started_at??l.startedAt)==null?void 0:U.slice)==null?void 0:j.call(U,0,10))??"",finishedAt:((c=(s=l.finished_at??l.finishedAt)==null?void 0:s.slice)==null?void 0:c.call(s,0,10))??""}}),titularities:$.map(l=>({id:l.id??ae(),titleName:l.title_name??l.titleName??""})),practices:_.map(l=>({id:l.id??ae(),practice:l.practice??""})),contributions:w.map(l=>{var U,j;return{id:l.id??ae(),referencePeriod:l.reference_period??l.referencePeriod??"",dueDate:((j=(U=l.due_date??l.dueDate)==null?void 0:U.slice)==null?void 0:j.call(U,0,10))??"",amountDue:l.amount_due??l.amountDue??"",amountPaid:l.amount_paid??l.amountPaid??"",status:l.status??"pending"}})}}function Ht(e,t){return t?e.find(a=>{const o=a.slug??a.id;return a.id===t||o===t})??null:null}function Ia(e,t){var a;return((a=Ht(t,e))==null?void 0:a.id)??null}function da(e){return e&&{...e,activeModules:e.activeModules??e.active_modules??[],comingSoon:e.comingSoon??e.coming_soon??[]}}function ae(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`local-${Date.now()}`}function Fa(e){return{tenant_id:e.tenantId,full_name:e.fullName,preferred_name:e.preferredName,email:e.email,document_id:e.documentId,council_number:e.councilNumber,council_state:e.councilState,nationality:e.nationality,gender:e.gender,marital_status:e.maritalStatus,birth_date:e.birthDate||null,category:e.category,status:e.status,membership_type:e.membershipType,membership_started_at:e.membershipStartedAt||null,membership_expires_at:e.membershipExpiresAt||null,association_status:e.associationStatus,avatar_url:e.avatarUrl,notes:e.notes,role:e.role??"associado"}}function pa(e,t,a){return{id:e,...Fa(t),profile_addresses:(a.addresses??[]).map(o=>Ea(o,e)),profile_contacts:(a.contacts??[]).map(o=>Ua(o,e)),profile_education:(a.education??[]).map(o=>Ta(o,e)),profile_specialties:(a.specialties??[]).map(o=>Aa(o,e)),profile_roles:(a.roles??[]).map(o=>ka(o,e)),profile_titularities:(a.titularities??[]).map(o=>Ma(o,e)),profile_practices:(a.practices??[]).map(o=>Ra(o,e)),profile_contributions:(a.contributions??[]).map(o=>Oa(o,e))}}async function ma(e,t){E&&(await oe("profile_addresses",e,t.addresses??[],Ea),await oe("profile_contacts",e,t.contacts??[],Ua),await oe("profile_education",e,t.education??[],Ta),await oe("profile_specialties",e,t.specialties??[],Aa),await oe("profile_roles",e,t.roles??[],ka),await oe("profile_titularities",e,t.titularities??[],Ma),await oe("profile_practices",e,t.practices??[],Ra),await oe("profile_contributions",e,t.contributions??[],Oa))}async function oe(e,t,a,o){const{error:u}=await E.from(e).delete().eq("profile_id",t);if(u)throw u;if(!a.length)return;const d=a.map(N=>o(N,t)),{error:f}=await E.from(e).insert(d);if(f)throw f}const fa="profile-photos";async function Kt(e,t,a,o){var u;if(!E)throw new Error("Supabase não configurado para upload de fotos.");if(!(o!=null&&o.id))throw new Error("Faça login para enviar imagens.");try{const{data:d,error:f}=await E.from("profiles").select("user_id, tenant_id").eq("id",a).single();if(f)throw new Error("Perfil não encontrado.");const{data:N,error:$}=await E.from("user_roles").select("role").eq("user_id",o.id);if($)throw new Error("Não foi possível verificar permissões.");const _=(u=N==null?void 0:N[0])==null?void 0:u.role,w=_==="super_admin",S=_==="tenant_admin"&&d.tenant_id===t,k=_==="associado"&&d.user_id===o.id;if(!w&&!S&&!k)throw new Error("Você não tem permissão para fazer upload de foto para este perfil.");console.log(`Upload autorizado para ${_} em perfil ${a}`);const q=Wt(e.name)||"jpg",A=`${t??"global"}/${a}/${Yt()}.${q}`,{error:T}=await E.storage.from(fa).upload(A,e,{upsert:!0,cacheControl:"3600"});if(T)throw console.error("Erro ao fazer upload:",T),T;const{data:l}=E.storage.from(fa).getPublicUrl(A);return console.log("Upload concluído com sucesso:",l.publicUrl),l.publicUrl}catch(d){throw console.error("Erro em uploadAvatarToStorage:",d),d}}function Wt(e=""){const t=e.split(".");return t.length<=1?"":t.pop().toLowerCase()}function Yt(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`file-${Date.now()}`}function Ea(e,t){return{profile_id:t,type:e.type,street_type:e.streetType,street:e.street,number:e.number,complement:e.complement,district:e.district,city:e.city,state:e.state,country:e.country,postal_code:e.postalCode,is_primary:e.isPrimary??!1,is_correspondence:e.isCorrespondence??!1}}function Ua(e,t){return{profile_id:t,type:e.type,country_code:e.countryCode,area_code:e.areaCode,number:e.number,label:e.label,is_primary:e.isPrimary??!1}}function Ta(e,t){return{profile_id:t,level:e.level,institution:e.institution,course:e.course,started_at:e.startedAt||null,finished_at:e.finishedAt||null,hours:e.hours?Number(e.hours):null,notes:e.notes}}function Aa(e,t){return{profile_id:t,area:e.area,specialty:e.specialty,sub_specialty:e.rqeNumber??"",notes:e.notes}}function ka(e,t){return{profile_id:t,role_name:e.roleName,started_at:e.startedAt||null,finished_at:e.finishedAt||null}}function Ma(e,t){return{profile_id:t,title_name:e.titleName}}function Ra(e,t){return{profile_id:t,practice:e.practice==="other"?(e.customPractice??"").trim():e.practice}}function Oa(e,t){return{profile_id:t,reference_period:e.referencePeriod,due_date:e.dueDate||null,amount_due:e.amountDue?Number(e.amountDue):null,amount_paid:e.amountPaid?Number(e.amountPaid):null,status:e.status}}const ba=document.getElementById("root");ba&&Ha(ba).render(ze.createElement(Qt));
