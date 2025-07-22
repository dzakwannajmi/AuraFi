// Module for basic authentication-related functions

import Principal "mo:base/Principal";

module {
  /// Returns the caller's principal.
  /// The `caller` is passed as an argument from the actor's shared function context.
  public func getCallerPrincipal(caller: Principal) : Principal {
    return caller;
  };

  /// Dummy authentication function.
  /// Currently always returns `true`, meaning the user is considered authenticated.
  /// The underscore `_` means the input `Principal` is unused.
  public func isAuthenticated(_: Principal) : Bool {
    return true;
  };
}