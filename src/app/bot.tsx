"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import TickerData from './api'
import fetch from 'node-fetch';
import fetchTickerData from './api'
import { TailSpin } from 'react-loader-spinner';

function TradingBotVisualizer() {
    const [balance, setBalance] = useState(1000);   
    const [btcBalance, setBtcBalance] = useState(0);
    const [btcPrice, setBtcPrice] = useState(0);
    const [action, setAction] = useState('manter');
    const [loading, setLoading] = useState(true); // Estado para controlar a exibição do TailSpin


    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const data = await fetchTickerData();
                console.log(data);
                setBtcPrice((data.bid + data.ask) / 2);
                const newAction = await tradingBot(data.bid, data.ask);
                setAction(newAction);
            } catch (error) {
                console.error('Erro ao obter os preços da API: ', error);
            } finally {
                setLoading(false); // Definindo loading como falso após a obtenção dos dados
            }
        }, 3000);
    
        return () => clearInterval(interval);
    }, []);


    let lastPrice = null;

    async function tradingBot(bid: number, ask: number) {
        try {
            if (lastPrice !== null && bid === lastPrice.bid && ask === lastPrice.ask) {
                return 'manter'; // Se os preços não mudaram, não há necessidade de solicitar entrada novamente
            }
            
            lastPrice = { bid, ask };
    
            if (bid >ask  ) { // isto vai ser sempre 
                const amountToSell = btcBalance;
                const x = 1000*amountToSell/bid;
                setBtcBalance(x); // Vender todo o BTC
                setBalance(balance + amountToSell * bid); // Adicionar o saldo correspondente à venda
                return 'vender';
            } else if (bid <  ask) {
                const amountToBuy = balance / ask;
                setBtcBalance(btcBalance + amountToBuy); // Comprar o máximo possível de BTC
                setBalance(0); // Definir saldo como zero após comprar BTC
                return 'comprar';
            } else {
                return 'manter';
            }
        } catch (error) {
            console.error('Erro ao executar o trading bot: ', error);
            return 'manter';
        }
    }
    
    

    return (
    );
}

export default TradingBotVisualizer;
