"use server";

import fetch from 'node-fetch';

// Interface para os dados retornados pela API
interface TickerData {
  bid: number;
  ask: number;
  currency: string;
}

export default async function fetchTickerData(): Promise<TickerData> {
  const response = await fetch('https://api.uphold.com/v0/ticker/BTCUSD');
  console.log(response);
  const responseData : any = await response.json();

  const tickerData: TickerData = {
    bid:  parseFloat(responseData.bid),
    ask: parseFloat(responseData.ask),
    currency: responseData.currency
  };

  return tickerData; 
}