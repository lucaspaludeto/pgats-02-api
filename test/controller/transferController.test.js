// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../app');

// Mock
const transferService = require('../../service/transferService')

// Testes
describe('TransferController', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "lucas",
                    to: "karina",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });

        it('Usando Mocks: Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            // Mockar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

                const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "pedro",
                    to: "rafael",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');

            //Reseto o Mock
            sinon.restore();
        });

        it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            // Preparando os Dados
            // Carregar o arquivo
            // Preparar a forma de ignorar os campos dinâmicos

            //Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "lucas",
                to: "karina",
                amount: 400,
                date: new Date().toISOString()
            });

            const resposta = await request (app)
                .post('/transfer')
                .send({
                    from: "lucas",
                    to: "karina",
                    amount: 400
                });

            expect(resposta.status).to.equal(201);

            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json');
            delete resposta.body.date;
            delete respos
            expect(resposta.body).to.deep.equal(respostaEsperada)

            // Um expect para comparar a Resposta.body com a string contifa no arquivo
            // expect(resposta.body).to.have.property('from', 'lucas')
            // expect(resposta.body).to.have.property('to', 'karina')
            // expect(resposta.body).to.have.property('value', '100')

            console.log(resposta.body)

            //Reseto o Mock
            sinon.restore();
        })
    });

    
    
});