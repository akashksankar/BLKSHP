/**
 * BLACK S.H.E.E.P. - Landing & Authentication Portal
 * Equipped with RFC 7519 HMAC-SHA256 (HS256) JWT Authentication
 * Displays Authorized Pass Keys for Akash Sankar & Alfa with 1-click autofill & copy
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Shield,
  Key,
  ArrowRight,
  UserCheck,
  AlertTriangle,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lock,
  FileCode2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthorizedBetaUser } from '../../types';

interface PassKeyInfo {
  name: AuthorizedBetaUser;
  role: string;
  passKey: string;
  altPassKey: string;
  userNum: string;
  color: string;
}

const RESEARCHER_PASSKEYS: PassKeyInfo[] = [
  {
    name: 'Akash Sankar',
    role: 'System Architect',
    passKey: 'omega-protocol-01',
    altPassKey: 'AKASH-OMEGA-2026',
    userNum: 'USER 01',
    color: 'border-red-600',
  },
  {
    name: 'Alfa',
    role: 'Psychological Advisor',
    passKey: 'psyche-eval-02',
    altPassKey: 'ALFA-PSYCHE-2026',
    userNum: 'USER 02',
    color: 'border-black',
  },
];

export const LandingAuth: React.FC = () => {
  const { login, error, clearError, authorizedPassKeys } = useAuth();

  const [selectedIdentity, setSelectedIdentity] = useState<AuthorizedBetaUser>('Akash Sankar');
  const [password, setPassword] = useState<string>('omega-protocol-01');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [initStage, setInitStage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showJwtInspector, setShowJwtInspector] = useState<boolean>(false);

  const activePassKey = authorizedPassKeys[selectedIdentity];
  const isKeyMatching = password.trim() === activePassKey;

  const handleSelectIdentity = (identity: AuthorizedBetaUser, autoFillKey = true) => {
    setSelectedIdentity(identity);
    clearError();
    if (autoFillKey) {
      setPassword(authorizedPassKeys[identity]);
    }
  };

  const handleCopyPassKey = (keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(keyText);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setInitStage(`VERIFYING PASS KEY FOR ${selectedIdentity.toUpperCase()}...`);
    await new Promise((r) => setTimeout(r, 350));

    setInitStage('ISSUING RFC 7519 HMAC-SHA256 (HS256) JSON WEB TOKEN...');
    await new Promise((r) => setTimeout(r, 400));

    setInitStage('SIGNING LEVEL-5 CLEARANCE CERTIFICATE & CLAIMS...');
    await new Promise((r) => setTimeout(r, 350));

    setInitStage('ESTABLISHING ENCRYPTED RESEARCH TELEMETRY STREAM...');
    await new Promise((r) => setTimeout(r, 350));

    try {
      await login(selectedIdentity, password);
    } catch {
      setIsAuthenticating(false);
      setInitStage(null);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-black flex flex-col justify-between overflow-hidden selection:bg-red-600 selection:text-white">
      {/* Light Scientific Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-grid-pattern-light opacity-75" />
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-black to-red-600" />

      {/* Top Telemetry Header */}
      <header className="relative z-10 w-full px-4 md:px-8 py-3.5 flex items-center justify-between border-b border-black/10 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <span className="font-mono-data text-xs tracking-wider text-black font-semibold">
            STATION ID: BS-OBS-01 // BETA AUTHENTICATION GATEWAY
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono-data">
          <span className="text-zinc-600 hidden sm:inline">AUTH: JWT (HS256)</span>
          <span className="text-red-600 border border-red-600/40 bg-red-50 px-2 py-0.5 rounded text-[11px] font-bold">
            CLEARANCE: LEVEL-5
          </span>
        </div>
      </header>

      {/* Main Terminal Focus */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded bg-black text-white border border-black shadow-sm">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-mono-data tracking-widest uppercase">
              BETA RESEARCH PROTOCOL v0.1 // JWT AUTHENTICATED
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-widest text-black drop-shadow-xs">
            BLACK S.H.E.E.P.
          </h1>

          <p className="font-display text-lg sm:text-2xl text-red-600 tracking-wider mt-1">
            STRATEGIC HUMANOID EXPERIMENT AND EVALUATION PROTOCOL
          </p>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
            Classified behavioral observation, experimentation, and anomaly simulation for synthetic human systems.
          </p>
        </motion.div>

        {/* Pass Key Directory + Auth Console Container */}
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Pass Key Directory (Prominently displays keys for Akash & Alfa) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 bg-zinc-50 border-2 border-black rounded-xl p-5 shadow-xs relative"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-red-600" />
                <h3 className="font-mono-data text-xs font-bold text-black tracking-wider uppercase">
                  AUTHORIZED PASS KEYS
                </h3>
              </div>
              <span className="text-[10px] font-mono-data text-zinc-600 font-semibold bg-white border border-zinc-300 px-1.5 py-0.5 rounded">
                2 RESEARCHERS
              </span>
            </div>

            <p className="text-xs text-zinc-600 font-mono-data mb-4 leading-relaxed">
              Use the official pass keys below to sign cryptographic JWT bearer tokens for access:
            </p>

            {/* Pass Key Cards */}
            <div className="space-y-3.5">
              {RESEARCHER_PASSKEYS.map((item) => {
                const isSelected = selectedIdentity === item.name;
                return (
                  <div
                    key={item.name}
                    className={`p-3.5 rounded-lg border-2 transition-all bg-white ${
                      isSelected
                        ? 'border-red-600 ring-2 ring-red-600/20 shadow-sm'
                        : 'border-zinc-300 hover:border-black'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono-data font-bold text-zinc-500">
                            {item.userNum}
                          </span>
                          <span className="text-[10px] font-mono-data text-red-600 font-bold bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
                            LEVEL-5
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-black mt-0.5">{item.name}</h4>
                        <p className="text-[11px] font-mono-data text-red-600 font-medium">
                          {item.role}
                        </p>
                      </div>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono-data text-white bg-red-600 px-2 py-0.5 rounded font-bold">
                          <UserCheck className="w-3 h-3" />
                          ACTIVE
                        </span>
                      )}
                    </div>

                    {/* Pass Key Display Box */}
                    <div className="mt-3 p-2 bg-zinc-100 rounded border border-zinc-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono-data text-zinc-500 font-medium">
                          SECURITY PASS KEY:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyPassKey(item.passKey)}
                          title="Copy Pass Key"
                          className="text-[10px] font-mono-data text-zinc-600 hover:text-black flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedKey === item.passKey ? (
                            <>
                              <Check className="w-3 h-3 text-green-600" />
                              <span className="text-green-700 font-bold">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="font-mono-data font-bold text-xs text-black tracking-wide bg-white px-2 py-1 rounded border border-zinc-200 flex items-center justify-between">
                        <code>{item.passKey}</code>
                        <Key className="w-3 h-3 text-red-600 shrink-0" />
                      </div>
                    </div>

                    {/* Autofill Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectIdentity(item.name, true)}
                      disabled={isAuthenticating}
                      className={`w-full mt-2.5 py-1.5 px-3 rounded text-xs font-mono-data font-semibold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
                          : 'bg-zinc-200 hover:bg-black hover:text-white text-zinc-800'
                      }`}
                    >
                      <span>AUTOFILL & SELECT</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* JWT Spec Accordion Toggle */}
            <div className="mt-4 pt-3 border-t border-black/10">
              <button
                type="button"
                onClick={() => setShowJwtInspector(!showJwtInspector)}
                className="w-full flex items-center justify-between text-xs font-mono-data text-zinc-700 hover:text-black cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-red-600" />
                  <span>JWT TOKEN SPEC (HS256)</span>
                </span>
                <span className="text-red-600 font-bold">{showJwtInspector ? 'HIDE' : 'VIEW'}</span>
              </button>

              {showJwtInspector && (
                <div className="mt-2.5 p-3 rounded bg-zinc-950 text-zinc-300 font-mono-data text-[11px] space-y-1.5 border border-black">
                  <div className="text-red-400 font-bold text-[10px] pb-1 border-b border-zinc-800 flex justify-between">
                    <span>ALGORITHM: HS256</span>
                    <span>EXPIRY: 24 HOURS</span>
                  </div>
                  <pre className="text-[10px] leading-tight text-zinc-300 overflow-x-auto whitespace-pre-wrap">
{`HEADER: {"alg": "HS256", "typ": "JWT"}
CLAIMS: {
  "sub": "${selectedIdentity === 'Akash Sankar' ? 'user_akash_01' : 'user_alfa_02'}",
  "name": "${selectedIdentity}",
  "role": "${selectedIdentity === 'Akash Sankar' ? 'System Architect' : 'Psychological Advisor'}",
  "clearance": "LEVEL-5 SCIENTIFIC CLEARANCE",
  "iss": "BLACK_SHEEP_AUTH_GATEWAY"
}`}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Authentication Console Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-7 bg-white border-2 border-black rounded-xl p-6 md:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.08)] relative"
          >
            {/* Scientific Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600" />

            {/* Header info */}
            <div className="flex items-center justify-between mb-5 border-b border-black/10 pb-3">
              <span className="text-xs font-mono-data tracking-wider text-black font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-red-600" />
                SECURITY CLEARANCE CONSOLE
              </span>
              <span className="text-[10px] font-mono-data text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                JWT SIGNING ACTIVE
              </span>
            </div>

            {/* Selected Identity Switcher Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => handleSelectIdentity('Akash Sankar', false)}
                disabled={isAuthenticating}
                className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
                  selectedIdentity === 'Akash Sankar'
                    ? 'border-red-600 bg-red-50/70 shadow-xs'
                    : 'border-zinc-300 bg-zinc-50 hover:border-black'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-data text-zinc-500">USER 01</span>
                  {selectedIdentity === 'Akash Sankar' && (
                    <UserCheck className="w-3.5 h-3.5 text-red-600" />
                  )}
                </div>
                <p className="font-bold text-sm text-black">Akash Sankar</p>
                <p className="text-[11px] text-red-600 font-mono-data font-semibold">
                  System Architect
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectIdentity('Alfa', false)}
                disabled={isAuthenticating}
                className={`p-3 rounded-lg border-2 text-left transition-all cursor-pointer ${
                  selectedIdentity === 'Alfa'
                    ? 'border-red-600 bg-red-50/70 shadow-xs'
                    : 'border-zinc-300 bg-zinc-50 hover:border-black'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono-data text-zinc-500">USER 02</span>
                  {selectedIdentity === 'Alfa' && (
                    <UserCheck className="w-3.5 h-3.5 text-red-600" />
                  )}
                </div>
                <p className="font-bold text-sm text-black">Alfa</p>
                <p className="text-[11px] text-red-600 font-mono-data font-semibold">
                  Psychological Advisor
                </p>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-data text-black mb-1.5 flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-red-600" />
                    SECURITY PASS KEY
                  </span>
                  {isKeyMatching ? (
                    <span className="text-[10px] font-mono-data text-green-700 bg-green-50 border border-green-300 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      PASS KEY MATCHED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono-data text-zinc-500">
                      RFC 7519 HMAC-SHA256
                    </span>
                  )}
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isAuthenticating}
                    placeholder="Enter clearance pass key..."
                    className="w-full bg-white border border-black/40 rounded-lg pl-3.5 pr-20 py-2.5 text-sm text-black font-mono-data focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide pass key' : 'Show pass key'}
                      className="p-1.5 text-zinc-400 hover:text-black cursor-pointer rounded"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Helpful active pass key note */}
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono-data">
                  <span className="text-zinc-600">
                    Official Key:{' '}
                    <code className="text-red-600 font-bold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                      {activePassKey}
                    </code>
                  </span>
                  <button
                    type="button"
                    onClick={() => setPassword(activePassKey)}
                    className="text-red-600 hover:underline font-semibold cursor-pointer"
                  >
                    Reset Key
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded bg-red-50 border border-red-300 text-xs text-red-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Authentication Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* Progress animation during authentication */}
              {isAuthenticating ? (
                <div className="p-4 rounded-lg border border-red-600 bg-red-50 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono-data text-red-600 font-semibold">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    <span>AUTHENTICATING & GENERATING JWT BEARER TOKEN...</span>
                  </div>
                  <p className="text-[11px] font-mono-data text-black font-semibold animate-pulse">
                    {initStage || 'VALIDATING PASS KEY...'}
                  </p>
                  <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full w-full animate-[progress_1.2s_ease-in-out_infinite]" />
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-display text-xl tracking-wider rounded-lg transition-all shadow-[0_4px_14px_rgba(220,38,38,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>SIGN IN WITH JWT CREDENTIALS</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </form>

            {/* Clearance Equivalence Note */}
            <div className="mt-5 pt-4 border-t border-black/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono-data">
              <span>EQUAL CLEARANCE (LEVEL-5)</span>
              <span>TOKEN VALIDITY: 24 HOURS</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 flex flex-col md:flex-row items-center justify-between border-t border-black/10 text-xs text-zinc-500 font-mono-data bg-white">
        <div>
          <span className="text-black font-semibold">AUTHORIZED RESEARCH PERSONNEL ONLY</span>
          <span className="mx-2">·</span>
          <span>CLASSIFIED SIMULATION WORKSTATION</span>
        </div>
        <div className="mt-2 md:mt-0 text-zinc-600">
          JWT ENGINE: HMAC-SHA256 (HS256) // PROTOCOL v0.1
        </div>
      </footer>
    </div>
  );
};
