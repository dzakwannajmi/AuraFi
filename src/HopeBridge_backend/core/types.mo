// HopeBridge_backend/src/core/types.mo

import Time "mo:base/Time";
import Float "mo:base/Float";

module {
  /// Represents a single investment record in a user's portfolio
  public type Investment = {
    id: Time.Time;             // Unique ID based on timestamp (used instead of Nat)
    assetName: Text;           // Name of the asset (e.g. "Apple Inc.")
    assetType: Text;           // Type of asset (e.g. "Stock", "Crypto", "ETF")
    sector: Text;              // Market sector (e.g. "Technology", "Finance")
    broker: Text;              // Broker used to purchase the asset
    currency: Text;            // Currency used to buy the asset (e.g. "USD", "IDR")
    quantity: Float;           // Number of units owned
    buyPrice: Float;           // Price per unit at the time of purchase
    currentPrice: Float;       // Latest updated price per unit
    buyDate: Text;             // Date when the asset was purchased
    currentValueInIDR: Float;  // Current total value of the investment in IDR
  };
}
