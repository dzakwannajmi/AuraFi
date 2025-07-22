// HopeBridge_backend/src/core/types.mo

import Time "mo:base/Time";
import Float "mo:base/Float";

module {
  public type Investment = {
    id: Time.Time;           // gunakan Time.Time, bukan Nat
    assetName: Text;
    assetType: Text;
    sector: Text;
    broker: Text;
    currency: Text;
    quantity: Float;
    buyPrice: Float;
    currentPrice: Float;
    buyDate: Text;
    currentValueInIDR: Float;
  };
}
