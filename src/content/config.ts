import { defineCollection, z } from 'astro:content';

const loteSchema = z.object({
  numero: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  nome: z.string(),
  vagas: z.number().int().positive(),
  preco_individual: z.number().positive(),
  preco_dupla: z.number().positive(),
  preco_individual_str: z.string(),
  preco_dupla_str: z.string(),
  preco_cada_str: z.string(),
  status_default: z.enum(['ativo', 'aguardando', 'esgotado']),
  legenda: z.string(),
});

const momentoSchema = z.object({
  numero: z.number().int(),
  titulo: z.string(),
  horario: z.string(),
  subheadline: z.string(),
  saiCom: z.string(),
});

const pilarSchema = z.object({
  numero: z.number().int(),
  icone: z.enum(['contexto', 'volume', 'correcao']),
  titulo: z.string(),
  destaque: z.string(),
  descricao: z.string(),
  objecao: z.string().optional(),
});

const jornadaItemSchema = z.object({
  horario: z.string(),
  titulo: z.string(),
  descricao: z.string(),
});

const cardEntregavelSchema = z.object({
  titulo: z.string(),
  promessa: z.string(),
  descricao: z.string(),
  valor: z.string(),
  valorNum: z.number(),
});

const linhaTabelaSchema = z.object({
  alternativa: z.string(),
  preco: z.string().optional(),
  entrega: z.string(),
  naoEntrega: z.string(),
  destaque: z.boolean().optional(),
});

const cardLogisticaSchema = z.object({
  icone: z.enum(['relogio', 'pin', 'lanche', 'estacionamento', 'notebook', 'pessoas']),
  titulo: z.string(),
  destaque: z.string(),
  descricao: z.string(),
});

const faqItemSchema = z.object({
  id: z.string(),
  pergunta: z.string(),
  resposta: z.string(),
});

const workshopCollection = defineCollection({
  type: 'data',
  schema: z.object({
    workshop: z.object({
      date: z.string(),
      dateBR: z.string(),
      timeStart: z.string(),
      timeEnd: z.string(),
      address: z.string(),
      addressLocality: z.string(),
      addressRegion: z.string(),
      postalCode: z.string(),
      capacity: z.number().int().positive(),
    }),
    hero: z.object({
      headline: z.string(),
      accent: z.string(),
      headlineAfter: z.string(),
      subheadline: z.string(),
      bullets: z.array(z.string()).length(3),
      ctaLabel: z.string(),
    }),
    provas: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      subheadline: z.string(),
      credenciais: z.array(z.object({ titulo: z.string(), descricao: z.string() })).length(3),
    }),
    problema: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      subheadline: z.string(),
      autocriticas: z.array(z.string()).min(3),
      medos: z.array(z.string()).min(3),
    }),
    passo: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      pilares: z.array(pilarSchema).length(3),
      jornadaTitulo: z.string().optional(),
      jornada: z.array(jornadaItemSchema).length(3).optional(),
      momentos: z.array(momentoSchema).length(3).optional(),
    }),
    entregaveis: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      cards: z.array(cardEntregavelSchema).length(4),
      total: z.object({ label: z.string(), valor: z.string() }),
    }),
    porQuePresencial: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      checklistTitulo: z.string(),
      checklist: z.array(z.string()).min(4).max(6),
      reframe: z.object({
        principal: z.string(),
        complemento: z.string(),
      }),
      fechamento: z.string(),
      ctaLabel: z.string(),
      tabela: z.array(linhaTabelaSchema).optional(),
      sintese: z.string().optional(),
    }),
    paraQuem: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      lista: z.array(z.string()).min(6),
      bulletFinal: z.string(),
    }),
    recap: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      itens: z.array(z.string()).length(4),
      ancoragem: z.string(),
      ancoragemPos: z.string(),
    }),
    preco: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      ancoragem: z.array(z.object({ curso: z.string(), valor: z.string(), entrega: z.string(), destaque: z.boolean().optional() })).optional(),
      lotes: z.array(loteSchema).length(3),
      dupla: z.object({
        titulo: z.string(),
        explicacao: z.string(),
        legenda: z.string(),
        ctaLabel: z.string(),
      }),
      ctaLabel: z.string(),
    }),
    doisCaminhos: z.object({
      eyebrow: z.string(),
      headlineNeg: z.string(),
      headlinePos: z.string(),
      accent: z.string(),
      bulletNeg: z.string(),
      bulletPos: z.string(),
      ctaLabel: z.string(),
    }),
    autoridade: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      quemSou: z.string(),
      resultados: z.string(),
      porQue: z.string(),
      nome: z.string(),
      cargo: z.string(),
    }),
    garantia: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      bloco1: z.string(),
      bloco2: z.string(),
      seloTitulo: z.string(),
      seloCondicoes: z.array(z.string()).length(3),
      seloPergunta: z.string(),
      seloOpcoes: z.array(z.string()).length(2),
    }),
    logistica: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      cards: z.array(cardLogisticaSchema).length(6),
      fechamento: z.string(),
    }),
    faq: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      items: z.array(faqItemSchema).min(4).max(8),
      ctaPos: z.string(),
    }),
    ctaFinal: z.object({
      eyebrow: z.string(),
      headlinePre: z.string(),
      accent: z.string(),
      headlinePost: z.string(),
      bullets: z.array(z.string()).length(3),
      ctaLabel: z.string(),
      tagline: z.string(),
      taglineAccent: z.string(),
      taglineSub: z.string(),
    }),
  }),
});

export const collections = {
  workshop: workshopCollection,
};
