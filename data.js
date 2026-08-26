const RAW_DATA = [
  {
    "data": "2025-09-26",
    "etapa": "Terreno",
    "descricao": "Entrada do Financiamento",
    "fornecedor": "Adelio",
    "sacado": "Michel",
    "valor": 54000.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-04-14",
    "etapa": "Obra - Fundação",
    "descricao": "Concreto FCK25 - 30m³",
    "fornecedor": "Betamix",
    "sacado": "Michel",
    "valor": 16850.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-16",
    "etapa": "Obra - Alvenaria",
    "descricao": "2600 Blocos 14x19x39",
    "fornecedor": "Bloco Forte",
    "sacado": "Michel",
    "valor": 6500.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-20",
    "etapa": "Obra - Alvenaria",
    "descricao": "2400 Blocos 14x19x39 - 150 Canaleta - 200 Estrutural",
    "fornecedor": "Bloco Forte",
    "sacado": "Michel",
    "valor": 7570.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-21",
    "etapa": "Obra - Alvenaria",
    "descricao": "350 Canaletas  de 14x19x29",
    "fornecedor": "Bloco Forte",
    "sacado": "Iasmin",
    "valor": 1225.0,
    "tipo": "Obra"
  },
  {
    "data": "2025-09-11",
    "etapa": "Terreno",
    "descricao": "Vitoria do Terreno para Financiamento Caixa",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 750.0,
    "tipo": "Casa"
  },
  {
    "data": "2025-11-07",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 2323.08,
    "tipo": "Casa"
  },
  {
    "data": "2025-11-11",
    "etapa": "Terreno",
    "descricao": "ITBI",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 5400.0,
    "tipo": "Casa"
  },
  {
    "data": "2025-12-08",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 2428.06,
    "tipo": "Casa"
  },
  {
    "data": "2026-01-06",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-01-06",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1119.12,
    "tipo": "Casa"
  },
  {
    "data": "2026-02-06",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-02-06",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1111.87,
    "tipo": "Casa"
  },
  {
    "data": "2026-03-06",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-03-06",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1103.32,
    "tipo": "Casa"
  },
  {
    "data": "2026-04-02",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-04-02",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1095.85,
    "tipo": "Casa"
  },
  {
    "data": "2026-05-04",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-05-04",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1089.55,
    "tipo": "Casa"
  },
  {
    "data": "2026-06-01",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1080.79,
    "tipo": "Casa"
  },
  {
    "data": "2026-06-01",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-07-02",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1073.13,
    "tipo": "Casa"
  },
  {
    "data": "2026-07-02",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-03-19",
    "etapa": "Obra - Fundação",
    "descricao": "Furos",
    "fornecedor": "Carneiro",
    "sacado": "Michel",
    "valor": 2650.0,
    "tipo": "Obra"
  },
  {
    "data": "2025-12-03",
    "etapa": "Terreno",
    "descricao": "Taxas Cartório Transferência",
    "fornecedor": "Cartório",
    "sacado": "Michel",
    "valor": 3816.44,
    "tipo": "Casa"
  },
  {
    "data": "2026-04-23",
    "etapa": "Obra - Alvenaria",
    "descricao": "750 Blocos de Concreto Muro de Arrimo",
    "fornecedor": "ConcretBlocos",
    "sacado": "Michel",
    "valor": 4177.5,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-25",
    "etapa": "Obra - Alvenaria",
    "descricao": "250 Blocos estruturais de concreto",
    "fornecedor": "ConcretBlocos",
    "sacado": "Michel",
    "valor": 1102.5,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-29",
    "etapa": "Muro",
    "descricao": "Blocos",
    "fornecedor": "ConcretBlocos",
    "sacado": "Michel",
    "valor": 7548.5,
    "tipo": "Obra"
  },
  {
    "data": "2025-12-22",
    "etapa": "Terreno",
    "descricao": "Taxa do Condominio para Projeto",
    "fornecedor": "Condominio",
    "sacado": "Iasmin",
    "valor": 400.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-01-12",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 587.03,
    "tipo": "Casa"
  },
  {
    "data": "2026-02-09",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 537.03,
    "tipo": "Casa"
  },
  {
    "data": "2026-03-09",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 537.03,
    "tipo": "Casa"
  },
  {
    "data": "2026-04-10",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 537.03,
    "tipo": "Casa"
  },
  {
    "data": "2026-05-11",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 537.03,
    "tipo": "Casa"
  },
  {
    "data": "2026-07-11",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 598.77,
    "tipo": "Casa"
  },
  {
    "data": "2026-06-26",
    "etapa": "Elétrica",
    "descricao": "Fita isolante",
    "fornecedor": "Depósito Matão",
    "sacado": "Iasmin",
    "valor": 31.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-30",
    "etapa": "Obra - Alvenaria",
    "descricao": "Discos pra Maquita pra cortar parede",
    "fornecedor": "Depósito Matão",
    "sacado": "Iasmin",
    "valor": 83.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-16",
    "etapa": "Muro",
    "descricao": "50 sacos de Cimento",
    "fornecedor": "Depósito Tijuco",
    "sacado": "Michel",
    "valor": 1999.5,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-20",
    "etapa": "Obra - Alvenaria",
    "descricao": "Pedrisco + Pó de pedra",
    "fornecedor": "Distri. de Pedra e Areia",
    "sacado": "Michel",
    "valor": 6500.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-13",
    "etapa": "Obra - Alvenaria",
    "descricao": "Pedrisco",
    "fornecedor": "Distri. de Pedra e Areia",
    "sacado": "Michel",
    "valor": 2210.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-26",
    "etapa": "Obra - Alvenaria",
    "descricao": "13 metros de pedrisco",
    "fornecedor": "Distri. de Pedra e Areia",
    "sacado": "Michel",
    "valor": 2145.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-16",
    "etapa": "Reboco",
    "descricao": "Areia fina pra reboco",
    "fornecedor": "Distri. de Pedra e Areia",
    "sacado": "Iasmin",
    "valor": 2470.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-16",
    "etapa": "Obra - Alvenaria",
    "descricao": "Pedra e Pedrisco",
    "fornecedor": "Distri. de Pedra e Areia",
    "sacado": "Iasmin",
    "valor": 4355.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-12",
    "etapa": "Obra - Alvenaria",
    "descricao": "Aluguel Andaime",
    "fornecedor": "Loca Tudo",
    "sacado": "Michel",
    "valor": 760.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-12",
    "etapa": "Obra - Alvenaria",
    "descricao": "Aluguel Andaime",
    "fornecedor": "Loca Tudo",
    "sacado": "Michel",
    "valor": 760.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-13",
    "etapa": "Obra - Alvenaria",
    "descricao": "Aluguel Andaime",
    "fornecedor": "Loca Tudo",
    "sacado": "Michel",
    "valor": 760.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-13",
    "etapa": "Obra - Alvenaria",
    "descricao": "Aluguel Vibrador",
    "fornecedor": "Loca Tudo",
    "sacado": "Michel",
    "valor": 69.0,
    "tipo": "Obra"
  },
  {
    "data": "2025-12-03",
    "etapa": "Projeto",
    "descricao": "Projeto Luana",
    "fornecedor": "Luana",
    "sacado": "Iasmin",
    "valor": 5000.0,
    "tipo": "Casa"
  },
  {
    "data": "2025-12-19",
    "etapa": "Projeto",
    "descricao": "ART Luana",
    "fornecedor": "Luana",
    "sacado": "Iasmin",
    "valor": 103.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-02-12",
    "etapa": "Projeto",
    "descricao": "Placa - projeto aprovado",
    "fornecedor": "Luana",
    "sacado": "Iasmin",
    "valor": 268.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-03-09",
    "etapa": "Projeto",
    "descricao": "Resp. Técnica - ART Luana",
    "fornecedor": "Luana",
    "sacado": "Iasmin",
    "valor": 108.39,
    "tipo": "Casa"
  },
  {
    "data": "2026-05-27",
    "etapa": "Laje",
    "descricao": "Madeiras para escoramento",
    "fornecedor": "Madebras",
    "sacado": "Iasmin",
    "valor": 5000.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-22",
    "etapa": "Laje",
    "descricao": "Tabuas e Sarrafos",
    "fornecedor": "Madebras",
    "sacado": "Michel",
    "valor": 1829.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-26",
    "etapa": "Laje",
    "descricao": "20 Pontaletes",
    "fornecedor": "Madebras",
    "sacado": "Michel",
    "valor": 344.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-29",
    "etapa": "Muro",
    "descricao": "Lona",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 243.84,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-08",
    "etapa": "Elétrica",
    "descricao": "Conduites",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 1754.13,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-15",
    "etapa": "Elétrica",
    "descricao": "Luvas para Conduites",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 83.77,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-17",
    "etapa": "Elétrica",
    "descricao": "Caixas de passagem e emenda + Conduites",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 980.32,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-07",
    "etapa": "Elétrica",
    "descricao": "Caixinhas para Arandelas",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 99.8,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-29",
    "etapa": "Hidraulica",
    "descricao": "Ralo Inox",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 119.97,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-29",
    "etapa": "Elétrica",
    "descricao": "Conduites e Caixinhas",
    "fornecedor": "Mercado Livre",
    "sacado": "Iasmin",
    "valor": 685.37,
    "tipo": "Obra"
  },
  {
    "data": "2026-02-23",
    "etapa": "Obra - Inicio",
    "descricao": "Agua e Luz Padrão + Barracão",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 6350.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-02-26",
    "etapa": "Obra - Inicio",
    "descricao": "Corrente + Cadeado",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 130.95,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-02",
    "etapa": "Obra - Inicio",
    "descricao": "Material para Demarcação da obra + Vaso sanit",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 4550.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-11",
    "etapa": "Obra - Fundação",
    "descricao": "Ferragens",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 12700.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-19",
    "etapa": "Obra - Inicio",
    "descricao": "Tubulação, cotovelos e torneira",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 254.01,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-24",
    "etapa": "Obra - Inicio",
    "descricao": "Dois sacos Cimento para Refazer Luz e Agua",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 63.98,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-09",
    "etapa": "Obra - Fundação",
    "descricao": "Ferragens Garagem",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 1850.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-15",
    "etapa": "Obra - Alvenaria",
    "descricao": "Cimento e Impermeabilizante",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 2859.9,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-15",
    "etapa": "Obra - Fundação",
    "descricao": "Brocha e Pincel + Curva 3/4 marrom",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 93.4,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-24",
    "etapa": "Obra - Alvenaria",
    "descricao": "Mangueira + Vedacite",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 229.98,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-24",
    "etapa": "Obra - Alvenaria",
    "descricao": "Treliças + Tubulação + Conduites",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 1660.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-30",
    "etapa": "Obra - Alvenaria",
    "descricao": "Ferragens - Colunas",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 1173.78,
    "tipo": "Obra"
  },
  {
    "data": "2026-04-30",
    "etapa": "Obra - Alvenaria",
    "descricao": "Discos de Maquita",
    "fornecedor": "Nascimento",
    "sacado": "Iasmin",
    "valor": 34.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-05",
    "etapa": "Obra - Alvenaria",
    "descricao": "Malha Pop",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 300.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-08",
    "etapa": "Obra - Alvenaria",
    "descricao": "Cimento 50 sacos",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 2099.5,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-08",
    "etapa": "Obra - Alvenaria",
    "descricao": "Aditivo p/ Cimento",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 179.9,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-12",
    "etapa": "Obra - Alvenaria",
    "descricao": "Ferragens",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 2800.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-28",
    "etapa": "Laje",
    "descricao": "Arames",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 268.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-29",
    "etapa": "Obra - Alvenaria",
    "descricao": "Impermeabilizante + Neutrol + Rolo",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 1072.9,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-08",
    "etapa": "Laje",
    "descricao": "Discos de Maquita - concreto, aço e madeira",
    "fornecedor": "Nascimento",
    "sacado": "Iasmin",
    "valor": 256.32,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-17",
    "etapa": "Laje",
    "descricao": "Arame + pregos",
    "fornecedor": "Nascimento",
    "sacado": "Iasmin",
    "valor": 272.3,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-22",
    "etapa": "Hidraulica",
    "descricao": "Canos e Joelhos",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 819.9,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-22",
    "etapa": "Laje",
    "descricao": "Pregos",
    "fornecedor": "Nascimento",
    "sacado": "Iasmin",
    "valor": 74.5,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-03",
    "etapa": "Hidraulica",
    "descricao": "Canos, Joelhos e Cotovelos",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 1569.9,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-14",
    "etapa": "Obra - Alvenaria",
    "descricao": "Cimento",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 1999.5,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-17",
    "etapa": "Obra - Alvenaria",
    "descricao": "Arame",
    "fornecedor": "Nascimento",
    "sacado": "Michel",
    "valor": 478.88,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-15",
    "etapa": "Elétrica",
    "descricao": "Conduites 1 Polegada e meia",
    "fornecedor": "Parafutrecos",
    "sacado": "Iasmin",
    "valor": 226.28,
    "tipo": "Obra"
  },
  {
    "data": "2025-12-22",
    "etapa": "Terreno",
    "descricao": "Taxa registro do projeto na Prefeitura",
    "fornecedor": "Prefeitura",
    "sacado": "Iasmin",
    "valor": 36.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-02-26",
    "etapa": "Obra - Inicio",
    "descricao": "Dobradiças",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 40.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-16",
    "etapa": "Serviços",
    "descricao": "Agua e Luz Padrão + Barracão",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 1550.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-26",
    "etapa": "Serviços",
    "descricao": "Agua e Luz Padrão - Refeito",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 750.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-27",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 5050.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-02",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 9000.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-28",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Iasmin",
    "valor": 19000.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-26",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Iasmin",
    "valor": 12200.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-11",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 19650.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-24",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Iasmin",
    "valor": 15000.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-19",
    "etapa": "Obra - Inicio",
    "descricao": "Agua - Fura Fila",
    "fornecedor": "Sabesp",
    "sacado": "Iasmin",
    "valor": 300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-03-31",
    "etapa": "Obra - Inicio",
    "descricao": "Fura Fila Agua",
    "fornecedor": "Sabesp",
    "sacado": "Iasmin",
    "valor": 550.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-02-18",
    "etapa": "Obra - Fundação",
    "descricao": "Terraplanagem",
    "fornecedor": "Terraplanagem",
    "sacado": "Michel",
    "valor": 6500.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-03-20",
    "etapa": "Obra - Fundação",
    "descricao": "Ajustes Trator Tiago",
    "fornecedor": "Tiago",
    "sacado": "Michel",
    "valor": 800.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-01-06",
    "etapa": "Terreno",
    "descricao": "Topografia",
    "fornecedor": "Topografia",
    "sacado": "Michel",
    "valor": 1800.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-07-03",
    "etapa": "Laje",
    "descricao": "Concreto FCK25 - 16,5m³",
    "fornecedor": "Vale Concreto",
    "sacado": "Michel",
    "valor": 9100.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-20",
    "etapa": "Laje",
    "descricao": "Ferragens Amarração da Laje + Escada Lateral",
    "fornecedor": "Vale do Aço",
    "sacado": "Michel",
    "valor": 5660.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-28",
    "etapa": "Laje",
    "descricao": "Garagem e 1° Andar",
    "fornecedor": "Vale do Aço",
    "sacado": "Michel",
    "valor": 7468.27,
    "tipo": "Obra"
  },
  {
    "data": "2026-05-28",
    "etapa": "Muro",
    "descricao": "Ferragens",
    "fornecedor": "Vale do Aço",
    "sacado": "Michel",
    "valor": 13531.73,
    "tipo": "Obra"
  },
  {
    "data": "2026-06-16",
    "etapa": "Laje",
    "descricao": "24 Malhas POP",
    "fornecedor": "Vale do Aço",
    "sacado": "Michel",
    "valor": 909.6,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-15",
    "etapa": "Laje",
    "descricao": "Ferragens segundo andar",
    "fornecedor": "Vale do Aço",
    "sacado": "Iasmin",
    "valor": 4800.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-07-27",
    "etapa": "Laje",
    "descricao": "Laje Superior + Malha pop",
    "fornecedor": "Vale do Aço",
    "sacado": "Iasmin",
    "valor": 3596.67,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-02",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Michel",
    "valor": 1065.72,
    "tipo": "Casa"
  },
  {
    "data": "2026-08-02",
    "etapa": "Terreno",
    "descricao": "Financiamento",
    "fornecedor": "Caixa",
    "sacado": "Iasmin",
    "valor": 1300.0,
    "tipo": "Casa"
  },
  {
    "data": "2026-08-11",
    "etapa": "Condominio",
    "descricao": "Condominio",
    "fornecedor": "Condominio",
    "sacado": "Michel",
    "valor": 537.03,
    "tipo": "Casa"
  },
  {
    "data": "2026-08-07",
    "etapa": "Laje",
    "descricao": "Concreto FCK25 - 9m³ - Laje Superior",
    "fornecedor": "Vale Concreto",
    "sacado": "Michel",
    "valor": 5365.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-12",
    "etapa": "Obra - Alvenaria",
    "descricao": "Aluguel Vibrador",
    "fornecedor": "Loca Tudo",
    "sacado": "Michel",
    "valor": 760.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-15",
    "etapa": "Serviços",
    "descricao": "Adiantamento",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 18000.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-15",
    "etapa": "Obra - Alvenaria",
    "descricao": "Materiais comprados pelo Reginaldo",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 850.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-18",
    "etapa": "Reboco",
    "descricao": "Pó de Pedra",
    "fornecedor": "Distri. de Pedra e Areia",
    "sacado": "Iasmin",
    "valor": 2145.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-18",
    "etapa": "Esquadrias",
    "descricao": "Esquadrias parcela 1 - 25%",
    "fornecedor": "Fortline",
    "sacado": "Iasmin",
    "valor": 12250.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-18",
    "etapa": "Reboco",
    "descricao": "50 sacos de Cimento + Pregos",
    "fornecedor": "Nascimento",
    "sacado": "Valter",
    "valor": 2030.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-25",
    "etapa": "Muro",
    "descricao": "Arame",
    "fornecedor": "Reginaldo",
    "sacado": "Michel",
    "valor": 140.0,
    "tipo": "Obra"
  },
  {
    "data": "2026-08-26",
    "etapa": "Escada",
    "descricao": "Madeiras - Maderite e Caibro",
    "fornecedor": "Madebras",
    "sacado": "Valter",
    "valor": 930.0,
    "tipo": "Obra"
  }
];
