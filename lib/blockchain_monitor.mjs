import { ethers } from 'ethers';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

class BlockchainMonitor {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL || 'YOUR_ARBITRUM_RPC_URL');
    this.hypeTokenAddress = '0x85225ed797fd4128ac45a992c46ea4681a7a15da'; // HYPE token contract address on Arbitrum
    this.hypeTokenAbi = [
      "event Transfer(address indexed from, address indexed to, uint256 value)",
      "function decimals() view returns (uint8)"
    ];
    this.hypeContract = new ethers.Contract(this.hypeTokenAddress, this.hypeTokenAbi, this.provider);
    this.thresholdUSD = 100000; // $100k USD
    this.dashboardApiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/blockchain-events` : 'http://localhost:3000/api/blockchain-events';
    this.tokenDecimals = 18; // Default, will be updated from contract

    this.init();
  }

  async init() {
    try {
      this.tokenDecimals = await this.hypeContract.decimals();
      console.log(`✅ HYPE Token Decimals: ${this.tokenDecimals}`);
      this.startMonitoring();
    } catch (error) {
      console.error('❌ Failed to initialize BlockchainMonitor:', error.message);
    }
  }

  async getHypePriceUSD() {
    // This is a placeholder. You'll need a reliable way to get HYPE/USD price.
    // For now, it tries to fetch from your existing /api/hype endpoint.
    try {
      const response = await fetch('http://localhost:3005/api/hype'); // Adjust port if needed
      const data = await response.json();
      return data.markPrice || 0.01; // Use markPrice from your existing API or a default
    } catch (error) {
      console.error('❌ Error fetching HYPE price for blockchain monitor:', error.message);
      return 0.01; // Fallback price
    }
  }

  async startMonitoring() {
    console.log('🚀 Starting blockchain monitoring for HYPE token transfers...');

    this.hypeContract.on('Transfer', async (from, to, value, event) => {
      const amount = ethers.formatUnits(value, this.tokenDecimals);
      const hypePriceUSD = await this.getHypePriceUSD();
      const valueUSD = parseFloat(amount) * hypePriceUSD;

      if (valueUSD >= this.thresholdUSD) {
        console.log(`🚨 Large HYPE Transfer Detected!`);
        console.log(`  From: ${from}`);
        console.log(`  To: ${to}`);
        console.log(`  Amount: ${amount} HYPE ($${valueUSD.toFixed(2)} USD)`);
        console.log(`  Transaction Hash: ${event.log.transactionHash}`);

        const transferData = {
          type: 'large_hype_transfer',
          fromAddress: from,
          toAddress: to,
          amountHYPE: parseFloat(amount),
          valueUSD: valueUSD,
          transactionHash: event.log.transactionHash,
          timestamp: Date.now(),
        };

        await this.sendToDashboard(transferData);
      }
    });

    console.log('✅ Listening for Transfer events...');
  }

  async sendToDashboard(data) {
    try {
      await fetch(this.dashboardApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_SECRET || 'your-secret-key'}`
        },
        body: JSON.stringify(data)
      });
      console.log('📊 Sent large HYPE transfer data to dashboard.');
    } catch (error) {
      console.error('❌ Error sending blockchain data to dashboard:', error.message);
    }
  }
}

export default BlockchainMonitor;
