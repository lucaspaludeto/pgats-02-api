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
    });

    
    
});