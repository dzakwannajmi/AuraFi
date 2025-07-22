import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";

import AuthModule "auth/auth";
import Types "core/types";
import PortfolioService "services/portfolio_service";

actor {

  // Define an alias for a HashMap that maps each user's Principal to their list of investments
  type UserPortfoliosMap = HashMap.HashMap<Principal, [Types.Investment]>;

  // In-memory storage for user portfolios (not stable, meaning it won’t persist through upgrades)
  var userPortfolios : UserPortfoliosMap = HashMap.HashMap<Principal, [Types.Investment]>(
    10,                  // Initial capacity
    Principal.equal,     // Equality function for keys
    Principal.hash       // Hash function for keys
  );

  /// Add a new investment to the caller's portfolio
  public shared ({ caller }) func addInvestment(
    assetName: Text,
    assetType: Text,
    sector: Text,
    broker: Text,
    currency: Text,
    quantity: Float,
    buyPrice: Float,
    buyDate: Text,
    initialCurrentValueInIDR: Float,
  ) : async Types.Investment {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.addInvestment(
      userPortfolios,
      callerPrincipal,
      assetName,
      assetType,
      sector,
      broker,
      currency,
      quantity,
      buyPrice,
      buyDate,
      initialCurrentValueInIDR
    );
  };

  /// Retrieve the entire investment portfolio of the caller
  public query ({ caller }) func getMyPortfolio() : async [Types.Investment] {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.getMyPortfolio(userPortfolios, callerPrincipal);
  };

  /// Update the current price and value of a specific investment
  public shared ({ caller }) func updateInvestmentPrice(
    investmentId: Nat,
    newCurrentPrice: Float,
    newCurrentValueInIDR: Float,
  ) : async ?Types.Investment {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.updateInvestmentPrice(
      userPortfolios,
      callerPrincipal,
      investmentId,
      newCurrentPrice,
      newCurrentValueInIDR
    );
  };

  /// Delete an investment from the caller's portfolio by ID
  public shared ({ caller }) func deleteInvestment(
    investmentId: Nat
  ) : async Bool {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.deleteInvestment(userPortfolios, callerPrincipal, investmentId);
  };

  /// Calculate the total current value of the caller's entire portfolio (in IDR)
  public query ({ caller }) func getTotalPortfolioValueInIDR() : async Float {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.getTotalPortfolioValueInIDR(userPortfolios, callerPrincipal);
  };

  /// Calculate the total amount the caller initially spent to purchase their investments (in IDR)
  public query ({ caller }) func getTotalBuyValueInIDR() : async Float {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.getTotalBuyValueInIDR(userPortfolios, callerPrincipal);
  };

  /// Remove all investments belonging to the caller (clear their portfolio)
  public shared ({ caller }) func clearMyPortfolio() : async Bool {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.clearMyPortfolio(userPortfolios, callerPrincipal);
  };
};
