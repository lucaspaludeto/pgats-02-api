// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');


// Testes
describe('TransferController', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .send({
                    from: "lucas",
                    to: "karina",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });
    });
});