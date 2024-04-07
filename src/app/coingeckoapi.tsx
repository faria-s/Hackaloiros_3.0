"use server";

import fetch from 'node-fetch';

// Define the PriceData interface
export interface PriceData {
    open: number;
    high: number;
    low: number;
    close: number;
}

// Function to transform kline data into objects
function transformKlineData(data: any[]): PriceData[] {
    const result: PriceData[] = [];

    for (let i = 0; i < Math.min(data.length, 26); i++) {
        const [openTime, open, high, low, close] = data[i];
        result.push({
            open: parseFloat(open),
            high: parseFloat(high),
            low: parseFloat(low),
            close: parseFloat(close)
        });
    }

    return result;
}


export async function fetchBinanceData() {
    const symbol = 'BTCUSDT';
    const interval = '1h';
    const limit = 1000;
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch Binance data');
        }
        const data = await response.json();

        // Transform the kline data
        const transformedData: PriceData[] = transformKlineData(data);

        // Output the transformed data
        console.log(transformedData);

        return transformedData;
    } catch (error) {
        console.error('Error fetching Binance data:', error);
        return null;
    }
}
