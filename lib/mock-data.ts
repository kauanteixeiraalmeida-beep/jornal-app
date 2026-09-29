export type MediaType = 'imagem' | 'pdf' | 'vídeo';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  src: string;
  date: string;
  featured?: boolean;
}

export const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'Capa do Jornal',
    description: 'A edição de hoje reúne os principais acontecimentos e os destaques da semana.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?auto=format&fit=crop&w=1200&q=80',
    date: '29 de Setembro de 2026',
    featured: true,
  },
  {
    id: '2',
    title: 'Especial em PDF',
    description: 'Leitura do boletim oficial em PDF, disponível sem edição e em formato original.',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '28 de Setembro de 2026',
    featured: true,
  },
  {
    id: '3',
    title: 'Reportagem em Vídeo',
    description: 'Vídeo com reprodução direta no app, permitindo ouvir e assistir sem sair do portal.',
    type: 'vídeo',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    date: '27 de Setembro de 2026',
    featured: true,
  },
  {
    id: '4',
    title: 'Galeria de Fotos',
    description: 'Imagens do cenário do dia para o leitor acompanhar a matéria em detalhes.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80',
    date: '26 de Setembro de 2026',
    featured: true,
  },
  {
    id: '5',
    title: 'Matéria Especial',
    description: 'Documento completo em formato original, preservado para leitura sem alterações.',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '25 de Setembro de 2026',
    featured: true,
  },
  {
    id: '6',
    title: 'Notícia Local 1',
    description: 'Cobertura do cotidiano e dos acontecimentos locais em destaque para a comunidade.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1590080876020-5df1f8e61b7f?auto=format&fit=crop&w=600&q=80',
    date: '24 de Setembro de 2026',
  },
  {
    id: '7',
    title: 'Notícia em Vídeo',
    description: 'Acompanhe a matéria em vídeo e áudio diretamente do app.',
    type: 'vídeo',
    src: 'https://www.w3schools.com/html/movie.mp4',
    date: '23 de Setembro de 2026',
  },
  {
    id: '8',
    title: 'Relatório Completo',
    description: 'Leitura e consulta do relatório em PDF com informações oficiais.',
    type: 'pdf',
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    date: '22 de Setembro de 2026',
  },
  {
    id: '9',
    title: 'Entrevista do Dia',
    description: 'Imagem e texto com destaque para a entrevista mais comentada da semana.',
    type: 'imagem',
    src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80',
    date: '21 de Setembro de 2026',
  },
];
