import { Locale } from "adminjs";

export const locale: Locale = {
  language: "pt-BR",
  translations: {
    actions: {
      new: "Criar novo(a)",
      edit: "Editar",
      show: "Exibir",
      delete: "Excluir",
      bulkDelete: "Excluir todos",
      list: "Listar",
    },
    buttons: {
      save: "Salvar",
      addNewItem: "Adicionar novo item",
      filter: "Filtrar",
      applyChanges: "Pesquisar",
      resetFilter: "Redefinir",
      confirmRemovalMany: "Confirma a remoção de {{count}} registro?",
      confirmRemovalMany_plural: "Confirma a remoção de {{count}} registros?",
      logout: "Sair",
      login: "Entrar",
      seeTheDocumentation: "Ver: <1>a documentação</1>",
      createFirstRecord: "Criar primeiro registro",
      resetPassword: "Redefinir senha",
    },
    labels: {
      navigation: "Navegação",
      pages: "Páginas",
      selectedRecords: "Selecionado ({{selected}})",
      filters: "Filtros",
      adminVersion: "Admin: {{version}}",
      appVersion: "App: {{version}}",
      loginWelcome: "Bem-vindo",
      risks: "Riscos",
      categories: "Categorias",
      entities: "Entidades",
      users: "Usuários",
      treatments: "Tratamentos",
      areas: "Áreas",
      types_origins: "Tipos de Origem",
      risks_origins: "Origem do Risco",
      periods: "Períodos",
      probabilities: "Probabilidades",
      impacts: "Impactos",
      types_treatments: "Tipos de Tratamento",
      status_treatments: "Status",
    },
    properties: {
      id: "ID",
      birth: "Data de Nascimento",
      email: "E-mail",
      password: "Senha",
      role: "Perfil",
      year: "Ano",
      algorithm: "Algoritmo",
      event: "Evento de Risco",
      cause: "Causa",
      consequence: "Consequência",
      priority: "Em Destaque",
      deadline: "Prazo",
      areaId: "Área",
      categoryId: "Categoria",
      types_originId: "Tipo de Origem",
      risks_originId: "Origem",
      periodId: "Período",
      probabilityId: "Probabilidade",
      impactId: "Impacto",
      types_treatmentId: "Tipo de Tratamento",
      status_treatmentId: "Status",
      riskId: "Risco",
      entityId: "Entidade",
      position: "Posição na Categoria",
      createdAt: "Criado em",
      updatedAt: "Atualizado em",
      from: "De",
      to: "Até",
      description: "Descrição",
    },
    resources: {
      areas: {
        properties: {
          name: "Área",
        },
      },
      categories: {
        properties: {
          name: "Categoria",
        },
      },
      entities: {
        properties: {
          name: "Entidade",
        },
      },
      impacts: {
        properties: {
          name: "Impacto",
        },
      },
      periods: {
        properties: {
          name: "Período",
        },
      },
      probabilities: {
        properties: {
          name: "Probabilidade",
        },
      },
      risks_origins: {
        properties: {
          name: "Origem",
        },
      },
      risks: {
        properties: {
          name: "Indicação da Origem",
          userId: "Usuário",
        },
      },
      status_treatments: {
        properties: {
          name: "Status",
        },
      },
      treatments: {
        properties: {
          name: "Medida de Tratamento",
          user: "Responsável",
          notes: "Observações",
        },
      },
      types_origins: {
        properties: {
          name: "Tipo de Origem",
        },
      },
      types_treatments: {
        properties: {
          name: "Tipo de Tratamento",
        },
      },
      users: {
        properties: {
          name: "Nome",
        },
      },
    },
    messages: {
      successfullyBulkDeleted: "{{count}} registro removido com sucesso",
      successfullyBulkDeleted_plural:
        "{{count}} registros removidos com sucesso",
      successfullyDeleted: "Registro excluído com sucesso",
      successfullyUpdated: "Registro atualizado com sucesso",
      thereWereValidationErrors:
        "Existem erros de validação - confira-os abaixo",
      forbiddenError:
        "Você não pode executar a ação {{actionName}} em {{resourceId}}",
      anyForbiddenError: "Você não pode executar a ação solicitada",
      successfullyCreated: "Novo registro criado com sucesso",
      bulkDeleteError:
        "Houve um erro ao excluir os registros. Verifique os logs para mais informações",
      errorFetchingRecords:
        "Houve um erro ao obter os registros. Verifique os logs para mais informações",
      errorFetchingRecord:
        "Houve um erro ao obter o registro, Verifique os logs para mais informações",
      noRecordsSelected: "Você não selecionou nenhum registro",
      theseRecordsWillBeRemoved: "O registro a seguir será excluído",
      theseRecordsWillBeRemoved_plural: "Os registros a seguir serão excluídos",
      pickSomeFirstToRemove:
        "Para remover registros você precisa selecioná-los primeiro",
      error404Resource:
        "Recurso identificado pelo id: {{resourceId}} não pôde ser encontrado",
      error404Action:
        "Recurso identificado pelo id: {{resourceId}} não possui uma ação com nome: {{actionName}} ou você não está autorizado a usá-la!",
      error404Record:
        "Recurso identificado pelo id: {{resourceId}} não possui um registro com id: {{recordId}} ou você não está autorizado a acessá-lo!",
      seeConsoleForMore:
        "Veja o console de desenvolvimento para mais detalhes...",
      noActionComponent:
        "Você precisa implementar componente de ação para a sua Ação",
      noRecordsInResource: "Não existem registros neste recurso",
      noRecords: "Nenhum registro",
      confirmDelete:
        "Você tem certeza que deseja remover este item? Essa ação é irreversível",
      welcomeOnBoard_title: "Bem-vindo à bordo!",
      welcomeOnBoard_subtitle:
        "Agora você é um de nós! Preparamos algumas dicas para você começar:",
      //   loginWelcome:
      //     "Ao AdminJS - o melhor framework admin para aplicações Node.js, baseado em React.",
      loginWelcome:
        "Gestão de riscos da SEDET - Secretaria do Desenvolvimento Econômico e Trabalho do Ceará",
      addingResources_title: "Adicionando Recursos",
      addingResources_subtitle: "Como adicionar novos recursos à barra lateral",
      customizeResources_title: "Personalizar Recursos",
      customizeResources_subtitle:
        "Definindo comportamento, adicionando propriedades e mais...",
      customizeActions_title: "Personalizar Ações",
      customizeActions_subtitle: "Modificar ações existentes e adicionar novas",
      writeOwnComponents_title: "Escrever Componentes",
      writeOwnComponents_subtitle: "Como modificar o visual do AdminJS",
      customDashboard_title: "Dashboard Personalizado",
      customDashboard_subtitle:
        "Como modificar esta página e adicionar novas páginas à barra lateral",
      roleBasedAccess_title: "Controle de Acesso Baseado em Perfil",
      roleBasedAccess_subtitle:
        "Criar perfis de usuário e permissões no AdminJS",
      community_title: "Junte-se à comunidade slack",
      community_subtitle:
        "Fale com os criadores do AdminJS e outros usuários do AdminJS",
      foundBug_title: "Encontrou um Bug? Precisa de alguma melhoria?",
      foundBug_subtitle: "Levante um issue em nosso repositório no GitHub",
      needMoreSolutions_title: "Precisa de mais soluções avançadas?",
      needMoreSolutions_subtitle:
        "Estamos aqui para te entregar um belo desenho de UX/UI e software feito sob medida baseado (não apenas) no AdminJS",
      invalidCredentials: "Nome de usuário e/ou senha incorretos",
    },
  },
};
