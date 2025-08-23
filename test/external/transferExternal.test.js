// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');


// Testes
describe('TransferController', () => {
    describe('POST /transfer', () => {
        it.only('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {
            // 1) Capturar o Token
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: 'lucas',
                    password: '123'
                });

            const token = respostaLogin.body.token;
            

            // 2) Realizar a transferência
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "lucas",
                    to: "pedro",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });
    });
});