const express = require("express");
const path = require("path");
const cors = require("cors")

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
const colaboradores = [
  {
    id: 1,
    nome: "admin",
    codigoChave: "FORD123456",
    email: "admin@email.com",
    senha: "123456"
  },
];

const clientes = [];

const codigosValidos = ["FORD123456", "FORD789012", "FORD987654"];

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post("/login", async (req, res) => {
    try {

        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: "O campo de usuário ou senha não foi preenchido!"
            });
        }

        const colaborador = colaboradores.find(
          c => c.nome === nome && c.senha === senha
        );

        if (!colaborador) {
          return res.status(401).json({
            message: "O nome de usuário ou senha está incorreto ou não foi cadastrado!"
          });
        }

        return res.status(200).json({
          id: colaborador.id,
          nome: colaborador.nome,
          email: colaborador.email
        });


    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!",
            error: String(error)
        });
    }
});

app.get("/vehicles", (req, res) => {
    try {
        const vehicles = [
            {
                id: 1,
                vehicle: "Ranger",
                volumetotal: 145760,
                connected: 70000,
                softwareUpdates: 27550,
                img: "http://localhost:3001/img/ranger.png"
            },
            {
                id: 2,
                vehicle: "Mustang",
                volumetotal: 1500,
                connected: 500,
                softwareUpdates: 750,
                img: "http://localhost:3001/img/mustang.png"
            },
            {
                id: 3,
                vehicle: "Territory",
                volumetotal: 4560,
                connected: 4000,
                softwareUpdates: 3050,
                img: "http://localhost:3001/img/territory.png"
            },
            {
                id: 4,
                vehicle: "Bronco Sport",
                volumetotal: 7560,
                connected: 4060,
                softwareUpdates: 2050,
                img: "http://localhost:3001/img/broncoSport.png"
            }
        ];

        return res.status(200).json({ vehicles });

    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
});

app.post("/vehicleData", (req, res) => {
    try {
        const { vin } = req.body

        switch (vin) {
            case "2FRHDUYS2Y63NHD22454":
                return res.status(200).json({
                    id: 1,
                    odometro: 23344,
                    nivelCombustivel: 76,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2RFAASDY54E4HDU34874":
                return res.status(200).json({
                    id: 2,
                    odometro: 130000,
                    nivelCombustivel: 19,
                    status: "off",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2FRHDUYS2Y63NHD22455":
                return res.status(200).json({
                    id: 3,
                    odometro: 50000,
                    nivelCombustivel: 90,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2RFAASDY54E4HDU34875":
                return res.status(200).json({
                    id: 4,
                    odometro: 10000,
                    nivelCombustivel: 25,
                    status: "off",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2FRHDUYS2Y63NHD22654":
                return res.status(200).json({
                    id: 5,
                    odometro: 23544,
                    nivelCombustivel: 76,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            case "2FRHDUYS2Y63NHD22854":
                return res.status(200).json({
                    id: 6,
                    odometro: 23574,
                    nivelCombustivel: 76,
                    status: "on",
                    lat: -12.2322,
                    long: -35.2314
                });

            default:
                return res.status(400).json({
                    message: "Código VIN utilizado não foi encontrado!"
                });
        }


    } catch (error) {
        return res.status(500).json({
            message: "Falha na comunicação com o servidor!"
        });
    }
})

app.post("/colaboradores", (req, res) => {
  try {
    const { nome, codigoChave, email, senha } = req.body;

    if (!nome || !codigoChave || !email || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    if (!codigosValidos.includes(codigoChave)) {
      return res.status(401).json({ message: "Código-chave inválido." });
    }

    const nomeJaExiste = colaboradores.find(c => c.nome === nome);
    const emailJaExiste = colaboradores.find(c => c.email === email);

    if (nomeJaExiste || emailJaExiste) {
      return res.status(409).json({ message: "Usuário ou e-mail já cadastrado." });
    }

    const novoColaborador = {
      id: colaboradores.length + 1,
      nome,
      codigoChave,
      email,
      senha
    };

    colaboradores.push(novoColaborador);

    return res.status(201).json({
      message: "Colaborador cadastrado com sucesso!",
      colaborador: novoColaborador
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro interno no servidor",
      error: String(error)
    });
  }
});

app.post("/clientes", (req, res) => {
  const { nome, telefone, cpf, cidade, data, hora } = req.body;

  if (!nome || !telefone || !cpf || !cidade || !data || !hora) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  const novoCliente = {
    nome,
    telefone,
    cpf,
    cidade,
    data,
    hora,
    status: "nao_contatado"
  };

  clientes.push(novoCliente);
  return res.status(201).json({ message: "Cliente registrado com sucesso!", cliente: novoCliente });
});

app.get("/clientes", (req, res) => {
  return res.status(200).json({ clientes });
});


app.get("/colaboradores/checar-nome", (req, res) => {
  const { nome } = req.query;

  const existe = colaboradores.some(c => c.nome === nome);
  return res.status(200).json(existe);
});

app.get("/colaboradores/checar-email", (req, res) => {
  const { email } = req.query;

  const existe = colaboradores.some(c => c.email === email);
  return res.status(200).json(existe);
});

app.listen(3001, () => {
    console.log("API running on http://localhost:3001/");
});
