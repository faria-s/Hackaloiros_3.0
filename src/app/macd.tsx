import fetch from 'node-fetch';
import * as bot from './bot';
import {PriceData} from './coingeckoapi';


export function calculate(data: PriceData[]) {
    const closePrices = data.map(entry => entry.close);
    const macdLine = calculateMACD(closePrices);
    const signalLine = calculateSignalLine(macdLine);
    const signals = analyzeMACD(macdLine, signalLine);

    return signals;
}

function calculateEMA(data: number[], period: number) {
    const k = 2 / (period + 1);
    let ema = [];
    ema[0] = data[0];
    for (let i = 1; i < data.length; i++) {
        ema[i] = (data[i] - ema[i - 1]) * k + ema[i - 1];
    }
    return ema;
}

function calculateMACD(closePrices: number[]) {
    const ema12 = calculateEMA(closePrices, 12);
    const ema26 = calculateEMA(closePrices, 26);
    const macdLine = [];
    for (let i = 0; i < closePrices.length; i++) {
        macdLine.push(ema12[i] - ema26[i]);
    }
    return macdLine;
}

function calculateSignalLine(macdLine: number[]) {
    return calculateEMA(macdLine, 9);
}

function analyzeMACD(macdLine: number[], signalLine: number[]) {
    const signals = [];
    for (let i = 1; i < macdLine.length; i++) {
        if (macdLine[i] > signalLine[i] && macdLine[i - 1] < signalLine[i - 1]) {
          return 'buy';
        } else if (macdLine[i] < signalLine[i] && macdLine[i - 1] > signalLine[i - 1]) {
          return 'sell';
        } else {
          return 'keep';
        }
    }
}

