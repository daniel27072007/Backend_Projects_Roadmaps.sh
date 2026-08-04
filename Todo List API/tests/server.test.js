import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';

describe('Complete CRUD and Authentication Flow', () => {
    // Variáveis globais para compartilhar dados entre os passos de teste
    let token;
    let userId;
    let taskId;

    // Dados dinâmicos para garantir que NUNCA haja conflito de e-mail duplicado
    const testTimestamp = Date.now();
    const testUser = {
        name: 'Test User',
        email: `tester_${testTimestamp}@test.com`,
        password: 'securepassword123'
    };

    // LIMPEZA APÓS OS TESTES: Apaga tudo o que este teste criou
    afterAll(async () => {
        try {
            if (mongoose.connection.readyState === 1) {
                // Remove o usuário criado usando o e-mail único gerado
                await mongoose.connection.db.collection('users').deleteOne({ email: testUser.email });
                
                // Se uma tarefa chegou a ser criada, remove ela pelo ID
                if (taskId) {
                    const { ObjectId } = mongoose.Types;
                    await mongoose.connection.db.collection('todos').deleteOne({ _id: new ObjectId(taskId) });
                }
            }
        } catch (error) {
            console.error('Erro ao limpar banco de dados de teste:', error);
        } finally {
            // Fecha a conexão com segurança e aguarda o encerramento do Node
            await mongoose.connection.close();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    });

    // PASSO 1: REGISTRO DO USUÁRIO
    it('1. Should register a new user successfully', async () => {
        const response = await request(app)
            .post('/register')
            .send(testUser);

        expect(response.statusCode).toBe(201); 
        expect(response.body).toHaveProperty('_id');
        
        userId = response.body._id; 
    });

    // PASSO 2: LOGIN DO USUÁRIO CADASTRADO
    it('2. Should login with the registered user and return a JWT token', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token'); 

        token = response.body.token; 
    });

    // PASSO 3: CRIAR UMA TAREFA (CREATE)
    it('3. Should create a new task for the authenticated user', async () => {
        const response = await request(app)
            .post('/todos')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                title: 'Finish unit testing setup',
                completed: false
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');

        taskId = response.body._id; 
    });

    // PASSO 4: LISTAR TAREFAS (READ)
    it('4. Should return status 200 when getting the tasks', async () => {
        const response = await request(app)
            .get('/todos')
            .set('Authorization', `Bearer ${token}`); 

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); 
    });

    // PASSO 5: DELETAR A TAREFA (DELETE)
    it('5. Should delete the created task by ID', async () => {
        const response = await request(app)
            .delete(`/todos/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});