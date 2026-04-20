import { defineCollection, z, reference } from 'astro:content';

// 1. Definição da Coleção de Autores
// No src/content/config.ts
const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.object({
      url: z.string().default('/images/authors/placeholder.jpg'),
      alt: z.string().default('Foto do autor'),
    }),
    // Adicione o .optional() aqui:
    social: z
      .object({
        website: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
      })
      .optional(),
  }),
});

// 2. Definição da Coleção do Blog
const blog = defineCollection({
  type: 'content', // 'content' para arquivos Markdown/MDX
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Relacionamos o post aos autores da coleção 'authors'
    authors: z.array(reference('authors')),
    pubDate: z.date(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    taxonomies: z.object({
      // categories: z.array(z.string()),
      categories: z.array(reference('categories')),
      tags: z.array(z.string()),
    }),
    draft: z.boolean().default(false),
  }),
});

// 3. Definição da Coleção Categorias
const categories = defineCollection({
  type: 'data', // OBRIGATÓRIO ser 'data' para ficheiros YAML/JSON
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.object({
      // Verifique se este bloco existe!
      url: z.string(),
      alt: z.string(),
    }),
  }),
});

// 4. Exportar as coleções
export const collections = { blog, authors, categories };
