const request = require('supertest');
const { expect } = require('chai');

describe('Testes de tranferência', () => {
    it.only('Validar que é possível tranferir grana entre duas contas', async () => {
        const resposta = await request('http://localhost:4000/graphql')
            .post('')
            .send({
                query: `
                    mutation Login($username: String!, $password: String!) {
                        login(username: $username, password: $password) {
                            token
                        }
                    }`,
                variables: {
                    username: 'lucas',
                    password: '123'
                }
            });      
           //console.log(resposta.body.data.login.token)

        const respostaTransferencia = await request('http://localhost:4000/graphql')
            .post('')
            .set('Authorization', `Bearer ${resposta.body.data.login.token}`)
            .send({
                query: `
                    mutation Transfer($from: String!, $to: String!, $amount: Float!) {
                        transfer(from: $from, to: $to, amount: $amount) {
                            from
                            to
                            date
                            amount
                        }
                    }`,
                variables: {
                    from: 'lucas',
                    to: 'karina',
                    amount: 99
                }
            });

        expect(respostaTransferencia.status).to.equal(200);
    });
});