"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

  const { data: session } = authClient.useSession();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });
      setMessage("サインアップが完了しました！");
      console.log("Sign up result:", result);
    } catch (error) {
      setMessage("サインアップエラー: " + (error as Error).message);
      console.error("Sign up error:", error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      setMessage("サインインが完了しました！");
      console.log("Sign in result:", result);
    } catch (error) {
      setMessage("サインインエラー: " + (error as Error).message);
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setMessage("サインアウトが完了しました！");
    } catch (error) {
      setMessage("サインアウトエラー: " + (error as Error).message);
      console.error("Sign out error:", error);
    }
  };

  return (
    <div>
      <h1>Better Auth テスト</h1>
      
      {session?.user ? (
        <div>
          <h2>ログイン中: {session.user.name || session.user.email}</h2>
          <button onClick={handleSignOut}>サインアウト</button>
        </div>
      ) : (
        <div>
          <h2>{isSignUp ? "サインアップ" : "サインイン"}</h2>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp && (
              <div>
                <label>名前:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            )}
            <div>
              <label>メールアドレス:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>パスワード:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              {isSignUp ? "サインアップ" : "サインイン"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "サインインに切り替え" : "サインアップに切り替え"}
          </button>
        </div>
      )}
      
      {message && <p>{message}</p>}
    </div>
  );
}
