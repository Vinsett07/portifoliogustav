# Gustavo Aires — Portfólio profissional

Site institucional pessoal que conecta **produção industrial, qualidade, operações, desenvolvimento de software e inteligência artificial**.

**Site público existente:** https://portfoliogustavoaires.netlify.app/  
**Repositório de origem:** https://github.com/Vinsett07/portifoliogustav  
**Perfil profissional:** https://www.linkedin.com/in/gustavo-aires-a66497351

> **Publicação:** o site Netlify atual foi criado com *Drop Deployment* e não está vinculado a este repositório. Os commits nesta pasta **não atualizam automaticamente** a URL pública. Para colocar esta nova versão no ar é necessário enviar o pacote de publicação ao **projeto Netlify já existente**.

## Conteúdo

- Apresentação e competências em indústria, qualidade, gestão e tecnologia.
- Linha do tempo de experiências: **Yamaha Motor da Amazônia, Mottu e G&A Promotoria**.
- Estudo de caso da G&A Promotoria: treinamento, dados operacionais, 254 atendimentos e 35 pontos de venda registrados no controle apresentado.
- Estudo de caso técnico **VINSETT Budget API**, preservado da versão publicada anteriormente.
- Projetos **VINSETT Forge AI, AI Software Factory, VINSETT Sinais e VINSETT Budget API**, com links para seus repositórios.
- Catálogo de **12 cursos e certificações** (total **480 horas** nos cursos cuja carga foi informada) com filtros e pesquisa.
- **11 comprovantes PDF** disponíveis na pasta `certificados/`; documentos com CPF ou RG foram preparados como versões públicas com os respectivos números ocultados.
- Currículo atualizado para download e links profissionais.

O certificado **Google — AI for App Deployment** consta do catálogo, porém seu PDF não foi fornecido e, por isso, não aparece como documento para download. Treinamentos internos realizados na Yamaha (NR-12, Brigada, Pneumática e Talhas) estão descritos separadamente; não são somados às 480 horas por falta de documentação da respectiva carga horária.

## Cursos registrados

| Curso | Instituição | Horas |
|---|---|---:|
| Inspetor da Qualidade | CAE | 120 |
| Matemática Básica | CAE | 80 |
| Gestão de Cooperativa | IFAM | 60 |
| TBO — Treinamento Básico Operacional | Mega Cursos | 20 |
| Fundamentos Básicos de Energia Fotovoltaica Residencial | IFTM / Aprenda Mais | 20 |
| React: Construindo Single Page Applications Dinâmicas | IFRS / Aprenda Mais | 40 |
| Python Fundamental 1 | IFSC / Aprenda Mais | 20 |
| Node.js: Introdução ao Desenvolvimento de APIs Modernas | IFRS / Aprenda Mais | 40 |
| HTML5: Fundamentos para Construção de Páginas Web Modernas | IFRS / Aprenda Mais | 40 |
| Banco de Dados 1: fundamentos | IFRS / Aprenda Mais | 20 |
| Análise e Projeto de Software | IFRS / Aprenda Mais | 20 |
| AI for App Deployment | Google | Não informada |

**Total com horas documentadas: 480h.** A presença de uma certificação no portfólio não significa que o curso tenha reconhecimento individual pelo MEC; os nomes das instituições são informados conforme os comprovantes.

## Arquivos

```
index.html                      Página principal
styles.css                      Estilo e responsividade
script.js                       Navegação, filtros e busca
Curriculo_Gustavo_Aires.pdf     Currículo mais recente
certificados/*.pdf              11 certificados para consulta pública
netlify.toml                    Configuração de deploy e segurança
robots.txt / sitemap.xml        Indexação
```

## Publicar sem criar outro site

1. Abra https://app.netlify.com/projects/portfoliogustavoaires/deploys.
2. Confira que está no projeto **portfoliogustavoaires** existente.
3. Utilize a publicação manual (arrastar e soltar) da pasta com estes arquivos ou do ZIP de publicação preparado.
4. Aguarde **Ready/Published**. Confira no endereço público os dois estudos de caso, o catálogo dos cursos, 11 documentos PDF e os links profissionais.

A configuração de build é estática: `publish = "."`, sem compilação ou dependências npm.

## Privacidade e manutenção

- Não publique versões originais de certificados que contenham CPF, RG ou outros dados pessoais desnecessários.
- As versões públicas mantêm as informações profissionais relevantes, ocultando esses números.
- Verifique cursos, datas e detalhes pessoais sempre que o currículo for atualizado.
- Este repositório usa código estático local. Não é necessário incorporar repositórios terceiros da lista My Stack para habilitar hospedagem.
