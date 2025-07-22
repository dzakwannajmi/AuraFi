// HopeBridge_backend/src/main.mo

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

  // Alias tipe
  type UserPortfoliosMap = HashMap.HashMap<Principal, [Types.Investment]>;

  // Buat hash map untuk menyimpan data investasi tiap user (bukan stable var!)
  var userPortfolios : UserPortfoliosMap = HashMap.HashMap<Principal, [Types.Investment]>(
    10, // kapasitas awal
    Principal.equal, // fungsi pembanding key
    Principal.hash   // fungsi hash untuk key
  );

  // Tambahkan investasi baru
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

  // Ambil semua portofolio milik user
  public query ({ caller }) func getMyPortfolio() : async [Types.Investment] {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.getMyPortfolio(userPortfolios, callerPrincipal);
  };

  // Update harga investasi
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

  // Hapus investasi berdasarkan ID
  public shared ({ caller }) func deleteInvestment(
    investmentId: Nat
  ) : async Bool {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.deleteInvestment(userPortfolios, callerPrincipal, investmentId);
  };

  // Hitung total nilai portofolio
  public query ({ caller }) func getTotalPortfolioValueInIDR() : async Float {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.getTotalPortfolioValueInIDR(userPortfolios, callerPrincipal);
  };

  // Hitung total biaya pembelian awal
  public query ({ caller }) func getTotalBuyValueInIDR() : async Float {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.getTotalBuyValueInIDR(userPortfolios, callerPrincipal);
  };

  // Hapus seluruh portofolio user
  public shared ({ caller }) func clearMyPortfolio() : async Bool {
    let callerPrincipal = AuthModule.getCallerPrincipal(caller);
    return PortfolioService.clearMyPortfolio(userPortfolios, callerPrincipal);
  };
};
