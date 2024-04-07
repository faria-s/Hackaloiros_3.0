"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import TickerData from './api';
import * as macd from './macd';
import {fetchBinanceData, PriceData} from './coingeckoapi';
import fetch from 'node-fetch';
import fetchTickerData from './api';
import { TailSpin } from 'react-loader-spinner';



function TradingBotVisualizer() {
    const [balance, setBalance] = useState(1000);   
    const [btcPrice, setBtcPrice] = useState(0);
    const [action, setAction] = useState<"keep" | "buy" | "sell" | undefined>('keep');
    const [btcDataList, setBtcDataList] = useState<PriceData[]>([])
    const [loading, setLoading] = useState(true); // Estado para controlar a exibição do TailSpin

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
        }, 3000);

        return () => clearInterval(interval);
    }, []);



        fetchBinanceData()
            .then((bitcoinPrices: PriceData[] | null) => {
                console.log(bitcoinPrices);
                if (bitcoinPrices !== null) {
                    console.log(bitcoinPrices);
                    // Handle Bitcoin price data here
                    setBtcDataList(bitcoinPrices);
                }
            });

    

    
    let lastPrice = null;

   /* // Função para simular as operações de compra e venda
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
            return 'Manter';
        }
    }*/

async function tradingBot(dataPrice: PriceData[]){
    if(dataPrice == undefined) return;
    const result = await macd.calculate(dataPrice);
    return result;
}


    return (
        <div className='pt-50 w-80 justify-center mx-auto'>
        <h1 className=' font-kdam text-xl text-center border-gray-300 py-9 dark:from-inherit lg:static lg:w-auto lg:rounded-xl'>Trading Bot Visualizer</h1>
        <img className="w-full py-10" src="bug.png" alt="Bug Image" />
        <p className=' text-center font-kdam text-lg'>Saldo: ${balance.toFixed(2)}</p>
        {loading ? ( 
            <div className="flex justify-center items-center">
                <TailSpin
                    height={80}
                    width={80}
                    color="#FFFFFF"
                    ariaLabel="tail-spin-loading"
                    radius={1}
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        ) : (
            <>
                <p className='text-center font-kdam text-lg'>Preço atual do BTC/USD: ${btcPrice.toFixed(2)}</p>
                <p className='text-center font-kdam text-lg'>Ação sugerida: {action}</p>
            </>
        )}
    </div>
    );
}

export default TradingBotVisualizer;
