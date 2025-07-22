// HopeBridge_backend/src/auth/auth.mo
// Modul fungsi-fungsi autentikasi

import Principal "mo:base/Principal";

module {
  // Fungsi publik untuk mendapatkan Principal dari pemanggil,
  // dengan caller dioper sebagai parameter dari actor.
  public func getCallerPrincipal(caller: Principal) : Principal {
    return caller;
  };

  // Contoh fungsi dummy untuk autentikasi.
  // `_` menandakan parameter tidak digunakan.
  public func isAuthenticated(_: Principal) : Bool {
    return true;
  };
}
