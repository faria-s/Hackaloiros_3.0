"use server";

import fetch from 'node-fetch';

// Interface para os dados retornados pela API
interface TickerData {
  bid: number;
  ask: number;
}

export default async function fetchTickerData(): Promise<TickerData> {
  const response = await fetch('https://api.uphold.com/v0/ticker/BTCUSD');
  console.log(response);
  const data = await response.json();
  return data as TickerData;
}