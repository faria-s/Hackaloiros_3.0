import fetch from 'node-fetch';

async function getPricesFromAPI() {
    try {
        const response = await fetch('https://api.uphold.com/v0/ticker/BTCUSD');
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Erro ao obter os preços da API: ' + error);
    }
}

async function tradingBot() {
    try {
        const { bid, ask } = await getPricesFromAPI();

        // Verificar se o preço de compra é maior que o preço de venda
        if (bid > 1.02 * ask) {
            return 'vender';
        }
        // Verificar se o preço de compra é menor que o preço de venda
        else if (bid < 0.98 * ask) {
            return 'comprar';
        }
        else {
            return 'manter';
        }
    } catch (error) {
        console.error(error.message);
        return 'manter'; // Se houver um erro, mantenha a posição
    }
}

// Exemplo de uso da função
tradingBot().then(action => {
    console.log("Ação sugerida:", action);
}).catch(error => {
    console.error(error.message);
});