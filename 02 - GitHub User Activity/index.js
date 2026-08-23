#!/usr/bin/env node
import https from 'https';

const gitHubUsername = process.argv[2];

if(!gitHubUsername){
    console.error('Erro: Você deve fornecer um nome de usuário do GitHub.');
    console.error('Exemplo de uso: github-activity seu-usuario');
    process.exit(1);
}

const url = `https://api.github.com/users/${gitHubUsername}/events`;
const opcoes = {
    headers: {
        'User-Agent': 'github-activity-cli'
    }
};

const request = https.get(url, opcoes, (response)=>{
    if(response.statusCode === 404){
        console.error(`[Erro]: O usuário "${gitHubUsername}" não foi encontrado no GitHub.`);
        return;
    }
    else if(response.statusCode !== 200){
        console.error(`[Erro]: A API do GitHub respondeu com o código de status ${response.statusCode}`);
        return;
    }

    let gitHubGetDataString = '';
    response.on('data', (pacote)=>{
        gitHubGetDataString += pacote;
    });
    response.on('end', ()=>{
        try{
            const gitHubGetDataArray = JSON.parse(gitHubGetDataString);

            if(gitHubGetDataArray.length === 0){
                console.log(`Nenhuma atividade pública recente encontrada para o usuário ${gitHubUsername}.`);
                return;
            }

            gitHubGetDataArray.forEach(element => {
                const typeOfAction = element.type;
                const repoName = element.repo.name;
                if(typeOfAction === 'PushEvent'){
                    console.log(`- Pushed to ${repoName}`);
                }
                if (typeOfAction === 'IssuesEvent' && element.payload?.action) {
                    const actionPayload = element.payload.action;
                    const actionPayloadUpper = actionPayload.charAt(0).toUpperCase() + actionPayload.slice(1);
                    console.log(`- ${actionPayloadUpper} a new issue in ${repoName}`);
                }
                if(typeOfAction === 'WatchEvent'){
                    console.log(`- Starred ${repoName}`);
                }
            });
        }catch(e){
            console.error('[Erro]: Falha ao processar a resposta dos dados do GitHub.');
            process.exit(1);
        }

    });
});

request.on('error', (error)=>{
    console.error(`[Erro de Rede]: Não foi possível se conectar ao servidor. Detalhes: ${error.message}`);
});