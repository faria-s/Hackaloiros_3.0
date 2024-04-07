"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import TradingBotVisualizer from "./bot";
import { TailSpin } from 'react-loader-spinner';

export default function Home() {
  return (
    <main className="custom-gradient flex flex-col items-center justify-between">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col align-center mt-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="z-10 w-full items-center justify-between font-mono text-sm lg:flex"
        >
        <style>
        {`
          .custom-gradient {
            background: linear-gradient(45deg, #337d27, #265d1d, #1a3e13, #0d1f0a, #000000);
            width: 100vw;
            height: 100vh;
          }
        `}
      </style>
          <p className="top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <motion.span>Hackathon</motion.span>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <motion.a
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            >
              By <span>Hackaloiros_3.0</span>
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full"
        >
          <TradingBotVisualizer />
        </motion.div>
      </motion.div>
    </main>
  );
}
