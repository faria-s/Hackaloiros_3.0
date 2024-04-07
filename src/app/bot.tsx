"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import TickerData from './api';
import * as macd from './macd';
import {fetchBinanceData, PriceData} from './coingeckoapi';
import fetch from 'node-fetch';
import fetchTickerData from './api';



function TradingBotVisualizer() {
    const [balance, setBalance] = useState(1000);   
    const [btcBalance, setBtcBalance] = useState(0);
    const [btcPrice, setBtcPrice] = useState(0);
    const [action, setAction] = useState<"keep" | "buy" | "sell" | undefined>('keep');
    const [btcDataList, setBtcDataList] = useState<PriceData[]>([])

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const data = await fetchTickerData();
                console.log(data); // Adicionando uma instrução de console para verificar os dados
                setBtcPrice((data.bid + data.ask) / 2); // Usar a média entre bid e ask como preço
                const newAction = await tradingBot(btcDataList);
                setAction(newAction);
                
            } catch (error) {
                console.error('Erro ao obter os preços da API: ', error);
            } finally {
                setLoading(false); // Definindo loading como falso após a obtenção dos dados
            }
        }, 3000); // Atualizar a cada 3 segundos

        fetchBinanceData()
            .then((bitcoinPrices: PriceData[] | null) => {
                console.log(bitcoinPrices);
                if (bitcoinPrices !== null) {
                    console.log(bitcoinPrices);
                    // Handle Bitcoin price data here
                    setBtcDataList(bitcoinPrices);
                }
            });

    
        return () => clearInterval(interval);
    }, []);

   /* // Função para simular as operações de compra e venda
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
    }*/

async function tradingBot(dataPrice: PriceData[]){
    if(dataPrice == undefined) return;
    const result = await macd.calculate(dataPrice);
    return result;
}
    



    return (
    );
}

export default TradingBotVisualizer;
