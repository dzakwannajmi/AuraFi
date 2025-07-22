import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

import Types "../core/types";

module {
  // Alias for convenience
  type Investment = Types.Investment;
  type UserPortfoliosMap = HashMap.HashMap<Principal, [Investment]>;

  /// Add a new investment to a user's portfolio
  public func addInvestment(
    userPortfolios: UserPortfoliosMap,
    caller: Principal,
    assetName: Text,
    assetType: Text,
    sector: Text,
    broker: Text,
    currency: Text,
    quantity: Float,
    buyPrice: Float,
    buyDate: Text,
    initialCurrentValueInIDR: Float,
  ) : Investment {
    // Use current timestamp as a unique ID
    let newId : Time.Time = Time.now();

    // Create new investment object
    let newInvestment : Investment = {
      id = newId;
      assetName;
      assetType;
      sector;
      broker;
      currency;
      quantity;
      buyPrice;
      currentPrice = 0.0;
      buyDate;
      currentValueInIDR = initialCurrentValueInIDR;
    };

    // Add to existing portfolio or create a new one
    switch (userPortfolios.get(caller)) {
      case (null) {
        userPortfolios.put(caller, [newInvestment]);
      };
      case (?investments) {
        let newList = Array.append<Investment>(investments, [newInvestment]);
        userPortfolios.put(caller, newList);
      };
    };

    return newInvestment;
  };

  /// Retrieve the full portfolio of a user
  public func getMyPortfolio(
    userPortfolios: UserPortfoliosMap,
    caller: Principal
  ) : [Investment] {
    switch (userPortfolios.get(caller)) {
      case (null) return [];
      case (?invs) return invs;
    };
  };

  /// Update the current price and value (in IDR) of an investment
  public func updateInvestmentPrice(
    userPortfolios: UserPortfoliosMap,
    caller: Principal,
    investmentId: Time.Time,
    newCurrentPrice: Float,
    newCurrentValueInIDR: Float,
  ) : ?Investment {
    switch (userPortfolios.get(caller)) {
      case (null) return null;
      case (?investments) {
        var updated : ?Investment = null;

        // Map through investments and update the matching one
        let updatedInvestments = Array.map(
          investments,
          func(inv: Investment) : Investment {
            if (inv.id == investmentId) {
              let updatedInv : Investment = {
                id = inv.id;
                assetName = inv.assetName;
                assetType = inv.assetType;
                sector = inv.sector;
                broker = inv.broker;
                currency = inv.currency;
                quantity = inv.quantity;
                buyPrice = inv.buyPrice;
                currentPrice = newCurrentPrice;
                buyDate = inv.buyDate;
                currentValueInIDR = newCurrentValueInIDR;
              };
              updated := ?updatedInv;
              return updatedInv;
            } else {
              return inv;
            }
          }
        );

        // Save updated list back to user portfolio
        userPortfolios.put(caller, updatedInvestments);
        return updated;
      };
    };
  };

  /// Remove an investment from the user's portfolio by ID
  public func deleteInvestment(
    userPortfolios: UserPortfoliosMap,
    caller: Principal,
    investmentId: Time.Time
  ) : Bool {
    switch (userPortfolios.get(caller)) {
      case (null) return false;
      case (?investments) {
        // Filter out the investment to be deleted
        let filtered = Array.filter(
          investments,
          func (inv: Investment) : Bool {
            inv.id != investmentId;
          }
        );
        // Check if any change happened
        if (Array.size(filtered) < Array.size(investments)) {
          userPortfolios.put(caller, filtered);
          return true;
        };
        return false;
      };
    };
  };

  /// Calculate the total current value of a user's portfolio (in IDR)
  public func getTotalPortfolioValueInIDR(
    userPortfolios: UserPortfoliosMap,
    caller: Principal
  ) : Float {
    switch (userPortfolios.get(caller)) {
      case (null) return 0.0;
      case (?invs) {
        var sum : Float = 0.0;
        for (i in Iter.fromArray(invs)) {
          sum += i.currentValueInIDR;
        };
        return sum;
      };
    };
  };

  /// Calculate the total buy cost (quantity * buy price) of the user's portfolio (in IDR)
  public func getTotalBuyValueInIDR(
    userPortfolios: UserPortfoliosMap,
    caller: Principal
  ) : Float {
    switch (userPortfolios.get(caller)) {
      case (null) return 0.0;
      case (?invs) {
        var sum : Float = 0.0;
        for (i in Iter.fromArray(invs)) {
          sum += i.buyPrice * i.quantity;
        };
        return sum;
      };
    };
  };

  /// Clear all investments from the user's portfolio
  public func clearMyPortfolio(
    userPortfolios: UserPortfoliosMap,
    caller: Principal
  ) : Bool {
    userPortfolios.delete(caller);
    return true;
  };
}
