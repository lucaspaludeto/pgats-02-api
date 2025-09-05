// Bibliotecas
const request = require('supertest');
const { expect } = require('chai');


// Testes
describe('TransferController', () => {
    describe('POST /transfer', () => {


        beforeEach(async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: 'lucas',
                    password: '123'
                });

           token = respostaLogin.body.token;
        });

        it('Quando informo remetente e destinatário inexistentes, recebo 400', async () => {

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

        it('Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "lucas",
                    to: "karina",
                    amount: 50
                });

                console.log(resposta.body)
            expect(resposta.status).to.equal(201);
            
            // Validação com um Fixture
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json')
            delete resposta.body.date;
            delete respostaEsperada.date; 
            expect(resposta.body).to.deep.equal(respostaEsperada);
        });
    });
});