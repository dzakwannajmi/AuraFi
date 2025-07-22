import Principal "mo:base/Principal";
import Float "mo:base/Float";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

import Types "../core/types";

module {
  type Investment = Types.Investment;
  type UserPortfoliosMap = HashMap.HashMap<Principal, [Investment]>;

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
    let newId : Time.Time = Time.now();

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

  public func getMyPortfolio(
    userPortfolios: UserPortfoliosMap,
    caller: Principal
  ) : [Investment] {
    switch (userPortfolios.get(caller)) {
      case (null) return [];
      case (?invs) return invs;
    };
  };

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

        userPortfolios.put(caller, updatedInvestments);
        return updated;
      };
    };
  };

  public func deleteInvestment(
    userPortfolios: UserPortfoliosMap,
    caller: Principal,
    investmentId: Time.Time
  ) : Bool {
    switch (userPortfolios.get(caller)) {
      case (null) return false;
      case (?investments) {
        let filtered = Array.filter(
          investments,
          func (inv: Investment) : Bool {
            inv.id != investmentId;
          }
        );
        if (Array.size(filtered) < Array.size(investments)) {
          userPortfolios.put(caller, filtered);
          return true;
        };
        return false;
      };
    };
  };

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

  public func clearMyPortfolio(
    userPortfolios: UserPortfoliosMap,
    caller: Principal
  ) : Bool {
    userPortfolios.delete(caller);
    return true;
  };
}
