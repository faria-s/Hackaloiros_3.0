import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';

// Interface para os dados retornados pela API
interface TickerData {
    bid: number;
    ask: number;
}

function TradingBotVisualizer() {
    const [balance, setBalance] = useState(1000);
    const [btcPrice, setBtcPrice] = useState(0);
    const [action, setAction] = useState('manter');

    // Função para buscar os dados da API
    async function fetchTickerData(): Promise<TickerData> {
        const response = await fetch('https://api.uphold.com/v0/ticker/BTCUSD');
        const data = await response.json();
        return data as TickerData;
    }

    // Função de efeito para atualizar os dados periodicamente
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const data = await fetchTickerData();
                const { bid, ask } = data;
                setBtcPrice((bid + ask) / 2); // Usar a média entre bid e ask como preço
                const newAction = await tradingBot(bid, ask);
                setAction(newAction);
            } catch (error) {
                console.error('Erro ao obter os preços da API: ', error);
            }
        }, 5000); // Atualizar a cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    // Função para simular as operações de compra e venda
    async function tradingBot(bid: number, ask: number) {
        try {
            // Verificar se o preço de compra é maior que o preço de venda
            if (bid > 1.02 * ask) {
                setBalance(balance + 0.1); // Simular venda de 0.1 BTC
                return 'vender';
            }
            // Verificar se o preço de compra é menor que o preço de venda
            else if (bid < 0.98 * ask) {
                setBalance(balance - 0.1 * btcPrice); // Simular compra de 0.1 BTC
                return 'comprar';
            }
            else {
                return 'manter';
            }
        } catch (error) {
            console.error('Erro ao executar o trading bot: ', error);
            return 'manter';
        }
    }

    return (
        <div>
            <h1>Trading Bot Visualizer</h1>
            <p>Saldo: ${balance.toFixed(2)}</p>
            <p>Preço atual do BTC/USD: ${btcPrice.toFixed(2)}</p>
            <p>Ação sugerida: {action}</p>
        </div>
    );
}

export default TradingBotVisualizer;
